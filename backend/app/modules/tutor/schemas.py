"""
Pydantic schemas and data contracts for Member 2 (Harini - AI / Gemma).
Defines request/response models for tutoring, misconception diagnosis,
knowledge state tracking, and knowledge graph visualization.
"""

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


# ---------------------------------------------------------
# Misconception Models
# ---------------------------------------------------------
class MisconceptionAnalysis(BaseModel):
    """Details regarding any detected student cognitive gap or misconception."""
    detected: bool = Field(
        default=False,
        description="Whether a misconception was identified in the student response"
    )
    misconception_type: Optional[str] = Field(
        default=None,
        description="Categorical name or label of the misconception"
    )
    explanation: Optional[str] = Field(
        default=None,
        description="Pedagogical explanation of why this thinking is flawed"
    )
    severity: Optional[str] = Field(
        default=None,
        description="Severity level: 'minor_slip', 'conceptual', or 'prerequisite_gap'"
    )
    confidence: Optional[float] = Field(
        default=None,
        ge=0.0,
        le=1.0,
        description="Model confidence score between 0.0 and 1.0"
    )


# ---------------------------------------------------------
# Knowledge State Models
# ---------------------------------------------------------
class KnowledgeStateUpdate(BaseModel):
    """Represents an updated mastery score for a topic/concept."""
    topic_id: str = Field(..., description="Unique identifier for the topic")
    previous_mastery: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Mastery score before this interaction"
    )
    new_mastery: float = Field(
        ...,
        ge=0.0,
        le=1.0,
        description="Mastery score after evaluating this interaction"
    )
    delta: float = Field(
        default=0.0,
        description="Change in mastery (new_mastery - previous_mastery)"
    )
    status: str = Field(
        default="learning",
        description="Current status: 'struggling', 'learning', or 'mastered'"
    )


class StudentKnowledgeState(BaseModel):
    """Aggregate knowledge state profile for a student."""
    student_id: str
    mastery_scores: Dict[str, float] = Field(
        default_factory=dict,
        description="Mapping from topic_id to mastery score (0.0 to 1.0)"
    )
    active_misconceptions: List[str] = Field(
        default_factory=list,
        description="List of unresolved misconception types"
    )


# ---------------------------------------------------------
# Knowledge Graph Models
# ---------------------------------------------------------
class KnowledgeGraphNode(BaseModel):
    """A single topic node in the curriculum knowledge graph."""
    id: str = Field(..., description="Unique identifier for the node (e.g., 'linear_equations')")
    label: str = Field(..., description="Human-readable concept name")
    description: Optional[str] = Field(default=None, description="Brief description of the concept")
    mastery: float = Field(
        default=0.0,
        ge=0.0,
        le=1.0,
        description="Current mastery level of the student for this topic"
    )
    status: str = Field(
        default="locked",
        description="Learning status: 'locked', 'ready', 'struggling', 'learning', or 'mastered'"
    )


class KnowledgeGraphEdge(BaseModel):
    """A directed edge in the knowledge graph representing dependency."""
    source: str = Field(..., description="Prerequisite topic ID (source node)")
    target: str = Field(..., description="Dependent topic ID (target node)")
    relation: str = Field(
        default="prerequisite",
        description="Type of relationship (e.g., 'prerequisite', 'reinforces')"
    )


class KnowledgeGraphResponse(BaseModel):
    """Graph response payload formatted for frontend visualization (Pavitra's dashboard)."""
    student_id: str
    nodes: List[KnowledgeGraphNode]
    edges: List[KnowledgeGraphEdge]
    active_misconceptions: List[Dict[str, Any]] = Field(default_factory=list)


# ---------------------------------------------------------
# Tutor Request & Response Models
# ---------------------------------------------------------
class TutorRequest(BaseModel):
    """Incoming request to the Gemma AI tutor endpoint."""
    student_id: str = Field(..., description="Identifier for the student")
    topic_id: str = Field(..., description="Current topic being studied")
    message: str = Field(..., description="The student's question, response, or statement")
    curriculum_context: Optional[str] = Field(
        default=None,
        description="Retrieved curriculum or syllabus excerpt from Daphna's RAG module"
    )
    language: str = Field(
        default="en",
        description="Language code for the interaction (e.g., 'en', 'ta', 'hi')"
    )
    student_history: Optional[List[Dict[str, str]]] = Field(
        default=None,
        description="Recent conversation turns: [{'role': 'user'|'assistant', 'content': '...'}]"
    )


class TutorResponse(BaseModel):
    """Response payload returned by the Gemma AI tutor."""
    tutor_response: str = Field(
        ...,
        description="Pedagogical response generated by the Gemma AI tutor"
    )
    pedagogical_action: str = Field(
        default="socratic_question",
        description="Action chosen: 'socratic_question', 'clarification', 'counter_example', 'advance', etc."
    )
    misconception_analysis: Optional[MisconceptionAnalysis] = Field(
        default=None,
        description="Diagnostic results of misconception analysis"
    )
    knowledge_state_update: Optional[KnowledgeStateUpdate] = Field(
        default=None,
        description="Updated student mastery for the active topic"
    )
    recommended_next_step: Optional[str] = Field(
        default=None,
        description="Next topic or review task recommended by the Knowledge Graph"
    )
