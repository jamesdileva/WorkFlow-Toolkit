import { api } from "../api/client";
import type { Project } from "../types/Project";

export function getProjects() {
    return api<Project[]>("/api/projects");
}

export function getProject(id: number) {
    return api<Project>(`/api/projects/${id}`);
}

export function createProject(
    name: string,
    description: string
) {
    return api<Project>("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            description,
        }),
    });
}

export function deleteProject(id: number) {
    return api(`/api/projects/${id}`, {
        method: "DELETE",
    });
}