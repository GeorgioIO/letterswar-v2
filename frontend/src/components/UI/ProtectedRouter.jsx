import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { GridLoader } from "react-spinners";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-7">
        <GridLoader speedMultiplier={0.5} size={35} />
        <p className="text-2xl font-bold">Please wait...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
