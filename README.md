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

English, Malayalam, Tamil, and Telugu curriculum text is supported using a multilingual
Sentence Transformers model by default. Set `EMBEDDING_MODEL` to select another
compatible model; changing models re-embeds stored chunks from their saved text.

## Architecture

1. **Parser & Cleaner**: Extracts text using PyMuPDF and cleans PDF artifacts.
2. **Chunker**: Uses paragraph and heading heuristics to group text near the configured character limit while keeping chunks educationally meaningful. Preserves strict curriculum metadata.
3. **Embeddings**: Uses `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` by default for multilingual vector representations.
4. **Vector Store**: Uses `FAISS` (FlatIP) to index embeddings, mapping vector IDs to chunk metadata. Persists locally, records the embedding-model identity, and re-embeds and remaps stored chunks when that model changes. Legacy chunks missing board or grade metadata remain stored but cannot pass strict curriculum retrieval.
5. **Retriever**: Embeds queries and searches the vector store, applying **strict curriculum filters**. Board, grade, and subject must match; any supplied optional curriculum field must also match. The candidate search expands until enough filtered results are found or the index is exhausted.
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
