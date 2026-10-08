from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Core RAG Schemas ---

class CurriculumChunk(BaseModel):
    chunk_id: str
    document_id: str
    document_name: str
    subject: Optional[str] = None
    grade: Optional[str] = None
    chapter: Optional[str] = None
    section: Optional[str] = None
    page_start: Optional[int] = None
    page_end: Optional[int] = None
    concept_ids: List[str] = Field(default_factory=list)
    text: str

class CurriculumDocument(BaseModel):
    document_id: str
    document_name: str
    subject: Optional[str] = None
    grade: Optional[str] = None
    curriculum: Optional[str] = None
    chunks: List[CurriculumChunk] = Field(default_factory=list)

# --- Concept Graph Schemas ---

class Concept(BaseModel):
    concept_id: str
    name: str
    subject: Optional[str] = None
    grade: Optional[str] = None
    description: str
    source_documents: List[str] = Field(default_factory=list)

class ConceptRelationship(BaseModel):
    source: str
    target: str
    relation: str

class ConceptDetails(BaseModel):
    concept_id: str
    name: str
    prerequisites: List[str] = Field(default_factory=list)
    dependents: List[str] = Field(default_factory=list)
    related: List[str] = Field(default_factory=list)

class ConceptMatch(BaseModel):
    concept_id: str
    score: float

# --- API Request/Response Schemas ---

class RetrievalRequest(BaseModel):
    query: str
    grade: Optional[str] = None
    subject: Optional[str] = None
    curriculum: Optional[str] = None
    top_k: int = 5

class RetrievalResult(BaseModel):
    text: str
    score: float
    document: str
    chapter: Optional[str] = None
    section: Optional[str] = None
    page: Optional[int] = None
    concept_ids: List[str] = Field(default_factory=list)

class RetrievalResponse(BaseModel):
    query: str
    results: List[RetrievalResult]
    context: str
    concepts: List[ConceptMatch]

class UploadResponse(BaseModel):
    success: bool
    document_id: Optional[str] = None
    document_name: Optional[str] = None
    chunks_created: int = 0
    status: str
    error: Optional[str] = None
