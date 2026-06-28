from fastapi import FastAPI
from app.database.database import Base
from app.database.database import engine

from app.models.project import Project
from app.api.projects import router as projects_router
from fastapi.middleware.cors import CORSMiddleware
from app.models.dataset import Dataset
from app.api.datasets import router as datasets_router
from app.api.transformations import (
    router as transformations_router,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="WorkFlow Toolkit API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    projects_router
)
app.include_router(datasets_router)
app.include_router(
    transformations_router
)

@app.get("/")
def root():
    return {
        "status": "running"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

    