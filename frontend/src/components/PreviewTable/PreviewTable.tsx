import { useMemo, useState } from "react";

import type { DatasetPreview } from "../../services/datasetService";

import "./PreviewTable.css";

interface Props {
    preview: DatasetPreview;
}

export default function PreviewTable({
    preview,
}: Props) {

    const [search, setSearch] = useState("");

    const filteredRows = useMemo(() => {

        if (!search.trim()) {
            return preview.preview;
        }

        const query = search.toLowerCase();

        return preview.preview.filter((row) =>
            row.some((cell) =>
                cell.toLowerCase().includes(query)
            )
        );

    }, [preview, search]);

    return (
        <div className="preview-table-wrapper">

            <input
                className="preview-search"
                type="text"
                placeholder="Search preview..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />

            <table className="preview-table">

                <thead>
                    <tr>
                        {preview.headers.map((header) => (
                            <th key={header}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {filteredRows.map((row, rowIndex) => (
                        <tr key={rowIndex}>

                            {row.map((cell, columnIndex) => (
                                <td
                                    key={`${rowIndex}-${columnIndex}`}
                                >
                                    {cell}
                                </td>
                            ))}

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}