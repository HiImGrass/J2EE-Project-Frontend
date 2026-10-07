type StudyResultCardProps = {
  total: number;
  onBackToLearningPath: () => void;
};

export function StudyResultCard({ total, onBackToLearningPath }: StudyResultCardProps) {
  return (
    <div className="flex w-full flex-col gap-12 justify-between bg-background p-6 text-center">

      {/* Nội dung chính ở trung tâm màn hình */}
      <div className="flex flex-col items-center">
        <div className="mb-4 text-5xl">🎉</div>
        
        <h2 className="text-2xl font-bold text-foreground">Hoàn thành bài học!</h2>
        <p className="mt-2 text-base text-foreground/70">
          Bạn đã hoàn thành <span className="font-semibold text-foreground">{total}</span> từ vựng trong chủ đề này.
        </p>
      </div>

      {/* Nút bấm cố định phía dưới màn hình mobile */}
      <div className="w-full pb-4">
        <button
          type="button"
          className="w-full rounded-xl bg-primary px-4 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 active:opacity-100"
          onClick={onBackToLearningPath}
        >
          Trở về lộ trình học
        </button>
      </div>
    </div>
  );
}