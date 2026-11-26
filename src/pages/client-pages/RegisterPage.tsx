import { Icon } from '@/components/ui/icon'
import { RegisterForm } from '@/features/admin/auth/components/RegisterForm'
import { ThemeToggle } from '@/components/ThemeToggle'

export function RegisterPage() {
  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      <header className="flex shrink-0 items-center gap-2 border-b border-border px-4 py-3">
        <div className="size-8 text-primary">
          <Icon name="logo" />
        </div>
        <span className="text-2xl font-semibold text-primary-text">LA2P</span>
        <div className="ml-auto"><ThemeToggle /></div>
      </header>

      <main className="flex flex-1 items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-sm">
          <RegisterForm />
        </div>
      </main>
    </div>
  )
}
