# EduNode - Member 3 (RAG + Concept Graph)

This module implements the **Curriculum-Grounded Retrieval-Augmented Generation (RAG)** and **Curriculum Concept Graph Foundation** for the EduNode project.

## Responsibilities
- **Ingest** curriculum documents (PDFs) provided by teachers.
- **Process** documents via parsing, cleaning, semantic chunking, and embedding generation.
- **Retrieve** contextually relevant curriculum chunks to ground the Gemma AI engine (Member 2).
- **Structure** a Master Curriculum Concept Graph that defines prerequisite and dependent relationships among topics, to be consumed by the Student Knowledge Graph (Member 4).

## Supported Curriculums
Currently natively supports the following board frameworks (Classes 6-12):
1. **cbse** (CBSE / NCERT)
2. **kerala** (Kerala SCERT)
3. **tamil_nadu** (Samacheer Kalvi)
4. **andhra_pradesh** (AP State Board)
5. **telangana** (TS State Board)

Multilingual mediums (English, Malayalam, Tamil, Telugu) are fully supported.

## Architecture

1. **Parser & Cleaner**: Extracts text using PyMuPDF and cleans PDF artifacts.
2. **Chunker**: Uses heuristics (paragraphs, headings) to group text while respecting token limits and keeping chunks educationally meaningful. Preserves strict metadata.
3. **Embeddings**: Uses `sentence-transformers` (default `all-MiniLM-L6-v2`) to generate vector representations. *Note: Optimized for English; multi-lingual retrieval may degrade slightly depending on the exact model.*
4. **Vector Store**: Uses `FAISS` (FlatIP) to index embeddings, mapping vector IDs to chunk metadata. Persists locally and automatically migrates legacy schemas.
5. **Retriever**: Embeds queries and searches the vector store, applying **strict curriculum filters**. A chunk must match every requested curriculum metadata field.
6. **Concept Graph**: A JSON-driven ontology (`concept_graph.json`) that maps out how curriculum topics relate (e.g., `prerequisite_for`) and includes `curriculum_mappings` for board-specific chapters. Automatically maps semantic chunks to concepts during ingestion.
7. **FastAPI Routes**: Clean, decoupled API endpoints integrating Member 3's module with the rest of EduNode.

## Installation

```bash
# Clone the repository and navigate to the root directory
cd hacktoberrr

# Install dependencies
pip install -r requirements.txt
```

## Running the API

```bash
# Start the FastAPI server
uvicorn edunode.backend.main:app --reload
```

## Running the Demo

To test the cross-board filtering pipeline end-to-end without the API server:

```bash
python demo_rag.py
```

This script will:
1. Load the unified Concept Graph.
2. Generate synthetic curriculum PDFs across 5 boards.
3. Ingest documents and map semantic concepts.
4. Query the system applying strict board filters (e.g., Kerala only).
5. Display the structured integration context for Member 2.

## Testing
To run the automated test suite, which verifies strict filtering, source traceability, and schema validation:
```bash
python -m pytest edunode/backend/rag/tests/
```
