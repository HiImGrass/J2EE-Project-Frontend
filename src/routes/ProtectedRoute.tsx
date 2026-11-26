import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';

export default function ProtectedRoute() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const authInitialized = useAuthStore((state) => state.authInitialized);

  if (!authInitialized) return null;

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
