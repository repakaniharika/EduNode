from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from edunode.backend.rag.api.routes import router as rag_router

app = FastAPI(
    title="EduNode API",
    description="Backend for EduNode - Curriculum-grounded AI learning intelligence system.",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the RAG routes from Member 3
app.include_router(rag_router, prefix="/api/rag", tags=["RAG"])

@app.get("/")
def root():
    return {"message": "Welcome to the EduNode Backend API"}
