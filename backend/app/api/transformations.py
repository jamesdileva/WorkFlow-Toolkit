from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.dependencies import get_db

from app.repositories.dataset_repository import (
    DatasetRepository,
)

from app.services.transformation_service import (
    TransformationService,
)

from app.schemas.dataset_schema import (
    DatasetResponse,
)

router = APIRouter(
    prefix="/api/transformations",
    tags=["Transformations"],
)


@router.post(
    "/remove-duplicates/{dataset_id}",
    response_model=DatasetResponse,
)
def remove_duplicates(
    dataset_id: int,
    db: Session = Depends(get_db),
):

    dataset = DatasetRepository.get_by_id(
        db,
        dataset_id,
    )

    if not dataset:
        raise HTTPException(
            status_code=404,
            detail="Dataset not found",
        )

    return TransformationService.remove_duplicates(
        db,
        dataset,
    )