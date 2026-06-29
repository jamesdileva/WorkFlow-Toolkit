import { useEffect, useRef, useState } from "react";

import { useProject } from "../../context/ProjectContext";

import type { Dataset } from "../../types/Dataset";

import { datasetService } from "../../services/datasetService";

import DatasetCard from "../../components/DatasetCard/DatasetCard";
import { useDataset } from "../../context/DatasetContext";
import "./ImportHub.css";
import DatasetExplorer from "../../components/DatasetExplorer/DatasetExplorer";
import { useComparison } from "../../context/ComparisonContext";

import { comparisonService } from "../../services/comparisonService";

import type { DatasetComparisonSummary }
from "../../types/DatasetComparisonSummary";

export default function ImportHub() {
    const { activeProject } = useProject();
    const {
        activeDataset,
        setActiveDataset,
    } = useDataset();
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const {
        comparison,
        setComparison,
    } = useComparison();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadDatasets = async () => {
        if (!activeProject) return;

        const data =
            await datasetService.getDatasetsByProject(
                activeProject.id
            );

        setDatasets(data);
    };

    const [comparisonResult, setComparisonResult] =
        useState<DatasetComparisonSummary | null>(
            null
        );

    async function handleDeleteDataset(
            datasetId: number
        ) {
            try {

                await datasetService.deleteDataset(
                    datasetId
                );

                if (activeDataset?.id === datasetId) {
                    setActiveDataset(null);
                }

                await loadDatasets();

            } catch (error) {
                console.error(error);
            }
        }

    useEffect(() => {

        loadDatasets();

    }, [activeProject]);

    useEffect(() => {

        if (
            comparison.leftDatasetId === null ||
            comparison.rightDatasetId === null
        ) {
            setComparisonResult(null);
            return;
        }

        comparisonService
            .compareDatasets(
                comparison.leftDatasetId,
                comparison.rightDatasetId,
            )
            .then(setComparisonResult)
            .catch(console.error);

    }, [comparison]);


    function handleImportClick() {
        fileInputRef.current?.click();
    }

    async function handleFileSelected(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file || !activeProject) {
            return;
        }

        try {

            await datasetService.importDataset(
                activeProject.id,
                file
            );

        await loadDatasets();

        } catch (error) {

            console.error(error);

        }

        event.target.value = "";
    }

function formatDifference(
    value: number
) {
    if (value > 0) {
        return `+${value}`;
    }

    return value.toString();
}


function getDifferenceClass(
    value: number
) {

    if (value > 0) {
        return "difference-positive";
    }

    if (value < 0) {
        return "difference-negative";
    }

    return "difference-neutral";

}


    return (
        <div className="importhub-page">

            <div className="importhub-header">
                <h1>Import Hub</h1>

                <button
                    className="import-btn"
                    type="button"
                    onClick={handleImportClick}
                    disabled={!activeProject}
                >
                    Import CSV
                </button>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleFileSelected}
            />

            <div className="dataset-list">

                {!activeProject && (
                    <div className="empty-state">
                        Select a project first.
                    </div>
                )}

                {activeProject &&
                    datasets.length === 0 && (
                        <div className="empty-state">
                            No datasets have been imported.
                        </div>
                    )}

                {datasets.map((dataset) => (
                    <DatasetCard
                        key={dataset.id}
                        dataset={dataset}
                        onDelete={handleDeleteDataset}
                    />
                ))}

            </div>

            <div className="comparison-placeholder">

                <h3>Dataset Comparison</h3>

                <label>
                    Left Dataset
                </label>

                <select
                    value={
                        comparison.leftDatasetId ?? ""
                    }
                    onChange={(event) =>
                        setComparison({
                            ...comparison,
                            leftDatasetId:
                                Number(event.target.value),
                        })
                    }
                >

                    <option value="">
                        Select Dataset
                    </option>

                    {datasets.map((dataset) => (

                        <option
                            key={dataset.id}
                            value={dataset.id}
                            disabled={
                                dataset.id ===
                                comparison.rightDatasetId
                            }
                        >
                            {dataset.name}
                        </option>

                    ))}

                </select>

                <label>
                    Right Dataset
                </label>

<select
                    value={
                        comparison.rightDatasetId ?? ""
                    }
                    onChange={(event) =>
                        setComparison({
                            ...comparison,
                            rightDatasetId:
                                Number(event.target.value),
                        })
                    }
                >

                    <option value="">
                        Select Dataset
                    </option>

                    {datasets.map((dataset) => (

                        <option
                            key={dataset.id}
                            value={dataset.id}
                            disabled={
                                dataset.id ===
                                comparison.leftDatasetId
                            }
                        >
                            {dataset.name}
                        </option>

                    ))}
</select>        

{comparisonResult && (

    <div className="comparison-results">

        <h3>Comparison Results</h3>

    <div className="comparison-dataset-names">

        <div>

            <strong>Left Dataset</strong>

            <p>
                {
                    datasets.find(
                        dataset =>
                            dataset.id ===
                            comparison.leftDatasetId
                    )?.name
                }
            </p>

        </div>

        <div>

            <strong>Right Dataset</strong>

            <p>
                {
                    datasets.find(
                        dataset =>
                            dataset.id ===
                            comparison.rightDatasetId
                    )?.name
                }
            </p>

        </div>

    </div>

<div className="comparison-grid">

    <div className="comparison-card">
        <h4>Rows</h4>

        <p>
            {comparisonResult.left_rows}
            {" → "}
            {comparisonResult.right_rows}
        </p>

        <strong
            className={getDifferenceClass(
                comparisonResult.row_difference
            )}
        >
            {formatDifference(
                comparisonResult.row_difference
            )}
        </strong>
    </div>

    <div className="comparison-card">
        <h4>Columns</h4>

        <p>
            {comparisonResult.left_columns}
            {" → "}
            {comparisonResult.right_columns}
        </p>

        <strong
            className={getDifferenceClass(
                comparisonResult.column_difference
            )}
        >
            {formatDifference(
                comparisonResult.column_difference
            )}
        </strong>
    </div>

    <div className="comparison-card">
        <h4>Missing Values</h4>

        <p>
            {comparisonResult.left_missing}
            {" → "}
            {comparisonResult.right_missing}
        </p>

        <strong
            className={getDifferenceClass(
                comparisonResult.missing_difference
            )}
        >
            {formatDifference(
                comparisonResult.missing_difference
            )}
        </strong>
    </div>

    <div className="comparison-card">
        <h4>Duplicates</h4>

        <p>
            {comparisonResult.left_duplicates}
            {" → "}
            {comparisonResult.right_duplicates}
        </p>

        <strong
            className={getDifferenceClass(
                comparisonResult.duplicate_difference
            )}
        >
            {formatDifference(
                comparisonResult.duplicate_difference
            )}
        </strong>
    </div>

</div>

    </div>

)}
            </div>

            <DatasetExplorer
                loadDatasets={loadDatasets}
            />

        </div>
    );
}