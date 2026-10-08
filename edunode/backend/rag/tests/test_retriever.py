import pytest
from edunode.backend.rag.retriever import filter_results
import edunode.backend.rag.retriever as retriever_module
from edunode.backend.rag.schemas import RetrievalRequest
from types import SimpleNamespace
import numpy as np

def test_strict_board_filtering():
    req = RetrievalRequest(query="test", board="kerala", grade=8, subject="math")
    
    mock_results = [
        ({"board": "kerala", "grade": 8, "subject": "math"}, 0.9),
        ({"board": "cbse", "grade": 8, "subject": "math"}, 0.8), # Should be filtered out
        ({"grade": 8, "subject": "math"}, 0.7) # Missing board, should be filtered out
    ]
    
    filtered = filter_results(mock_results, req)
    assert len(filtered) == 1
    assert filtered[0][0]["board"] == "kerala"

def test_strict_grade_filtering():
    req = RetrievalRequest(query="test", board="cbse", grade=10, subject="math")
    
    mock_results = [
        ({"board": "cbse", "grade": 10, "subject": "math"}, 0.9),
        ({"board": "cbse", "grade": 9, "subject": "math"}, 0.8), # Should be filtered out
    ]
    
    filtered = filter_results(mock_results, req)
    assert len(filtered) == 1
    assert filtered[0][0]["grade"] == 10

def test_strict_subject_filtering():
    req = RetrievalRequest(query="test", board="cbse", grade=8, subject="science")
    
    mock_results = [
        ({"board": "cbse", "grade": 8, "subject": "science"}, 0.9),
        ({"board": "cbse", "grade": 8, "subject": "math"}, 0.8), # Should be filtered out
    ]
    
    filtered = filter_results(mock_results, req)
    assert len(filtered) == 1
    assert filtered[0][0]["subject"] == "science"

def test_strict_medium_filtering():
    req = RetrievalRequest(query="test", board="kerala", grade=8, subject="math", medium="malayalam")
    
    mock_results = [
        ({"board": "kerala", "grade": 8, "subject": "math", "medium": "malayalam"}, 0.9),
        ({"board": "kerala", "grade": 8, "subject": "math", "medium": "english"}, 0.8), # filtered
        ({"board": "kerala", "grade": 8, "subject": "math"}, 0.7) # missing medium, filtered
    ]
    
    filtered = filter_results(mock_results, req)
    assert len(filtered) == 1
    assert filtered[0][0]["medium"] == "malayalam"

@pytest.mark.parametrize(
    ("filter_field", "metadata_field"),
    [
        ("medium", "medium"),
        ("textbook", "textbook"),
        ("academic_year", "academic_year"),
        ("chapter", "chapter"),
        ("document_id", "document_id"),
    ],
)
def test_empty_optional_filter_is_still_applied(filter_field, metadata_field):
    req = RetrievalRequest(
        query="test",
        board="kerala",
        grade=8,
        subject="math",
        **{filter_field: ""},
    )
    metadata = {
        "board": "kerala",
        "grade": 8,
        "subject": "math",
        metadata_field: "non-empty value",
    }

    assert filter_results([(metadata, 0.9)], req) == []

def test_source_traceability():
    # Verify that all new metadata fields are actually persisted and expected
    # The new retrieval response mapping requires all these fields to be accessible
    req = RetrievalRequest(query="test", board="tamil_nadu", grade=11, subject="physics")
    
    # We simulate what FAISS returns (a metadata dict)
    mock_results = [
        ({
            "board": "tamil_nadu", 
            "grade": 11, 
            "subject": "physics",
            "document_id": "tn_phys_11",
            "document_name": "tn_physics_11.pdf",
            "chapter": "Kinematics",
            "section": "1.1",
            "page_start": 42,
            "page_end": 43
        }, 0.95)
    ]
    
    filtered = filter_results(mock_results, req)
    assert len(filtered) == 1
    meta = filtered[0][0]
    
    assert meta["board"] == "tamil_nadu"
    assert meta["grade"] == 11
    assert meta["subject"] == "physics"
    assert meta["document_id"] == "tn_phys_11"
    assert meta["document_name"] == "tn_physics_11.pdf"
    assert meta["chapter"] == "Kinematics"
    assert meta["page_start"] == 42
    assert meta["page_end"] == 43

def test_retrieve_expands_search_until_requested_curriculum_is_found(monkeypatch):
    matching_chunk = {
        "board": "kerala",
        "grade": 8,
        "subject": "math",
        "document_id": "kerala-doc",
        "document_name": "kerala.pdf",
        "text": "Kerala-only curriculum",
        "concept_ids": [],
    }
    ranked_results = [
        ({"board": "cbse", "grade": 8, "subject": "math"}, 1.0 - i / 100)
        for i in range(9)
    ] + [(matching_chunk, 0.1)]
    requested_sizes = []

    monkeypatch.setattr(retriever_module, "embed_text", lambda _query: np.array([1.0]))
    monkeypatch.setattr(
        retriever_module.vector_store, "index", SimpleNamespace(ntotal=10)
    )

    def search(_embedding, top_k):
        requested_sizes.append(top_k)
        return ranked_results[:top_k]

    monkeypatch.setattr(retriever_module.vector_store, "search", search)
    request = RetrievalRequest(
        query="curriculum question",
        board="kerala",
        grade=8,
        subject="math",
        top_k=1,
    )

    response = retriever_module.retrieve(request)

    assert requested_sizes == [5, 10]
    assert [result.board for result in response.results] == ["kerala"]

def test_retrieve_reranks_by_curriculum_concept_without_changing_scores(monkeypatch):
    non_concept_chunk = {
        "board": "kerala",
        "grade": 8,
        "subject": "math",
        "document_id": "generic-doc",
        "document_name": "generic.pdf",
        "text": "General curriculum",
        "concept_ids": [],
    }
    concept_chunk = {
        "board": "kerala",
        "grade": 8,
        "subject": "math",
        "document_id": "concept-doc",
        "document_name": "linear-equations.pdf",
        "text": "Linear equations curriculum",
        "concept_ids": ["linear_equations"],
    }
    monkeypatch.setattr(retriever_module, "embed_text", lambda _query: np.array([1.0]))
    monkeypatch.setattr(
        retriever_module.vector_store, "index", SimpleNamespace(ntotal=2)
    )
    monkeypatch.setattr(
        retriever_module.vector_store,
        "search",
        lambda _embedding, top_k: [
            (non_concept_chunk, 0.94),
            (concept_chunk, 0.90),
        ][:top_k],
    )
    monkeypatch.setattr(
        retriever_module.concept_graph,
        "get_concepts_for_embedding",
        lambda *_args, **_kwargs: [
            retriever_module.ConceptMatch(
                concept_id="linear_equations",
                name="Linear Equations",
                score=0.9,
            )
        ],
    )

    response = retriever_module.retrieve(
        RetrievalRequest(
            query="How to solve linear equations?",
            board="kerala",
            grade=8,
            subject="math",
            top_k=1,
        )
    )

    assert response.results[0].document_id == "concept-doc"
    assert response.results[0].score == 0.90

def test_reranking_preserves_vector_order_without_concept_matches():
    ranked_results = [
        ({"concept_ids": []}, 0.95),
        ({"concept_ids": ["linear_equations"]}, 0.8),
    ]

    assert retriever_module.rerank_results(ranked_results, {}) is ranked_results
