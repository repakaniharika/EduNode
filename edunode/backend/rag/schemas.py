from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field, field_validator
from edunode.backend.rag.config import DEFAULT_TOP_K, MAX_TOP_K

# Supported Enums using Literal for validation
SupportedBoard = Literal["cbse", "tamil_nadu", "kerala", "andhra_pradesh", "telangana"]
SupportedGrade = Literal[6, 7, 8, 9, 10, 11, 12]

# --- Core RAG Schemas ---

class CurriculumChunk(BaseModel):
    chunk_id: str
    document_id: str
    document_name: str
    
    board: SupportedBoard
    grade: SupportedGrade
    subject: str = Field(min_length=1)
    
    medium: Optional[str] = None
    textbook: Optional[str] = None
    academic_year: Optional[str] = None
    
    chapter: Optional[str] = None
    section: Optional[str] = None
    
    page_start: int
    page_end: int
    
    concept_ids: List[str] = Field(default_factory=list)
    text: str

class CurriculumDocument(BaseModel):
    document_id: str
    document_name: str
    
    board: SupportedBoard
    grade: SupportedGrade
    subject: str = Field(min_length=1)
    
    medium: Optional[str] = None
    textbook: Optional[str] = None
    academic_year: Optional[str] = None
    
    chunks: List[CurriculumChunk] = Field(default_factory=list)

# --- Concept Graph Schemas ---

class CurriculumMapping(BaseModel):
    board: SupportedBoard
    grade: SupportedGrade
    subject: str = Field(min_length=1)
    chapter: str

class Concept(BaseModel):
    concept_id: str
    name: str
    description: str
    curriculum_mappings: List[CurriculumMapping] = Field(default_factory=list)

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
    name: str = ""
    score: float

# --- API Request/Response Schemas ---

class RetrievalRequest(BaseModel):
    query: str
    board: SupportedBoard
    grade: SupportedGrade
    subject: str = Field(min_length=1)
    medium: Optional[str] = None
    textbook: Optional[str] = None
    academic_year: Optional[str] = None
    chapter: Optional[str] = None
    document_id: Optional[str] = None
    top_k: int = Field(default=DEFAULT_TOP_K, ge=1, le=MAX_TOP_K)

class RetrievalResult(BaseModel):
    text: str
    score: float
    document_id: str
    document_name: str
    board: str
    grade: int
    subject: str
    chapter: Optional[str] = None
    page_start: Optional[int] = None
    page_end: Optional[int] = None
    concept_ids: List[str] = Field(default_factory=list)

class CurriculumMetadata(BaseModel):
    board: str
    grade: int
    subject: str
    medium: Optional[str] = None

class RetrievalResponse(BaseModel):
    query: str
    curriculum_metadata: CurriculumMetadata
    results: List[RetrievalResult]
    concepts: List[ConceptMatch]
    concept_context: List[ConceptDetails] = Field(default_factory=list)
    context: str

class UploadResponse(BaseModel):
    success: bool
    document_id: Optional[str] = None
    document_name: Optional[str] = None
    chunks_created: int = 0
    status: str
    error: Optional[str] = None
