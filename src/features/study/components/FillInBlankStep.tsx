import { useState } from 'react';
import type { Word } from '../types';
import { FillInBlankExercise } from './FillInBlankExercise';
import { ResultSheet } from './ResultSheet';


export function FillInBlankStep(
    { answer, vocab, onNext }:
        { answer: string; vocab: Word; onNext: () => void }
) {
    // null = chưa kiểm tra, true/false = đúng/sai
    const [result, setResult] = useState<boolean | null>(null);

    const handleCheck = (input: string) => {
        if (result !== null) return;
        setResult(input.trim().toLowerCase() === answer.trim().toLowerCase());
    };

    return (
        <div className="flex flex-col h-full items-center gap-2">
            <FillInBlankExercise
                // Đổi tên field cho khớp với type Word của bạn
                word={vocab}
                onCheck={handleCheck}
            />

            {result !== null && (
                <ResultSheet isCorrect={result} vocab={vocab} onNext={onNext} />
            )}
        </div>
    );
}