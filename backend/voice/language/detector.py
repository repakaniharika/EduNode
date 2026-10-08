import re
from typing import Dict, Any
from .languages import is_supported_language, language_name

# Unicode ranges for the supported scripts
SCRIPT_RANGES = {
    "ml": r"[\u0D00-\u0D7F]",
    "ta": r"[\u0B80-\u0BFF]",
    "hi": r"[\u0900-\u097F]", # Devanagari (Hindi)
    "kn": r"[\u0C80-\u0CFF]",
    "bn": r"[\u0980-\u09FF]",
    "en": r"[a-zA-Z]"         # Latin (English)
}

def detect_language_details(text: str) -> Dict[str, Any]:
    """
    Detect language based on character counts in Unicode blocks.
    Returns primary language and mixed status.
    """
    if not text or not text.strip():
        return {
            "language": "en", # default to english
            "language_name": "English",
            "confidence": None,
            "mixed": False
        }

    counts = {}
    total_matches = 0
    
    for lang, pattern in SCRIPT_RANGES.items():
        matches = len(re.findall(pattern, text))
        if matches > 0:
            counts[lang] = matches
            total_matches += matches

    if not counts:
        return {
            "language": "en",
            "language_name": "English",
            "confidence": None,
            "mixed": False
        }

    # Find the language with the highest character count
    primary_lang = max(counts, key=counts.get)
    
    # Check if multiple scripts are present (ignoring punctuation/spaces)
    is_mixed = len(counts) > 1

    return {
        "language": primary_lang,
        "language_name": language_name(primary_lang),
        "confidence": None, # Do not invent confidence
        "mixed": is_mixed
    }

def detect_language(text: str) -> str:
    """
    Returns just the primary language code.
    """
    details = detect_language_details(text)
    return details["language"]
