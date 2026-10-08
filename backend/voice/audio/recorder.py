import logging
import soundfile as sf
import sounddevice as sd
import numpy as np
from pathlib import Path
import tempfile

logger = logging.getLogger(__name__)

class MicrophoneError(Exception):
    pass

def record_microphone(output_path: str = None, duration: int = 5, samplerate: int = 16000, channels: int = 1) -> str:
    """
    Record audio from the microphone.
    If output_path is not provided, creates a temporary file.
    Returns the path to the recorded WAV file.
    """
    if output_path is None:
        fd, output_path = tempfile.mkstemp(suffix=".wav")
        import os
        os.close(fd)
        
    logger.info(f"Starting recording for {duration} seconds at {samplerate}Hz...")
    try:
        recording = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=channels, dtype='float32')
        sd.wait()  # Wait until recording is finished
        logger.info("Recording finished.")
        
        # Save as WAV file
        sf.write(output_path, recording, samplerate)
        logger.info(f"Saved recording to {output_path}")
        return output_path
    except Exception as e:
        logger.error(f"Microphone recording failed: {e}")
        raise MicrophoneError(f"Failed to record from microphone. Ensure permissions are granted. Details: {e}")
