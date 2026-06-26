import { api } from "../api/client";

import type { Dataset } from "../types/Dataset";

function getDatasets() {
    return api<Dataset[]>("/api/datasets");
}

function getDatasetsByProject(
    projectId: number
) {
    return api<Dataset[]>(
        `/api/datasets/project/${projectId}`
    );
}

function getDataset(
    id: number
) {
    return api<Dataset>(
        `/api/datasets/${id}`
    );
}

function createDataset(
    dataset: {
        project_id: number;
        name: string;
        file_name: string;
        file_path: string;
        row_count: number;
        column_count: number;
    }
) {
    return api<Dataset>(
        "/api/datasets",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataset),
        }
    );
}

function deleteDataset(
    id: number
) {
    return api(
        `/api/datasets/${id}`,
        {
            method: "DELETE",
        }
    );
}

export const datasetService = {
    getDatasets,
    getDatasetsByProject,
    getDataset,
    createDataset,
    deleteDataset,
};