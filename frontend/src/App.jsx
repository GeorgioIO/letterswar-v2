import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import HomePage from "./pages/dashboard/HomePage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="questions" element={<h1>Questions</h1>} />
            <Route path="letters" element={<h1>Letters</h1>} />
            <Route path="admins" element={<h1>Admins</h1>} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
