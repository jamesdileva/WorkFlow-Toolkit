import { useEffect, useState } from "react";

import { useDataset } from "../../context/DatasetContext";

import {
    datasetService,
    type DatasetPreview,
} from "../../services/datasetService";

import "./DatasetExplorer.css";
import PreviewTable from "../PreviewTable/PreviewTable";


export default function DatasetExplorer({
    loadDatasets,
}: {
    loadDatasets: () => Promise<void>;
}) {
    const { activeDataset } = useDataset();
    const [summary, setSummary] = useState<any>(null);
    
    const [preview, setPreview] =
        useState<DatasetPreview | null>(null);

    async function handleRemoveDuplicates() {

        if (!activeDataset) return;

        try {

            const newDataset =
                await datasetService.removeDuplicates(
                    activeDataset.id
                );

            await loadDatasets();

            // optional: auto-select new dataset if returned
            if (newDataset?.id) {
                // handled via context or parent (next step if needed)
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!activeDataset) {
            setPreview(null);
            return;
        }

        datasetService
            .getDatasetPreview(activeDataset.id)
            .then(setPreview)
            .catch(console.error);

        datasetService
            .getDatasetSummary(activeDataset.id)
            .then(setSummary)
            .catch(console.error);    

    }, [activeDataset]);

    if (!activeDataset) {
        return (
            <div className="dataset-explorer">
                Select a dataset to preview.
            </div>
        );
    }

    return (
    <div className="dataset-explorer">

        <div className="dataset-metadata">

            <div>
                <strong>Name</strong>
                <p>{activeDataset.name}</p>
            </div>

            <div>
                <strong>File</strong>
                <p>{activeDataset.file_name}</p>
            </div>

            {preview && (
                <>
                    <div>
                        <strong>Rows</strong>
                        <p>{preview.rows}</p>
                    </div>

                    <div>
                        <strong>Columns</strong>
                        <p>{preview.columns}</p>
                    </div>
                </>
            )}

        </div>

        <button
            onClick={handleRemoveDuplicates}
            disabled={!activeDataset}
        >
            Remove Duplicates
        </button>

    {summary && (
        <div className="analytics-card">

            <h3>Dataset Analytics</h3>

            <div className="dataset-summary-chart">

                <div>
                    <strong>Rows</strong>
                    <div className="bar">
                        <div
                            style={{
                                width: `${Math.min(summary.rows / 10, 100)}%`,
                            }}
                        />
                    </div>
                    <span>{summary.rows}</span>
                </div>

                <div>
                    <strong>Columns</strong>
                    <div className="bar">
                        <div
                            style={{
                                width: `${Math.min(summary.columns * 10, 100)}%`,
                            }}
                        />
                    </div>
                    <span>{summary.columns}</span>
                </div>

                <div>
                    <strong>Missing</strong>
                    <div className="bar">
                        <div
                            style={{
                                width: `${Math.min(summary.missing_values, 100)}%`,
                            }}
                        />
                    </div>
                    <span>{summary.missing_values}</span>
                </div>

                <div>
                    <strong>Duplicates</strong>
                    <div className="bar">
                        <div
                            style={{
                                width: `${Math.min(summary.duplicate_rows, 100)}%`,
                            }}
                        />
                    </div>
                    <span>{summary.duplicate_rows}</span>
                </div>

            </div>

        </div>
    )}

        {preview && (
            
            <PreviewTable preview={preview} />
        )}

    </div>
);
}

