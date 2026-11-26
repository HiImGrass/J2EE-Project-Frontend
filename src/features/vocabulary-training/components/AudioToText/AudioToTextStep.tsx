import { useState } from 'react';
import { AudioToTextExercise } from './AudioToTextExercise';
import { ResultSheet } from '@/features/study/components/ResultSheet';
import type { Vocabulary } from '@/types/student-study.type';
import type { Answer } from '@/types/question.type';

export function AudioToTextStep(
    { answer, vocab, options, audioUrl, onNext }:
        { answer: number; vocab: Vocabulary; options: Answer[]; audioUrl?: string; onNext: () => void }
) {
    const [result, setResult] = useState<boolean | null>(null);

    const handleCheck = (selectedId: number) => {
        if (result !== null) return;
        setResult(selectedId === answer);
    };

    const handleSkip = () => {
        if (result !== null) return;
        setResult(false);
    };

    return (
        <div className="flex flex-col h-full items-center gap-2">
            <AudioToTextExercise
                options={options}
                audioPublicId={audioUrl ?? vocab.audioUrl ?? ''}
                onCheck={handleCheck}
                onSkip={handleSkip}
                hasResult={result !== null}
            />

            {result !== null && (
                <ResultSheet isCorrect={result} vocab={vocab} onNext={onNext} />
            )}
        </div>
    );
}
