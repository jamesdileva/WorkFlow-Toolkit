import { api } from "../api/client";

export interface TransformationHistory {
    id: number;
    dataset_id: number;
    transformation: string;
    details: string;
    created_at: string;
}

export function getRecentHistory(
    limit = 10,
) {
    return api<TransformationHistory[]>(
        `/api/history/recent?limit=${limit}`
    );
}