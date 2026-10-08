import pytest
from unittest.mock import patch
from backend.voice.stt.speech_to_text import SpeechToText
from backend.voice.stt.base import STTModelError

def test_stt_routing():
    stt = SpeechToText()
    with patch.object(stt, '_get_backend') as mock_get_backend:
        mock_backend = mock_get_backend.return_value
        
        # English routes to whisper
        stt.transcribe("dummy.wav", "en")
        mock_get_backend.assert_called_with("whisper")
        
        # Malayalam routes to indicconformer
        stt.transcribe("dummy.wav", "ml")
        mock_get_backend.assert_called_with("indicconformer")
        
        # No language routes to whisper
        stt.transcribe("dummy.wav", None)
        mock_get_backend.assert_called_with("whisper")
