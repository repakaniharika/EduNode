import logging
from typing import Dict
from .base import TextToSpeechBackend, TTSModelError
from .indicf5 import IndicF5TTS
from .english_tts import EnglishTTS
from ..language.languages import get_tts_backend, is_supported_language

logger = logging.getLogger(__name__)

class TextToSpeech:
    def __init__(self):
        self._backends: Dict[str, TextToSpeechBackend] = {}

    def _get_backend(self, backend_name: str) -> TextToSpeechBackend:
        if backend_name not in self._backends:
            if backend_name == "indicf5":
                self._backends[backend_name] = IndicF5TTS()
            elif backend_name == "piper":
                self._backends[backend_name] = EnglishTTS()
            else:
                raise TTSModelError(f"Unknown TTS backend: {backend_name}")
                
            self._backends[backend_name].load_model()
            
        return self._backends[backend_name]

    def synthesize(self, text: str, language: str, output_path: str) -> str:
        if not is_supported_language(language):
            raise TTSModelError(f"Unsupported language code: {language}")
            
        backend_name = get_tts_backend(language)
        backend = self._get_backend(backend_name)
        
        return backend.synthesize(text, language, output_path)
