import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./routes";

import { ProjectProvider } from "./context/ProjectContext";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/theme.css";
import { DatasetProvider } from "./context/DatasetContext";
import {
    ComparisonProvider,
} from "./context/ComparisonContext";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(
<React.StrictMode>

    <ProjectProvider>

        <DatasetProvider>

            <ComparisonProvider>

                <RouterProvider
                    router={router}
                />

            </ComparisonProvider>

        </DatasetProvider>

    </ProjectProvider>

</React.StrictMode>
);