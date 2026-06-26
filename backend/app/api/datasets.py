from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.schemas.dataset_schema import (
    DatasetCreate,
    DatasetResponse,
)
from app.services.dataset_service import DatasetService

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