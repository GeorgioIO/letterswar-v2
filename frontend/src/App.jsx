import {
  Navigate,
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.jsx";
import SuperAdminRoute from "./components/UI/SuperAdminRoute.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";
import HomePage from "./pages/dashboard/HomePage.jsx";
import QuestionPage from "./pages/dashboard/QuestionsPage.jsx";
import LettersPage from "./pages/dashboard/LettersPage.jsx";
import Toast from "./components/UI/Toast.jsx";
import AdminsPage from "./pages/dashboard/AdminsPage.jsx";
import GameHomePage from "./pages/game/GameHomePage.jsx";
import GamePlayPage from "./pages/game/GamePlayPage.jsx";
import GameSetupPage from "./pages/game/GameSetupPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/game"),
  },
  { path: "/game", element: <GameHomePage /> },
  { path: "/game/setup", element: <GameSetupPage /> },
  { path: "/game/play", element: <GamePlayPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "questions", element: <QuestionPage /> },
          { path: "letters", element: <LettersPage /> },
          {
            path: "admins",
            element: (
              <SuperAdminRoute>
                <AdminsPage />
              </SuperAdminRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/game" replace />,
  },
]);

function App() {
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
