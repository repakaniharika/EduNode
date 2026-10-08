from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.modules.tutor.router import router as tutor_router

app = FastAPI(title="EduNode API")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tutor_router)

# Optional: Include voice router if it exists, uncomment when implemented
# from voice.router import router as voice_router
# app.include_router(voice_router)

@app.get("/")
async def root():
    return {"message": "Welcome to EduNode API!"}
