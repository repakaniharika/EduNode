import os
import json
import logging
import faiss
import numpy as np
from typing import List, Dict, Any, Tuple
from edunode.backend.rag.config import VECTOR_STORE_DIR
from edunode.backend.rag.embeddings import get_embedding_dimension

logger = logging.getLogger(__name__)

INDEX_PATH = VECTOR_STORE_DIR / "index.faiss"
METADATA_PATH = VECTOR_STORE_DIR / "metadata.json"

class VectorStore:
    def __init__(self):
        self.index = None
        # metadata mapping: dict where key is stringified faiss integer ID, value is chunk dict
        self.metadata: Dict[str, Dict[str, Any]] = {}
        self.dimension = get_embedding_dimension()
        self.load_index()

    def _init_index(self):
        # We use IndexFlatIP because our embeddings are normalized, 
        # so Inner Product == Cosine Similarity
        self.index = faiss.IndexFlatIP(self.dimension)
        self.metadata = {}

    def load_index(self):
        """Loads FAISS index and metadata from disk, or initializes them if not found."""
        if os.path.exists(INDEX_PATH) and os.path.exists(METADATA_PATH):
            try:
                self.index = faiss.read_index(str(INDEX_PATH))
                with open(METADATA_PATH, "r", encoding="utf-8") as f:
                    self.metadata = json.load(f)
                logger.info(f"Loaded vector index with {self.index.ntotal} vectors.")
            except Exception as e:
                logger.error(f"Failed to load vector index: {e}")
                self._init_index()
        else:
            logger.info("No existing vector index found. Initializing a new one.")
            self._init_index()

    def save_index(self):
        """Persists the FAISS index and metadata to disk."""
        try:
            faiss.write_index(self.index, str(INDEX_PATH))
            with open(METADATA_PATH, "w", encoding="utf-8") as f:
                json.dump(self.metadata, f, indent=2)
            logger.info(f"Saved vector index with {self.index.ntotal} vectors to disk.")
        except Exception as e:
            logger.error(f"Failed to save vector index: {e}")

    def document_exists(self, document_id: str) -> bool:
        """Checks if a document_id is already in the metadata."""
        for meta in self.metadata.values():
            if meta.get("document_id") == document_id:
                return True
        return False

    def add_documents(self, embeddings: np.ndarray, chunks_metadata: List[Dict[str, Any]]):
        """Adds normalized embeddings and their metadata to the index."""
        if len(embeddings) != len(chunks_metadata):
            raise ValueError("Number of embeddings and metadata items must match.")
        
        if len(embeddings) == 0:
            return

        start_id = self.index.ntotal
        self.index.add(embeddings)
        
        for i, meta in enumerate(chunks_metadata):
            vector_id = str(start_id + i)
            self.metadata[vector_id] = meta
            
        logger.info(f"Added {len(embeddings)} vectors to FAISS.")
        self.save_index()

    def search(self, query_embedding: np.ndarray, top_k: int = 5) -> List[Tuple[Dict[str, Any], float]]:
        """
        Searches the index for the most similar vectors.
        Returns a list of (metadata, score) tuples.
        """
        if self.index.ntotal == 0:
            return []

        query_embedding = query_embedding.reshape(1, -1)
        scores, indices = self.index.search(query_embedding, top_k)
        
        results = []
        for i in range(len(indices[0])):
            idx = indices[0][i]
            if idx != -1:  # FAISS returns -1 if not enough results
                vector_id = str(idx)
                if vector_id in self.metadata:
                    score = float(scores[0][i])
                    results.append((self.metadata[vector_id], score))
                    
        return results

# Singleton instance
vector_store = VectorStore()
