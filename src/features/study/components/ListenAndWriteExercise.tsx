import { ImgButton } from '@/components/ui/ImgButton';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface ListenAndWriteExerciseProps {
    onPlay?: () => void;
    onPlaySlow?: () => void;
    onCheck?: (answer: string) => void;
    className?: string;
}

export const ListenAndWriteExercise = ({
    onPlay,
    onPlaySlow,
    onCheck,
    className = '',
}: ListenAndWriteExerciseProps) => {
    const [answer, setAnswer] = useState<string>('');

    const handleCheck = () => {
        onCheck?.(answer.trim());
    };

    return (
        <div className={cn('flex flex-col gap-12 h-full w-full mx-auto p-4 items-center', className)}>
            <h2 className="text-lg font-semibold text-center">Nghe và viết lại</h2>

            <div className='flex flex-col gap-8 w-full'>
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
                <Input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                    placeholder="Gõ lại từ bạn nghe được"
                    className="h-12 w-full px-4 focus-visible:border-primary focus-visible:ring-primary/30"
                />
            </div>

            <ImgButton
                text="Kiểm tra"
                onClick={handleCheck}
                disabled={!answer.trim()}
                className="w-fit cursor-pointer rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90 active:scale-95 transition disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
};