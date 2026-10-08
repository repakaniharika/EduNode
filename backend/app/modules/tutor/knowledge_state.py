"""
Student Knowledge-State Inference Engine
Member 2: Harini (AI / Gemma)

Tracks and infers student mastery level per concept topic, adapting scores based
on correctness, cognitive misconceptions, and learning progression.
"""

from typing import Dict, Tuple, Optional
from .schemas import KnowledgeStateUpdate, StudentKnowledgeState


class KnowledgeStateManager:
    """Manages real-time mastery scores and state inference for students.
    
    TODO: Connect to database storage (e.g., PostgreSQL / SQLite) for persistent student tracking.
    """

    def __init__(self):
        # In-memory store: (student_id, topic_id) -> mastery (0.0 to 1.0)
        self._state_store: Dict[Tuple[str, str], float] = {}

    def get_mastery(self, student_id: str, topic_id: str) -> float:
        """Returns the current mastery score for a given student and topic.
        
        Defaults to baseline 0.5 (in-progress) for newly introduced topics.
        """
        return self._state_store.get((student_id, topic_id), 0.5)

    def update_mastery(
        self,
        student_id: str,
        topic_id: str,
        misconception_detected: bool = False,
        is_positive_step: bool = True,
    ) -> KnowledgeStateUpdate:
        """Calculates updated mastery following a learning interaction.
        
        TODO: Implement Bayesian Knowledge Tracing (BKT) or Elo-based skill rating.
        """
        prev_mastery = self.get_mastery(student_id, topic_id)

        # Basic state transition logic
        if misconception_detected:
            # Cognitive misconception penalizes mastery more heavily
            new_mastery = max(0.0, round(prev_mastery - 0.15, 2))
        elif is_positive_step:
            # Steady progress incrementally boosts mastery
            new_mastery = min(1.0, round(prev_mastery + 0.10, 2))
        else:
            new_mastery = prev_mastery

        # Save to store
        self._state_store[(student_id, topic_id)] = new_mastery
        delta = round(new_mastery - prev_mastery, 2)

        # Categorize status
        if new_mastery >= 0.80:
            status = "mastered"
        elif new_mastery < 0.50:
            status = "struggling"
        else:
            status = "learning"

        return KnowledgeStateUpdate(
            topic_id=topic_id,
            previous_mastery=prev_mastery,
            new_mastery=new_mastery,
            delta=delta,
            status=status,
        )

    def get_student_profile(self, student_id: str) -> StudentKnowledgeState:
        """Retrieves all tracked topics and active misconceptions for a student."""
        scores = {
            topic: score
            for (s_id, topic), score in self._state_store.items()
            if s_id == student_id
        }
        return StudentKnowledgeState(
            student_id=student_id,
            mastery_scores=scores,
            active_misconceptions=[],
        )
