import { Icon } from './ui/icon'
import { AccountAvatar } from './AccountAvatar'

interface AdminHeaderProps {
  searchPlaceholder?: string
}

export function AdminHeader({ searchPlaceholder = 'Search' }: AdminHeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex max-w-sm flex-1 items-center gap-2">
        <span className="size-4 shrink-0 text-muted-foreground">
          <Icon name="search" />
        </span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex items-center gap-2">
        <AccountAvatar />
      </div>
    </header>
  )
}
