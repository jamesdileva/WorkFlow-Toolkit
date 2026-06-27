from sqlalchemy.orm import Session

from app.repositories.dataset_repository import DatasetRepository
from app.schemas.dataset_schema import DatasetCreate
from fastapi import UploadFile

from app.utils.dataset_importer import (
    DatasetImporter,
)

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
    def import_dataset(
        db: Session,
        project_id: int,
        file: UploadFile,
    ):

        metadata = DatasetImporter.import_csv(
            project_id,
            file,
        )

        dataset = DatasetCreate(
            project_id=project_id,
            name=metadata["name"],
            file_name=metadata["file_name"],
            file_path=metadata["file_path"],
            row_count=metadata["row_count"],
            column_count=metadata["column_count"],
        )

        return DatasetRepository.create(
            db,
            dataset,
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