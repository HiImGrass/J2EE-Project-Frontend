import { useState } from "react";
import { ListenAndWriteExercise } from "./ListenAndWriteExercise";
import { ResultSheet } from "./ResultSheet";
import type { Vocabulary } from "@/types/student-study.type";

export function ListenAndWriteStep(
    { answer, vocab, onNext }:
        { answer: string; vocab: Vocabulary; onNext: () => void }
) {
    // null = chưa kiểm tra, true/false = đúng/sai
    const [result, setResult] = useState<boolean | null>(null);

    const handleCheck = (input: string) => {
        if (result !== null) return;
        setResult(input.toLowerCase() === answer.toLowerCase());
    };

    return (
        <div className="flex flex-col h-full items-center gap-2">
            <ListenAndWriteExercise
                audioPublicId={vocab.audioUrl}
                onCheck={handleCheck}
            />

            {result !== null && (
                <ResultSheet isCorrect={result} vocab={vocab} onNext={onNext} />
            )}
        </div>
    );
}
