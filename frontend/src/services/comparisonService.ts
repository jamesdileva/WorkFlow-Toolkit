import { api } from "../api/client";

import type { DatasetComparison } from "../types/DatasetComparison";
import type { DatasetComparisonSummary }
from "../types/DatasetComparisonSummary";

function getEmptyComparison(): DatasetComparison {

    return {
        leftDatasetId: null,
        rightDatasetId: null,
    };

}

async function compareDatasets(
    leftDatasetId: number,
    rightDatasetId: number,
) {
    return api<DatasetComparisonSummary>(
        `/api/datasets/compare?left_dataset_id=${leftDatasetId}&right_dataset_id=${rightDatasetId}`
    );
}

export const comparisonService = {

    getEmptyComparison,

    compareDatasets,

};