import type { Project } from "../../types/Project";

import { useProject } from "../../context/ProjectContext";

import "./ProjectCard.css";

interface Props {
    project: Project;
    onDelete: (id: number) => void;
}

export default function ProjectCard({
    project,
    onDelete,
}: Props) {

    const {
        activeProject,
        setActiveProject,
    } = useProject();

    const isActive =
        activeProject?.id === project.id;

    return (
        <div
            className={`project-card ${
                isActive ? "active" : ""
            }`}
        >

            <h2>{project.name}</h2>

            <p>{project.description}</p>

            <small>
                Created{" "}
                {new Date(
                    project.created_at
                ).toLocaleDateString()}
            </small>

            <div className="project-actions">

                <button
                    type="button"
                    onClick={() =>
                        setActiveProject(project)
                    }
                >
                    Open
                </button>

                <button
                    className="delete-btn"
                    type="button"
                    onClick={() =>
                        onDelete(project.id)
                    }
                >
                    Delete
                </button>

            </div>

        </div>
    );
}