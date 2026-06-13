import { createBrowserRouter } from "react-router-dom";
import Register from "../feature/auth/pages/Register";
import Login from "../feature/auth/pages/Login";
import Home from "../feature/auth/pages/Home";
import ProtectedRoute from "../feature/auth/components/Protectedpage";
import AIchatpage from "../feature/auth/pages/AIchatpage";
import InterviewPage from "../feature/interview/pages/InterviewPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Aichat",
    element: (
      <ProtectedRoute>
        <AIchatpage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/interview",
    element: (
      <ProtectedRoute>
        <InterviewPage />
      </ProtectedRoute>
    ),
  },
]);
