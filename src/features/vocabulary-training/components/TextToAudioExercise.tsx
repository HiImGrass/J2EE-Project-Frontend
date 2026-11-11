import { useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';
// TODO: chỉnh lại đường dẫn import cho khớp với project của bạn
import { cn } from '@/lib/utils';
import { ImgButton } from '@/components/ui/ImgButton';
import type { Word } from '@/types/student-study.type';

export interface AudioOption {
    id: string;
    audioUrl: string;
}

interface TextToAudioExerciseProps {
    word: Word;
    options: AudioOption[];
    onCheck?: (selectedId: string) => void;
    onSkip?: () => void;
    className?: string;
}

export const TextToAudioExercise = ({
    word,
    options,
    onCheck,
    onSkip,
    className = '',
}: TextToAudioExerciseProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [playingId, setPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleSelect = (option: AudioOption) => {
        setSelectedId(option.id);

        // Dừng âm thanh đang phát (nếu có) rồi phát âm thanh của đáp án vừa chọn
        audioRef.current?.pause();
        const audio = new Audio(option.audioUrl);
        audioRef.current = audio;
        setPlayingId(option.id);
        audio.onended = () => setPlayingId((prev) => (prev === option.id ? null : prev));
        audio.onerror = () => setPlayingId((prev) => (prev === option.id ? null : prev));
        audio.play().catch(() => setPlayingId(null));
    };

    const handleCheck = () => {
        if (!selectedId) return;
        onCheck?.(selectedId);
    };

    return (
        <div className={cn('flex flex-col gap-12 h-full w-full mx-auto p-4 items-center', className)}>
            <h2 className="text-lg font-semibold text-center">Chọn âm thanh đúng</h2>

            <div className="flex flex-col gap-8 w-full items-center">
                {/* Nội dung câu hỏi: từ + từ loại */}
                <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
                    <span className="text-xl font-semibold text-center">{word.word}</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {word.partOfSpeech}
                    </span>
                </div>

                {/* Các đáp án dạng âm thanh */}
                <div className="flex flex-col gap-3 w-full max-w-md">
                    {options.map((option, index) => {
                        const isSelected = option.id === selectedId;
                        const isPlaying = option.id === playingId;
                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelect(option)}
                                aria-label={`Đáp án ${index + 1}`}
                                aria-pressed={isSelected}
                                className={cn(
                                    'flex w-full cursor-pointer flex-row items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors',
                                    isSelected
                                        ? 'border-primary bg-primary/10'
                                        : 'border-gray-300 hover:border-primary/50'
                                )}
                            >
                                <Volume2
                                    className={cn(
                                        'h-6 w-6 shrink-0',
                                        isSelected ? 'text-primary' : 'text-gray-500',
                                        isPlaying && 'animate-pulse'
                                    )}
                                />
                                <span className="font-medium">Đáp án {index + 1}</span>
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