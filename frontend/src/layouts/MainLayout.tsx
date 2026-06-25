import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

import "./MainLayout.css";

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}