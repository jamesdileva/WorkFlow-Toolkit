import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import { ProjectProvider } from "./context/ProjectContext";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/theme.css";
import { DatasetProvider } from "./context/DatasetContext";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(
    <React.StrictMode>

        <ProjectProvider>
            <DatasetProvider>
                <RouterProvider router={router} />
            </DatasetProvider>
        </ProjectProvider>
    </React.StrictMode>
);