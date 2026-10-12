import { NavBar } from '@/components/NavBar'
import { Outlet } from 'react-router-dom'
import type { SideBarMenuGroup } from '@/components/SideBar'
import { AdminHeader } from '@/features/admin/components/AdminHeader'

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
    ],
  },
  {
    groupKey: 'administration',
    groupLabel: '- Quản trị',
    items: [
      {
        key: 3,
        text: 'Quản lý tài khoản',
        icon: 'users',
        path: '/admin/accounts',
      },
      {
        key: 4,
        text: 'Quản lý lộ trình',
        icon: 'map',
        path: '/admin/learning-paths',
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

        <main className="flex-1 bg-[#f1f5f9]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
