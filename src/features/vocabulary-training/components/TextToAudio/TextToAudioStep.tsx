import { useState } from 'react';
import { TextToAudioExercise } from './TextToAudioExercise';
import type { Answer } from '@/types/question.type';
import type { Vocabulary } from '@/types/student-study.type';
import { ResultSheet } from '@/features/study/components/ResultSheet';

export function TextToAudioStep(
    { answer, vocab, options, onNext }:
        { answer: number; vocab: Vocabulary; options: Answer[]; onNext: () => void }
) {
    // null = chưa kiểm tra, true/false = đúng/sai
    const [result, setResult] = useState<boolean | null>(null);

    // answer là id của đáp án đúng
    const handleCheck = (selectedId: number) => {
        if (result !== null) return;
        setResult(selectedId === answer);
    };

    // "Mình không thuộc từ này" => tính là sai, hiện đáp án luôn
    const handleSkip = () => {
        if (result !== null) return;
        setResult(false);
    };

    return (
        <div className="flex flex-col h-full items-center gap-2">
            <TextToAudioExercise
                word={vocab}
                options={options}
                onCheck={handleCheck}
                onSkip={handleSkip}
            />

            {result !== null && (
                <ResultSheet isCorrect={result} vocab={vocab} onNext={onNext} />
            )}
        </div>
    );
}
