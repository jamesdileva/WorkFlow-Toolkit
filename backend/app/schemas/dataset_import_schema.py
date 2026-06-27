from pydantic import BaseModel


class DatasetImportResponse(BaseModel):
    id: int

    project_id: int

    name: str

    file_name: str

    row_count: int

    column_count: int