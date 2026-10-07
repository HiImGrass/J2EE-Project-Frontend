import { ImgButton } from "@/components/ui/ImgButton";
import { FlashCard } from "@/features/learn-new-vocab/FlashCard";
import type { Word } from "../types";

export function FlashCardStep({ word, onNext, onNextWord }: { word: Word; onNext: () => void, onNextWord?: () => void }) {
    return (
        <div className="flex flex-col items-center gap-12">
            <FlashCard
                word={word.word}
                example={word.example}
                pronunciation={word.pronunciation}
                meaning={word.meaning}
                partOfSpeech={word.partOfSpeech}
            />
            <div className="flex flex-col items-center gap-2">
                <ImgButton
                    text="Tiếp tục"
                    onClick={onNext}
                    className="p-4 bg-primary text-white rounded-xl text-center text-nowrap"
                />
                {
                    onNextWord && (
                        <ImgButton className="underline" text="Mình đã thuộc từ này" onClick={onNextWord} />
                    )
                }
            </div>
        </div>
    );
}