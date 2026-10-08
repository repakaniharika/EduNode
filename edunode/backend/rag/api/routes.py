import os
import shutil
import logging
from fastapi import APIRouter, File, UploadFile, HTTPException, Form
from typing import Optional, Literal
from edunode.backend.rag.schemas import (
    RetrievalRequest, 
    RetrievalResponse, 
    UploadResponse, 
    SupportedBoard, 
    SupportedGrade
)
from edunode.backend.rag.ingest import ingest_document
from edunode.backend.rag.retriever import retrieve
from edunode.backend.rag.concept_graph import concept_graph

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/upload", response_model=UploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    board: SupportedBoard = Form(...),
    grade: SupportedGrade = Form(...),
    subject: str = Form(...),
    medium: Optional[str] = Form(None),
    textbook: Optional[str] = Form(None),
    academic_year: Optional[str] = Form(None)
):
    """
    Uploads a curriculum PDF, extracts text, chunks it, embeds it,
    maps concepts, and stores it in FAISS with strict curriculum metadata.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    temp_path = f"temp_{file.filename}"
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        logger.info(f"Received document: {file.filename} for {board} Grade {grade} {subject}")
        response = ingest_document(
            file_path=temp_path,
            document_name=file.filename,
            board=board,
            grade=grade,
            subject=subject,
            medium=medium,
            textbook=textbook,
            academic_year=academic_year
        )
        
        if not response.success:
            raise HTTPException(status_code=500, detail=response.error)
            
        return response
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@router.post("/retrieve", response_model=RetrievalResponse)
async def retrieve_context(request: RetrievalRequest):
    """
    Retrieves strictly filtered curriculum context based on the student's board, grade, and subject.
    """
    try:
        response = retrieve(request)
        return response
    except Exception as e:
        logger.error(f"Retrieval error: {e}")
        raise HTTPException(status_code=500, detail="Failed to retrieve curriculum context.")

@router.get("/concepts/{concept_id}")
async def get_concept(concept_id: str):
    """Retrieves full details for a given concept."""
    details = concept_graph.get_concept_details(concept_id)
    if not details:
        raise HTTPException(status_code=404, detail="Concept not found.")
    return details

@router.get("/concepts/{concept_id}/prerequisites")
async def get_concept_prerequisites(concept_id: str):
    details = concept_graph.get_concept_details(concept_id)
    if not details:
        raise HTTPException(status_code=404, detail="Concept not found.")
    return {"concept_id": concept_id, "prerequisites": details.prerequisites}

@router.get("/concepts/{concept_id}/dependents")
async def get_concept_dependents(concept_id: str):
    details = concept_graph.get_concept_details(concept_id)
    if not details:
        raise HTTPException(status_code=404, detail="Concept not found.")
    return {"concept_id": concept_id, "dependents": details.dependents}

@router.get("/health")
async def health_check():
    return {"status": "ok", "service": "EduNode Member 3 - Curriculum RAG"}
