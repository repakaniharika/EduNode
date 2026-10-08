import json
import logging
import os
from typing import Any, Dict, List, Tuple

import faiss
import numpy as np

from edunode.backend.rag.config import CONCEPT_GRAPH_PATH, VECTOR_STORE_DIR
from edunode.backend.rag.embeddings import (
    embed_documents,
    get_embedding_dimension,
    get_embedding_model_name,
)

logger = logging.getLogger(__name__)

INDEX_PATH = VECTOR_STORE_DIR / "index.faiss"
METADATA_PATH = VECTOR_STORE_DIR / "metadata.json"
MANIFEST_PATH = VECTOR_STORE_DIR / "index_manifest.json"
LEGACY_EMBEDDING_MODEL = "all-MiniLM-L6-v2"


class VectorStore:
    def __init__(self):
        self.index = None
        self.metadata: Dict[str, Dict[str, Any]] = {}
        self.dimension = get_embedding_dimension()
        self.embedding_model = get_embedding_model_name()
        self.load_index()

    def _init_index(self):
        self.index = faiss.IndexFlatIP(self.dimension)
        self.metadata = {}

    def load_index(self):
        index_exists = INDEX_PATH.exists()
        metadata_exists = METADATA_PATH.exists()
        if not index_exists and not metadata_exists:
            logger.info("No existing vector index found. Initializing a new one.")
            self._init_index()
            self.save_index()
            return
        if index_exists != metadata_exists:
            raise RuntimeError(
                "Vector index and metadata must both exist; refusing to replace an incomplete store."
            )

        self.index = faiss.read_index(str(INDEX_PATH))
        with METADATA_PATH.open("r", encoding="utf-8") as metadata_file:
            metadata = json.load(metadata_file)
        if not isinstance(metadata, dict):
            raise ValueError("Vector-store metadata must be a JSON object.")
        if not all(
            isinstance(key, str) and isinstance(value, dict)
            for key, value in metadata.items()
        ):
            raise ValueError("Vector-store metadata entries must map string IDs to objects.")
        self.metadata = metadata

        expected_ids = {str(index) for index in range(self.index.ntotal)}
        if set(self.metadata) != expected_ids:
            raise ValueError("Vector index and metadata IDs are inconsistent.")

        if MANIFEST_PATH.exists():
            with MANIFEST_PATH.open("r", encoding="utf-8") as manifest_file:
                manifest = json.load(manifest_file)
            stored_model = manifest.get("embedding_model")
            if not isinstance(stored_model, str):
                raise ValueError("Vector-store manifest must include an embedding_model string.")
            if manifest.get("dimension") != self.index.d:
                raise ValueError(
                    "Vector-store manifest dimension does not match the stored index."
                )
        else:
            logger.warning(
                "Vector store has no model manifest; assuming it was created with %s.",
                LEGACY_EMBEDDING_MODEL,
            )
            stored_model = LEGACY_EMBEDDING_MODEL

        if stored_model != self.embedding_model:
            self._rebuild_embeddings()
        else:
            if self.index.d != self.dimension:
                raise ValueError(
                    f"Stored index dimension {self.index.d} does not match "
                    f"current model dimension {self.dimension}."
                )
            logger.info("Loaded vector index with %s vectors.", self.index.ntotal)
            self._write_manifest()

        for meta in self.metadata.values():
            if "board" not in meta or "grade" not in meta:
                logger.warning(
                    "Legacy chunk metadata for %s lacks board or grade and will be "
                    "excluded by strict retrieval.",
                    meta.get("chunk_id"),
                )

    def _rebuild_embeddings(self):
        ordered_metadata = [
            self.metadata[str(index)] for index in range(self.index.ntotal)
        ]
        texts = [meta.get("text") for meta in ordered_metadata]
        if any(not isinstance(text, str) or not text.strip() for text in texts):
            raise ValueError(
                "Cannot rebuild vectors after an embedding-model change: "
                "stored chunk text is missing."
            )

        embeddings = (
            embed_documents(texts)
            if texts
            else np.empty((0, self.dimension), dtype=np.float32)
        )
        if embeddings.shape != (len(ordered_metadata), self.dimension):
            raise ValueError("Rebuilt embeddings have an unexpected shape.")

        if ordered_metadata:
            from edunode.backend.rag.concept_graph import ConceptGraph

            graph = ConceptGraph()
            graph.load_from_json(str(CONCEPT_GRAPH_PATH))
            for meta, embedding in zip(ordered_metadata, embeddings):
                meta["concept_ids"] = [
                    concept.concept_id
                    for concept in graph.get_concepts_for_embedding(embedding)
                ]

        rebuilt_index = faiss.IndexFlatIP(self.dimension)
        if len(embeddings):
            rebuilt_index.add(embeddings)
        self.index = rebuilt_index
        self.save_index()
        logger.info(
            "Rebuilt %s stored vectors using embedding model %s.",
            len(ordered_metadata),
            self.embedding_model,
        )

    def _write_manifest(self):
        VECTOR_STORE_DIR.mkdir(parents=True, exist_ok=True)
        temporary_path = MANIFEST_PATH.with_name(f"{MANIFEST_PATH.name}.tmp")
        with temporary_path.open("w", encoding="utf-8") as manifest_file:
            json.dump(
                {"embedding_model": self.embedding_model, "dimension": self.dimension},
                manifest_file,
                indent=2,
            )
        os.replace(temporary_path, MANIFEST_PATH)

    def save_index(self):
        VECTOR_STORE_DIR.mkdir(parents=True, exist_ok=True)
        index_temporary_path = INDEX_PATH.with_name(f"{INDEX_PATH.name}.tmp")
        metadata_temporary_path = METADATA_PATH.with_name(f"{METADATA_PATH.name}.tmp")
        faiss.write_index(self.index, str(index_temporary_path))
        with metadata_temporary_path.open("w", encoding="utf-8") as metadata_file:
            json.dump(self.metadata, metadata_file, indent=2)
        os.replace(index_temporary_path, INDEX_PATH)
        os.replace(metadata_temporary_path, METADATA_PATH)
        self._write_manifest()
        logger.info("Saved vector index with %s vectors to disk.", self.index.ntotal)

    def document_exists(self, document_id: str) -> bool:
        return any(
            meta.get("document_id") == document_id for meta in self.metadata.values()
        )

    def add_documents(self, embeddings: np.ndarray, chunks_metadata: List[Dict[str, Any]]):
        if len(embeddings) != len(chunks_metadata):
            raise ValueError("Number of embeddings and metadata items must match.")
        if len(embeddings) == 0:
            return
        if embeddings.ndim != 2 or embeddings.shape[1] != self.dimension:
            raise ValueError("Embeddings must be a 2D array matching the index dimension.")
        if any(
            not all(key in meta for key in ("board", "grade", "subject"))
            for meta in chunks_metadata
        ):
            raise ValueError(
                "Every indexed chunk must include board, grade, and subject metadata."
            )

        start_id = self.index.ntotal
        self.index.add(np.asarray(embeddings, dtype=np.float32))
        for index, meta in enumerate(chunks_metadata):
            self.metadata[str(start_id + index)] = meta

        logger.info("Added %s vectors to FAISS.", len(embeddings))
        self.save_index()

    def search(
        self, query_embedding: np.ndarray, top_k: int = 5
    ) -> List[Tuple[Dict[str, Any], float]]:
        if top_k < 1:
            raise ValueError("top_k must be at least 1.")
        if self.index.ntotal == 0:
            return []

        query_embedding = np.asarray(query_embedding, dtype=np.float32).reshape(1, -1)
        if query_embedding.shape[1] != self.dimension:
            raise ValueError("Query embedding does not match the index dimension.")
        scores, indices = self.index.search(
            query_embedding, min(top_k, self.index.ntotal)
        )

        results = []
        for index, score in zip(indices[0], scores[0]):
            if index != -1:
                vector_id = str(index)
                if vector_id in self.metadata:
                    results.append((self.metadata[vector_id], float(score)))
        return results


vector_store = VectorStore()
