// ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const isAuthenticated = true; // Thay bằng logic kiểm tra token/auth

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; 
}