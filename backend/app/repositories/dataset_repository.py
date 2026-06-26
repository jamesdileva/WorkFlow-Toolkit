from sqlalchemy.orm import Session

from app.models.dataset import Dataset
from app.schemas.dataset_schema import DatasetCreate


class DatasetRepository:

    @staticmethod
    def get_all(
        db: Session,
    ):
        return (
            db.query(Dataset)
            .order_by(Dataset.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_project(
        db: Session,
        project_id: int,
    ):
        return (
            db.query(Dataset)
            .filter(Dataset.project_id == project_id)
            .order_by(Dataset.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        dataset_id: int,
    ):
        return (
            db.query(Dataset)
            .filter(Dataset.id == dataset_id)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        dataset_data: DatasetCreate,
    ):
        dataset = Dataset(
            project_id=dataset_data.project_id,
            name=dataset_data.name,
            file_name=dataset_data.file_name,
            file_path=dataset_data.file_path,
            row_count=dataset_data.row_count,
            column_count=dataset_data.column_count,
        )

        db.add(dataset)
        db.commit()
        db.refresh(dataset)

        return dataset

    @staticmethod
    def delete(
        db: Session,
        dataset_id: int,
    ):
        dataset = (
            db.query(Dataset)
            .filter(Dataset.id == dataset_id)
            .first()
        )

        if not dataset:
            return None

        db.delete(dataset)
        db.commit()

        return dataset