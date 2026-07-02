from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from app.database.database import get_db
from app.database.dependencies import get_db

from app.services.transformation_history_service import (
    TransformationHistoryService,
)

router = APIRouter(
    prefix="/api/history",
    tags=["History"],
)


@router.get("/recent")
def get_recent_history(
    limit: int = 10,
    db: Session = Depends(get_db),
):
    return TransformationHistoryService.get_recent(
        db,
        limit,
    )