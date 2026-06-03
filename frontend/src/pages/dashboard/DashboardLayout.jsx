import { Outlet } from "react-router-dom";
import Sidebar from "../../components/UI/Dashboard/Sidebar";
export default function DashboardLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[200px_1fr]">
      <Sidebar />
      <div className="h-full flex-1">
        <main className="h-full p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
