# EduNode - Member 3 (RAG + Concept Graph)

This module implements the **Curriculum-Grounded Retrieval-Augmented Generation (RAG)** and **Curriculum Concept Graph Foundation** for the EduNode project.

## Responsibilities
- **Ingest** curriculum documents (PDFs) provided by teachers.
- **Process** documents via parsing, cleaning, semantic chunking, and embedding generation.
- **Retrieve** contextually relevant curriculum chunks to ground the Gemma AI engine (Member 2).
- **Structure** a Master Curriculum Concept Graph that defines prerequisite and dependent relationships among topics, to be consumed by the Student Knowledge Graph (Member 4).

## Architecture

1. **Parser & Cleaner**: Extracts text using PyMuPDF and cleans PDF artifacts.
2. **Chunker**: Uses heuristics (paragraphs, headings) to group text while respecting token limits and keeping chunks educationally meaningful.
3. **Embeddings**: Uses `sentence-transformers` (default `all-MiniLM-L6-v2`) to generate vector representations.
4. **Vector Store**: Uses `FAISS` (FlatIP) to index embeddings, mapping vector IDs to chunk metadata. Persists locally.
5. **Retriever**: Embeds queries and searches the vector store, applying curriculum/grade metadata filters.
6. **Concept Graph**: A JSON-driven ontology that maps out how curriculum topics relate (e.g., `prerequisite_for`). Maps student queries to these topics semantically.
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

The API will be available at `http://127.0.0.1:8000`. 
Swagger UI documentation is available at `http://127.0.0.1:8000/docs`.

## Running the Demo

To test the entire pipeline end-to-end without the API server:

```bash
python demo_rag.py
```

This script will:
1. Load the Math Grade 8 sample concept graph.
2. Generate a synthetic curriculum PDF.
3. Ingest the document into the RAG system.
4. Query the system with a student question.
5. Display the retrieved sources, concepts, and Member 2 context.

## How to use (API)

### 1. Ingest a Document
Upload a PDF curriculum document via the `/api/rag/upload` endpoint using `multipart/form-data`.

### 2. Retrieve Context (For Member 2)
Send a POST request to `/api/rag/retrieve` with the student query and filters. The response will include a `context` string formatted for Gemma.

### 3. Concept Graphs (For Member 4)
Use the `/api/rag/concepts/*` endpoints to query the Master Curriculum Graph and understand how a topic fits into the broader syllabus.

## Configuration
Configuration variables can be found and modified in `edunode/backend/rag/config.py`, or overridden via Environment Variables:
- `EMBEDDING_MODEL`
- `DEFAULT_TOP_K`
- `CHUNK_SIZE`
- `CHUNK_OVERLAP`

## Testing
To run the automated test suite:
```bash
python -m pytest edunode/backend/rag/tests/
```
