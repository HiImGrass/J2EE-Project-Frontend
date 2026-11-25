import { useId } from "react";

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: "cancel" | "confirm";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationDialog({
  open,
  title,
  description,
  confirmLabel = "Xác nhận",
  cancelLabel = "Hủy",
  type = "confirm",
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  const titleId = useId();

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        className="flex flex-col items-center w-full max-w-sm rounded-xl bg-background p-6 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold">
          {title}
        </h2>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`rounded-md px-4 py-2 text-sm text-white font-medium hover:opacity-90 ${type === "cancel"
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
              }`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
