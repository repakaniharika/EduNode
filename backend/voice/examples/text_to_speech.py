import sys
from pathlib import Path
import logging

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")

# Ensure backend module is in path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent.parent))
from backend.voice.pipeline.voice_pipeline import VoicePipeline

def main():
    print("=== EduNode: Text to Speech ===")
    language = input("Enter language code (en, ml, ta, hi, kn, bn): ").strip()
    text = input("Enter text to synthesize: ").strip()
    output_name = input("Enter output filename [output.wav]: ").strip() or "output.wav"
    
    pipeline = VoicePipeline()
    
    try:
        print(f"\nSynthesizing...")
        output_path = pipeline.speak(text, language, output_name)
        print(f"\nSuccess! Audio saved to: {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
