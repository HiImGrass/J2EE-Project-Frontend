import App from "@/App";
import HomePage from "@/pages/client-pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import { RequireRole } from "./RequireRole";
import AdminLayout from "@/layouts/AdminLayout";
import DashboardPage from "@/pages/admin-pages/DashboardPage";
import { ClassPage } from "@/pages/client-pages/ClassPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { path: "/", element: <HomePage /> },
              { path: "/student-classes", element: <ClassPage /> },
            ],
          },
          {
            path: "/admin",
            element: <RequireRole allowedRoles={["ADMIN", "TEACHER"]} />, // Tính năng cho TEACHER , ADMIN
            children: [
              {
                element: <AdminLayout />,
                children: [
                  { index: true, element: <DashboardPage /> }, // /admin
                  // Tính năng cho ADMIN
                  {
                    element: <RequireRole allowedRoles={["ADMIN"]} />,
                    children: [],
                  },
                ],
              },
            ],
          },

        ],
      },
      // { path: "/login", element: <LoginPage /> },
      // { path: "/register", element: <RegisterPage /> }
    ],
  },
]);