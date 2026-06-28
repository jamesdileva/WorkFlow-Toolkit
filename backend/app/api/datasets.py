from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.dataset_schema import (
    DatasetCreate,
    DatasetResponse,
)
from app.services.dataset_service import DatasetService
from app.models.dataset import Dataset
from app.utils.dataset_analyzer import DatasetAnalyzer
from app.schemas.dataset_preview_schema import (
    DatasetPreviewResponse,
)
from fastapi import File
from fastapi import Form
from fastapi import UploadFile

from app.schemas.dataset_import_schema import (
    DatasetImportResponse,
)

from app.repositories.dataset_repository import DatasetRepository

router = APIRouter(
    prefix="/api/datasets",
    tags=["Datasets"],
)


@router.get(
    "/",
    response_model=list[DatasetResponse],
)
def get_datasets(
    db: Session = Depends(get_db),
):
    return DatasetService.get_all(db)


@router.get(
    "/project/{project_id}",
    response_model=list[DatasetResponse],
)
def get_project_datasets(
    project_id: int,
    db: Session = Depends(get_db),
):
    return DatasetService.get_by_project(
        db,
        project_id,
    )

@router.delete("/{dataset_id}")
def delete_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
):
    result = DatasetRepository.delete_by_id(
        db,
        dataset_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found",
        )

    return {
        "message": "Dataset deleted"
    }

@router.get(
    "/{dataset_id}",
    response_model=DatasetResponse,
)
def get_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
):
    dataset = DatasetService.get_by_id(
        db,
        dataset_id,
    )

    if dataset is None:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found",
        )

    return dataset

@router.get(
    "/{dataset_id}/preview",
    response_model=DatasetPreviewResponse,
)
def preview_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
):
    dataset = (
        db.query(Dataset)
        .filter(Dataset.id == dataset_id)
        .first()
    )

    if dataset is None:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found",
        )

    return DatasetAnalyzer.analyze(
        dataset.file_path
    )

@router.get("/{dataset_id}/summary")
def get_dataset_summary(
        dataset_id: int,
        db: Session = Depends(get_db),
    ):
        summary = DatasetService.get_dataset_summary(
            db,
            dataset_id,
        )

        if summary is None:
            raise HTTPException(
                status_code=404,
                detail="Dataset not found",
            )

        return summary


"""
@router.post(
    "/",
    response_model=DatasetResponse,
)
def create_dataset(
    dataset: DatasetCreate,
    db: Session = Depends(get_db),
):
    return DatasetService.create(
        db,
        dataset,
    )
"""

@router.post(
    "/import",
    response_model=DatasetImportResponse,
)
def import_dataset(
    project_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return DatasetService.import_dataset(
        db,
        project_id,
        file,
    )    


@router.delete(
    "/{dataset_id}",
)
def delete_dataset(
    dataset_id: int,
    db: Session = Depends(get_db),
):
    dataset = DatasetService.delete(
        db,
        dataset_id,
    )

    if dataset is None:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found",
        )

    return {
        "message": "Dataset deleted successfully"
    }