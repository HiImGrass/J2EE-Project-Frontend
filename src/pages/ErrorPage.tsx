import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

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
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {status && (
        <p className="text-7xl font-bold text-gray-300">{status}</p>
      )}
      <h1 className="mt-4 text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="mt-2 max-w-md text-gray-600">{message}</p>

      <div className="mt-8 flex gap-3">
        <Link
          to="/"
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Về trang chủ
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Tải lại trang
        </button>
      </div>
    </main>
  );
}