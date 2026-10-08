from typing import Optional, Dict, Any

class STTModelError(Exception):
    pass

class SpeechToTextBackend:
    def load_model(self):
        """Load the model into memory."""
        pass
        
    def transcribe(self, audio_path: str, language: Optional[str] = None) -> Dict[str, Any]:
        """
        Transcribe the given audio file.
        Returns:
        {
            "text": "...",
            "language": "...",
            "confidence": float | None,
            "audio_path": "..."
        }
        """
        raise NotImplementedError
