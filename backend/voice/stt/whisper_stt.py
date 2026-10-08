import logging
from typing import Optional, Dict, Any
from .base import SpeechToTextBackend, STTModelError
from ..config import DEVICE, ENGLISH_WHISPER_MODEL

logger = logging.getLogger(__name__)

class WhisperSTT(SpeechToTextBackend):
    def __init__(self):
        self.model = None

    def load_model(self):
        if self.model is not None:
            return
            
        logger.info(f"Loading Faster Whisper model {ENGLISH_WHISPER_MODEL} on {DEVICE}...")
        try:
            from faster_whisper import WhisperModel
            
            # Faster Whisper uses CTranslate2. 
            # device="cuda" or "cpu" or "auto". MPS is partially supported in recent versions, but CPU is very fast.
            compute_type = "float16" if DEVICE == "cuda" else "int8"
            device_str = "cuda" if DEVICE == "cuda" else "cpu"
            
            self.model = WhisperModel(ENGLISH_WHISPER_MODEL, device=device_str, compute_type=compute_type)
            logger.info("Whisper model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load Whisper model: {e}")
            raise STTModelError(f"Could not load Whisper model: {e}")

    def transcribe(self, audio_path: str, language: Optional[str] = None) -> Dict[str, Any]:
        if self.model is None:
            self.load_model()
            
        # Whisper automatically detects language if not provided
        kwargs = {}
        if language == "en":
            kwargs["language"] = "en"
            
        logger.info(f"Transcribing {audio_path} using Whisper...")
        try:
            # Faster Whisper handles resampling internally usually, but path works.
            segments, info = self.model.transcribe(audio_path, beam_size=5, **kwargs)
            
            # segments is a generator
            text = " ".join([segment.text for segment in segments]).strip()
            
            return {
                "text": text,
                "language": info.language,
                "confidence": info.language_probability,
                "audio_path": audio_path
            }
        except Exception as e:
            logger.error(f"Whisper transcription failed: {e}")
            raise STTModelError(f"Failed to transcribe using Whisper: {e}")
