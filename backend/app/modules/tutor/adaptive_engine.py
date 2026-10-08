"""
Adaptive Teaching Engine
Member 2: Harini (AI / Gemma)

Dynamically selects the next pedagogical strategy (scaffolding, counter-example,
simpler analogy, or challenge advancement) based on student mastery and misconceptions.
"""

from typing import Optional
from .schemas import MisconceptionAnalysis


class AdaptiveEngine:
    """Calculates pedagogical actions to personalize the tutoring conversation."""

    def __init__(self):
        # Pedagogical thresholds
        self.mastery_advance_threshold = 0.80
        self.mastery_struggling_threshold = 0.50

    def determine_action(
        self,
        misconception: Optional[MisconceptionAnalysis] = None,
        current_mastery: float = 0.5,
    ) -> str:
        """Determines the next pedagogical action for the Gemma tutor.
        
        Available actions:
          - 'counter_example': If a misconception is present, guide through contradiction
          - 'simpler_analogy': If student is struggling without a clear misconception
          - 'socratic_question': Standard guided discovery
          - 'step_down_remedial': Drop to prerequisite foundational concept
          - 'advance_challenge': Student has mastered the concept, increase difficulty
        """
        # Case 1: Misconception detected -> prompt cognitive dissonance / counter-example
        if misconception and misconception.detected:
            if misconception.severity == "prerequisite_gap":
                return "step_down_remedial"
            return "counter_example"

        # Case 2: High mastery -> challenge with deeper application
        if current_mastery >= self.mastery_advance_threshold:
            return "advance_challenge"

        # Case 3: Low mastery / struggling -> simplify explanation
        if current_mastery < self.mastery_struggling_threshold:
            return "simpler_analogy"

        # Default action: gentle Socratic inquiry
        return "socratic_question"

    def recommend_next_step(
        self,
        topic_id: str,
        current_mastery: float,
        misconception_detected: bool,
    ) -> Optional[str]:
        """Suggests the next recommended activity or topic transition.
        
        TODO: Interface with KnowledgeGraph to locate the next optimal node or remedial review.
        """
        if misconception_detected:
            return f"Review foundational concept behind '{topic_id}'"

        if current_mastery >= self.mastery_advance_threshold:
            return f"Advance to next topic in curriculum sequence"

        return f"Continue practice on '{topic_id}'"
