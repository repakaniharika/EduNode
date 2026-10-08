import os
from pathlib import Path
import torch

# Base directories
BASE_DIR = Path(__file__).resolve().parent
VOICE_PROFILES_DIR = BASE_DIR / "tts" / "voice_profiles"
TEMP_AUDIO_DIR = BASE_DIR / "temp"

# Device configuration
def get_device():
    env_device = os.getenv("EDUNODE_DEVICE", "auto").lower()
    if env_device in ["cpu", "cuda", "mps"]:
        if env_device == "cuda" and not torch.cuda.is_available():
            print("Warning: CUDA requested but not available. Falling back to CPU.")
            return "cpu"
        if env_device == "mps" and not torch.backends.mps.is_available():
            print("Warning: MPS requested but not available. Falling back to CPU.")
            return "cpu"
        return env_device

    if torch.cuda.is_available():
        return "cuda"
    elif torch.backends.mps.is_available():
        return "mps"
    return "cpu"

DEVICE = get_device()
print(f"EduNode Voice Module using device: {DEVICE}")

# Models
INDIC_CONFORMER_MODEL_ID = "ai4bharat/indic-conformer-600m-multilingual"
INDIC_F5_MODEL_ID = "ai4bharat/IndicF5"

# English backend configuration (Faster Whisper for STT, Piper for TTS)
ENGLISH_WHISPER_MODEL = "base.en"
ENGLISH_PIPER_VOICE = "en_US-lessac-medium"
