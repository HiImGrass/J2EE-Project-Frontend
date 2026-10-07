import type { Step } from "../types";
import { FlashCardStep } from "./FlashCardStep";
import { ListenAndWriteStep } from "./ListenAndWriteStep";

export function StepView({ step, onNext }: { step: Step; onNext: () => void }) {
    switch (step.type) {
        case "flashcard":
            return <FlashCardStep word={step.data} onNext={onNext} />;
        case "listen-write":
            return <ListenAndWriteStep answer={step.answer} vocab={step.vocab} onNext={onNext} />;

        // case các trường hợp cho các bài tập khác
    }
}