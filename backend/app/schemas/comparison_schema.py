from pydantic import BaseModel


class DatasetComparisonSummary(
    BaseModel,
):

    left_rows: int

    right_rows: int

    row_difference: int

    left_columns: int

    right_columns: int

    column_difference: int

    left_missing: int

    right_missing: int

    missing_difference: int

    left_duplicates: int

    right_duplicates: int

    duplicate_difference: int