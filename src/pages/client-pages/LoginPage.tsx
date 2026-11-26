import { Icon } from '@/components/ui/icon'
import { LoginForm } from '@/features/admin/auth/components/LoginForm'
import { ThemeToggle } from '@/components/ThemeToggle'
import LoginHeader from '@/components/LoginHeader'

export function LoginPage() {
  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <LoginHeader />

      <main className="flex flex-1 items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </main>
    </div>
  )
}
