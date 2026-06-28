import { useDataset } from "../../context/DatasetContext";

import type { Dataset } from "../../types/Dataset";

import "./DatasetCard.css";

interface Props {
    dataset: Dataset;
    onDelete: (datasetId: number) => void;
}

export default function DatasetCard({
    dataset,
    onDelete,
}: Props) {
    const {
        activeDataset,
        setActiveDataset,
    } = useDataset();

    const selected =
        activeDataset?.id === dataset.id;

    return (
        <div
            className={`dataset-card ${
                selected ? "selected" : ""
            }`}
            onClick={() =>
                setActiveDataset(dataset)
            }
        >
            <h3>{dataset.name}</h3>

            <p>{dataset.file_name}</p>

            <small>
                {dataset.row_count} rows •{" "}
                {dataset.column_count} columns
            </small>

            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    onDelete(dataset.id);
                }}
            >
                Delete
            </button>

        </div>
    );
}