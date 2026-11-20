import { useState } from 'react';
import { AudioButton } from '@/components/AudioButton';
import { cn } from '@/lib/utils';
import { ImgButton } from '@/components/ui/ImgButton';
import type { Answer } from '@/types/question.type';

interface AudioToTextExerciseProps {
    options: Answer[];
    audioPublicId: string;
    onCheck?: (selectedId: number) => void;
    onSkip?: () => void;
    className?: string;
}

export const AudioToTextExercise = ({
    options,
    audioPublicId,
    onCheck,
    onSkip,
    className = '',
}: AudioToTextExerciseProps) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

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
                    <AudioButton
                        publicId={audioPublicId}
                        className="h-24 w-24 rounded-full bg-primary p-6 text-white hover:opacity-90 active:scale-95 transition"
                    />
                    <AudioButton
                        publicId={audioPublicId}
                        playbackRate={0.6}
                        iconName="snail"
                        className="h-16 w-16 rounded-full bg-primary p-4 text-white hover:opacity-90 active:scale-95 transition"
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
                                {option.answerContent}
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
