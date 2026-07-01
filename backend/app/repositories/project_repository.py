from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project_schema import ProjectCreate


class ProjectRepository:

    @staticmethod
    def get_all(db: Session):
        return (
            db.query(Project)
            .order_by(Project.created_at.desc())
            .all()
        )

    @staticmethod
    def get_by_id(
        db: Session,
        project_id: int
    ):
        return (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

    @staticmethod
    def create(
        db: Session,
        project_data: ProjectCreate
    ):
        project = Project(
            name=project_data.name,
            description=project_data.description
        )

        db.add(project)
        db.commit()
        db.refresh(project)

        return project

    @staticmethod
    def delete(
        db: Session,
        project_id: int
    ):
        project = (
            db.query(Project)
            .filter(Project.id == project_id)
            .first()
        )

        if not project:
            return None

        db.delete(project)
        db.commit()

        return project

    @staticmethod
    def count(
        db: Session,
    ):
        return (
            db.query(Project)
            .count()
        )