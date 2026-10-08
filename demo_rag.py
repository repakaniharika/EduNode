import json
import logging
from edunode.backend.rag.ingest import ingest_document
from edunode.backend.rag.retriever import retrieve
from edunode.backend.rag.schemas import RetrievalRequest
from edunode.backend.rag.concept_graph import concept_graph

# Set up logging for demo output
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

def create_synthetic_pdf(filepath: str, title: str, text: str):
    """Creates a basic PDF using ReportLab. We'll pip install reportlab just for the demo script if needed."""
    try:
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
    except ImportError:
        import subprocess
        import sys
        print("Installing reportlab for PDF generation...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "reportlab"])
        from reportlab.pdfgen import canvas
        from reportlab.lib.pagesizes import letter
        
    c = canvas.Canvas(filepath, pagesize=letter)
    c.drawString(72, 720, title)
    
    # Simple text wrapping for demo
    y = 680
    for line in text.split('\n'):
        c.drawString(72, y, line)
        y -= 20
        if y < 72:
            c.showPage()
            y = 720
            
    c.save()

def run_demo():
    print("==================================================")
    print("EDUNODE MEMBER 3: CURRICULUM RAG & CONCEPT GRAPH")
    print("==================================================\n")

    # 1. Load Master Curriculum Concept Graph
    print("STEP 1: Loading Master Curriculum Concept Graph")
    concept_graph.load_from_json("data/curriculum/concept_graph.json")
    print("Concepts Loaded:", list(concept_graph.concepts.keys()))
    print()

    # 2. Create synthetic DEMO curriculums for 5 boards
    print("STEP 2: Creating SYNTHETIC DEMO curriculum PDFs for 5 boards")
    
    boards_data = [
        ("cbse", 8, "mathematics", "cbse_math8.pdf", "CBSE Class 8 Math - CHAPTER 2: Linear Equations\n\nTo solve a linear equation like 2x + 5 = 15, first subtract 5 from both sides.\nThen divide by 2. This is CBSE curriculum."),
        ("kerala", 8, "mathematics", "kerala_math8.pdf", "Kerala SCERT Math 8 - CHAPTER 3: Solving Equations\n\nIn this chapter we learn to solve equations. If you have 2x + 5 = 15, subtract 5 to get 2x = 10.\nSo x = 5. This is Kerala specific curriculum."),
        ("tamil_nadu", 8, "mathematics", "tn_math8.pdf", "Samacheer Kalvi Math 8 - CHAPTER Algebra\n\nLinear equations have degree 1. Solve 2x + 5 = 15 by transposition."),
        ("andhra_pradesh", 8, "mathematics", "ap_math8.pdf", "AP Board Math 8 - CHAPTER Linear Equations\n\nA simple linear equation: 2x + 5 = 15. The solution is x = 5."),
        ("telangana", 8, "mathematics", "ts_math8.pdf", "TS Board Math 8 - CHAPTER Equations\n\nVariables and constants. 2x + 5 = 15 -> x = 5.")
    ]
    
    # 3. Ingest documents
    print("\nSTEP 3 & 4: Ingesting documents (Parsing -> Cleaning -> Chunking -> Concept Mapping -> Embeddings -> FAISS)")
    for board, grade, subject, filename, text in boards_data:
        filepath = f"data/curriculum/{board}/class_{grade}/{filename}"
        create_synthetic_pdf(filepath, filename, text)
        print(f"Ingesting: {filename} (Board: {board})")
        
        ingest_document(
            file_path=filepath,
            document_name=filename,
            board=board,
            grade=grade,
            subject=subject,
            medium="english"
        )
    print()
        
    # 5. Query with STRICT Filtering
    print("STEP 5: Asking a question with strict KERALA board filtering")
    query = "How do I solve a linear equation like 2x + 5 = 15?"
    req = RetrievalRequest(
        query=query,
        board="kerala",
        grade=8,
        subject="mathematics",
        top_k=3
    )
    
    print(f"Query: '{query}'")
    print(f"Filters: Board=kerala, Grade=8, Subject=mathematics\n")
    
    response = retrieve(req)
    
    # 6. Verify cross-board filtering
    print("STEP 6: Verify retrieval only returns Kerala curriculum")
    for res in response.results:
        print(f" - Matched Document: {res.document_name} | Board: {res.board} | Score: {res.score:.2f}")
    print()

    # 7. Show concepts
    print("STEP 7: Identified Concepts (Semantic Mapping)")
    for c in response.concepts:
        print(f" - {c.name} ({c.concept_id}) | Score: {c.score:.2f}")
    print()
    
    # 8. Show prerequisites & dependents
    print("STEP 8 & 10: Concept Details for Member 4 (Student Knowledge Graph)")
    for ctx in response.concept_context:
        print(json.dumps(ctx.model_dump(), indent=2))
    print()
    
    # 9. Output Integration Contract for Member 2
    print("STEP 9: Exact JSON Integration Contract for Member 2")
    print(response.model_dump_json(indent=2))
    print()
    
    print("Demo completed successfully.")

if __name__ == "__main__":
    run_demo()
