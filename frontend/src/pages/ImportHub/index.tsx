import { useEffect, useRef, useState } from "react";

import { useProject } from "../../context/ProjectContext";

import type { Dataset } from "../../types/Dataset";

import { datasetService } from "../../services/datasetService";

import DatasetCard from "../../components/DatasetCard/DatasetCard";
import { useDataset } from "../../context/DatasetContext";
import "./ImportHub.css";
import DatasetExplorer from "../../components/DatasetExplorer/DatasetExplorer";

export default function ImportHub() {
    const { activeProject } = useProject();
    const {
        activeDataset,
        setActiveDataset,
    } = useDataset();
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [leftDataset, setLeftDataset] =
        useState<Dataset | null>(null);

    const [rightDataset, setRightDataset] =
        useState<Dataset | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const loadDatasets = async () => {
        if (!activeProject) return;

        const data =
            await datasetService.getDatasetsByProject(
                activeProject.id
            );

        setDatasets(data);
    };

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


void leftDataset;
void rightDataset;
void setLeftDataset;
void setRightDataset;

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

                <p>
                    Comparison engine coming in Sprint 7.
                </p>

            </div>

            <DatasetExplorer
                loadDatasets={loadDatasets}
            />

        </div>
    );
}