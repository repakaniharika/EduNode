import os
import uuid
import logging
from pathlib import Path
from edunode.backend.rag.parser import parse_pdf
from edunode.backend.rag.cleaner import clean_text
from edunode.backend.rag.chunker import chunk_document
from edunode.backend.rag.embeddings import embed_documents
from edunode.backend.rag.vector_store import vector_store
from edunode.backend.rag.schemas import UploadResponse

logger = logging.getLogger(__name__)

def ingest_document(file_path: str, document_name: str, subject: str = None, grade: str = None, curriculum: str = None) -> UploadResponse:
    try:
        # Generate ID based on file name or a uuid
        base_name = Path(document_name).stem.lower().replace(" ", "_")
        document_id = f"{base_name}_{uuid.uuid4().hex[:6]}"
        
        # 1. Parse PDF
        pages_data = parse_pdf(file_path, document_id, document_name)
        
        # 2. Clean Text
        for page in pages_data:
            page["raw_text"] = clean_text(page.get("raw_text", ""))
            
        # 3. Chunk Document
        chunks = chunk_document(pages_data, document_id, document_name, subject, grade, curriculum)
        
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
        
        # 5. Add to FAISS Vector Store
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
