from sqlalchemy import create_engine

DATABASE_URL = (
    "sqlite:///data/database/workflow_toolkit.db"
)

engine = create_engine(
    DATABASE_URL
)