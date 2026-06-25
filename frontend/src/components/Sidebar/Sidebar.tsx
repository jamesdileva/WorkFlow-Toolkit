import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        WorkFlow Toolkit
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink>

        <NavLink to="/projects">Projects</NavLink>

        <NavLink to="/import">
          Import Hub
        </NavLink>

        <NavLink to="/settings">
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}