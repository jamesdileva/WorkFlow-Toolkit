import { useEffect, useRef, useState } from "react";

import { useProject } from "../../context/ProjectContext";

import type { Dataset } from "../../types/Dataset";

import { datasetService } from "../../services/datasetService";

import DatasetCard from "../../components/DatasetCard/DatasetCard";

import "./ImportHub.css";
import DatasetExplorer from "../../components/DatasetExplorer/DatasetExplorer";

export default function ImportHub() {
    const { activeProject } = useProject();

    const [datasets, setDatasets] = useState<Dataset[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!activeProject) {
            setDatasets([]);
            return;
        }

        loadDatasets(activeProject.id);

    }, [activeProject]);

    async function loadDatasets(projectId: number) {
    try {
        const data =
            await datasetService.getDatasetsByProject(
                projectId
            );

        setDatasets(data);
    } catch (error) {
        console.error(error);
    }
}

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

            await loadDatasets(
                activeProject.id
            );

        } catch (error) {

            console.error(error);

        }

        event.target.value = "";
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
                    />
                ))}

            </div>

            <DatasetExplorer />

        </div>
    );
}