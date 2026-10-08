import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
DATA_DIR = BASE_DIR / "data"
CURRICULUM_DIR = DATA_DIR / "curriculum"
VECTOR_STORE_DIR = DATA_DIR / "vector_store"
SOURCES_DIR = DATA_DIR / "sources"

# Ensure directories exist
os.makedirs(CURRICULUM_DIR, exist_ok=True)
os.makedirs(VECTOR_STORE_DIR, exist_ok=True)
os.makedirs(SOURCES_DIR, exist_ok=True)

# Model configuration
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "all-MiniLM-L6-v2")

# Retrieval configuration
DEFAULT_TOP_K = int(os.getenv("DEFAULT_TOP_K", "5"))

# Chunking configuration
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "1000"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "200"))
