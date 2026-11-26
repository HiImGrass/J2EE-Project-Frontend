import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ConfirmationDialog } from "@/components/ConfirmationDialog";
import type { Vocabulary } from "@/types/student-study.type";

type StudyVocabularySaveCardProps = {
  vocabularies: Vocabulary[];
  knownWordIds: number[];
  onSave: (selected: Vocabulary[]) => void;
};

export function StudyVocabularySaveCard({ vocabularies, knownWordIds, onSave }: StudyVocabularySaveCardProps) {
  const knownWordIdSet = new Set(knownWordIds);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(
    () => new Set(vocabularies.filter((vocab) => !knownWordIdSet.has(vocab.id)).map((vocab) => vocab.id)),
  );
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggle = (id: number, checked: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const handleConfirmSave = () => {
    onSave(vocabularies.filter((vocab) => selectedIds.has(vocab.id)));
    setShowConfirmation(false);
  };

  return (
    <section className="flex min-h-0 w-full flex-1 flex-col gap-5 bg-background p-4">
      <h2 className="text-center text-xl font-bold text-foreground">
        Chọn từ bạn muốn lưu vào Sổ tay
      </h2>

      <div className="min-h-0 flex-1 rounded-2xl bg-muted p-3">
        <ScrollArea className="h-full">
          <ul className="flex flex-col gap-3 pr-3">
            {vocabularies.map((vocab) => (
              <li key={vocab.id} className="flex items-center gap-3">
                <div className="flex w-28 shrink-0 flex-col">
                  <span className="font-medium">{vocab.word}</span>
                  <span className="text-sm text-muted-foreground">{vocab.partOfSpeech}</span>
                </div>
                <span className="flex-1 text-sm">{vocab.meaning}</span>
                <Checkbox
                  className="size-6 rounded-full border-2"
                  checked={selectedIds.has(vocab.id)}
                  onCheckedChange={(checked) => toggle(vocab.id, checked === true)}
                  aria-label={`Chọn từ ${vocab.word}`}
                />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>

      <button
        type="button"
        className="w-full rounded-xl bg-primary px-4 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 active:opacity-100"
        onClick={() => setShowConfirmation(true)}
      >
        Lưu ({selectedIds.size})
      </button>
      <ConfirmationDialog
        open={showConfirmation}
        title="Xác nhận lưu từ vựng?"
        description={`Bạn có chắc muốn lưu ${selectedIds.size} từ vựng đã chọn vào Sổ tay không?`}
        confirmLabel="Lưu từ vựng"
        cancelLabel="Hủy"
        type="confirm"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirmation(false)}
      />
    </section>
  );
}
