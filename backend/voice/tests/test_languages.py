import pytest
from backend.voice.language.detector import detect_language
from backend.voice.language.languages import is_supported_language

def test_language_detection():
    # Expected results from requirements
    cases = {
        "Explain photosynthesis.": "en",
        "പ്രകാശസംശ്ലേഷണം എന്താണ്?": "ml",
        "ஒளிச்சேர்க்கை என்றால் என்ன?": "ta",
        "प्रकाश संश्लेषण क्या है?": "hi",
        "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಎಂದರೇನು?": "kn",
        "সালোকসংশ্লেষণ কী?": "bn",
        "Photosynthesis-il chlorophyll entha cheyyunne?": "en", # fallback/latin dominant
        "": "en", # empty input fallback
        "   ": "en" # empty input fallback
    }

    for text, expected_lang in cases.items():
        assert detect_language(text) == expected_lang

def test_supported_languages():
    assert is_supported_language("en")
    assert is_supported_language("ml")
    assert is_supported_language("ta")
    assert is_supported_language("hi")
    assert is_supported_language("kn")
    assert is_supported_language("bn")
    assert not is_supported_language("fr")
    assert not is_supported_language("invalid")
