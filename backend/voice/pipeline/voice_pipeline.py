import logging
from typing import Optional, Dict, Any
import os

from ..stt.speech_to_text import SpeechToText
from ..tts.text_to_speech import TextToSpeech
from ..language.detector import detect_language_details
from ..audio.recorder import record_microphone

logger = logging.getLogger(__name__)

class VoicePipeline:
    """
    Unified Voice Pipeline for EduNode.
    Handles STT -> Language Detection -> TTS.
    """
    def __init__(self):
        self.stt = SpeechToText()
        self.tts = TextToSpeech()
        
    def process_audio(self, audio_path: str, language: Optional[str] = None) -> Dict[str, Any]:
        """
        Process an audio file:
        1. Transcribe the audio
        2. Detect the language if not provided or to verify
        """
        logger.info(f"Processing audio {audio_path}")
        
        # 1. STT
        stt_result = self.stt.transcribe(audio_path, language)
        text = stt_result["text"]
        
        # 2. Language Detection
        # If language was forced, we still use the detected details to enrich the response,
        # but the primary language will reflect the detection unless it's way off.
        # Actually, let's just use the text to detect the language reliably.
        lang_details = detect_language_details(text)
        
        # If the user forced a language, and it's valid, we might want to respect it, 
        # but STT output text in Indian scripts will automatically be detected correctly.
        final_lang = lang_details["language"]
        if language and language == "en" and final_lang != "en":
            # Sometimes english STT outputs romanized text, which is detected as English.
            # But if we forced english, keep english.
            final_lang = language
            
        return {
            "text": text,
            "language": final_lang,
            "language_name": lang_details["language_name"],
            "confidence": stt_result["confidence"],
            "audio_path": audio_path,
            "mixed": lang_details.get("mixed", False)
        }
        
    def process_microphone(self, duration: int = 5, language: Optional[str] = None) -> Dict[str, Any]:
        """
        Record from microphone and process the audio.
        """
        audio_path = record_microphone(duration=duration)
        try:
            result = self.process_audio(audio_path, language)
            return result
        finally:
            # Clean up temporary microphone recording
            if os.path.exists(audio_path):
                try:
                    os.remove(audio_path)
                except OSError as e:
                    logger.warning(f"Failed to remove temp audio {audio_path}: {e}")
                    
    def speak(self, text: str, language: str, output_path: str) -> str:
        """
        Synthesize speech from text and save to output_path.
        """
        logger.info(f"Speaking text in {language} to {output_path}")
        return self.tts.synthesize(text, language, output_path)
