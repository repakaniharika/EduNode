import os
import fitz
from pathlib import Path
from edunode.backend.rag.ingest import ingest_document
from edunode.backend.rag.retriever import retrieve
from edunode.backend.rag.schemas import RetrievalRequest
from edunode.backend.rag.concept_graph import concept_graph

# 1. Ensure concepts graph is loaded
concept_graph_path = Path("data/curriculum/math_grade8_concepts.json")
if concept_graph_path.exists():
    concept_graph.load_from_json(str(concept_graph_path))
else:
    print(f"Concept graph missing at {concept_graph_path}")

# 2. Create a synthetic curriculum document for demo purposes
demo_pdf_path = Path("data/curriculum/synthetic_math.pdf")
doc = fitz.open()
page = doc.new_page()
text = """
CHAPTER 1: LINEAR EQUATIONS

A linear equation is an equation of the first order. These equations are defined by lines in the coordinate system.
An example of a linear equation is 2x + 5 = 15. 
To solve a linear equation, you generally want to isolate the variable on one side.
For example, to solve 2x + 5 = 15:
1. Subtract 5 from both sides: 2x = 10
2. Divide by 2: x = 5

Before solving linear equations, students must master algebraic fractions and basic algebra.
"""
page.insert_text((50, 50), text)
doc.save(demo_pdf_path)
doc.close()
print("Created synthetic curriculum PDF.")

# 3. Ingest it
print("\n--- INGESTING DOCUMENT ---")
response = ingest_document(str(demo_pdf_path), "synthetic_math.pdf", "Mathematics", "8", "DemoBoard")
print(f"Ingest Response: {response.model_dump_json(indent=2)}")

# 4. Query it
print("\n--- RETRIEVING CONTEXT ---")
req = RetrievalRequest(
    query="How do I solve a linear equation? Like 2x + 5 = 15?",
    grade="8",
    subject="Mathematics",
    top_k=3
)
retrieval_response = retrieve(req)

print("\n[TOP RETRIEVED SOURCES]")
for res in retrieval_response.results:
    print(f"- Doc: {res.document}, Page: {res.page}, Score: {res.score:.2f}")

print("\n[IDENTIFIED CONCEPTS FROM CURRICULUM]")
for c in retrieval_response.concepts:
    print(f"- Concept: {c.concept_id}, Score: {c.score:.2f}")

print("\n[FINAL RAG CONTEXT SENT TO MEMBER 2 (GEMMA)]")
print(retrieval_response.context)

# 5. Concept Lookup for Member 4
print("\n--- MEMBER 4 KNOWLEDGE GRAPH INTEGRATION ---")
# Pick top concept
if retrieval_response.concepts:
    top_concept = retrieval_response.concepts[0].concept_id
    details = concept_graph.get_concept_details(top_concept)
    if details:
        print(f"\n[CONCEPT LOOKUP: {details.name}]")
        print(f"Prerequisites: {details.prerequisites}")
        print(f"Dependents: {details.dependents}")
    else:
        print(f"Concept {top_concept} not found in the master graph.")

print("\nDemo Complete. 🚀")
