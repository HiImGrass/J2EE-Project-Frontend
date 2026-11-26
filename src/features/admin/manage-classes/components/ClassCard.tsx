import { cn } from '@/lib/utils'
import type { Classes } from '@/features/admin/types/class.types'

interface ClassCardProps {
  classItem: Classes
  teacherName?: string
  onViewDetail?: (id: number) => void
  onViewStudents?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  className?: string
}

function formatCreatedAt(createdAt: string): string {
  const date = new Date(createdAt)
  if (Number.isNaN(date.getTime())) return createdAt
  return date.toLocaleDateString('vi-VN')
}

export function ClassCard({
  classItem,
  teacherName,
  onViewDetail,
  onViewStudents,
  onEdit,
  onDelete,
  className,
}: ClassCardProps) {
  const resolvedTeacherName = teacherName || classItem.teacher_name || `GV #${classItem.teacher_id}`

  const handleDetail = () => {
    if (onViewDetail) {
      onViewDetail(classItem.id)
    } else if (onViewStudents) {
      onViewStudents(classItem.id)
    }
  }

  return (
    <div
      className={cn(
        'relative flex items-center justify-between gap-4 overflow-hidden rounded-xl border border-border bg-card px-6 py-6',
        'shadow-sm transition-shadow duration-150 hover:shadow-md',
        className,
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />

      <div className="flex min-w-0 flex-col gap-2">
        <span className="truncate text-base leading-tight font-semibold text-foreground">
          {classItem.classname}
        </span>

        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <span>
            Giáo viên: <span className="font-medium text-primary-text">{resolvedTeacherName}</span>
          </span>
          <span>
            Sĩ số: <span className="font-medium text-primary-text">{classItem.number_of_students}</span>
          </span>
          <span>
            Ngày tạo:{' '}
            <span className="font-medium text-primary-text">
              {formatCreatedAt(classItem.created_at)}
            </span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 text-sm">
        <button
          type="button"
          onClick={handleDetail}
          className="font-medium text-primary-text transition-colors duration-150 hover:underline"
        >
          Xem chi tiết
        </button>
        <button
          type="button"
          onClick={() => onEdit?.(classItem.id)}
          className="font-medium text-primary-text transition-colors duration-150 hover:underline"
        >
          Sửa
        </button>
        <button
          type="button"
          onClick={() => onDelete?.(classItem.id)}
          className="font-medium text-destructive transition-colors duration-150 hover:underline"
        >
          Xóa
        </button>
      </div>
    </div>
  )
}
