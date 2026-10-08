"""
FastAPI Router for Member 2 (Harini - AI / Gemma)
Prefix: /api/tutor

Endpoints:
  - POST /api/tutor/chat: Main conversational tutoring turn with misconception detection
  - GET  /api/tutor/graph/{student_id}: Knowledge Graph visualization payload for dashboard
  - POST /api/tutor/diagnose: Dedicated diagnostic evaluation for student statements
"""

from fastapi import APIRouter, HTTPException
from typing import Optional

from .schemas import (
    TutorRequest,
    TutorResponse,
    MisconceptionAnalysis,
    KnowledgeGraphResponse,
)
from .gemma_client import GemmaClient
from .misconception import MisconceptionDetector
from .adaptive_engine import AdaptiveEngine
from .knowledge_state import KnowledgeStateManager
from .knowledge_graph import KnowledgeGraph
from .prompts import SYSTEM_PROMPT_SOCRATIC_TUTOR, PROMPT_ADAPTIVE_RESPONSE
from ..rag.service import RAGService

router = APIRouter(prefix="/api/tutor", tags=["Tutor - Member 2 (AI/Gemma)"])

# Module service instances (injected / initialized)
_gemma_client = GemmaClient()
_misconception_detector = MisconceptionDetector(gemma_client=_gemma_client)
_adaptive_engine = AdaptiveEngine()
_knowledge_state_mgr = KnowledgeStateManager()
_knowledge_graph = KnowledgeGraph()
_rag_service = RAGService()


@router.post("/chat", response_model=TutorResponse)
async def chat_with_tutor(request: TutorRequest) -> TutorResponse:
    """Processes a student message through the end-to-end tutoring pipeline:
    1. Receive TutorRequest
    2. Detect misconception
    3. Update mastery
    4. Select adaptive teaching strategy
    5. Ask Gemma to generate the final tutor response
    6. Return TutorResponse
    """
    try:
        # Step 0: RAG Context Retrieval
        if not request.curriculum_context:
            request.curriculum_context = _rag_service.get_context(request.message, request.topic_id)

        # Step 1 & 2: Detect potential misconceptions in student input
        misconception: MisconceptionAnalysis = _misconception_detector.detect(
            message=request.message,
            topic_id=request.topic_id,
            curriculum_context=request.curriculum_context,
        )

        # Step 3: Infer & update student's knowledge state
        state_update = _knowledge_state_mgr.update_mastery(
            student_id=request.student_id,
            topic_id=request.topic_id,
            misconception_detected=misconception.detected,
            is_positive_step=not misconception.detected,
        )

        # Step 4: Select adaptive teaching strategy & recommendation
        action = _adaptive_engine.determine_action(
            misconception=misconception,
            current_mastery=state_update.new_mastery,
        )
        recommended_next = _adaptive_engine.recommend_next_step(
            topic_id=request.topic_id,
            current_mastery=state_update.new_mastery,
            misconception_detected=misconception.detected,
        )

        # Step 5: Ask Gemma to generate the final tutor response
        misconception_details = (
            f"Detected misconception '{misconception.misconception_type}': {misconception.explanation}"
            if misconception.detected
            else "None detected. Student reasoning appears sound."
        )

        adaptive_prompt = PROMPT_ADAPTIVE_RESPONSE.format(
            topic_id=request.topic_id,
            mastery_level=state_update.new_mastery,
            curriculum_context=request.curriculum_context or "Standard curriculum guidelines",
            pedagogical_action=action,
            misconception_details=misconception_details,
            message=request.message,
        )

        if request.language and request.language.lower() != "en":
            adaptive_prompt += (
                f"\n\nImportant: Respond in the student's chosen language: '{request.language}'."
            )

        if request.student_history:
            recent_turns = request.student_history[-4:]
            history_text = "\n".join(
                f"{turn.get('role', 'student').capitalize()}: {turn.get('content', '')}"
                for turn in recent_turns
            )
            adaptive_prompt = f"Recent Dialogue History:\n{history_text}\n\n" + adaptive_prompt

        response_text = _gemma_client.generate(
            prompt=adaptive_prompt,
            system_instruction=SYSTEM_PROMPT_SOCRATIC_TUTOR,
        )

        # Step 6: Return TutorResponse
        return TutorResponse(
            tutor_response=response_text,
            pedagogical_action=action,
            misconception_analysis=misconception,
            knowledge_state_update=state_update,
            recommended_next_step=recommended_next,
        )

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing tutor request: {str(exc)}",
        )


@router.get("/graph/{student_id}", response_model=KnowledgeGraphResponse)
async def get_student_knowledge_graph(student_id: str) -> KnowledgeGraphResponse:
    """Returns the student's knowledge graph state with node mastery and status,
    ready for Pavitra's dashboard visualization.
    """
    profile = _knowledge_state_mgr.get_student_profile(student_id)
    return _knowledge_graph.build_graph_response(
        student_id=student_id,
        student_mastery_map=profile.mastery_scores,
    )


@router.post("/diagnose", response_model=MisconceptionAnalysis)
async def diagnose_student_input(
    message: str,
    topic_id: str,
    curriculum_context: Optional[str] = None,
) -> MisconceptionAnalysis:
    """Direct diagnostic endpoint to isolate misconception detection without full tutoring turn."""
    return _misconception_detector.detect(
        message=message,
        topic_id=topic_id,
        curriculum_context=curriculum_context,
    )
