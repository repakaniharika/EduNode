import logging
import torch
import numpy as np
import soundfile as sf
from pathlib import Path
from .base import TextToSpeechBackend, TTSModelError, TTSConfigurationError
from ..config import DEVICE, INDIC_F5_MODEL_ID, VOICE_PROFILES_DIR

logger = logging.getLogger(__name__)

class IndicF5TTS(TextToSpeechBackend):
    def __init__(self):
        self.model = None

    def load_model(self):
        if self.model is not None:
            return
            
        logger.info(f"Loading IndicF5 model from {INDIC_F5_MODEL_ID} on {DEVICE}...")
        try:
            from transformers import AutoModel
            self.model = AutoModel.from_pretrained(INDIC_F5_MODEL_ID, trust_remote_code=True)
            try:
                self.model = self.model.to(DEVICE)
            except Exception as e:
                logger.warning(f"Could not move IndicF5 to {DEVICE}, falling back to CPU: {e}")
                self.model = self.model.to("cpu")
            self.model.eval()
            logger.info("IndicF5 model loaded successfully.")
        except ImportError as e:
            raise TTSModelError(f"IndicF5 requires specific dependencies. Ensure you installed git+https://github.com/ai4bharat/IndicF5.git. Error: {e}")
        except Exception as e:
            logger.error(f"Failed to load IndicF5: {e}")
            raise TTSModelError(f"Could not load IndicF5 model: {e}")

    def _get_reference_data(self, language: str):
        """Find reference audio and text for the given language."""
        lang_dir = VOICE_PROFILES_DIR / language
        if not lang_dir.exists():
            raise TTSConfigurationError(f"Voice profile directory not found for {language} at {lang_dir}. Please create it and add 'ref.wav' and 'ref.txt'.")
            
        audio_path = lang_dir / "ref.wav"
        text_path = lang_dir / "ref.txt"
        
        if not audio_path.exists() or not text_path.exists():
            raise TTSConfigurationError(f"Reference files missing for {language}. Please ensure both '{audio_path}' and '{text_path}' exist.")
            
        with open(text_path, "r", encoding="utf-8") as f:
            ref_text = f.read().strip()
            
        return str(audio_path), ref_text

    def synthesize(self, text: str, language: str, output_path: str) -> str:
        if self.model is None:
            self.load_model()
            
        ref_audio_path, ref_text = self._get_reference_data(language)
        
        logger.info(f"Synthesizing '{text}' in {language} using IndicF5...")
        
        try:
            with torch.no_grad():
                audio = self.model(
                    text,
                    ref_audio_path=ref_audio_path,
                    ref_text=ref_text
                )
            
            # Normalize and export audio (IndicF5 outputs 24,000 Hz)
            if isinstance(audio, np.ndarray) and audio.dtype == np.int16:
                audio = audio.astype(np.float32) / 32768.0
            elif isinstance(audio, torch.Tensor):
                audio = audio.cpu().numpy()
                
            Path(output_path).parent.mkdir(parents=True, exist_ok=True)
            sf.write(output_path, np.array(audio, dtype=np.float32), samplerate=24000)
            logger.info(f"Saved TTS output to {output_path}")
            return output_path
            
        except Exception as e:
            logger.error(f"IndicF5 synthesis failed: {e}")
            raise TTSModelError(f"Failed to synthesize using IndicF5: {e}")
