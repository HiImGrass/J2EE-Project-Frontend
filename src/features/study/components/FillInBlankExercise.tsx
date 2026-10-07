import { useRef, useState } from 'react';
// Chỉnh lại đường dẫn import cho đúng với project của bạn
import { cn } from '@/lib/utils';
import { ImgButton } from '@/components/ui/ImgButton';
import type { Word } from '../types';

interface FillInBlankExerciseProps {
    word: Word;
    onCheck?: (answer: string) => void;
    className?: string;
}
export const FillInBlankExercise = ({
    word,
    onCheck,
    className = '',
}: FillInBlankExerciseProps) => {
    const [answer, setAnswer] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const isFull = answer.length === word.word.length;
    // Ô đang được nhập (ô tiếp theo cần điền, hoặc ô cuối nếu đã đầy)
    const activeIndex = Math.min(answer.length, word.word.length - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Bỏ khoảng trắng và giới hạn đúng số ký tự
        setAnswer(e.target.value.replace(/\s/g, '').slice(0, word.word.length));
    };

    const handleCheck = () => {
        if (!isFull) return;
        onCheck?.(answer);
    };

    return (
        <div className={cn('flex flex-col gap-12 h-full w-full mx-auto p-4 items-center', className)}>
            <h2 className="text-lg font-semibold text-center">Điền từ</h2>

            <div className="flex flex-col gap-8 w-full items-center">
                {/* Nghĩa + từ loại */}
                <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
                    <span className="text-xl font-semibold text-center">{word.meaning}</span>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        {word.partOfSpeech}
                    </span>
                </div>

                {/* Input đặc biệt: các gạch chân hiển thị, input thật nằm ẩn phía trên */}
                <div
                    className="relative flex flex-row flex-wrap justify-center gap-2 w-full"
                    onClick={() => inputRef.current?.focus()}
                >
                    {Array.from({ length: word.word.length }).map((_, index) => {
                        const isActive = isFocused && index === activeIndex;
                        return (
                            <div
                                key={index}
                                className={cn(
                                    'flex h-12 w-8 items-end justify-center border-b-2 pb-1 text-2xl font-semibold transition-colors',
                                    isActive ? 'border-primary' : 'border-gray-300'
                                )}
                            >
                                {answer[index] ?? ''}
                            </div>
                        );
                    })}

                    <input
                        ref={inputRef}
                        type="text"
                        value={answer}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                        maxLength={word.word.length}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        spellCheck={false}
                        aria-label="Điền từ"
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                </div>
            </div>

            <ImgButton
                text="Kiểm tra"
                onClick={handleCheck}
                disabled={!isFull}
                className="w-fit cursor-pointer rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
};