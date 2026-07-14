from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers.interaction import router as interaction_router
from .routers.dashboard import router as dashboard_router

# Create database tables
Base.metadata.create_all(bind=engine)

# FastAPI App
app = FastAPI(
    title="AI-First CRM API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(interaction_router)
app.include_router(dashboard_router)


# Home API
@app.get("/")
def home():
    return {
        "message": "AI-First CRM Backend Running 🚀"
    }


# Health Check API
@app.get("/health")
def health():
    return {
        "status": "OK"
    }