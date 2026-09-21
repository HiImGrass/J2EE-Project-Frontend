import { Navigate, Outlet } from "react-router-dom";

type Role = "ADMIN" | "TEACHER" | "STUDENT";

interface RequireRoleProps {
  allowedRoles: Role[];
}

export const RequireRole = ({ allowedRoles }: RequireRoleProps) => {
  // MOCK DATA
  const mockUser: { id: string; name: string; role: Role } | null = {
    id: "1",
    name: "Nguyễn Văn A",
    role: "ADMIN",
  };

  // 1. Nếu chưa đăng nhập -> Chuyển hướng về trang Login
  if (!mockUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. Kiểm tra xem Role của user có được phép truy cập không
  const hasPermission = allowedRoles.includes(mockUser.role);

  if (!hasPermission) {
    // Nếu không đủ quyền -> Chuyển hướng về trang mặc định tương ứng với Role của họ
    if (mockUser.role === "STUDENT") {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/admin" replace />;
  }

  // 3. Đúng quyền -> Cho phép render các Route con bên trong
  return <Outlet />;
};