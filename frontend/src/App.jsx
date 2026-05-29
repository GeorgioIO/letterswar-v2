import {
  Navigate,
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// Components
import Toast from "./components/UI/Toast.jsx";
import Loading from "./components/UI/Loading.jsx";

// Game related pages
import GameHomePage from "./pages/game/GameHomePage.jsx";
import GamePlayPage from "./pages/game/GamePlayPage.jsx";
import GameSetupPage from "./pages/game/GameSetupPage.jsx";

// import LoginPage from "./pages/auth/LoginPage.jsx";
import ProtectedRoute from "./components/UI/ProtectedRoute.jsx";
import SuperAdminRoute from "./components/UI/SuperAdminRoute.jsx";

// Lazy page loaders
const LoginPage = lazy(() => import("./pages/auth/LoginPage.jsx"));
const DashboardLayout = lazy(
  () => import("./pages/dashboard/DashboardLayout.jsx"),
);
const HomePage = lazy(() => import("./pages/dashboard/HomePage.jsx"));
const QuestionPage = lazy(() => import("./pages/dashboard/QuestionsPage.jsx"));
const LettersPage = lazy(() => import("./pages/dashboard/LettersPage.jsx"));
const AdminsPage = lazy(() => import("./pages/dashboard/AdminsPage.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    loader: () => redirect("/game"),
  },
  { path: "/game", element: <GameHomePage /> },
  { path: "/game/setup", element: <GameSetupPage /> },
  { path: "/game/play", element: <GamePlayPage /> },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loading />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loading />}>
            <DashboardLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <HomePage />,
          },
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
