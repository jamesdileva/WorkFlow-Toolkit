import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <h2>WorkFlow Toolkit</h2>

      <hr />

      <Outlet />
    </div>
  );
}