import logging
from typing import List, Dict, Any
import fitz  # PyMuPDF
from pathlib import Path

logger = logging.getLogger(__name__)

def parse_pdf(file_path: str, document_id: str, document_name: str) -> List[Dict[str, Any]]:
    """
    Parses a PDF using PyMuPDF and extracts text page by page.
    Returns a list of dictionaries containing page metadata and raw text.
    """
    pages_data = []
    
    try:
        doc = fitz.open(file_path)
    except Exception as e:
        logger.error(f"Failed to open PDF {file_path}: {e}")
        raise
    
    logger.info(f"Ingesting document: {document_name} with {len(doc)} pages.")

    for page_num in range(len(doc)):
        page = doc[page_num]
        
        # We can extract text using blocks to try to preserve reading order/paragraphs
        blocks = page.get_text("blocks")
        
        # A block is roughly (x0, y0, x1, y1, "lines in block", block_no, block_type)
        # block_type 0 = text, 1 = image
        text_blocks = [b[4] for b in blocks if b[6] == 0]
        raw_text = "\n\n".join(text_blocks)
        
        if not raw_text.strip():
            logger.warning(f"Page {page_num + 1} in {document_name} contains no extractable text.")
            
        pages_data.append({
            "document_id": document_id,
            "document_name": document_name,
            "page": page_num + 1,  # 1-indexed
            "raw_text": raw_text
        })

    doc.close()
    logger.info(f"Extracted {len(pages_data)} pages from {document_name}")
    return pages_data
