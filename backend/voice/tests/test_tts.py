import pytest
from backend.voice.tts.text_to_speech import TextToSpeech
from backend.voice.tts.base import TTSConfigurationError, TTSModelError

def test_unsupported_language_tts():
    tts = TextToSpeech()
    with pytest.raises(TTSModelError):
        tts.synthesize("Hello", "fr", "out.wav")
