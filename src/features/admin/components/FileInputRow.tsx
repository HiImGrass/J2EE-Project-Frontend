import { Icon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { useRef } from 'react'

export interface FileInputRowProps {
  id: string
  label: string
  placeholder?: string
  accept?: string
  file: File | null
  fileName?: string
  onChange: (file: File | null) => void
  className?: string
}

export function FileInputRow({
  id,
  label,
  placeholder = 'Chọn tệp',
  accept,
  file,
  fileName,
  onChange,
}: FileInputRowProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const displayName = file ? file.name : fileName || ''

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    onChange(selectedFile)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex items-center gap-4">
      <label
        htmlFor={id}
        className="w-24 shrink-0 text-sm font-semibold text-foreground select-none"
      >
        {label}
      </label>

      <div className="relative min-w-0 flex-1">
        <input
          ref={fileInputRef}
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick()
            }
          }}
          className={cn(
            'group flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-input bg-card px-3 text-sm transition-all',
            'hover:border-primary/60 focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary focus-visible:outline-none',
          )}
        >
          <span
            className={cn(
              'truncate text-sm select-none',
              displayName ? 'font-medium text-foreground' : 'text-muted-foreground',
            )}
          >
            {displayName || placeholder}
          </span>

          <div className="ml-2 flex shrink-0 items-center gap-2">
            {displayName && (
              <button
                type="button"
                onClick={handleClear}
                className="rounded-xs p-0.5 text-muted-foreground transition-colors hover:text-destructive"
                title="Xóa tệp đã chọn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
            <div className="size-5 shrink-0 text-muted-foreground transition-colors [&_path]:fill-muted-foreground! group-hover:[&_path]:fill-primary!">
              <Icon name="upload" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
