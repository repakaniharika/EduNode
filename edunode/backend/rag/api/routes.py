import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from edunode.backend.rag.schemas import (
    RetrievalRequest,
    RetrievalResponse,
    UploadResponse,
    ConceptDetails,
    ConceptMatch
)
from edunode.backend.rag.ingest import ingest_document
from edunode.backend.rag.retriever import retrieve
from edunode.backend.rag.concept_graph import concept_graph
from edunode.backend.rag.config import SOURCES_DIR
from typing import List

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "healthy", "module": "member3_rag"}

@router.post("/upload", response_model=UploadResponse)
async def upload_document(
    file: UploadFile = File(...),
    grade: str = Form(None),
    subject: str = Form(None),
    curriculum: str = Form(None)
):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are currently supported.")
        
    file_path = SOURCES_DIR / file.filename
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    response = ingest_document(
        file_path=str(file_path),
        document_name=file.filename,
        subject=subject,
        grade=grade,
        curriculum=curriculum
    )
    
    if not response.success:
        raise HTTPException(status_code=500, detail=response.error)
        
    return response

@router.post("/retrieve", response_model=RetrievalResponse)
async def retrieve_context(request: RetrievalRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    
    return retrieve(request)

@router.get("/concepts/{concept_id}", response_model=ConceptDetails)
async def get_concept(concept_id: str):
    details = concept_graph.get_concept_details(concept_id)
    if not details:
        raise HTTPException(status_code=404, detail=f"Concept {concept_id} not found.")
    return details

@router.get("/concepts/{concept_id}/prerequisites", response_model=List[str])
async def get_concept_prerequisites(concept_id: str):
    details = concept_graph.get_concept_details(concept_id)
    if not details:
        raise HTTPException(status_code=404, detail=f"Concept {concept_id} not found.")
    return details.prerequisites

@router.get("/concepts/{concept_id}/dependents", response_model=List[str])
async def get_concept_dependents(concept_id: str):
    details = concept_graph.get_concept_details(concept_id)
    if not details:
        raise HTTPException(status_code=404, detail=f"Concept {concept_id} not found.")
    return details.dependents
    
@router.post("/concepts/map", response_model=List[ConceptMatch])
async def map_query_to_concepts(query: str):
    if not query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")
    return concept_graph.map_query_to_concepts(query)
