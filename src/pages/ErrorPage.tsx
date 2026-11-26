import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export default function ErrorPage() {
  const error = useRouteError();
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const homePath = !accessToken
    ? "/login"
    : user?.role?.toUpperCase() === "ADMIN"
      ? "/admin"
      : "/student-classes";

  let title = "Đã có lỗi xảy ra";
  let message = "Vui lòng thử lại sau.";
  let status: number | null = null;

  if (isRouteErrorResponse(error)) {
    status = error.status;
    if (error.status === 404) {
      title = "Không tìm thấy trang";
      message = "Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.";
    } else {
      message = error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      {status && (
        <p className="text-7xl font-bold text-muted-foreground">{status}</p>
      )}
      <h1 className="mt-4 text-2xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 max-w-md text-muted-foreground">{message}</p>

      <div className="mt-8 flex gap-3">
        <Link
          to={homePath}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Về trang chủ
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-border bg-card px-5 py-2.5 font-medium text-card-foreground hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Tải lại trang
        </button>
      </div>
    </main>
  );
}
