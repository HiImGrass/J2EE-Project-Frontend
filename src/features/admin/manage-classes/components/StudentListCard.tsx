import { useMemo } from 'react'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user.type'
import type { ClassStudent } from '@/features/admin/types/class.types'
import { mockClassStudents, mockUsers } from '@/features/admin/mockData'

export interface StudentCardProps {
  student: User
  onView?: (student: User) => void
  onDelete?: (student: User) => void
  className?: string
}

export interface StudentListCardProps {
  classId?: number
  students?: User[]
  classStudents?: ClassStudent[]
  allUsers?: User[]
  onView?: (student: User) => void
  onDelete?: (student: User) => void
  emptyMessage?: string
  className?: string
}

function getInitials(name: string): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function StudentCard({ student, onView, onDelete, className }: StudentCardProps) {
  const fullName = student.full_name || student.fullName || '—'
  const phoneNumber = student.phone_number || student.phoneNumber || '—'

  return (
    <div
      className={cn(
        'grid grid-cols-[56px_1.5fr_1.8fr_1.2fr_1fr] items-center gap-3 border-b border-border bg-card px-6 py-4',
        'transition-colors duration-150 hover:bg-muted/40',
        className,
      )}
    >
      <div className="flex items-center">
        {student.avatar ? (
          <img
            src={student.avatar}
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
        <span className="block truncate text-sm font-medium text-foreground">{fullName}</span>
      </div>

      <div className="min-w-0 pr-2">
        <span className="block truncate text-sm text-muted-foreground" title={student.email}>
          {student.email}
        </span>
      </div>

      <div className="min-w-0 pr-2">
        <span className="block truncate text-sm text-foreground">{phoneNumber}</span>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <button
          type="button"
          onClick={() => onView?.(student)}
          className="font-medium text-primary transition-colors duration-150 hover:underline"
        >
          Xem
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(student)}
          className="font-medium text-destructive transition-colors duration-150 hover:underline"
        >
          Xóa
        </button>
      </div>
    </div>
  )
}

export function StudentListCard({
  classId,
  students: propStudents,
  classStudents = mockClassStudents,
  allUsers = mockUsers,
  onView,
  onDelete,
  emptyMessage = 'Không tìm thấy học viên nào phù hợp.',
  className,
}: StudentListCardProps) {
  // Lấy danh sách học viên theo student_id thuộc class_students của lớp học này
  const displayStudents = useMemo(() => {
    if (propStudents) {
      return propStudents
    }
    if (classId !== undefined) {
      const studentIds = classStudents
        .filter((cs) => cs.class_id === classId)
        .map((cs) => cs.student_id)

      return allUsers.filter((user) => studentIds.includes(user.id))
    }
    return []
  }, [classId, propStudents, classStudents, allUsers])

  return (
    <div
      className={cn('overflow-hidden rounded-lg border border-border bg-card shadow-xs', className)}
    >
      <div className="overflow-x-auto">
        <div className="min-w-170">
          <div className="grid grid-cols-[56px_1.5fr_1.8fr_1.2fr_1fr] items-center gap-3 border-b border-border bg-card px-6 py-3.5">
            <span className="text-sm font-medium text-muted-foreground">Avatar</span>
            <span className="text-sm font-medium text-muted-foreground">Họ và tên</span>
            <span className="text-sm font-medium text-muted-foreground">Email</span>
            <span className="text-sm font-medium text-muted-foreground">Số điện thoại</span>
            <span className="text-sm font-medium text-muted-foreground">Hành động</span>
          </div>

          {displayStudents.map((student) => (
            <StudentCard
              key={student.id}
              student={student}
              onView={onView}
              onDelete={onDelete}
              className="last:border-b-0"
            />
          ))}

          {displayStudents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="size-8 text-muted-foreground/60" />
              <p className="mt-2 text-sm text-muted-foreground">{emptyMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
