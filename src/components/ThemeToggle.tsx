import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/theme.store'

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)
  const nextTheme = theme === 'light' ? 'dark' : 'light'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Chuyển sang giao diện ${nextTheme === 'dark' ? 'tối' : 'sáng'}`}
      title={`Giao diện ${theme === 'light' ? 'sáng' : 'tối'}`}
      className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
    </button>
  )
}
