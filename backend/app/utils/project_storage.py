from pathlib import Path


DATA_ROOT = Path("storage")


class ProjectStorage:

    @staticmethod
    def get_project_directory(
        project_id: int,
    ) -> Path:

        project_dir = (
            DATA_ROOT
            / f"project_{project_id}"
        )

        datasets_dir = (
            project_dir
            / "datasets"
        )

        reports_dir = (
            project_dir
            / "reports"
        )

        exports_dir = (
            project_dir
            / "exports"
        )

        datasets_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        reports_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        exports_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        return project_dir