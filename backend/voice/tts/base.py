class TTSModelError(Exception):
    pass

class TTSConfigurationError(Exception):
    pass

class TextToSpeechBackend:
    def load_model(self):
        """Load the model into memory."""
        pass
        
    def synthesize(self, text: str, language: str, output_path: str) -> str:
        """
        Synthesize speech from text and save to output_path.
        Returns the output path.
        """
        raise NotImplementedError
