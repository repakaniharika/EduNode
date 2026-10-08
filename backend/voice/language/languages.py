LANGUAGES = {
    "en": {
        "name": "English",
        "script": "Latin",
        "stt_backend": "whisper",
        "tts_backend": "piper"
    },
    "ml": {
        "name": "Malayalam",
        "script": "Malayalam",
        "stt_backend": "indicconformer",
        "tts_backend": "indicf5"
    },
    "ta": {
        "name": "Tamil",
        "script": "Tamil",
        "stt_backend": "indicconformer",
        "tts_backend": "indicf5"
    },
    "hi": {
        "name": "Hindi",
        "script": "Devanagari",
        "stt_backend": "indicconformer",
        "tts_backend": "indicf5"
    },
    "kn": {
        "name": "Kannada",
        "script": "Kannada",
        "stt_backend": "indicconformer",
        "tts_backend": "indicf5"
    },
    "bn": {
        "name": "Bengali",
        "script": "Bengali",
        "stt_backend": "indicconformer",
        "tts_backend": "indicf5"
    }
}

def get_supported_languages() -> dict:
    return LANGUAGES

def is_supported_language(code: str) -> bool:
    return code in LANGUAGES

def language_name(code: str) -> str:
    return LANGUAGES.get(code, {}).get("name", "Unknown")

def get_tts_backend(code: str) -> str:
    return LANGUAGES.get(code, {}).get("tts_backend", "indicf5")

def get_stt_backend(code: str) -> str:
    return LANGUAGES.get(code, {}).get("stt_backend", "indicconformer")
