import { useId } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export type DataFormValue = string | number | boolean | null | undefined
export type DataFormValues = Record<string, DataFormValue>

export interface DataFormOption {
  label: string
  value: string
}

export interface DataFormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'textarea' | 'select' | 'checkbox'
  placeholder?: string
  description?: string
  required?: boolean
  disabled?: boolean
  options?: DataFormOption[]
  min?: number
  max?: number
  step?: number
  rows?: number
  className?: string
}

interface DataFormProps {
  fields: DataFormField[]
  initialValues?: DataFormValues
  mode?: 'create' | 'edit'
  title?: string
  description?: string
  submitLabel?: string
  cancelLabel?: string
  isSubmitting?: boolean
  onSubmit: (values: DataFormValues) => void | Promise<void>
  onCancel?: () => void
  className?: string
  children?: ReactNode
}

export function DataForm({
  fields,
  initialValues = {},
  mode = 'create',
  title,
  description,
  submitLabel,
  cancelLabel = 'Hủy',
  isSubmitting = false,
  onSubmit,
  onCancel,
  className,
  children,
}: DataFormProps) {
  const id = useId()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values: DataFormValues = {}

    for (const field of fields) {
      if (field.type === 'checkbox') {
        values[field.name] = formData.has(field.name)
      } else if (field.type === 'number') {
        const value = formData.get(field.name)?.toString() ?? ''
        values[field.name] = value === '' ? '' : Number(value)
      } else {
        values[field.name] = formData.get(field.name)?.toString() ?? ''
      }
    }

    void onSubmit(values)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('overflow-hidden rounded-xl border border-border bg-card shadow-sm', className)}
    >
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <h2 className="text-lg font-semibold text-foreground">
          {title ?? (mode === 'create' ? 'Thêm dữ liệu' : 'Cập nhật dữ liệu')}
        </h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>

      <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-6 sm:grid-cols-2 sm:p-8">
        {fields.map((field) => {
          const fieldId = `${id}-${field.name}`
          const value = initialValues[field.name]
          const commonClass = cn(
            'mt-1.5 h-10 border-input bg-background text-sm',
            field.className,
          )

          if (field.type === 'checkbox') {
            return (
              <div key={field.name} className={cn('sm:col-span-2', field.className)}>
                <label htmlFor={fieldId} className="flex cursor-pointer items-start gap-3">
                  <input
                    id={fieldId}
                    name={field.name}
                    type="checkbox"
                    defaultChecked={Boolean(value)}
                    disabled={field.disabled}
                    className="mt-0.5 size-4 accent-primary"
                  />
                  <span>
                    <span className="text-sm font-medium text-foreground">{field.label}</span>
                    {field.description && (
                      <span className="mt-0.5 block text-sm text-muted-foreground">
                        {field.description}
                      </span>
                    )}
                  </span>
                </label>
              </div>
            )
          }

          return (
            <div key={field.name} className={cn('min-w-0', field.className)}>
              <label htmlFor={fieldId} className="text-sm font-medium text-foreground">
                {field.label}
                {field.required && <span className="ml-1 text-destructive">*</span>}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={fieldId}
                  name={field.name}
                  defaultValue={value == null ? '' : String(value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  disabled={field.disabled}
                  rows={field.rows ?? 4}
                  className="mt-1.5 w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50"
                />
              ) : field.type === 'select' ? (
                <select
                  id={fieldId}
                  name={field.name}
                  defaultValue={value == null ? '' : String(value)}
                  required={field.required}
                  disabled={field.disabled}
                  className={cn(
                    'w-full rounded-lg border px-3 text-foreground outline-none transition-colors focus-visible:border-primary/70 focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50',
                    commonClass,
                  )}
                >
                  <option value="" disabled={field.required}>
                    {field.placeholder ?? 'Chọn một giá trị'}
                  </option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  id={fieldId}
                  name={field.name}
                  type={field.type ?? 'text'}
                  defaultValue={value == null ? '' : String(value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  disabled={field.disabled}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className={commonClass}
                />
              )}

              {field.description && (
                <p className="mt-1.5 text-xs text-muted-foreground">{field.description}</p>
              )}
            </div>
          )
        })}
        {children}
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border bg-muted/30 px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="h-10 px-5">
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting} className="h-10 px-5">
          {isSubmitting ? 'Đang lưu…' : submitLabel ?? (mode === 'create' ? 'Tạo mới' : 'Lưu thay đổi')}
        </Button>
      </div>
    </form>
  )
}

export default DataForm
