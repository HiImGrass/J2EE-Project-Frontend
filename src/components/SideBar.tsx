import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from './ui/icon'
import { cn } from 'cn'

export interface SideBarMenuItem {
  key: number
  text: string
  icon: string
  path: string
}

export interface SideBarMenuGroup {
  groupKey: string
  groupLabel: string
  items: SideBarMenuItem[]
}

interface SideBarProps {
  menuGroups: SideBarMenuGroup[]
}

export function SideBar({ menuGroups }: SideBarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <nav className="flex w-full flex-col gap-4 px-2 py-4">
      {menuGroups.map((group) => (
        <div key={group.groupKey} className="flex flex-col gap-4">
          <span className="mb-1 px-3 text-[14px] font-semibold tracking-wider text-muted-foreground uppercase select-none">
            {group.groupLabel}
          </span>
          {group.items.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <button
                key={item.key}
                onClick={() => handleNavigate(item.path)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-all duration-150',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground',
                )}
              >
                <span className="size-4 shrink-0">
                  <Icon name={item.icon} />
                </span>
                <span className="truncate">{item.text}</span>
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
