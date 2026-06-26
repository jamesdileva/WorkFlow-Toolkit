import { useEffect, useState } from "react";

import type { Project } from "../../types/Project";

import {
    getProjects,
    createProject,
    deleteProject,
} from "../../services/projectService";

import ProjectCard from "../../components/ProjectCard/ProjectCard";
import ProjectModal from "../../components/ProjectModal/ProjectModal";

import "./Projects.css";

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);

    async function loadProjects() {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadProjects();
    }, []);

    async function handleCreateProject(
        name: string,
        description: string
    ) {
        await createProject(name, description);

        await loadProjects();
    }

    async function handleDeleteProject(
        id: number
    ) {
        await deleteProject(id);

        await loadProjects();
    }

    return (
        <div className="projects-page">
            <div className="projects-header">
                <h1>Projects</h1>

                <button
                    className="new-project-btn"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    + New Project
                </button>
            </div>

            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={handleDeleteProject}
                />
            ))}

            <ProjectModal
                open={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateProject}
            />
        </div>
    );
}