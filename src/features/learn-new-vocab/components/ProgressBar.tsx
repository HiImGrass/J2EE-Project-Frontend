import { Icon } from "@/components/ui/icon";

interface ProgressBarProps {
    current: number;          // số từ đã học
    total: number;            // tổng số từ
    iconName?: string;
    iconSize?: number;
    className?: string;
}

export const ProgressBar = ({
    current,
    total,
    iconName = 'Default',
    iconSize = 40,
    className = '',
}: ProgressBarProps) => {
    // Clamp về 0 - 1 và tránh chia cho 0
    const ratio = total > 0 ? Math.min(Math.max(current / total, 0), 1) : 0;
    const percent = ratio * 100;

    const iconLeft = `calc(${percent}% - ${ratio * iconSize}px)`;
    const fillWidth = `calc(${percent}% + ${(0.5 - ratio) * iconSize}px)`;

    return (
        <div
            className={`relative w-full h-4 rounded-full bg-gray-200 ${className}`}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={current}
        >
            {/* Phần đã học */}
            <div
                className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: fillWidth }}
            />

            {/* Icon đánh dấu tiến độ */}
            <div
                className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                style={{ left: iconLeft, width: iconSize, height: iconSize }}
            >
                <Icon name={iconName} className="bg-white" />
            </div>
        </div>
    );
};