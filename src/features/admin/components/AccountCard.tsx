import { cn } from '@/lib/utils'
import type { User } from '@/types/user.type'

export interface AccountCardProps {
  account: User
  onViewDetail?: (account: User) => void
  onToggleLock?: (account: User) => void
  className?: string
}

function getInitials(name: string) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function AccountCard({
  account,
  onViewDetail,
  className,
}: AccountCardProps) {
  const fullName = account.full_name || account.fullName || '—'
  const phoneNumber = account.phone_number || account.phoneNumber || '—'
  const isLocked = account.status === 'LOCKED' || account.status === 'DISABLED'

  const roleConfig: Record<string, { label: string; className: string }> = {
    ADMIN: {
      label: 'Quản trị viên',
      className: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    },
    TEACHER: {
      label: 'Giáo viên',
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    STUDENT: {
      label: 'Học sinh',
      className: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
  }

  const roleMeta = roleConfig[account.role] || {
    label: account.role,
    className: 'bg-muted text-muted-foreground',
  }

  return (
    <div
      className={cn(
        'grid grid-cols-[56px_1.3fr_1.5fr_1.6fr_1.1fr_1.1fr_1.1fr_1fr] items-center gap-3 border-b border-border bg-card px-6 py-4',
        'transition-colors duration-150 hover:bg-muted/40',
        className,
      )}
    >
      <div className="flex items-center">
        {account.avatar ? (
          <img
            src={account.avatar}
            alt={fullName}
            className="size-9 rounded-full border border-border/60 object-cover"
          />
        ) : (
          <div className="flex size-9 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-semibold text-primary">
            {getInitials(fullName)}
          </div>
        )}
      </div>

      <div className="min-w-0 pr-2">
        <span className="block truncate text-sm font-medium text-foreground">
          {account.username}
        </span>
      </div>

      <div className="min-w-0 pr-2">
        <span className="block truncate text-sm text-foreground">
          {fullName}
        </span>
      </div>

      <div className="min-w-0 pr-2">
        <span className="block truncate text-sm text-muted-foreground" title={account.email}>
          {account.email}
        </span>
      </div>

      <div className="min-w-0 pr-2">
        <span className="block truncate text-sm text-foreground">
          {phoneNumber}
        </span>
      </div>

      <div>
        <span
          className={cn(
            'inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium',
            roleMeta.className,
          )}
        >
          {roleMeta.label}
        </span>
      </div>

      <div>
        {isLocked ? (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
            <span className="size-1.5 rounded-full bg-destructive" />
            Đã khóa
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Hoạt động
          </span>
        )}
      </div>

      <div className="flex items-center text-sm">
        <button
          type="button"
          onClick={() => onViewDetail?.(account)}
          className="font-medium text-primary transition-colors duration-150 hover:underline"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}
