from .detector import detect_language, detect_language_details
from .languages import get_supported_languages, is_supported_language, language_name

__all__ = [
    "detect_language",
    "detect_language_details",
    "get_supported_languages",
    "is_supported_language",
    "language_name"
]
