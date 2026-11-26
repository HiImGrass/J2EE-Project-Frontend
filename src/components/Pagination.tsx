import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentPage: number
  pageSize: number
  totalItems: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, pageSize, totalItems, onPageChange, className }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav aria-label="Phân trang" className={`flex items-center justify-between gap-3 py-4 ${className ?? ''}`}>
      <span className="text-sm text-muted-foreground">
        Hiển thị {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, totalItems)} / {totalItems}
      </span>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Trang trước"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft />
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            variant={page === currentPage ? 'default' : 'outline'}
            size="icon"
            aria-label={`Trang ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Trang sau"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </nav>
  )
}
