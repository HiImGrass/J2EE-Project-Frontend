import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/icon'
import { ImgButton } from '@/components/ui/ImgButton'

interface ActionBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  onAddClick?: () => void
  addLabel?: string
  placeholder?: string
  className?: string
}

export function ActionBar({
  searchValue = '',
  onSearchChange,
  onAddClick,
  addLabel = 'Thêm',
  placeholder = 'Search',
  className,
}: ActionBarProps) {
  return (
    <div
      className={cn('flex items-center justify-between gap-3 rounded-lg bg-white p-2.5', className)}
    >
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute right-3 size-5 text-muted-foreground">
          <Icon name="search" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'text-md h-9 w-64 rounded-md border border-input bg-background pr-3 pl-3',
            'placeholder:text-muted-foreground',
            'focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:outline-none',
            'transition-shadow duration-150',
          )}
        />
      </div>

      <ImgButton
        iconName="plus"
        iconPosition="left"
        iconSize="xs"
        text={addLabel}
        onClick={onAddClick}
        className={cn(
          'gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground',
          'transition-colors duration-150 hover:bg-primary/90',
          'focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:outline-none',
        )}
      />
    </div>
  )
}
