# EduNode Voice & Regional Language Engine

## Overview
A curriculum-grounded multilingual voice module supporting Speech-to-Text, Text-to-Speech, Language Detection, and audio preprocessing for 6 languages.

## Supported Languages
- English (en)
- Malayalam (ml)
- Tamil (ta)
- Hindi (hi)
- Kannada (kn)
- Bengali (bn)

## Architecture
- **Language Detection**: Custom Unicode script-range heuristic.
- **Audio Module**: `sounddevice` for microphone, `torchaudio` for resampling.
- **Pipeline**: Unified `VoicePipeline` class mapping STT -> TTS.

## STT
- **English**: `faster-whisper` (base.en)
- **Indic Languages**: AI4Bharat's `indic-conformer-600m-multilingual`

## TTS
- **English**: `piper-tts` (en_US-lessac-medium)
- **Indic Languages**: AI4Bharat `IndicF5`

## Installation
1. Install system dependencies:
   ```bash
   # macOS
   brew install ffmpeg

   # Ubuntu
   sudo apt-get install ffmpeg
   ```
2. Set up Python environment:
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install git+https://github.com/ai4bharat/IndicF5.git
   ```

## Model Setup
Models are lazy-loaded on the first request and cached in memory.
- IndicConformer: ~600M parameters. Downloads from HF.
- IndicF5: Downloads from HF. Requires voice profiles.
- Piper: Auto-downloads English ONNX models to `~/.local/share/piper/`.
- Faster Whisper: Auto-downloads `base.en`.

## Voice Profiles
For IndicF5 TTS to work, you must provide reference audio and transcripts.
Place them in:
```
backend/voice/tts/voice_profiles/{lang}/
    ref.wav
    ref.txt
```
For example, create `backend/voice/tts/voice_profiles/ml/ref.wav` and `backend/voice/tts/voice_profiles/ml/ref.txt`.

## Microphone Setup on macOS
Ensure your terminal has microphone permissions granted in macOS Settings > Privacy & Security > Microphone.

## Running Unit Tests
```bash
pytest backend/voice/tests/test_languages.py
pytest backend/voice/tests/test_pipeline.py
pytest backend/voice/tests/test_stt.py
pytest backend/voice/tests/test_tts.py
```

## Running the Demo
```bash
python backend/voice/examples/voice_pipeline_demo.py
```

## Gemma/RAG Integration
```python
from backend.voice.pipeline.voice_pipeline import VoicePipeline

pipeline = VoicePipeline()

# STT & Detection
voice_result = pipeline.process_audio("student.wav")
text = voice_result["text"]
lang = voice_result["language"]

# Send `text` to RAG...
response_text = "..."

# TTS
pipeline.speak(response_text, lang, "response.wav")
```

## Privacy
- Fully local and offline processing.
- No third-party API dependencies after initial model downloads.
- Does not upload user recordings.

## Limitations
- Model downloads require significant bandwidth and memory.
- IndicF5 speed is slower on CPU than GPU.
- Mixed language detection is basic and returns the primary dominant script.
