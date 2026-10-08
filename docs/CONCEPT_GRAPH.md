# Concept Graph vs Knowledge Graph

This document clarifies the distinction between Member 3's responsibility and Member 4's responsibility in the EduNode system.

## 1. Master Curriculum Concept Graph (Owned by Member 3)
Member 3 maintains the **Master Curriculum Concept Graph**. 

**What is it?**
It is a static (or semi-static) ontology that defines the structure of the curriculum itself. It answers questions about the domain:
- What concepts exist in 8th Grade Math?
- What must you learn *before* you can learn Linear Equations? (Prerequisites)
- What concepts *build upon* Linear Equations? (Dependents)

**Example Node:**
```json
{
  "concept_id": "linear_equations",
  "name": "Linear Equations",
  "description": "Equations of the first order."
}
```

**Example Edge:**
```json
{
  "source": "algebra",
  "target": "linear_equations",
  "relation": "prerequisite_for"
}
```

## 2. Student Knowledge Graph (Owned by Member 4)
Member 4 maintains the **Student Knowledge Graph**.

**What is it?**
It is a dynamic, user-specific profile that maps a particular student's learning state onto the Master Curriculum Graph provided by Member 3.

**Example Use Case:**
1. A student asks a question about `2x + 5 = 15`.
2. **Member 3** maps this query to the curriculum concept: `linear_equations`.
3. **Member 2** (Gemma) identifies that the student is struggling because they didn't know how to isolate the variable.
4. **Member 4** records this interaction. It queries Member 3 for the prerequisites of `linear_equations`.
5. Member 3 returns `algebra` and `fraction_operations`.
6. **Member 4** updates the *Student* Knowledge Graph to indicate that the student has a mastery deficit in `algebra`, which is currently blocking their progress in `linear_equations`.

## API Contracts
Member 4 queries Member 3 using the Concept APIs:
- `GET /api/rag/concepts/{concept_id}/prerequisites`
- `GET /api/rag/concepts/{concept_id}/dependents`

These clean boundaries ensure that RAG/Curriculum logic stays entirely separated from Student Profile logic.
