import { useEffect, useState } from "react";

import { useDataset } from "../../context/DatasetContext";

import {
    datasetService,
    type DatasetPreview,
} from "../../services/datasetService";

import "./DatasetExplorer.css";
import PreviewTable from "../PreviewTable/PreviewTable";

export default function DatasetExplorer() {
    const { activeDataset } = useDataset();

    const [preview, setPreview] =
        useState<DatasetPreview | null>(null);

    useEffect(() => {
        if (!activeDataset) {
            setPreview(null);
            return;
        }

        datasetService
            .getDatasetPreview(activeDataset.id)
            .then(setPreview)
            .catch(console.error);

    }, [activeDataset]);

    if (!activeDataset) {
        return (
            <div className="dataset-explorer">
                Select a dataset to preview.
            </div>
        );
    }

    if (!preview) {
        return (
            <div className="dataset-explorer">
                Loading preview...
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

                <div>
                    <strong>Rows</strong>
                    <p>{preview.rows}</p>
                </div>

                <div>
                    <strong>Columns</strong>
                    <p>{preview.columns}</p>
                </div>

            </div>

            <PreviewTable
                preview={preview}
            />

        </div>
    );
}