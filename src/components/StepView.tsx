import type { Step } from "@/types/transition.type";
import { FillInBlankStep } from "../features/study/components/FillInBlankStep";
import { FlashCardStep } from "../features/study/components/FlashCardStep";
import { ListenAndWriteStep } from "../features/study/components/ListenAndWriteStep";
import { TextToAudioStep } from "@/features/vocabulary-training/components/TextToAudioStep";
import { AudioToTextStep } from "@/features/vocabulary-training/components/AudioToTextStep";
import { MultipleChoiceStep } from "@/features/vocabulary-training/components/MultipleChoiceStep";

export function StepView({ step, onNext, onNextWord }: { step: Step; onNext: () => void; onNextWord?: () => void }) {
    switch (step.type) {
        case "flashcard":
            return <FlashCardStep word={step.data} onNext={onNext} onNextWord={onNextWord} />;
        case "listen-write":
            return <ListenAndWriteStep answer={step.answer} vocab={step.vocab} onNext={onNext} />;
        case "fill-in-blank":
            return <FillInBlankStep answer={step.answer} vocab={step.vocab} onNext={onNext} />;
        case "text-to-audio":
            return <TextToAudioStep answer={step.answer} vocab={step.vocab} options={step.options} onNext={onNext} />;
        case "audio-to-text":
            return <AudioToTextStep answer={step.answer} vocab={step.vocab} options={step.options} onNext={onNext} />;
        // StepView
        case "multiple-choice":
            return <MultipleChoiceStep question={step.question} answer={step.answer} vocab={step.vocab} options={step.options} onNext={onNext} />;
    }
}