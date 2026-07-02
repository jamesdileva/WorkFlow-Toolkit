from sqlalchemy.orm import Session

from app.models.transformation_history import (
    TransformationHistory,
)


class TransformationHistoryRepository:

    @staticmethod
    def create(
        db: Session,
        dataset_id: int,
        transformation: str,
        details: str | None = None,
    ):

        history = TransformationHistory(
            dataset_id=dataset_id,
            transformation=transformation,
            details=details,
        )

        db.add(history)
        db.commit()
        db.refresh(history)

        return history


    @staticmethod
    def get_recent(
        db: Session,
        limit: int = 10,
    ):
        return (
            db.query(TransformationHistory)
            .order_by(
                TransformationHistory.created_at.desc()
            )
            .limit(limit)
            .all()
        )