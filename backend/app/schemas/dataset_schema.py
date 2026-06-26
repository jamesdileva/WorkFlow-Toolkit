from datetime import datetime

from pydantic import BaseModel


class DatasetCreate(BaseModel):
    project_id: int
    name: str
    file_name: str
    file_path: str
    row_count: int = 0
    column_count: int = 0


class DatasetResponse(BaseModel):
    id: int
    project_id: int
    name: str
    file_name: str
    file_path: str
    row_count: int
    column_count: int
    created_at: datetime

    class Config:
        from_attributes = True