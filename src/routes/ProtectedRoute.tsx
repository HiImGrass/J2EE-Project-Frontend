// ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('accessToken')
  const isAuthenticated = !!token // Thay bằng logic kiểm tra token/auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}