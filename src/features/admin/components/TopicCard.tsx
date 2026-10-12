import { cn } from '@/lib/utils'
import type { Topic } from '@/types/vocabulary'

interface TopicCardProps {
  topic: Topic
  onViewDetail?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  className?: string
}

export function TopicCard({ topic, onViewDetail, onEdit, onDelete, className }: TopicCardProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-between overflow-hidden border-b-2 bg-card px-6 py-5',
        'shadow-sm transition-shadow duration-150 hover:shadow-md',
        className,
      )}
    >
      <span className="text-base font-semibold text-foreground">
        {topic.order}. {topic.name}
      </span>

      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => onViewDetail?.(topic.id)}
          className="font-medium text-primary transition-colors duration-150 hover:underline"
        >
          Xem chi tiết
        </button>
        <button
          onClick={() => onEdit?.(topic.id)}
          className="font-medium text-primary transition-colors duration-150 hover:underline"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete?.(topic.id)}
          className="font-medium text-destructive transition-colors duration-150 hover:underline"
        >
          Xóa
        </button>
      </div>
    </div>
  )
}
