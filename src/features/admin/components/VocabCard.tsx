import { cn } from '@/lib/utils'
import type { Vocabulary } from '@/types/vocabulary'

interface VocabCardProps {
  vocab: Vocabulary
  onViewDetail?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  className?: string
}

export function VocabCard({ vocab, onViewDetail, onEdit, onDelete, className }: VocabCardProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-[2fr_1.5fr_2fr_2fr] items-center border-b border-border bg-card px-6 py-4',
        'transition-colors duration-150 hover:bg-muted/40',
        className,
      )}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-foreground">{vocab.word}</span>
        <span className="text-xs text-muted-foreground">{vocab.pronunciation}</span>
      </div>

      <span className="text-sm text-foreground">({vocab.partOfSpeech})</span>

      <span className="text-sm text-foreground">{vocab.meaning}</span>

      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={() => onViewDetail?.(vocab.id)}
          className="text-primary transition-colors duration-150 hover:underline"
        >
          Xem chi tiết
        </button>
        <button
          onClick={() => onEdit?.(vocab.id)}
          className="text-primary transition-colors duration-150 hover:underline"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete?.(vocab.id)}
          className="text-destructive transition-colors duration-150 hover:underline"
        >
          Xóa
        </button>
      </div>
    </div>
  )
}
