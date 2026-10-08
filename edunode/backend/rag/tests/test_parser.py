import pytest
from edunode.backend.rag.parser import parse_pdf
from pathlib import Path
import fitz

def test_parse_pdf_extracts_text(tmp_path):
    # Create a dummy PDF
    pdf_path = tmp_path / "dummy.pdf"
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text((50, 50), "This is a test PDF document.")
    doc.save(pdf_path)
    doc.close()
    
    pages_data = parse_pdf(str(pdf_path), "doc123", "dummy.pdf")
    assert len(pages_data) == 1
    assert "This is a test PDF document." in pages_data[0]["raw_text"]
    assert pages_data[0]["page"] == 1
    assert pages_data[0]["document_id"] == "doc123"
