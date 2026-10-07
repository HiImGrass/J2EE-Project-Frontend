import { useState } from "react";
import { ListenAndWriteExercise } from "./ListenAndWriteExercise";
import type { Word } from "../types";
import { ResultSheet } from "./ResultSheet";


const speak = (text: string, rate = 1) => {
    // window.speechSynthesis.cancel();
    // const u = new SpeechSynthesisUtterance(text);
    // u.lang = "en-US";
    // u.rate = rate;
    // window.speechSynthesis.speak(u);
    console.log(text);
};

export function ListenAndWriteStep(
    { answer, vocab, onNext }:
        { answer: string; vocab: Word; onNext: () => void }
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
                onPlay={() => speak(answer, 1)}
                onPlaySlow={() => speak(answer, 0.5)}
                onCheck={handleCheck}
            />

            {result !== null && (
                <ResultSheet isCorrect={result} vocab={vocab} onNext={onNext} />
            )}
        </div>
    );
}
