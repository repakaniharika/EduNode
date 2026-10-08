"""
Misconception Detection Engine
Member 2: Harini (AI / Gemma)

Identifies conceptual misunderstandings, flawed mental models, and procedural slips
in student responses against curriculum standards.
Combines high-reliability rule-based diagnosis with Gemma zero-shot LLM evaluation.
"""

import re
from typing import Optional, Dict, Any
from .schemas import MisconceptionAnalysis
from .gemma_client import GemmaClient


class MisconceptionDetector:
    """Detects student misconceptions using reliable pedagogical rules and Gemma LLM diagnosis."""

    def __init__(self, gemma_client: Optional[GemmaClient] = None):
        self.gemma_client = gemma_client or GemmaClient()

    def detect(
        self,
        message: str,
        topic_id: str,
        curriculum_context: Optional[str] = None,
    ) -> MisconceptionAnalysis:
        """Analyzes a student statement to identify any misconception."""
        # Step 1: High-reliability deterministic rule checks (works with or without API key)
        rule_result = self._check_algebra_rules(message, topic_id)
        if rule_result is not None:
            return rule_result

        # Step 2: Query Gemma model diagnostic endpoint (if configured and available)
        if self.gemma_client.is_configured():
            try:
                raw_diag = self.gemma_client.diagnose_misconception_raw(
                    message=message,
                    topic_id=topic_id,
                    curriculum_context=curriculum_context,
                )
                if raw_diag.get("detected"):
                    return MisconceptionAnalysis(**raw_diag)
            except Exception:
                pass

        # Step 3: Default clean result when no misconception is detected
        return MisconceptionAnalysis(
            detected=False,
            misconception_type=None,
            explanation=None,
            severity=None,
            confidence=0.0,
        )

    @classmethod
    def _check_algebra_rules(cls, message: str, topic_id: str) -> Optional[MisconceptionAnalysis]:
        """Deterministic heuristic rules for common algebra misconceptions."""
        normalized = message.lower().strip()
        normalized_compact = re.sub(r"\s+", "", normalized)

        # -------------------------------------------------------------
        # 1. Equation Balancing: e.g. "2x + 5 = 15, so x = 20"
        # -------------------------------------------------------------
        # Direct check for 2x + 5 = 15 resulting in 20 (adding 5 instead of subtracting)
        has_eq_2x_5_15 = (
            "2x+5=15" in normalized_compact
            or ("2x" in normalized and "+ 5" in normalized and "= 15" in normalized)
            or ("2x + 5 = 15" in normalized)
        )
        has_result_20 = (
            "20" in normalized
            or "x=20" in normalized_compact
            or "x = 20" in normalized
            or "2x = 20" in normalized
        )

        if has_eq_2x_5_15 and has_result_20:
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="equation_balancing",
                explanation="Student failed to apply the inverse operation to maintain equation balance (added 5 to 15 to get 20 instead of subtracting 5 from both sides).",
                severity="conceptual",
                confidence=0.95,
            )

        # Generalized equation balancing: ax + b = c resulting in c + b instead of c - b
        eq_match = re.search(r"(\d*)x\s*([+-])\s*(\d+)\s*=\s*(\d+)", normalized)
        if eq_match:
            coeff_str, sign, b_str, c_str = eq_match.groups()
            b = int(b_str)
            c = int(c_str)
            wrong_target = c + b if sign == "+" else c - b
            if str(wrong_target) in normalized or f"={wrong_target}" in normalized_compact:
                op_performed = "added" if sign == "+" else "subtracted"
                op_needed = "subtracting" if sign == "+" else "adding"
                return MisconceptionAnalysis(
                    detected=True,
                    misconception_type="equation_balancing",
                    explanation=f"Student {op_performed} {b} across the '=' sign resulting in {wrong_target} instead of {op_needed} {b} from both sides to maintain equality.",
                    severity="conceptual",
                    confidence=0.95,
                )

        # General equation balancing keywords
        if any(kw in normalized for kw in ["only on one side", "didn't subtract from both", "change side change sign"]):
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="equation_balancing",
                explanation="Student exhibits confusion regarding balancing operations across both sides of an equation.",
                severity="conceptual",
                confidence=0.90,
            )

        # -------------------------------------------------------------
        # 2. Combining Unlike Terms: e.g. 2x + 3 = 5x
        # -------------------------------------------------------------
        unlike_pattern = re.search(r"(\d+)x\s*\+\s*(\d+)\s*(?:=|is|gives|combine\s*to\s*get)\s*(\d+)x", normalized)
        if unlike_pattern:
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="combining_unlike_terms",
                explanation="Student erroneously combined a variable term and a constant term into a single variable term.",
                severity="conceptual",
                confidence=0.92,
            )

        if "combine" in normalized and ("2x and 3" in normalized or "unlike" in normalized or "2x + 3" in normalized):
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="combining_unlike_terms",
                explanation="Student treats unlike terms as combinable quantities (e.g., treating 2x + 3 as 5x).",
                severity="conceptual",
                confidence=0.90,
            )

        # -------------------------------------------------------------
        # 3. Equals Sign as Action (Arithmetic operator vs equivalence)
        # -------------------------------------------------------------
        if any(phrase in normalized for phrase in ["equals means calculate", "equals means the answer", "equals means what comes next"]):
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="equals_sign_as_action",
                explanation="Student views the '=' sign as an operator meaning 'calculate the answer' rather than expressing an equivalence relationship.",
                severity="conceptual",
                confidence=0.88,
            )

        # -------------------------------------------------------------
        # 4. Variable as Abbreviation / Static Letter
        # -------------------------------------------------------------
        if any(phrase in normalized for phrase in ["x is just a letter", "variable is just an abbreviation", "x means multiplication", "x is always 1"]):
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="variable_as_abbreviation",
                explanation="Student views the variable as an object abbreviation or static label rather than a placeholder for a varying numerical value.",
                severity="conceptual",
                confidence=0.88,
            )

        # -------------------------------------------------------------
        # 5. Negative Sign Distribution
        # -------------------------------------------------------------
        if ("-(x + " in normalized or "-(x+" in normalized_compact) and "+ " in normalized:
            return MisconceptionAnalysis(
                detected=True,
                misconception_type="negative_distribution",
                explanation="Student failed to distribute the negative sign across all terms inside the parentheses.",
                severity="conceptual",
                confidence=0.90,
            )

        return None
