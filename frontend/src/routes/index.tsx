import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import ImportHub from "../pages/ImportHub";
import Settings from "../pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "import",
        element: <ImportHub />
      },
      {
        path: "settings",
        element: <Settings />
      }
      
    ]
  }
]);