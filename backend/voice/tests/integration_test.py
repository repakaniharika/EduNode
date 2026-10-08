import os
import sys
import time
import torch
import numpy as np
import soundfile as sf
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../..')))

from backend.voice.stt.whisper_stt import WhisperSTT
from backend.voice.stt.indicconformer import IndicConformerSTT
from backend.voice.tts.english_tts import EnglishTTS
from backend.voice.tts.indicf5 import IndicF5TTS

def test_whisper_integration():
    print("=== Testing Whisper STT ===")
    stt = WhisperSTT()
    dummy_wav = "dummy_en.wav"
    sf.write(dummy_wav, np.random.randn(16000).astype(np.float32), 16000)
    
    t0 = time.time()
    text = stt.transcribe(dummy_wav, language="en")
    t1 = time.time()
    
    print(f"Whisper text: '{text}' (took {t1-t0:.2f}s)")
    assert isinstance(text, str)
    os.remove(dummy_wav)

def test_conformer_integration():
    print("\n=== Testing IndicConformer STT ===")
    stt = IndicConformerSTT()
    dummy_wav = "dummy_hi.wav"
    sf.write(dummy_wav, np.random.randn(16000).astype(np.float32), 16000)
    
    t0 = time.time()
    text = stt.transcribe(dummy_wav, language="hi")
    t1 = time.time()
    
    print(f"IndicConformer text: '{text}' (took {t1-t0:.2f}s)")
    assert isinstance(text, str)
    os.remove(dummy_wav)

def test_piper_integration():
    print("\n=== Testing Piper TTS ===")
    tts = EnglishTTS()
    out_wav = "out_piper.wav"
    
    t0 = time.time()
    tts.synthesize("Hello world, this is a test of the piper text to speech system.", "en", out_wav)
    t1 = time.time()
    
    print(f"Piper TTS done. (took {t1-t0:.2f}s)")
    assert os.path.exists(out_wav)
    os.remove(out_wav)

if __name__ == "__main__":
    test_piper_integration()
    test_whisper_integration()
    test_conformer_integration()
    print("\nAll integration tests finished.")
