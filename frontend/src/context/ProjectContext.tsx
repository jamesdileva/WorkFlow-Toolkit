import {
    createContext,
    useContext,
    useState,
} from "react";

import type { ReactNode } from "react";
import type { Project } from "../types/Project";

interface ProjectContextType {
    activeProject: Project | null;

    setActiveProject: (
        project: Project | null
    ) => void;
}

const ProjectContext = createContext<
    ProjectContextType | undefined
>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export function ProjectProvider({
    children,
}: ProviderProps) {
    const [activeProject, setActiveProject] =
        useState<Project | null>(null);

    return (
        <ProjectContext.Provider
            value={{
                activeProject,
                setActiveProject,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context =
        useContext(ProjectContext);

    if (!context) {
        throw new Error(
            "useProject must be used within ProjectProvider"
        );
    }

    return context;
}