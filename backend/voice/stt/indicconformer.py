import logging
import torch
from typing import Optional, Dict, Any
from .base import SpeechToTextBackend, STTModelError
from ..config import DEVICE, INDIC_CONFORMER_MODEL_ID
from ..audio.preprocessing import load_and_preprocess_audio

logger = logging.getLogger(__name__)

class IndicConformerSTT(SpeechToTextBackend):
    def __init__(self):
        self.model = None

    def load_model(self):
        if self.model is not None:
            return
        
        logger.info(f"Loading IndicConformer model from {INDIC_CONFORMER_MODEL_ID} on {DEVICE}...")
        try:
            from transformers import AutoModel
            self.model = AutoModel.from_pretrained(INDIC_CONFORMER_MODEL_ID, trust_remote_code=True)
            
            # MPS isn't always fully supported by all operators in transformers conformer models.
            # Fall back to CPU if it fails on MPS, but we'll try to place it on DEVICE first.
            try:
                self.model = self.model.to(DEVICE)
            except Exception as e:
                logger.warning(f"Could not move model to {DEVICE}, falling back to CPU. Details: {e}")
                self.model = self.model.to("cpu")
                
            self.model.eval()
            logger.info("IndicConformer model loaded successfully.")
        except Exception as e:
            logger.error(f"Failed to load IndicConformer: {e}")
            raise STTModelError(f"Could not load IndicConformer model: {e}")

    def transcribe(self, audio_path: str, language: Optional[str] = None) -> Dict[str, Any]:
        if self.model is None:
            self.load_model()
            
        if not language:
            # Model requires a language code, default to Hindi if unknown
            language = "hi"
            
        logger.info(f"Transcribing {audio_path} using IndicConformer for language {language}...")
        
        try:
            wav = load_and_preprocess_audio(audio_path, target_sr=16000)
            
            # Put tensor on the same device as model
            model_device = next(self.model.parameters()).device
            wav = wav.to(model_device)
            
            with torch.no_grad():
                # 'ctc' decoding strategy is faster
                transcription = self.model(wav, language, "ctc")
                
            # If transcription is a list, take the first element
            if isinstance(transcription, list):
                transcription = transcription[0]
                
            return {
                "text": transcription,
                "language": language,
                "confidence": None, # Conformer output doesn't trivially expose confidence
                "audio_path": audio_path
            }
        except Exception as e:
            logger.error(f"Transcription failed: {e}")
            raise STTModelError(f"Failed to transcribe using IndicConformer: {e}")
