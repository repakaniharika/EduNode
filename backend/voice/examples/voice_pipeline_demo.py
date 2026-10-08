import sys
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

# Ensure backend module is in path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent.parent))
from backend.voice.pipeline.voice_pipeline import VoicePipeline

def main():
    print("=== EduNode: Voice Pipeline Demo ===")
    print("This demo will record your voice, transcribe it, and speak it back.")
    lang_input = input("Enter language code (en, ml, ta, hi, kn, bn) or leave blank for auto: ").strip()
    language = lang_input if lang_input else None
    
    pipeline = VoicePipeline()
    
    try:
        print("\n[1/3] Recording for 5 seconds...")
        result = pipeline.process_microphone(duration=5, language=language)
        
        print("\n[2/3] STT & Language Detection Result:")
        print(f"Detected language: {result['language_name']} ({result['language']})")
        text = result['text']
        print(f"Transcription:\n{text}")
        
        if not text:
            print("No speech detected. Exiting.")
            return

        print("\n[3/3] Synthesizing speech...")
        output_path = pipeline.speak(text, result['language'], "demo_output.wav")
        print(f"\nSuccess! Pipeline completed. Output saved to: {output_path}")
        
    except Exception as e:
        print(f"Pipeline Error: {e}")

if __name__ == "__main__":
    main()
