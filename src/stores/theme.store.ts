import { create } from 'zustand'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'la2p-theme'

function readTheme(): Theme {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme

  // The browser uses this color for its mobile browser chrome/status area.
  // Read the CSS token so it always follows the active light/dark primary.
  const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()
  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (primary && themeColor) themeColor.content = primary
}

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: readTheme(),
  toggleTheme: () => {
    const theme = get().theme === 'light' ? 'dark' : 'light'
    applyTheme(theme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch {
      // Keep the current theme for this session when storage is unavailable.
    }
    set({ theme })
  },
}))

// Set the saved theme before React paints the first frame.
if (typeof document !== 'undefined') {
  applyTheme(readTheme())
}
