import { api } from "../api/client";

import type { Dataset } from "../types/Dataset";

export interface DatasetPreview {
    rows: number;

    columns: number;

    headers: string[];

    preview: string[][];
}

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

async function getDatasetPreview(
    datasetId: number
) {
    return api<DatasetPreview>(
        `/api/datasets/${datasetId}/preview`
    );
}


async function importDataset(
    projectId: number,
    file: File
) {
    const formData = new FormData();

    formData.append(
        "project_id",
        projectId.toString()
    );

    formData.append(
        "file",
        file
    );

    return api<Dataset>(
        "/api/datasets/import",
        {
            method: "POST",
            body: formData,
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
    getDatasetPreview,
    importDataset,
    deleteDataset,
};