from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers.interaction import router as interaction_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-First CRM API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(interaction_router)


@app.get("/")
def home():
    return {
        "message": "AI-First CRM Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }