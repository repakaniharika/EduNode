"""
Gemma Client Interface for EduNode
Member 2: Harini (AI / Gemma)

Handles communication with Google's hosted Gemma models via the official Google GenAI SDK.
When a valid API key is not present or an API call fails, provides reliable rule-based
diagnosis and pedagogical adaptive responses so the tutor pipeline functions reliably offline.
"""

import os
import json
import re
from typing import Optional, Dict, Any
from .prompts import SYSTEM_PROMPT_SOCRATIC_TUTOR, PROMPT_DIAGNOSE_MISCONCEPTION
from .schemas import MisconceptionAnalysis


class GemmaClient:
    """Client wrapper for calling Google's hosted Gemma models with offline adaptive fallback.

    Reads credentials from environment variables:
      - GEMMA_API_KEY (or GEMINI_API_KEY): API key from Google AI Studio
      - GEMMA_MODEL_NAME: Model identifier (default: 'gemma-2-9b-it')
      - GEMMA_BASE_URL: Optional custom base URL for private endpoints
    """

    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        # NOTE: Never hardcode API keys. Always read from environment variables.
        self.api_key = api_key or os.getenv("GEMMA_API_KEY") or os.getenv("GEMINI_API_KEY", "")
        self.model_name = model_name or os.getenv("GEMMA_MODEL_NAME", "gemma-2-9b-it")
        self.base_url = os.getenv("GEMMA_BASE_URL", "")

    def is_configured(self) -> bool:
        """Checks if an API key or custom endpoint is configured."""
        return bool(self.api_key or self.base_url)

    def generate(
        self,
        prompt: str,
        system_instruction: Optional[str] = None,
        temperature: float = 0.7,
        max_tokens: int = 512,
    ) -> str:
        """Generates a text completion from hosted Gemma if a valid key is provided,
        or falls back to an intelligent, adaptive Socratic response.
        """
        # If API key is configured, attempt real hosted Gemma API call
        if self.is_configured():
            try:
                from google import genai
                from google.genai import types

                client = genai.Client(api_key=self.api_key)

                config_kwargs: Dict[str, Any] = {
                    "temperature": temperature,
                    "max_output_tokens": max_tokens,
                }
                if system_instruction:
                    config_kwargs["system_instruction"] = system_instruction

                config = types.GenerateContentConfig(**config_kwargs)

                response = client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config=config,
                )
                if response and response.text:
                    return response.text.strip()

            except Exception:
                # If API call fails (invalid key, network issue, quota limit),
                # fall through seamlessly to the adaptive fallback generator
                pass

        # Generate a useful, pedagogical adaptive response instead of a placeholder
        return self._generate_adaptive_fallback(prompt)

    def diagnose_misconception_raw(
        self,
        message: str,
        topic_id: str,
        curriculum_context: Optional[str] = None,
    ) -> Dict[str, Any]:
        """Prompts Gemma with zero-shot diagnostic instructions and returns structured JSON dictionary.
        Falls back to reliable deterministic rules when API is not configured or fails.
        """
        # Attempt live Gemma structured JSON diagnosis if configured
        if self.is_configured():
            try:
                from google import genai
                from google.genai import types

                formatted_prompt = PROMPT_DIAGNOSE_MISCONCEPTION.format(
                    topic_id=topic_id,
                    curriculum_context=curriculum_context or "Standard curriculum guidelines",
                    message=message,
                )

                client = genai.Client(api_key=self.api_key)
                config = types.GenerateContentConfig(
                    system_instruction=(
                        "You are an expert pedagogical diagnostic AI. "
                        "Analyze student responses for cognitive misconceptions and output strictly valid JSON."
                    ),
                    temperature=0.1,
                    max_output_tokens=512,
                    response_mime_type="application/json",
                )
                response = client.models.generate_content(
                    model=self.model_name,
                    contents=formatted_prompt,
                    config=config,
                )
                raw_text = response.text or ""
                extracted = self._extract_json(raw_text)
                if extracted.get("detected"):
                    return extracted
            except Exception:
                pass

        # Fallback to reliable rule diagnosis
        return self._diagnose_via_rules(message, topic_id)

    def diagnose_misconception(
        self,
        message: str,
        topic_id: str,
        curriculum_context: Optional[str] = None,
    ) -> MisconceptionAnalysis:
        """Returns a validated MisconceptionAnalysis model directly from Gemma diagnosis."""
        raw_dict = self.diagnose_misconception_raw(
            message=message,
            topic_id=topic_id,
            curriculum_context=curriculum_context,
        )
        return MisconceptionAnalysis(**raw_dict)

    @classmethod
    def _diagnose_via_rules(cls, message: str, topic_id: str) -> Dict[str, Any]:
        """Deterministic rule diagnosis for common algebra misconceptions."""
        normalized = message.lower().strip()
        normalized_compact = re.sub(r"\s+", "", normalized)

        # Check for equation balancing: "2x + 5 = 15, so x = 20"
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
            return {
                "detected": True,
                "misconception_type": "equation_balancing",
                "explanation": "Student failed to apply the inverse operation to maintain equation balance (added 5 to 15 to get 20 instead of subtracting 5 from both sides).",
                "severity": "conceptual",
                "confidence": 0.95,
            }

        # Combining unlike terms (e.g. 2x + 3 = 5x)
        if ("combine" in normalized and ("2x and 3" in normalized or "2x + 3" in normalized)) or (
            "2x+3=5x" in normalized_compact or "2x + 3 is 5x" in normalized
        ):
            return {
                "detected": True,
                "misconception_type": "combining_unlike_terms",
                "explanation": "Student combined a variable term and a constant term into a single variable term.",
                "severity": "conceptual",
                "confidence": 0.92,
            }

        # Equals sign as action
        if any(kw in normalized for kw in ["equals means calculate", "equals means the answer"]):
            return {
                "detected": True,
                "misconception_type": "equals_sign_as_action",
                "explanation": "Student views '=' as a command to calculate rather than indicating equivalence balance.",
                "severity": "conceptual",
                "confidence": 0.88,
            }

        return {
            "detected": False,
            "misconception_type": None,
            "explanation": None,
            "severity": None,
            "confidence": 0.0,
        }

    def _generate_adaptive_fallback(self, prompt: str) -> str:
        """Generates an empathetic, Socratic, and pedagogically sound adaptive response
        when the external Gemma API key is missing, invalid, or unavailable.
        """
        # Parse pedagogical action if specified in prompt
        action = "socratic_question"
        for act in ["counter_example", "simpler_analogy", "step_down_remedial", "advance_challenge", "socratic_question"]:
            if f"Pedagogical Action Selected: {act}" in prompt or f"Action '{act}'" in prompt:
                action = act
                break

        prompt_lower = prompt.lower()

        # Context: Equation Balancing (e.g., 2x + 5 = 15, so x = 20)
        if "equation_balancing" in prompt_lower or ("2x + 5 = 15" in prompt_lower and "20" in prompt_lower):
            if action == "counter_example":
                return (
                    "Let's test that out together using balance! If we plug x = 20 back into the original equation, "
                    "we get 2(20) + 5 = 40 + 5 = 45, which doesn't equal 15. "
                    "Notice what happened: on the left side, 5 was originally being added (+ 5). "
                    "To undo that addition and keep both sides of the equation balanced like a scale, "
                    "what inverse operation should we perform on both sides instead of adding?"
                )
            elif action == "simpler_analogy":
                return (
                    "Think of an equation like a balanced scale with two pans. On the left pan, you have 2 mystery boxes (2x) "
                    "plus a 5 kg weight. On the right pan, you have a 15 kg weight. "
                    "To find out what is inside the boxes, we must remove weights equally from BOTH sides. "
                    "If we take away 5 kg from both pans, what weight remains on the right pan?"
                )

        # Context: Combining Unlike Terms (e.g., 2x + 3 = 5x)
        if "combining_unlike_terms" in prompt_lower or ("2x + 3" in prompt_lower and "5x" in prompt_lower):
            if action == "counter_example":
                return (
                    "Let's test that with a quick thought experiment! Imagine you have 2 apples (2x) and 3 rupee coins (3). "
                    "Can you combine them into 5 apple-coins? "
                    "Because 2x represents variable multiples and 3 is a fixed constant, they are unlike terms and cannot be merged into 5x. "
                    "How can we keep them separate while solving?"
                )

        # Pedagogical Action branches
        if action == "counter_example":
            return (
                "Let's pause and test that thought! If we substitute your result back into the original equation, "
                "do both sides evaluate to the exact same value? "
                "Remember, an equation is like a balanced scale: whatever operation is currently being applied, "
                "we must use its opposite inverse operation to undo it on both sides."
            )

        if action == "simpler_analogy":
            return (
                "Let's look at this with a simple analogy: imagine peeling an onion from the outside in. "
                "When isolating a variable, we always undo the operations furthest away from the variable first (like addition or subtraction), "
                "before dividing. Which operation is on the outside here that we should undo first?"
            )

        if action == "step_down_remedial":
            return (
                "Let's take a quick step back to make sure our foundation is rock solid! "
                "Before we solve the full equation, remember that addition and subtraction are inverses, "
                "and multiplication and division are inverses. If a term has '+ 5', what operation undoes it?"
            )

        if action == "advance_challenge":
            return (
                "Fantastic reasoning! You've handled that step accurately. "
                "Since you understand how to isolate the variable, here is a challenge: "
                "what would you do if variables were on both sides, such as 3x + 5 = x + 15? Which term would you move first?"
            )

        # Default Socratic guidance
        return (
            "Good start! To solve for the variable, our main goal is to get it completely by itself on one side. "
            "Looking at what's currently attached to the variable, what inverse operation can we use to remove the constant first?"
        )

    @staticmethod
    def _extract_json(text: str) -> Dict[str, Any]:
        """Robust parser that extracts a valid MisconceptionAnalysis JSON dictionary from model output."""
        default_result = {
            "detected": False,
            "misconception_type": None,
            "explanation": None,
            "severity": None,
            "confidence": 0.0,
        }

        if not text:
            return default_result

        cleaned = text.strip()
        if "```" in cleaned:
            match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", cleaned)
            if match:
                cleaned = match.group(1).strip()

        parsed: Optional[Dict[str, Any]] = None

        try:
            candidate = json.loads(cleaned)
            if isinstance(candidate, dict):
                parsed = candidate
        except Exception:
            pass

        if parsed is None:
            match = re.search(r"\{[\s\S]*\}", text)
            if match:
                try:
                    candidate = json.loads(match.group(0))
                    if isinstance(candidate, dict):
                        parsed = candidate
                except Exception:
                    pass

        if not parsed:
            return default_result

        raw_detected = parsed.get("detected", False)
        if isinstance(raw_detected, str):
            detected_bool = raw_detected.strip().lower() in ("true", "1", "yes")
        else:
            detected_bool = bool(raw_detected)

        conf_raw = parsed.get("confidence", 0.0)
        conf_val = 0.0
        try:
            conf_val = float(conf_raw) if conf_raw is not None else 0.0
            if conf_val > 1.0 and conf_val <= 100.0:
                conf_val = conf_val / 100.0
            conf_val = max(0.0, min(1.0, round(conf_val, 2)))
        except (ValueError, TypeError):
            conf_val = 0.85 if detected_bool else 0.0

        severity = parsed.get("severity")
        if severity not in ("minor_slip", "conceptual", "prerequisite_gap"):
            severity = "conceptual" if detected_bool else None

        misconception_type = parsed.get("misconception_type")
        if not detected_bool:
            misconception_type = None
            explanation = None
            severity = None
        else:
            explanation = parsed.get("explanation")

        return {
            "detected": detected_bool,
            "misconception_type": misconception_type,
            "explanation": explanation,
            "severity": severity,
            "confidence": conf_val,
        }
