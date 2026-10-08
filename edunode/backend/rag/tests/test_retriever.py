import pytest
from edunode.backend.rag.retriever import filter_results
from edunode.backend.rag.schemas import RetrievalRequest

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
