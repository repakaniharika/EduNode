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
- `grade`: (String, Optional) Grade level (e.g., "8").
- `subject`: (String, Optional) Subject name (e.g., "Mathematics").
- `curriculum`: (String, Optional) Curriculum/Board name (e.g., "NCERT").

### Response
```json
{
  "success": true,
  "document_id": "synthetic_math_4a8d1f",
  "document_name": "synthetic_math.pdf",
  "chunks_created": 3,
  "status": "indexed",
  "error": null
}
```

---

## 2. Retrieval Endpoint (For Member 2)

**Endpoint:** `POST /retrieve`
**Content-Type:** `application/json`

Provides context-grounded curriculum material to be passed to the Gemma AI engine.

### Request Body
```json
{
  "query": "How do I solve 2x + 5 = 15?",
  "grade": "8",
  "subject": "Mathematics",
  "curriculum": "NCERT",
  "top_k": 5
}
```

### Response
```json
{
  "query": "How do I solve 2x + 5 = 15?",
  "results": [
    {
      "text": "A linear equation is an equation of the first order...",
      "score": 0.89,
      "document": "synthetic_math.pdf",
      "chapter": "CHAPTER 1: LINEAR EQUATIONS",
      "section": null,
      "page": 1,
      "concept_ids": ["linear_equations"]
    }
  ],
  "context": "SOURCE 1\nDocument: synthetic_math.pdf\nChapter: CHAPTER 1: LINEAR EQUATIONS\nPage: 1\n\nRelevant curriculum:\nA linear equation is an equation of the first order...",
  "concepts": [
    {
      "concept_id": "linear_equations",
      "score": 0.93
    }
  ]
}
```

---

## 3. Concept Graph Endpoints (For Member 4)

Provides curriculum structure.

### 3.1 Get Concept Details
**Endpoint:** `GET /concepts/{concept_id}`

**Response:**
```json
{
  "concept_id": "linear_equations",
  "name": "Linear Equations",
  "prerequisites": [
    "algebra",
    "algebraic_fractions"
  ],
  "dependents": [
    "quadratic_equations"
  ],
  "related": []
}
```

### 3.2 Get Prerequisites
**Endpoint:** `GET /concepts/{concept_id}/prerequisites`

**Response:**
```json
[
  "algebra",
  "algebraic_fractions"
]
```

### 3.3 Get Dependents
**Endpoint:** `GET /concepts/{concept_id}/dependents`

**Response:**
```json
[
  "quadratic_equations"
]
```

### 3.4 Map Query to Concepts
**Endpoint:** `POST /concepts/map?query=How to solve a linear equation?`

Uses semantic similarity against concept descriptions to identify the concepts involved in a student's question.

**Response:**
```json
[
  {
    "concept_id": "linear_equations",
    "score": 0.91
  },
  {
    "concept_id": "algebra",
    "score": 0.76
  }
]
```
