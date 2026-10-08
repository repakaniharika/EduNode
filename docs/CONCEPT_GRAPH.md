# Concept Graph vs Knowledge Graph

This document clarifies the distinction between Member 3's responsibility and Member 4's responsibility in the EduNode system.

## 1. Master Curriculum Concept Graph (Owned by Member 3)
Member 3 maintains the **Master Curriculum Concept Graph** (`concept_graph.json`). 

**What is it?**
It is a static ontology that defines the structure of the curriculum itself, subject-agnostic. It answers questions about the domain:
- What must you learn *before* you can learn Linear Equations? (Prerequisites)
- What concepts *build upon* Linear Equations? (Dependents)
- How does the concept of "Linear Equations" map to CBSE Grade 8 vs Kerala Grade 8? (`curriculum_mappings`)

**Example Node with Mappings:**
```json
{
  "concept_id": "linear_equations",
  "name": "Linear Equations",
  "description": "Solving equations involving variables...",
  "curriculum_mappings": [
    {
      "board": "cbse",
      "grade": 8,
      "subject": "mathematics",
      "chapter": "Linear Equations in One Variable"
    },
    {
      "board": "kerala",
      "grade": 8,
      "subject": "mathematics",
      "chapter": "Solving Equations"
    }
  ]
}
```

## 2. Student Knowledge Graph (Owned by Member 4)
Member 4 maintains the **Student Knowledge Graph**.

**What is it?**
It is a dynamic, user-specific profile that maps a particular student's learning state onto the Master Curriculum Graph provided by Member 3.

**Example Use Case:**
1. A student asks a question about `2x + 5 = 15`.
2. **Member 3** strictly filters RAG results and automatically assigns the concept `linear_equations` via semantic matching against `concept_graph.json`.
3. **Member 2** (Gemma) identifies that the student is struggling because they didn't know how to isolate the variable.
4. **Member 4** records this interaction. It queries Member 3 for the prerequisites of `linear_equations`.
5. Member 3 returns `algebra` and `fraction_operations`.
6. **Member 4** updates the *Student* Knowledge Graph to indicate that the student has a mastery deficit in `algebra`.
