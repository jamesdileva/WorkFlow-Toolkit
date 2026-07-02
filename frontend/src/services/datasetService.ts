import { api } from "../api/client";

import type { Dataset } from "../types/Dataset";

export interface DatasetSummary {
    rows: number;
    columns: number;
    missing_values: number;
    duplicate_rows: number;
}

export interface DatasetPreview {
    rows: number;

    columns: number;

    headers: string[];

    preview: string[][];
}

export interface DatasetHealth {
    health_score: number;
    summary: {
        rows: number;
        columns: number;
        missing_values: number;
        duplicate_rows: number;
    };
}

export async function getDatasetCount() {
    return api<{ count: number }>(
        "/api/datasets/count"
    );
}

export interface TotalRowsResponse {
    rows: number;
}

async function getTotalRows() {
    return api<TotalRowsResponse>(
        "/api/datasets/rows"
    );
}

async function getDatasetSummary(
    datasetId: number
) {
    return api<DatasetSummary>(
        `/api/datasets/${datasetId}/summary`
    );
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

async function removeDuplicates(
    datasetId: number
) {
    return api<Dataset>(
        `/api/transformations/remove-duplicates/${datasetId}`,
        {
            method: "POST",
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

function getDatasetHealth(
    datasetId: number,
) {
    return api<DatasetHealth>(
        `/api/datasets/${datasetId}/health`
    );
}

export const datasetService = {
    getDatasets,
    getDatasetsByProject,
    getDataset,
    getDatasetPreview,
    importDataset,
    removeDuplicates,
    deleteDataset,
    getDatasetSummary,
    getDatasetCount,
    getTotalRows,
    getDatasetHealth,
};