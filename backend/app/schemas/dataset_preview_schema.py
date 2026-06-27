from pydantic import BaseModel


class DatasetPreviewResponse(BaseModel):
    rows: int

    columns: int

    headers: list[str]

    preview: list[list[str]]