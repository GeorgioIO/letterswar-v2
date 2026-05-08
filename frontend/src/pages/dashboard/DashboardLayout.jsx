import { Outlet } from "react-router-dom";
import Sidebar from "../../components/UI/Dashboard/Sidebar";
export default function DashboardLayout() {
  return (
    <div className="min-h-screen grid grid-cols-[200px_1fr]">
      <Sidebar />
      <div className="flex-1">
        <main>
          <Outlet /> {/* current page renders here */}
        </main>
      </div>
    </div>
  );
}
