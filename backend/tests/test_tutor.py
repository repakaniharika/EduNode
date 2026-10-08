"""
Unit Tests for Member 2: Harini (AI / Gemma)
Tests schema integrity, knowledge graph prerequisite chains,
misconception detection heuristics, adaptive engine, knowledge state manager,
and the end-to-end /api/tutor/chat pipeline.
"""

import unittest
import asyncio
import sys
import os

# Add parent directory to sys.path so backend modules can be imported
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.modules.tutor.schemas import (
    TutorRequest,
    TutorResponse,
    MisconceptionAnalysis,
    KnowledgeStateUpdate,
    KnowledgeGraphResponse,
)
from app.modules.tutor.knowledge_graph import KnowledgeGraph
from app.modules.tutor.knowledge_state import KnowledgeStateManager
from app.modules.tutor.misconception import MisconceptionDetector
from app.modules.tutor.adaptive_engine import AdaptiveEngine
from app.modules.tutor.gemma_client import GemmaClient
from app.modules.tutor.router import chat_with_tutor


class TestTutorSchemas(unittest.TestCase):
    """Verifies that Pydantic schemas validate correctly."""

    def test_tutor_request_creation(self):
        req = TutorRequest(
            student_id="student_1",
            topic_id="linear_equations",
            message="How do I solve 2x + 5 = 15?",
        )
        self.assertEqual(req.student_id, "student_1")
        self.assertEqual(req.topic_id, "linear_equations")
        self.assertEqual(req.language, "en")
        self.assertIsNone(req.curriculum_context)

    def test_tutor_response_creation(self):
        res = TutorResponse(
            tutor_response="Subtract 5 from both sides first.",
            pedagogical_action="socratic_question",
        )
        self.assertEqual(res.pedagogical_action, "socratic_question")
        self.assertIsNone(res.misconception_analysis)


class TestKnowledgeGraph(unittest.TestCase):
    """Verifies prerequisite chain: Variables -> Expressions -> Linear Equations -> Quadratic Equations."""

    def setUp(self):
        self.kg = KnowledgeGraph()

    def test_prerequisite_chain(self):
        # 'variables' is prerequisite to 'expressions'
        self.assertEqual(self.kg.get_prerequisites("expressions"), ["variables"])

        # 'expressions' is prerequisite to 'linear_equations'
        self.assertEqual(self.kg.get_prerequisites("linear_equations"), ["expressions"])

        # 'linear_equations' is prerequisite to 'quadratic_equations'
        self.assertEqual(self.kg.get_prerequisites("quadratic_equations"), ["linear_equations"])

    def test_graph_response_generation(self):
        mastery_map = {
            "variables": 0.90,
            "expressions": 0.75,
            "linear_equations": 0.40,
        }
        res: KnowledgeGraphResponse = self.kg.build_graph_response(
            student_id="test_student",
            student_mastery_map=mastery_map,
        )
        self.assertEqual(res.student_id, "test_student")
        self.assertEqual(len(res.nodes), 4)

        # Check node statuses based on mastery
        node_status_by_id = {node.id: node.status for node in res.nodes}
        self.assertEqual(node_status_by_id["variables"], "mastered")
        self.assertEqual(node_status_by_id["expressions"], "learning")
        self.assertEqual(node_status_by_id["linear_equations"], "struggling")


class TestMisconceptionDetector(unittest.TestCase):
    """Verifies misconception detection heuristics and fallback."""

    def setUp(self):
        self.detector = MisconceptionDetector()

    def test_detects_known_algebra_misconception(self):
        analysis = self.detector.detect(
            message="I can combine 2x and 3 to get 5x",
            topic_id="expressions",
        )
        self.assertTrue(analysis.detected)
        self.assertEqual(analysis.misconception_type, "combining_unlike_terms")

    def test_clean_input_returns_no_misconception(self):
        analysis = self.detector.detect(
            message="I subtracted 5 from both sides",
            topic_id="linear_equations",
        )
        self.assertFalse(analysis.detected)


class TestAdaptiveEngine(unittest.TestCase):
    """Verifies adaptive pedagogical policy selection."""

    def setUp(self):
        self.engine = AdaptiveEngine()

    def test_counter_example_on_misconception(self):
        misconception = MisconceptionAnalysis(
            detected=True,
            misconception_type="equals_sign_as_action",
            severity="conceptual",
        )
        action = self.engine.determine_action(misconception=misconception, current_mastery=0.5)
        self.assertEqual(action, "counter_example")

    def test_advance_challenge_on_high_mastery(self):
        action = self.engine.determine_action(misconception=None, current_mastery=0.9)
        self.assertEqual(action, "advance_challenge")

    def test_simpler_analogy_on_struggling_student(self):
        action = self.engine.determine_action(misconception=None, current_mastery=0.3)
        self.assertEqual(action, "simpler_analogy")


class TestKnowledgeStateManager(unittest.TestCase):
    """Verifies knowledge state updates and penalties."""

    def setUp(self):
        self.mgr = KnowledgeStateManager()

    def test_mastery_penalty_on_misconception(self):
        update = self.mgr.update_mastery(
            student_id="student_1",
            topic_id="variables",
            misconception_detected=True,
        )
        # Default 0.5 - 0.15 = 0.35
        self.assertLess(update.new_mastery, update.previous_mastery)
        self.assertEqual(update.status, "struggling")

    def test_mastery_increase_on_positive_step(self):
        update = self.mgr.update_mastery(
            student_id="student_1",
            topic_id="variables",
            misconception_detected=False,
            is_positive_step=True,
        )
        # Default 0.5 + 0.10 = 0.60
        self.assertGreater(update.new_mastery, update.previous_mastery)
        self.assertEqual(update.status, "learning")


class TestGemmaClient(unittest.TestCase):
    """Verifies client fallback and JSON diagnosis."""

    def test_fallback_placeholder_generation(self):
        client = GemmaClient()
        response = client.generate("Hello tutor")
        self.assertIn("Placeholder", response)

    def test_diagnose_misconception_returns_valid_model(self):
        client = GemmaClient()
        analysis = client.diagnose_misconception("Is x always 1?", "variables")
        self.assertIsInstance(analysis, MisconceptionAnalysis)


class TestChatPipeline(unittest.TestCase):
    """Verifies the complete 6-step pipeline in POST /api/tutor/chat."""

    def test_pipeline_with_misconception(self):
        req = TutorRequest(
            student_id="student_101",
            topic_id="expressions",
            message="I think 2x + 3 is 5x because we can combine them.",
            curriculum_context="NCERT Grade 7: Unlike terms cannot be added together.",
        )
        response = asyncio.run(chat_with_tutor(req))

        self.assertIsInstance(response, TutorResponse)
        self.assertTrue(response.misconception_analysis.detected)
        self.assertEqual(response.misconception_analysis.misconception_type, "combining_unlike_terms")
        self.assertEqual(response.pedagogical_action, "counter_example")
        self.assertEqual(response.knowledge_state_update.status, "struggling")
        self.assertIsNotNone(response.tutor_response)


if __name__ == "__main__":
    unittest.main()
