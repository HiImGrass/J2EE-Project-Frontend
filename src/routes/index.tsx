import App from "@/App";
import HomePage from "@/pages/client-pages/home.page";
import ErrorPage from "@/pages/error.page";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";

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
            ],
          },
        ],
      },
      // { path: "/login", element: <LoginPage /> },
      // { path: "/register", element: <RegisterPage /> }
    ],
  },
]);