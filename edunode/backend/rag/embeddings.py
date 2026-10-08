import logging
from typing import List
import numpy as np
from sentence_transformers import SentenceTransformer
from edunode.backend.rag.config import EMBEDDING_MODEL

logger = logging.getLogger(__name__)

# Lazy initialization of the model
_model = None

def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        logger.info(f"Loading embedding model: {EMBEDDING_MODEL}")
        _model = SentenceTransformer(EMBEDDING_MODEL)
    return _model

def embed_text(text: str) -> np.ndarray:
    """
    Generates a normalized embedding for a single string.
    """
    model = get_model()
    # Return normalized embeddings for cosine similarity with FAISS Inner Product
    embedding = model.encode(text, normalize_embeddings=True)
    return np.array(embedding, dtype=np.float32)

def embed_documents(texts: List[str]) -> np.ndarray:
    """
    Generates normalized embeddings for a list of strings.
    """
    if not texts:
        return np.array([], dtype=np.float32)
        
    model = get_model()
    embeddings = model.encode(texts, normalize_embeddings=True)
    return np.array(embeddings, dtype=np.float32)

def get_embedding_dimension() -> int:
    """
    Returns the dimension of the embedding model.
    """
    return get_model().get_sentence_embedding_dimension()
