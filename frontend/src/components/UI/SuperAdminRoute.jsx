import { useAuth } from "../../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import { GridLoader } from "react-spinners";
import { ShieldOff } from "lucide-react";

export default function SuperAdminRoute({ children }) {
  const { isLoggedIn, isLoading, admin } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-7">
        <GridLoader speedMultiplier={0.5} size={35} color="orange" />
        <p className="text-2xl font-bold">Please wait...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (admin.role !== "superadmin") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
          <ShieldOff size={24} className="text-orange-400" />
        </div>
        <p className="text-base font-medium text-gray-800">Access Restricted</p>
        <p className="text-sm text-gray-400">
          You don't have permission to view this page.
        </p>
      </div>
    );
  }

  return children;
}
