from fastapi import FastAPI

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