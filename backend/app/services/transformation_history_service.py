from sqlalchemy.orm import Session

from app.repositories.transformation_history_repository import (
    TransformationHistoryRepository,
)


class TransformationHistoryService:

    @staticmethod
    def create(
        db: Session,
        dataset_id: int,
        transformation: str,
        details: str | None = None,
    ):
        return (
            TransformationHistoryRepository.create(
                db,
                dataset_id,
                transformation,
                details,
            )
        )

    @staticmethod
    def get_recent(
        db: Session,
        limit: int = 10,
    ):
        return (
            TransformationHistoryRepository.get_recent(
                db,
                limit,
            )
        )