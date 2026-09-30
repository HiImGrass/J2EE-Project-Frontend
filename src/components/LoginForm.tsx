import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/ui/icon'
import { Link } from 'react-router-dom'

export function LoginForm() {
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Dữ liệu đăng nhập:', { studentId, password })
    // API
  }

  return (
    <div className="flex w-full flex-col items-center">
      {/* Tiêu đề */}
      <h2 className="text-sm font-bold tracking-wider text-[#1c3aa9] uppercase">ĐĂNG NHẬP</h2>
      <p className="mt-1 mb-6 text-[13px] text-gray-500">Đăng nhập tài khoản học LA2P</p>

      <form onSubmit={handleSubmit} className="w-full space-y-3">
        {/* Mã học viên */}
        <div>
          <Input
            id="login-student-id"
            type="text"
            placeholder="Nhập mã học viên"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="h-10 text-[13px] placeholder:text-gray-400 focus-visible:ring-[#1c3aa9]"
          />
        </div>

        {/* Mật khẩu */}
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 pr-10 text-[13px] placeholder:text-gray-400 focus-visible:ring-[#1c3aa9]"
          />
          <button
            type="button"
            id="toggle-password-visibility"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
          >
            {showPassword ? (
              /* Eye open */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              /* Eye off */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                <line x1="2" x2="22" y1="2" y2="22" />
              </svg>
            )}
          </button>
        </div>

        {/* Quên mật khẩu */}
        <div className="flex justify-end">
          <Link
            to="#"
            id="forgot-password-link"
            className="text-[12px] font-medium text-[#1c3aa9] hover:underline"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Nút Đăng nhập */}
        <button
          id="login-submit-btn"
          type="submit"
          className="w-full rounded bg-[#1c3aa9] py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-blue-800 active:scale-[0.98]"
        >
          ĐĂNG NHẬP
        </button>
      </form>

      {/* Bắt đầu ngay */}
      <div className="mt-4 flex w-full justify-start text-[13px] text-gray-500">
        <span>Bạn chưa có tài khoản?</span>
        <Link
          to="/register"
          id="register-link"
          className="ml-1 font-medium text-[#1c3aa9] hover:underline"
        >
          Bắt đầu ngay
        </Link>
      </div>

      {/* Divider Hoặc */}
      <div className="relative my-5 w-full text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-[12px] text-gray-400">Hoặc</span>
      </div>

      {/* Nút Google */}
      <button
        id="google-login-btn"
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded border border-gray-200 bg-white py-2.5 text-[13px] font-medium text-gray-600 shadow-sm transition-colors hover:bg-gray-50 active:scale-[0.98]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Google
      </button>
    </div>
  )
}
