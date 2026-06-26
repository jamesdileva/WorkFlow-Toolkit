from sqlalchemy.orm import Session

from app.repositories.dataset_repository import DatasetRepository
from app.schemas.dataset_schema import DatasetCreate


class DatasetService:

    @staticmethod
    def get_all(
        db: Session,
    ):
        return DatasetRepository.get_all(db)

    @staticmethod
    def get_by_project(
        db: Session,
        project_id: int,
    ):
        return DatasetRepository.get_by_project(
            db,
            project_id,
        )

    @staticmethod
    def get_by_id(
        db: Session,
        dataset_id: int,
    ):
        return DatasetRepository.get_by_id(
            db,
            dataset_id,
        )

    @staticmethod
    def create(
        db: Session,
        dataset_data: DatasetCreate,
    ):
        return DatasetRepository.create(
            db,
            dataset_data,
        )

    @staticmethod
    def delete(
        db: Session,
        dataset_id: int,
    ):
        return DatasetRepository.delete(
            db,
            dataset_id,
        )