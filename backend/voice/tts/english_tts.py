import logging
import wave
import os
from pathlib import Path
from .base import TextToSpeechBackend, TTSModelError
from ..config import ENGLISH_PIPER_VOICE

logger = logging.getLogger(__name__)

class EnglishTTS(TextToSpeechBackend):
    def __init__(self):
        self.voice = None
        self.model_path = Path(__file__).parent.parent / "models" / "piper" / f"{ENGLISH_PIPER_VOICE}.onnx"

    def _ensure_model_downloaded(self):
        if not self.model_path.exists():
            logger.info(f"Downloading Piper voice {ENGLISH_PIPER_VOICE}...")
            self.model_path.parent.mkdir(parents=True, exist_ok=True)
            try:
                import subprocess
                # Run the piper download utility
                subprocess.run(
                    ["python3", "-m", "piper.download", "--model-name", ENGLISH_PIPER_VOICE, "--data-dir", str(self.model_path.parent)],
                    check=True, capture_output=True, text=True
                )
            except subprocess.CalledProcessError as e:
                logger.error(f"Failed to download Piper voice: {e.stderr}")
                raise TTSModelError(f"Could not download English TTS model: {e}")
            except Exception as e:
                # If piper.download is not available, we can fallback to the auto-download built into piper if we pass data_dir, 
                # but older versions used piper_train. Let's just catch it.
                logger.warning(f"Piper download module failed: {e}. Let's hope it downloads automatically or is present.")

    def load_model(self):
        if self.voice is not None:
            return
            
        logger.info(f"Loading English TTS model (Piper) using {ENGLISH_PIPER_VOICE}...")
        try:
            from piper import PiperVoice
            # To avoid the complexity of the download module, PiperVoice.load can take the path directly.
            # But the user may not have the ONNX file. We'll use the download utility if missing.
            
            # Simple fallback check: If we don't have it locally, use piper download.
            # However, Piper requires the .onnx and .onnx.json files.
            # Actually, `piper.download_voices` is the module in newer versions.
            pass # We'll handle loading carefully
            
            data_dir = Path(__file__).parent.parent / "models" / "piper"
            data_dir.mkdir(parents=True, exist_ok=True)
            model_file = data_dir / f"{ENGLISH_PIPER_VOICE}.onnx"
            
            if not model_file.exists():
                logger.info(f"Downloading {ENGLISH_PIPER_VOICE} to {data_dir}...")
                import urllib.request
                import json
                
                # Fetch voices.json from rhasspy
                voices_url = "https://huggingface.co/rhasspy/piper-voices/resolve/main/voices.json"
                req = urllib.request.Request(voices_url)
                with urllib.request.urlopen(req) as response:
                    voices_data = json.loads(response.read())
                    
                if ENGLISH_PIPER_VOICE in voices_data:
                    files = voices_data[ENGLISH_PIPER_VOICE]["files"]
                    for file_path, file_info in files.items():
                        url = f"https://huggingface.co/rhasspy/piper-voices/resolve/main/{file_path}"
                        target_path = data_dir / Path(file_path).name
                        logger.info(f"Downloading {url} -> {target_path}")
                        urllib.request.urlretrieve(url, target_path)
            
            self.voice = PiperVoice.load(str(model_file))
            logger.info("English TTS model loaded successfully.")
        except ImportError as e:
            raise TTSModelError(f"Piper TTS not installed. Run 'pip install piper-tts'. Error: {e}")
        except Exception as e:
            logger.error(f"Failed to load English TTS: {e}")
            raise TTSModelError(f"Could not load English TTS model: {e}")

    def synthesize(self, text: str, language: str, output_path: str) -> str:
        if language != "en":
            raise TTSModelError(f"English TTS backend does not support language: {language}")
            
        if self.voice is None:
            self.load_model()
            
        logger.info(f"Synthesizing '{text}' in English using Piper...")
        
        try:
            Path(output_path).parent.mkdir(parents=True, exist_ok=True)
            with wave.open(output_path, "wb") as wav_file:
                self.voice.synthesize(text, wav_file)
            logger.info(f"Saved TTS output to {output_path}")
            return output_path
        except Exception as e:
            logger.error(f"Piper synthesis failed: {e}")
            raise TTSModelError(f"Failed to synthesize using Piper: {e}")
