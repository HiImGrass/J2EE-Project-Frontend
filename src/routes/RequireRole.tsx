import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

type Role = "ADMIN" | "TEACHER" | "STUDENT";

interface RequireRoleProps {
  allowedRoles: Role[];
}

export const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  const user = useAuthStore((state) => state.user);
  const role = user?.role?.toUpperCase() as Role | undefined;

  if (!user || !role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={role === "STUDENT" ? "/" : "/student-classes"} replace />;
  }

  return <Outlet />;
};
