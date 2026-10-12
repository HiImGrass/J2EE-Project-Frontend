import { cn } from '@/lib/utils'
import type { LearningPath } from '@/types/vocabulary'

interface LearningPathCardProps {
  learningPath: LearningPath
  onViewDetail?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  className?: string
}

export function LearningPathCard({
  learningPath,
  onViewDetail,
  onEdit,
  onDelete,
  className,
}: LearningPathCardProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-between overflow-hidden rounded-xl border border-border bg-card px-6 py-8',
        'shadow-sm transition-shadow duration-150 hover:shadow-md',
        className,
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
      <div className="flex items-stretch gap-4">
        <div className="flex flex-col gap-2.5">
          <span className="text-base leading-tight font-semibold text-foreground">
            {learningPath.name}
          </span>
          <span className="text-sm text-muted-foreground">
            Tổng chủ đề: {learningPath.totalTopics}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => onViewDetail?.(learningPath.id)}
          className="font-medium text-primary transition-colors duration-150 hover:underline"
        >
          Xem Chi tiết
        </button>
        <button
          onClick={() => onEdit?.(learningPath.id)}
          className="font-medium text-primary transition-colors duration-150 hover:underline"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete?.(learningPath.id)}
          className="font-medium text-destructive transition-colors duration-150 hover:underline"
        >
          Xóa
        </button>
      </div>
    </div>
  )
}
