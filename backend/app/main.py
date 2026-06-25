from fastapi import FastAPI
from app.database.database import Base
from app.database.database import engine

from app.models.project import Project

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="WorkFlow Toolkit API"
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