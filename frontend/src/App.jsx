import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.jsx";
import SuperAdminRoute from "./components/UI/SuperAdminRoute.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import HomePage from "./pages/dashboard/HomePage.jsx";
import QuestionPage from "./pages/dashboard/QuestionsPage.jsx";
import LettersPage from "./pages/dashboard/LettersPage.jsx";
import Toast from "./components/UI/Toast.jsx";
import AdminsPage from "./pages/dashboard/AdminsPage.jsx";

function App() {
  return (
    <>
      <Toast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HomePage />} />
            <Route path="questions" element={<QuestionPage />} />
            <Route path="letters" element={<LettersPage />} />
            <Route path="admins" element={<AdminsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
