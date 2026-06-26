import { useState } from "react";

import "./ProjectModal.css";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (
        name: string,
        description: string
    ) => Promise<void>;
}

export default function ProjectModal({
    open,
    onClose,
    onCreate,
}: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    if (!open) {
        return null;
    }

    async function handleSubmit() {
        if (!name.trim()) {
            return;
        }

        await onCreate(
            name,
            description
        );

        setName("");
        setDescription("");

        onClose();
    }

    return (
        <div className="modal-overlay">
            <div className="modal">

                <h2>New Project</h2>

                <input
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                />

                <div className="modal-buttons">

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                    >
                        Create
                    </button>

                </div>
            </div>
        </div>
    );
}