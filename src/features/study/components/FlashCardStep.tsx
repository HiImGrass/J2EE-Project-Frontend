import { ImgButton } from "@/components/ui/ImgButton";
import { FlashCard } from "@/features/learn-new-vocab/components/FlashCard";
import type { Vocabulary } from "@/types/student-study.type";

export function FlashCardStep({ word, onNext, onNextWord }: { word: Vocabulary; onNext: () => void, onNextWord?: () => void }) {
    return (
        <div className="flex flex-col p-4 items-center gap-12">
            <FlashCard
                vocabulary={word}
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