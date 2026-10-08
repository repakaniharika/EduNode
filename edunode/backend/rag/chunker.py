import logging
import re
from typing import List, Dict, Any
from edunode.backend.rag.schemas import CurriculumChunk
from edunode.backend.rag.config import CHUNK_SIZE, CHUNK_OVERLAP

logger = logging.getLogger(__name__)

def chunk_document(pages_data: List[Dict[str, Any]], 
                   document_id: str, 
                   document_name: str,
                   subject: str = None,
                   grade: str = None,
                   curriculum: str = None) -> List[CurriculumChunk]:
    """
    Implements curriculum-aware chunking.
    Groups text by paragraphs, attempting to stay within CHUNK_SIZE limits
    while preserving context.
    """
    chunks = []
    current_chunk_text = ""
    current_page_start = None
    chunk_counter = 1
    
    # Simple heuristic to track sections/chapters from all-caps lines or short bold lines
    current_chapter = None
    current_section = None
    
    for page_data in pages_data:
        page_num = page_data["page"]
        text = page_data.get("raw_text", "")
        
        if current_page_start is None:
            current_page_start = page_num
            
        paragraphs = text.split("\n\n")
        
        for p in paragraphs:
            p = p.strip()
            if not p:
                continue
                
            # Very basic heuristic for chapter/section detection (configurable later)
            if len(p) < 60 and p.isupper():
                if "CHAPTER" in p or current_chapter is None:
                    current_chapter = p
                else:
                    current_section = p
            
            # If adding this paragraph exceeds CHUNK_SIZE, finalize the current chunk
            if len(current_chunk_text) + len(p) > CHUNK_SIZE and current_chunk_text:
                chunk_id = f"{document_id}_{chunk_counter:04d}"
                chunks.append(CurriculumChunk(
                    chunk_id=chunk_id,
                    document_id=document_id,
                    document_name=document_name,
                    subject=subject,
                    grade=grade,
                    chapter=current_chapter,
                    section=current_section,
                    page_start=current_page_start,
                    page_end=page_num,
                    text=current_chunk_text.strip()
                ))
                chunk_counter += 1
                
                # Keep overlap by retaining the last paragraph(s) up to CHUNK_OVERLAP length
                overlap_text = current_chunk_text[-CHUNK_OVERLAP:] if len(current_chunk_text) > CHUNK_OVERLAP else current_chunk_text
                # Find the first full word or paragraph boundary in overlap
                overlap_text = overlap_text[overlap_text.find(" ") + 1:] if " " in overlap_text else overlap_text
                
                current_chunk_text = overlap_text + "\n\n" + p
                current_page_start = page_num
            else:
                current_chunk_text += ("\n\n" + p if current_chunk_text else p)
                
    # Add the final chunk
    if current_chunk_text.strip():
        chunk_id = f"{document_id}_{chunk_counter:04d}"
        chunks.append(CurriculumChunk(
            chunk_id=chunk_id,
            document_id=document_id,
            document_name=document_name,
            subject=subject,
            grade=grade,
            chapter=current_chapter,
            section=current_section,
            page_start=current_page_start,
            page_end=pages_data[-1]["page"] if pages_data else current_page_start,
            text=current_chunk_text.strip()
        ))
        
    logger.info(f"Created {len(chunks)} chunks for document {document_id}")
    return chunks
