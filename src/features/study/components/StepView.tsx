import type { Step } from "../types";
import { FillInBlankStep } from "./FillInBlankStep";
import { FlashCardStep } from "./FlashCardStep";
import { ListenAndWriteStep } from "./ListenAndWriteStep";

export function StepView({ step, onNext, onNextWord }: { step: Step; onNext: () => void; onNextWord?: () => void }) {
    switch (step.type) {
        case "flashcard":
            return <FlashCardStep word={step.data} onNext={onNext} onNextWord={onNextWord} />;
        case "listen-write":
            return <ListenAndWriteStep answer={step.answer} vocab={step.vocab} onNext={onNext} />;
        case "fill-in-blank":
            return <FillInBlankStep answer={step.answer} vocab={step.vocab} onNext={onNext} />;

        // case các trường hợp cho các bài tập khác
    }
}