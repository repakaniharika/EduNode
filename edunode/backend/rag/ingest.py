import os
import uuid
import logging
from pathlib import Path
from edunode.backend.rag.parser import parse_pdf
from edunode.backend.rag.cleaner import clean_text
from edunode.backend.rag.chunker import chunk_document
from edunode.backend.rag.embeddings import embed_documents
from edunode.backend.rag.vector_store import vector_store
from edunode.backend.rag.schemas import UploadResponse, SupportedBoard, SupportedGrade
from edunode.backend.rag.concept_graph import concept_graph

logger = logging.getLogger(__name__)

def ingest_document(
    file_path: str, 
    document_name: str, 
    board: SupportedBoard,
    grade: SupportedGrade,
    subject: str, 
    medium: str = None, 
    textbook: str = None, 
    academic_year: str = None
) -> UploadResponse:
    try:
        base_name = Path(document_name).stem.lower().replace(" ", "_")
        document_id = f"{base_name}_{uuid.uuid4().hex[:6]}"
        
        # 1. Parse PDF
        pages_data = parse_pdf(file_path, document_id, document_name)
        
        # 2. Clean Text
        for page in pages_data:
            page["raw_text"] = clean_text(page.get("raw_text", ""))
            
        # 3. Chunk Document
        chunks = chunk_document(
            pages_data, document_id, document_name, 
            board, grade, subject, medium, textbook, academic_year
        )
        
        if not chunks:
            return UploadResponse(
                success=False,
                document_name=document_name,
                status="failed",
                error="No extractable text found in document."
            )
            
        # 4. Generate Embeddings
        texts_to_embed = [c.text for c in chunks]
        embeddings = embed_documents(texts_to_embed)
        
        # 5. Semantic Chunk -> Concept Mapping
        for i, emb in enumerate(embeddings):
            mapped_concepts = concept_graph.get_concepts_for_embedding(emb)
            chunks[i].concept_ids = [c.concept_id for c in mapped_concepts]
            
        # 6. Add to FAISS Vector Store
        chunk_dicts = [c.model_dump() for c in chunks]
        vector_store.add_documents(embeddings, chunk_dicts)
        
        return UploadResponse(
            success=True,
            document_id=document_id,
            document_name=document_name,
            chunks_created=len(chunks),
            status="indexed"
        )
        
    except Exception as e:
        logger.error(f"Ingestion failed for {document_name}: {e}")
        return UploadResponse(
            success=False,
            document_name=document_name,
            status="failed",
            error=str(e)
        )
