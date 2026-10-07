import { NavBar } from '@/components/NavBar'
import { AdminHeader } from '@/components/AdminHeader'
import { Outlet } from 'react-router-dom'
import type { SideBarMenuGroup } from '@/components/SideBar'

const MenuItems: SideBarMenuGroup[] = [
  {
    groupKey: 'management',
    groupLabel: '- Quản lý',
    items: [
      {
        key: 1,
        text: 'Tổng quan',
        icon: 'home',
        path: '/admin',
      },
      {
        key: 2,
        text: 'Quản lý lớp học',
        icon: 'graduation-cap',
        path: '/admin/classes',
      },
      {
        key: 3,
        text: 'Quản lý lộ trình lớp học',
        icon: 'map',
        path: '/admin/learning-paths',
      },
    ],
  },
  {
    groupKey: 'administration',
    groupLabel: '- Quản trị',
    items: [
      {
        key: 4,
        text: 'Quản lý tài khoản',
        icon: 'users',
        path: '/admin/accounts',
      },
      {
        key: 5,
        text: 'Quản lý bộ từ vựng',
        icon: 'book',
        path: '/admin/vocabulary',
      },
    ],
  },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <NavBar menuGroups={MenuItems} />

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
