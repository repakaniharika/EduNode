import os
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
DATA_DIR = BASE_DIR / "data"
CURRICULUM_DIR = DATA_DIR / "curriculum"
VECTOR_STORE_DIR = DATA_DIR / "vector_store"
SOURCES_DIR = DATA_DIR / "sources"
CONCEPT_GRAPH_PATH = CURRICULUM_DIR / "concept_graph.json"

# Ensure directories exist
os.makedirs(CURRICULUM_DIR, exist_ok=True)
os.makedirs(VECTOR_STORE_DIR, exist_ok=True)
os.makedirs(SOURCES_DIR, exist_ok=True)

# Model configuration
EMBEDDING_MODEL = os.getenv(
    "EMBEDDING_MODEL",
    "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2",
)

# Retrieval configuration
DEFAULT_TOP_K = int(os.getenv("DEFAULT_TOP_K", "5"))
MAX_TOP_K = int(os.getenv("MAX_TOP_K", "50"))

# Chunking configuration
CHUNK_SIZE = int(os.getenv("CHUNK_SIZE", "1000"))
CHUNK_OVERLAP = int(os.getenv("CHUNK_OVERLAP", "200"))

# Concept Mapping configuration
CONCEPT_SIMILARITY_THRESHOLD = float(os.getenv("CONCEPT_SIMILARITY_THRESHOLD", "0.6"))
MAX_CONCEPTS_PER_CHUNK = int(os.getenv("MAX_CONCEPTS_PER_CHUNK", "3"))
