import logging
import torchaudio
import torch
from pathlib import Path

logger = logging.getLogger(__name__)

class AudioFileError(Exception):
    pass

def load_and_preprocess_audio(audio_path: str, target_sr: int = 16000) -> torch.Tensor:
    """
    Load an audio file, convert it to mono, and resample to target_sr if necessary.
    Returns the preprocessed audio as a 1D or 2D torch.Tensor on CPU.
    """
    if not Path(audio_path).exists():
        raise AudioFileError(f"Audio file not found: {audio_path}")
        
    try:
        import soundfile as sf
        import numpy as np
        # soundfile returns (frames, channels) as float64 by default
        wav_np, sr = sf.read(audio_path, dtype='float32')
        # Handle 1D (mono) to 2D (channels, frames)
        if len(wav_np.shape) == 1:
            wav_np = wav_np[np.newaxis, :]
        else:
            wav_np = wav_np.T # Transpose to (channels, frames)
            
        wav = torch.from_numpy(wav_np)
    except Exception as e:
        raise AudioFileError(f"Failed to load audio file {audio_path}. Details: {e}")

    # Convert to mono by averaging channels
    if wav.shape[0] > 1:
        wav = torch.mean(wav, dim=0, keepdim=True)
        
    # Resample if needed
    if sr != target_sr:
        resampler = torchaudio.transforms.Resample(orig_freq=sr, new_freq=target_sr)
        wav = resampler(wav)
        
    return wav
