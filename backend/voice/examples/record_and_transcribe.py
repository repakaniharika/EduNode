import sys
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

# Ensure backend module is in path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent.parent))
from backend.voice.pipeline.voice_pipeline import VoicePipeline

def main():
    print("=== EduNode: Record and Transcribe ===")
    lang_input = input("Enter language code (en, ml, ta, hi, kn, bn) or leave blank for auto: ").strip()
    language = lang_input if lang_input else None
    
    try:
        duration = int(input("Enter duration to record (seconds) [5]: ").strip() or "5")
    except ValueError:
        duration = 5
        
    pipeline = VoicePipeline()
    
    try:
        print(f"\nRecording for {duration} seconds...")
        result = pipeline.process_microphone(duration=duration, language=language)
        
        print("\n--- Result ---")
        print(f"Detected language: {result['language_name']} ({result['language']})")
        if result['mixed']:
            print("Note: Mixed language detected.")
        print(f"Transcription:\n{result['text']}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
