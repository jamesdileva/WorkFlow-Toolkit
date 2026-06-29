from sqlalchemy.orm import Session

from app.repositories.dataset_repository import DatasetRepository
from app.schemas.dataset_schema import DatasetCreate
from fastapi import UploadFile

from app.utils.dataset_importer import (
    DatasetImporter,
)

import pandas as pd

from pathlib import Path

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

    @staticmethod
    def get_dataframe(
        db: Session,
        dataset_id: int,
    ):
        dataset = DatasetRepository.get_by_id(
            db,
            dataset_id,
        )

        if not dataset:
            return None

        path = Path(dataset.file_path)

        return pd.read_csv(path)
    
   
    @staticmethod
    def get_dataset_summary(
        db: Session,
        dataset_id: int,
    ):
        dataframe = DatasetService.get_dataframe(
            db,
            dataset_id,
        )

        if dataframe is None:
            return None

        return {
            "rows": len(dataframe),
            "columns": len(dataframe.columns),
            "missing_values": int(
                dataframe.isna().sum().sum()
            ),
            "duplicate_rows": int(
                dataframe.duplicated().sum()
            ),
        }    
        
    @staticmethod
    def compare_datasets(
        db: Session,
        left_dataset_id: int,
        right_dataset_id: int,
    ):
        left = DatasetService.get_dataframe(
            db,
            left_dataset_id,
        )

        right = DatasetService.get_dataframe(
            db,
            right_dataset_id,
        )

        if left is None or right is None:
            return None

        left_rows = len(left)
        right_rows = len(right)

        left_columns = len(left.columns)
        right_columns = len(right.columns)

        left_missing = int(
            left.isna().sum().sum()
        )

        right_missing = int(
            right.isna().sum().sum()
        )

        left_duplicates = int(
            left.duplicated().sum()
        )

        right_duplicates = int(
            right.duplicated().sum()
        )

        return {
            "left_rows": left_rows,
            "right_rows": right_rows,
            "row_difference": right_rows - left_rows,

            "left_columns": left_columns,
            "right_columns": right_columns,
            "column_difference":
                right_columns - left_columns,

            "left_missing": left_missing,
            "right_missing": right_missing,
            "missing_difference":
                right_missing - left_missing,

            "left_duplicates": left_duplicates,
            "right_duplicates": right_duplicates,
            "duplicate_difference":
                right_duplicates - left_duplicates,
        }