import { useEffect, useRef, useState } from 'react';
import { AudioToTextExercise, type TextOption } from './AudioToTextExercise';
import { ResultSheet } from '@/features/study/components/ResultSheet';
import type { Word } from '@/types/student-study.type';

const SLOW_RATE = 0.6;

export function AudioToTextStep(
    { answer, vocab, options, audioUrl, onNext }:
        { answer: string; vocab: Word; options: TextOption[]; audioUrl?: string; onNext: () => void }
) {
    // null = chưa kiểm tra, true/false = đúng/sai
    const [result, setResult] = useState<boolean | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Dừng âm thanh khi rời khỏi step
    useEffect(() => {
        return () => {
            audioRef.current?.pause();
            window.speechSynthesis?.cancel();
        };
    }, []);

    const play = (rate: number) => {
        audioRef.current?.pause();
        window.speechSynthesis?.cancel();

        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.playbackRate = rate;
            audioRef.current = audio;
            audio.play().catch(() => { });
            return;
        }

        // Không có audioUrl thì đọc bằng TTS của trình duyệt
        const utterance = new SpeechSynthesisUtterance(vocab.word);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        window.speechSynthesis?.speak(utterance);
    };

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
            <AudioToTextExercise
                options={options}
                onPlay={() => play(1)}
                onPlaySlow={() => play(SLOW_RATE)}
                onCheck={handleCheck}
                onSkip={handleSkip}
            />

            {result !== null && (
                <ResultSheet isCorrect={result} vocab={vocab} onNext={onNext} />
            )}
        </div>
    );
}