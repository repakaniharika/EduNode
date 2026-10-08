"""
Tutor Module - EduNode
Member 2: Harini (AI / Gemma)

Responsibilities:
1. Gemma AI tutor orchestration
2. Misconception detection
3. Adaptive teaching engine
4. Student knowledge-state inference
5. Student Knowledge Graph intelligence
"""

from .schemas import (
    TutorRequest,
    TutorResponse,
    MisconceptionAnalysis,
    KnowledgeStateUpdate,
    KnowledgeGraphNode,
    KnowledgeGraphEdge,
    KnowledgeGraphResponse,
)
from .gemma_client import GemmaClient
from .misconception import MisconceptionDetector
from .adaptive_engine import AdaptiveEngine
from .knowledge_state import KnowledgeStateManager
from .knowledge_graph import KnowledgeGraph
from .router import router

__all__ = [
    "TutorRequest",
    "TutorResponse",
    "MisconceptionAnalysis",
    "KnowledgeStateUpdate",
    "KnowledgeGraphNode",
    "KnowledgeGraphEdge",
    "KnowledgeGraphResponse",
    "GemmaClient",
    "MisconceptionDetector",
    "AdaptiveEngine",
    "KnowledgeStateManager",
    "KnowledgeGraph",
    "router",
]
