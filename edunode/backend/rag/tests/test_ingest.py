import numpy as np

import edunode.backend.rag.ingest as ingest_module
from edunode.backend.rag.schemas import ConceptMatch, CurriculumChunk


def test_ingestion_assigns_semantic_concept_ids(monkeypatch, tmp_path):
    chunk = CurriculumChunk(
        chunk_id="document_0001",
        document_id="document",
        document_name="math.pdf",
        board="cbse",
        grade=8,
        subject="mathematics",
        page_start=1,
        page_end=1,
        text="A linear equation has one variable.",
    )
    indexed = {}
    monkeypatch.setattr(
        ingest_module,
        "parse_pdf",
        lambda *_args: [{"page": 1, "raw_text": "A linear equation has one variable."}],
    )
    monkeypatch.setattr(ingest_module, "clean_text", lambda text: text)
    monkeypatch.setattr(ingest_module, "chunk_document", lambda *_args: [chunk])
    monkeypatch.setattr(
        ingest_module,
        "embed_documents",
        lambda _texts: np.array([[1.0, 0.0]], dtype=np.float32),
    )
    monkeypatch.setattr(
        ingest_module.concept_graph,
        "get_concepts_for_embedding",
        lambda _embedding: [
            ConceptMatch(concept_id="linear_equations", name="Linear Equations", score=0.9)
        ],
    )
    monkeypatch.setattr(
        ingest_module.vector_store,
        "add_documents",
        lambda _embeddings, metadata: indexed.update(chunks=metadata),
    )

    response = ingest_module.ingest_document(
        file_path=str(tmp_path / "unused.pdf"),
        document_name="math.pdf",
        board="cbse",
        grade=8,
        subject="mathematics",
    )

    assert response.success
    assert indexed["chunks"][0]["concept_ids"] == ["linear_equations"]
