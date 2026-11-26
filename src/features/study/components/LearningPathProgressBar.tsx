interface LearningPathProgressBarProps {
    current: number;
    total: number;
    className?: string;
}

export function LearningPathProgressBar({ current, total, className = "" }: LearningPathProgressBarProps) {
    const progress = total > 0 ? Math.min(Math.max((current / total) * 100, 0), 100) : 0;

    return (
        <div
            className={`h-2 w-full overflow-hidden rounded-full bg-muted ${className}`}
            role="progressbar"
            aria-label="Tiến độ học tập"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={Math.min(Math.max(current, 0), total)}
        >
            <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
