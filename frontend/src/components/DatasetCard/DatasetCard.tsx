import type { Dataset } from "../../types/Dataset";

import "./DatasetCard.css";

interface Props {
    dataset: Dataset;
}

export default function DatasetCard({
    dataset,
}: Props) {
    return (
        <div className="dataset-card">
            <h3>{dataset.name}</h3>

            <p>{dataset.file_name}</p>

            <small>
                {dataset.row_count} rows • {dataset.column_count} columns
            </small>
        </div>
    );
}