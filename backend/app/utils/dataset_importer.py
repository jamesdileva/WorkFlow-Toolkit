import shutil
from pathlib import Path

from fastapi import UploadFile

from app.utils.project_storage import (
    ProjectStorage,
)

from app.utils.dataset_analyzer import (
    DatasetAnalyzer,
)


class DatasetImporter:

    @staticmethod
    def import_csv(
        project_id: int,
        file: UploadFile,
    ):

        project_dir = (
            ProjectStorage.get_project_directory(
                project_id
            )
        )

        datasets_dir = (
            project_dir / "datasets"
        )

        destination = (
            datasets_dir / file.filename
        )

        with destination.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        analysis = DatasetAnalyzer.analyze(
            str(destination)
        )

        return {
            "name": Path(file.filename).stem,
            "file_name": file.filename,
            "file_path": str(destination),
            "row_count": analysis["rows"],
            "column_count": analysis["columns"],
        }