from edunode.backend.rag.retriever import filter_results
from edunode.backend.rag.schemas import RetrievalRequest

def test_filter_results():
    results = [
        ({"grade": "8", "subject": "Mathematics", "document_name": "doc1"}, 0.9),
        ({"grade": "9", "subject": "Science", "document_name": "doc2"}, 0.8)
    ]
    
    req1 = RetrievalRequest(query="test", grade="8")
    filtered1 = filter_results(results, req1)
    assert len(filtered1) == 1
    assert filtered1[0][0]["document_name"] == "doc1"
    
    req2 = RetrievalRequest(query="test", subject="Science")
    filtered2 = filter_results(results, req2)
    assert len(filtered2) == 1
    assert filtered2[0][0]["document_name"] == "doc2"
    
    req3 = RetrievalRequest(query="test")
    filtered3 = filter_results(results, req3)
    assert len(filtered3) == 2
