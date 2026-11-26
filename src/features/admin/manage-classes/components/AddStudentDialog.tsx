import { useState } from 'react'
import { X, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type TabKey = 'manual' | 'invitation' | 'excel'

interface AddStudentDialogProps {
  open: boolean
  onClose: () => void
  invitationCode: string
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'manual', label: 'Thêm thủ công' },
  { key: 'invitation', label: 'Tham gia bằng mã mời' },
  { key: 'excel', label: 'Thêm bằng file Excel' },
]

export function AddStudentDialog({ open, onClose, invitationCode }: AddStudentDialogProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('invitation')
  const [copied, setCopied] = useState(false)

  if (!open) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(invitationCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement('textarea')
      textArea.value = invitationCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-2xl flex-col rounded-xl bg-background shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-label="Thêm học viên"
        onClick={(e) => e.stopPropagation()}
      >
 
        <div className="flex items-center justify-between border-b border-border px-6 pt-4 pb-0">
          <div className="flex gap-0">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'relative px-4 pb-3 text-sm font-medium transition-colors',
                  activeTab === tab.key
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute right-0 bottom-0 left-0 h-0.5 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="mb-3 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Đóng"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'invitation' && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex w-full items-center justify-center rounded-lg border border-border bg-muted/30 py-12">
                <span className="select-all font-mono text-5xl font-bold tracking-widest text-foreground md:text-6xl">
                  {invitationCode}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all',
                  copied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-primary/10 text-primary hover:bg-primary/20',
                )}
              >
                {copied ? (
                  <>
                    <Check className="size-4" />
                    Đã sao chép!
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    Sao chép mã mời
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                chuc nang chua lam.
              </p>
            </div>
          )}

          {activeTab === 'excel' && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-sm text-muted-foreground">
                chuc nang chua lam.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
