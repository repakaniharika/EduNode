import logging
from typing import Optional, Dict, Any
from .base import SpeechToTextBackend, STTModelError
from .indicconformer import IndicConformerSTT
from .whisper_stt import WhisperSTT
from ..language.languages import get_stt_backend

logger = logging.getLogger(__name__)

class SpeechToText:
    def __init__(self):
        self._backends: Dict[str, SpeechToTextBackend] = {}

    def _get_backend(self, backend_name: str) -> SpeechToTextBackend:
        if backend_name not in self._backends:
            if backend_name == "indicconformer":
                self._backends[backend_name] = IndicConformerSTT()
            elif backend_name == "whisper":
                self._backends[backend_name] = WhisperSTT()
            else:
                raise STTModelError(f"Unknown STT backend: {backend_name}")
                
            # Lazy load model
            self._backends[backend_name].load_model()
            
        return self._backends[backend_name]

    def transcribe(self, audio_path: str, language: Optional[str] = None) -> Dict[str, Any]:
        """
        Transcribe audio, routing to the appropriate backend based on language.
        If language is None, defaults to English/Whisper which has built-in lang detection.
        """
        if language:
            backend_name = get_stt_backend(language)
        else:
            logger.info("No language provided for STT. Defaulting to Whisper for auto-detection.")
            backend_name = "whisper"
            
        backend = self._get_backend(backend_name)
        return backend.transcribe(audio_path, language)
