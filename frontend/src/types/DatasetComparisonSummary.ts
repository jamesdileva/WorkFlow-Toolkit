export interface DatasetComparisonSummary {

    left_rows: number;

    right_rows: number;

    row_difference: number;

    left_columns: number;

    right_columns: number;

    column_difference: number;

    left_missing: number;

    right_missing: number;

    missing_difference: number;

    left_duplicates: number;

    right_duplicates: number;

    duplicate_difference: number;

}