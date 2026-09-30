import { Icon } from '@/components/ui/icon'
import { LoginForm } from '@/components/LoginForm'

export function LoginPage() {
  return (
    <div className="flex h-dvh flex-col bg-white">
      {/* Header */}
      <header className="flex shrink-0 items-center gap-2 border-b border-gray-100 px-4 py-3">
        <div className="size-8">
          <Icon name="logo" />
        </div>
        <span className="text-2xl font-semibold text-[#1c3aa9]">LA2P</span>
      </header>

      {/* Nội dung giữa trang */}
      <main className="flex flex-1 items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
