export interface Dataset {
    id: number;

    project_id: number;

    name: string;

    file_name: string;

    file_path: string;

    row_count: number;

    column_count: number;

    created_at: string;
}