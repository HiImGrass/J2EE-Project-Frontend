import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImgButton } from '@/components/ui/ImgButton';

export interface TextOption {
    id: string;
    text: string;
}

interface AudioToTextExerciseProps {
    options: TextOption[];
    onPlay?: () => void;
    onPlaySlow?: () => void;
    onCheck?: (selectedId: string) => void;
    onSkip?: () => void;
    className?: string;
}

export const AudioToTextExercise = ({
    options,
    onPlay,
    onPlaySlow,
    onCheck,
    onSkip,
    className = '',
}: AudioToTextExerciseProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleCheck = () => {
        if (!selectedId) return;
        onCheck?.(selectedId);
    };

    return (
        <div className={cn('flex flex-col gap-12 h-full w-full mx-auto p-4 items-center', className)}>
            <h2 className="text-lg font-semibold text-center">Nghe và chọn từ đúng</h2>

            <div className="flex flex-col gap-8 w-full items-center">
                {/* Nghe phát âm thường + phát âm chậm */}
                <div className="flex flex-row items-center justify-center gap-4">
                    <ImgButton
                        iconName="volume"
                        iconSize="lg"
                        onClick={onPlay}
                        className="w-24 h-24 justify-center rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition"
                    />
                    <ImgButton
                        iconName="snail"
                        iconSize="sm"
                        onClick={onPlaySlow}
                        className="w-16 h-16 justify-center rounded-full bg-primary text-white hover:opacity-90 active:scale-95 transition"
                    />
                </div>

                {/* Các đáp án bằng chữ */}
                <div className="flex flex-col gap-3 w-full max-w-md">
                    {options.map((option) => {
                        const isSelected = option.id === selectedId;
                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => setSelectedId(option.id)}
                                aria-pressed={isSelected}
                                className={cn(
                                    'w-full cursor-pointer rounded-lg border-2 px-4 py-3 text-left text-lg font-medium transition-colors',
                                    isSelected
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-gray-300 hover:border-primary/50'
                                )}
                            >
                                {option.text}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex flex-col items-center gap-4">
                <ImgButton
                    text="Kiểm tra"
                    onClick={handleCheck}
                    disabled={!selectedId}
                    className="w-fit cursor-pointer rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-50"
                />

                <button
                    type="button"
                    onClick={onSkip}
                    className="cursor-pointer text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
                >
                    Mình không thuộc từ này
                </button>
            </div>
        </div>
    );
};