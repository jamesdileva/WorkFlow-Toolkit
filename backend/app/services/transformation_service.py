from pathlib import Path

from sqlalchemy.orm import Session

from app.repositories.dataset_repository import DatasetRepository

from app.schemas.dataset_schema import DatasetCreate

from app.transformations.transformation_engine import (
    TransformationEngine,
)

from app.transformations.operations.remove_duplicates import (
    remove_duplicates,
)
from app.services.transformation_history_service import (
    TransformationHistoryService,
)
from app.utils.project_storage import ProjectStorage


class TransformationService:

    @staticmethod
    def remove_duplicates(
        db: Session,
        dataset,
    ):

        input_path = Path(dataset.file_path)

        project_dir = ProjectStorage.get_project_directory(
            dataset.project_id
        )

        generated_dir = (
            project_dir / "generated"
        )

        generated_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        output_name = (
            f"{input_path.stem}_deduplicated.csv"
        )

        output_path = (
            generated_dir / output_name
        )

        metadata = TransformationEngine.execute(
            str(input_path),
            str(output_path),
            remove_duplicates,
        )

        new_dataset = DatasetCreate(
            project_id=dataset.project_id,
            name=output_path.stem,
            file_name=output_name,
            file_path=str(output_path),
            row_count=metadata["rows"],
            column_count=metadata["columns"],
        )

        created_dataset = DatasetRepository.create(
            db,
            new_dataset,
        )

        TransformationHistoryService.create(
            db,
            dataset_id=created_dataset.id,
            transformation="Remove Duplicates",
            details=(
                f"Created from dataset "
                f"{dataset.id}"
            ),
        )

        return created_dataset