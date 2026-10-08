import pytest
from pydantic import ValidationError
from edunode.backend.rag.schemas import CurriculumChunk, RetrievalRequest

def test_cbse_metadata_accepted():
    chunk = CurriculumChunk(
        chunk_id="1", document_id="doc1", document_name="doc.pdf",
        board="cbse", grade=8, subject="math", page_start=1, page_end=1, text="test"
    )
    assert chunk.board == "cbse"

def test_kerala_metadata_accepted():
    chunk = CurriculumChunk(
        chunk_id="1", document_id="doc1", document_name="doc.pdf",
        board="kerala", grade=10, subject="math", page_start=1, page_end=1, text="test"
    )
    assert chunk.board == "kerala"

def test_tamil_nadu_metadata_accepted():
    chunk = CurriculumChunk(
        chunk_id="1", document_id="doc1", document_name="doc.pdf",
        board="tamil_nadu", grade=6, subject="math", page_start=1, page_end=1, text="test"
    )
    assert chunk.board == "tamil_nadu"

def test_andhra_pradesh_metadata_accepted():
    chunk = CurriculumChunk(
        chunk_id="1", document_id="doc1", document_name="doc.pdf",
        board="andhra_pradesh", grade=9, subject="math", page_start=1, page_end=1, text="test"
    )
    assert chunk.board == "andhra_pradesh"

def test_telangana_metadata_accepted():
    chunk = CurriculumChunk(
        chunk_id="1", document_id="doc1", document_name="doc.pdf",
        board="telangana", grade=12, subject="math", page_start=1, page_end=1, text="test"
    )
    assert chunk.board == "telangana"

def test_invalid_board_rejected():
    with pytest.raises(ValidationError):
        CurriculumChunk(
            chunk_id="1", document_id="doc1", document_name="doc.pdf",
            board="invalid_board", grade=8, subject="math", page_start=1, page_end=1, text="test"
        )

def test_class_6_accepted():
    req = RetrievalRequest(query="test", board="cbse", grade=6, subject="math")
    assert req.grade == 6

def test_class_12_accepted():
    req = RetrievalRequest(query="test", board="cbse", grade=12, subject="math")
    assert req.grade == 12

def test_class_5_rejected():
    with pytest.raises(ValidationError):
        RetrievalRequest(query="test", board="cbse", grade=5, subject="math")

def test_class_13_rejected():
    with pytest.raises(ValidationError):
        RetrievalRequest(query="test", board="cbse", grade=13, subject="math")
