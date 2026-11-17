import { useState } from 'react'
import { ActionBar } from '@/features/admin/components/ActionBar'
import { AccountCard } from '@/features/admin/components/AccountCard'
import { mockUsers } from '@/features/admin/mockData'
import type { User } from '@/types/user.type'
import { X, Mail, Phone, Shield, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react'

export default function AdminAccount() {
  const [accounts, setAccounts] = useState<User[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [selectedRole, setSelectedRole] = useState<string>('ALL')
  const [selectedAccount, setSelectedAccount] = useState<User | null>(null)
  const [notification, setNotification] = useState<string | null>(null)

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr))
    }, 2500)
  }

  const handleAdd = () => {
    showNotification('Chức năng Lộc còn nợ')
  }

  const handleViewDetail = (account: User) => {
    setSelectedAccount(account)
  }

  const handleToggleLock = (account: User) => {
    const isCurrentlyLocked = account.status === 'LOCKED' || account.status === 'DISABLED'
    const nextStatus = isCurrentlyLocked ? 'ACTIVE' : 'LOCKED'

    setAccounts((prev) =>
      prev.map((item) =>
        item.id === account.id
          ? {
              ...item,
              status: nextStatus,
              updated_at: new Date().toISOString(),
            }
          : item,
      ),
    )

    // Cập nhật tài khoản đang hiển thị trong modal
    if (selectedAccount?.id === account.id) {
      setSelectedAccount({
        ...selectedAccount,
        status: nextStatus,
        updated_at: new Date().toISOString(),
      })
    }

    showNotification(
      isCurrentlyLocked
        ? `Đã mở khóa tài khoản "${account.username}"`
        : `Đã khóa tài khoản "${account.username}"`,
    )
  }

  const filtered = accounts.filter((account) => {
    const term = search.toLowerCase().trim()
    const matchSearch =
      !term ||
      account.username.toLowerCase().includes(term) ||
      account.full_name?.toLowerCase().includes(term) ||
      account.fullName?.toLowerCase().includes(term) ||
      account.email.toLowerCase().includes(term) ||
      account.phone_number?.includes(term) ||
      account.phoneNumber?.includes(term)

    const matchRole =
      selectedRole === 'ALL' ||
      (selectedRole === 'LOCKED'
        ? account.status === 'LOCKED' || account.status === 'DISABLED'
        : account.role === selectedRole)

    return matchSearch && matchRole
  })

  const filterTabs = [
    { key: 'ALL', label: 'Tất cả', count: accounts.length },
    { key: 'ADMIN', label: 'Quản trị viên', count: accounts.filter((a) => a.role === 'ADMIN').length },
    { key: 'TEACHER', label: 'Giáo viên', count: accounts.filter((a) => a.role === 'TEACHER').length },
    { key: 'STUDENT', label: 'Học sinh', count: accounts.filter((a) => a.role === 'STUDENT').length },
    {
      key: 'LOCKED',
      label: 'Đã khóa',
      count: accounts.filter((a) => a.status === 'LOCKED' || a.status === 'DISABLED').length,
    },
  ]

  return (
    <div className="flex flex-col gap-4 px-12 pt-6 pb-12">
      {/* toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg transition-all">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAdd}
        addLabel="Thêm tài khoản"
        placeholder="Tìm kiếm"
      />

      {/* lọc */}
      <div className="flex flex-wrap items-center gap-2">
        {filterTabs.map((tab) => {
          const isActive = selectedRole === tab.key
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setSelectedRole(tab.key)}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-lg bg-card shadow-xs">
        <div className="overflow-x-auto">
          <div className="min-w-240">
            <div className="grid grid-cols-[56px_1.4fr_1.6fr_1.7fr_1.3fr_1.1fr_1.1fr_1fr] items-center gap-3 border-b border-border bg-card px-6 py-3.5">
              <span className="text-sm font-medium text-muted-foreground">Avatar</span>
              <span className="text-sm font-medium text-muted-foreground">Username</span>
              <span className="text-sm font-medium text-muted-foreground">Họ và tên</span>
              <span className="text-sm font-medium text-muted-foreground">Email</span>
              <span className="text-sm font-medium text-muted-foreground">Số điện thoại</span>
              <span className="text-sm font-medium text-muted-foreground">Vai trò</span>
              <span className="text-sm font-medium text-muted-foreground">Trạng thái</span>
              <span className="text-sm font-medium text-muted-foreground">Hành động</span>
            </div>

            {filtered.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onViewDetail={handleViewDetail}
              />
            ))}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertCircle className="size-8 text-muted-foreground/60" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Không tìm thấy tài khoản nào phù hợp.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-lg rounded-xl bg-card p-6 shadow-xl ring-1 ring-border">
            <button
              type="button"
              onClick={() => setSelectedAccount(null)}
              className="absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            <h3 className="text-lg font-semibold text-foreground">
              Thông tin chi tiết tài khoản
            </h3>
            <p className="text-xs text-muted-foreground">
              Mã tài khoản (ID): #{selectedAccount.id}
            </p>

            <div className="mt-5 flex items-center gap-4 border-b border-border pb-5">
              {selectedAccount.avatar ? (
                <img
                  src={selectedAccount.avatar}
                  alt={selectedAccount.full_name}
                  className="size-16 rounded-full border border-border object-cover"
                />
              ) : (
                <div className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                  {selectedAccount.full_name?.slice(0, 2).toUpperCase() || 'U'}
                </div>
              )}
              <div>
                <h4 className="text-base font-semibold text-foreground">
                  {selectedAccount.full_name || selectedAccount.fullName}
                </h4>
                <p className="text-sm text-muted-foreground">@{selectedAccount.username}</p>
                <div className="mt-1 flex gap-2">
                  <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                    {selectedAccount.role}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs font-medium ${
                      selectedAccount.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                    }`}
                  >
                    {selectedAccount.status === 'ACTIVE' ? 'Hoạt động' : 'Đã khóa'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3.5 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="size-4 shrink-0" />
                <span className="w-28 text-xs font-medium">Email:</span>
                <span className="font-medium text-foreground">{selectedAccount.email}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="size-4 shrink-0" />
                <span className="w-28 text-xs font-medium">Số điện thoại:</span>
                <span className="font-medium text-foreground">
                  {selectedAccount.phone_number || selectedAccount.phoneNumber || 'Chưa cập nhật'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Shield className="size-4 shrink-0" />
                <span className="w-28 text-xs font-medium">Vai trò:</span>
                <span className="font-medium text-foreground">{selectedAccount.role}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="size-4 shrink-0" />
                <span className="w-28 text-xs font-medium">Ngày tạo:</span>
                <span className="font-medium text-foreground">
                  {new Date(selectedAccount.created_at).toLocaleString('vi-VN')}
                </span>
              </div>
              {selectedAccount.updated_at && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="size-4 shrink-0" />
                  <span className="w-28 text-xs font-medium">Cập nhật lần cuối:</span>
                  <span className="font-medium text-foreground">
                    {new Date(selectedAccount.updated_at).toLocaleString('vi-VN')}
                  </span>
                </div>
              )}
            </div>

            {/* Modal Actions: Khóa / Mở khóa và Đóng */}
            <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => handleToggleLock(selectedAccount)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  selectedAccount.status === 'ACTIVE'
                    ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {selectedAccount.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedAccount(null)}
                className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
