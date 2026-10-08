import pytest
import os
import torch
from pathlib import Path
from backend.voice.audio.preprocessing import load_and_preprocess_audio, AudioFileError

def test_missing_audio():
    with pytest.raises(AudioFileError):
        load_and_preprocess_audio("nonexistent_file.wav")

def test_preprocessing_format(tmp_path):
    # Create a dummy valid audio file
    import soundfile as sf
    import numpy as np
    dummy_wav = tmp_path / "dummy.wav"
    sf.write(dummy_wav, np.zeros(16000, dtype=np.float32), 16000)

    wav = load_and_preprocess_audio(str(dummy_wav))
    assert isinstance(wav, torch.Tensor)
    assert wav.shape[0] == 1 # Mono
