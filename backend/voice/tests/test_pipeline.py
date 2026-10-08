import pytest
from unittest.mock import MagicMock, patch
from backend.voice.pipeline.voice_pipeline import VoicePipeline

@pytest.fixture
def mock_pipeline():
    with patch("backend.voice.pipeline.voice_pipeline.SpeechToText") as MockSTT, \
         patch("backend.voice.pipeline.voice_pipeline.TextToSpeech") as MockTTS:
        
        # Configure STT mock
        mock_stt_instance = MockSTT.return_value
        mock_stt_instance.transcribe.return_value = {
            "text": "Hello world",
            "language": "en",
            "confidence": 0.99,
            "audio_path": "dummy.wav"
        }
        
        # Configure TTS mock
        mock_tts_instance = MockTTS.return_value
        mock_tts_instance.synthesize.return_value = "output.wav"
        
        yield VoicePipeline()

def test_pipeline_process_audio(mock_pipeline):
    result = mock_pipeline.process_audio("dummy.wav")
    assert result["text"] == "Hello world"
    assert result["language"] == "en"
    assert result["mixed"] is False

def test_pipeline_speak(mock_pipeline):
    output = mock_pipeline.speak("Hello", "en", "output.wav")
    assert output == "output.wav"
    mock_pipeline.tts.synthesize.assert_called_with("Hello", "en", "output.wav")
