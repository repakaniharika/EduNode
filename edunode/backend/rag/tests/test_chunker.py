from edunode.backend.rag.chunker import chunk_document

def test_chunker_respects_size():
    # Create synthetic pages data
    pages_data = [
        {"page": 1, "raw_text": "A" * 600 + "\n\n" + "B" * 600},
        {"page": 2, "raw_text": "C" * 800}
    ]
    
    chunks = chunk_document(
        pages_data,
        "doc1",
        "doc1.pdf",
        board="cbse",
        grade=8,
        subject="mathematics",
    )
    
    # Each chunk should ideally not exceed CHUNK_SIZE substantially, 
    # but since our heuristic splits by paragraph, a single huge paragraph 
    # might exceed it. However, "A"*600 is less than 1000, so A goes in.
    # B*600 + A*600 = 1200 > 1000, so B goes in a new chunk.
    assert len(chunks) > 1
    
    assert chunks[0].page_start == 1
    assert chunks[0].document_id == "doc1"
    assert "A" * 600 in chunks[0].text
    assert "B" * 600 not in chunks[0].text
