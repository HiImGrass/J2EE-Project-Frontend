type StudyResultCardProps = {
  total: number;
  onContinue: () => void;
};

export function StudyResultCard({ total, onContinue }: StudyResultCardProps) {
  return (
    <div className="flex w-full flex-col justify-between gap-12 bg-background p-6 text-center">
      <div className="flex flex-col items-center">
        <div className="mb-4 text-5xl" aria-hidden="true">🎉</div>
        <h2 className="text-2xl font-bold text-foreground">Hoàn thành bài học!</h2>
        <p className="mt-2 text-base text-foreground/70">
          Bạn đã hoàn thành <span className="font-semibold text-foreground">{total}</span> từ vựng trong chủ đề này.
        </p>
      </div>

      <div className="w-full pb-4">
        <button
          type="button"
          className="w-full rounded-xl bg-primary px-4 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 active:opacity-100"
          onClick={onContinue}
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
