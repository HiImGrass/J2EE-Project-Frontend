import { useState } from 'react';
import { MultipleChoiceExercise, type ChoiceOption } from './MultipleChoiceExercise';
import { ResultSheet } from '@/features/study/components/ResultSheet';
import type { Vocabulary } from '@/types/student-study.type';

export function MultipleChoiceStep(
    { question, answer, vocab, options, onNext }:
        { question: string; answer: string; vocab: Vocabulary; options: ChoiceOption[]; onNext: () => void }
) {
    // null = chưa kiểm tra, true/false = đúng/sai
    const [result, setResult] = useState<boolean | null>(null);

    // answer là id của đáp án đúng
    const handleCheck = (selectedId: string) => {
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
            <MultipleChoiceExercise
                question={question}
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