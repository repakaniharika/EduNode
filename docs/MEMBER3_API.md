# Member 3 API Contract

This document outlines the API contracts for the Member 3 RAG and Concept Graph module.

## Base URL
`http://localhost:8000/api/rag`

---

## 1. Teacher Upload Endpoint

**Endpoint:** `POST /upload`
**Content-Type:** `multipart/form-data`

### Request Parameters (Form Data)
- `file`: (File) The PDF document.
- `board`: (String, Required) Allowed values: `cbse`, `tamil_nadu`, `kerala`, `andhra_pradesh`, `telangana`.
- `grade`: (Integer, Required) Allowed values: 6-12.
- `subject`: (String, Required) Subject name (e.g., "Mathematics").
- `medium`: (String, Optional) Language medium (e.g., "english", "malayalam").
- `textbook`: (String, Optional) Textbook name.
- `academic_year`: (String, Optional) E.g., "2026-27".

The supported board IDs are `cbse`, `tamil_nadu`, `kerala`, `andhra_pradesh`,
and `telangana`; grades are 6 through 12. English, Malayalam, Tamil, and Telugu
mediums are accepted. The `medium` value is curriculum metadata and remains
optional.

### Response
```json
{
  "success": true,
  "document_id": "math_class8_a8f9d0",
  "document_name": "math_class8.pdf",
  "chunks_created": 35,
  "status": "indexed",
  "error": null
}
```

---

## 2. Retrieval Endpoint (For Member 2)

**Endpoint:** `POST /retrieve`
**Content-Type:** `application/json`

Provides strictly-filtered context-grounded curriculum material to be passed to the Gemma AI engine.

### Request Body
```json
{
  "query": "How do I solve 2x + 5 = 15?",
  "board": "kerala",
  "grade": 8,
  "subject": "mathematics",
  "medium": "english",
  "top_k": 5
}
```

The required board, grade, and subject filters are exact curriculum constraints:
results missing those metadata fields or belonging to another curriculum are
excluded. Optional `medium`, `textbook`, `academic_year`, `chapter`, and
`document_id` filters are also exact when supplied. `top_k` must be between 1
and 50; retrieval expands its vector-search window as needed to fill the result
count without relaxing filters. Results are reranked within a bounded candidate
pool using semantic concepts mapped to the requested board, grade, and subject.
The response `score` remains the original vector-similarity score.

### Response
```json
{
  "query": "How do I solve 2x + 5 = 15?",
  "curriculum_metadata": {
    "board": "kerala",
    "grade": 8,
    "subject": "mathematics",
    "medium": "english"
  },
  "results": [
    {
      "text": "...",
      "score": 0.93,
      "document_id": "...",
      "document_name": "kerala_math8.pdf",
      "board": "kerala",
      "grade": 8,
      "subject": "mathematics",
      "chapter": "Solving Equations",
      "page_start": 42,
      "page_end": 43,
      "concept_ids": ["linear_equations"]
    }
  ],
  "concepts": [
    {
      "concept_id": "linear_equations",
      "name": "Linear Equations",
      "score": 0.93
    }
  ],
  "concept_context": [
    {
      "concept_id": "linear_equations",
      "name": "Linear Equations",
      "prerequisites": ["algebra"],
      "dependents": ["quadratic_equations"],
      "related": []
    }
  ],
  "context": "SOURCE 1\nDocument: kerala_math8.pdf\nBoard: kerala | Grade: 8 | Subject: mathematics\nChapter: Solving Equations\nPage: 42\nRelevant curriculum:\n..."
}
```

---

## 3. Concept Graph Endpoints (For Member 4)

Provides Master Curriculum structure mappings.

### 3.1 Get Concept Details
**Endpoint:** `GET /concepts/{concept_id}`

### 3.2 Get Prerequisites
**Endpoint:** `GET /concepts/{concept_id}/prerequisites`

### 3.3 Get Dependents
**Endpoint:** `GET /concepts/{concept_id}/dependents`
