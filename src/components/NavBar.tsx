import { Icon } from './ui/icon'
import { SideBar } from './SideBar'
import type { SideBarMenuGroup } from './SideBar'

interface NavBarProps {
  menuGroups: SideBarMenuGroup[]
}

export function NavBar({ menuGroups }: NavBarProps) {
  return (
    <aside className="flex min-h-screen w-60 flex-col border-r border-border bg-card">
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-dashed border-border px-4">
        <div className="size-8 shrink-0">
          <Icon name="logo" />
        </div>
        <span className="text-lg font-bold tracking-tight text-primary">LA2P</span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <SideBar menuGroups={menuGroups} />
      </div>
    </aside>
  )
}
