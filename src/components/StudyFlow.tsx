import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ProgressBar } from "@/features/learn-new-vocab/components/ProgressBar";
import StudyTransition from "@/features/learn-new-vocab/components/StudyTransition";
import { StepView } from "./StepView";
import { ImgButton } from "./ui/ImgButton";
import { ConfirmationDialog } from "./ConfirmationDialog";
import type { Phase, Step } from "@/types/transition.type";

const SLIDE_MS = 350;

interface StudyFlowProps {
  steps: Step[];
  completion?: ReactNode;
  transitionMessage?: string;
  onExit: () => void;
}

/** Shared entry transition, progress, and slide navigation for study activities. */
export function StudyFlow({
  steps,
  completion,
  transitionMessage,
  onExit,
}: StudyFlowProps) {
  const [showTransition, setShowTransition] = useState(true);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("enter");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const phaseRef = useRef<Phase>("enter");
  const current = steps[index];
  const finished = index >= steps.length;
  const handleTransitionComplete = useCallback(() => setShowTransition(false), []);

  const goTo = useCallback((targetIndex: number) => {
    if (phaseRef.current === "exit" || targetIndex < 0 || targetIndex > steps.length) return;
    phaseRef.current = "exit";
    setPhase("exit");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIndex(targetIndex);
      phaseRef.current = "enter";
      setPhase("enter");
      timeoutRef.current = null;
    }, SLIDE_MS);
  }, [steps.length]);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goNextWord = useCallback(() => {
    const nextWordIndex = steps.findIndex(
      (step, stepIndex) => stepIndex > index && step.type === "flashcard",
    );
    goTo(nextWordIndex === -1 ? steps.length : nextWordIndex);
  }, [goTo, index, steps]);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="flex h-full flex-col items-center gap-10 px-3 py-3">
      {showTransition && (
        <StudyTransition
          message={transitionMessage}
          onComplete={handleTransitionComplete}
        />
      )}
      <div className="flex w-full items-center gap-3">
        <ImgButton
          iconName="close"
          iconSize="sm"
          className="shrink-0 text-muted-foreground hover:text-destructive"
          onClick={() => setShowExitConfirmation(true)}
        />
        <ProgressBar
          current={index}
          total={steps.length}
          iconName="progress-mark"
          className="flex-1"
        />
      </div>
      <div className="flex h-full w-full flex-col gap-6 overflow-hidden">
        {!showTransition && !finished && current && (
          <div
            key={current.id}
            className="card-slide flex flex-col gap-4"
            style={{
              animation: phase === "exit"
                ? `card-out ${SLIDE_MS}ms cubic-bezier(.7,0,.3,1) forwards`
                : `card-in ${SLIDE_MS + 50}ms cubic-bezier(.2,.9,.3,1) both`,
            }}
            onAnimationEnd={() => phase === "enter" && setPhase("idle")}
          >
            <StepView
              step={current}
              onNext={goNext}
              onNextWord={current.type === "flashcard" ? goNextWord : undefined}
            />
          </div>
        )}
        {!showTransition && finished && completion}
      </div>
      {
        showExitConfirmation &&
        <ConfirmationDialog
          open={showExitConfirmation}
          title="Thoát khỏi bài học?"
          description="Tiến trình học hiện tại có thể không được lưu."
          cancelLabel="Ở lại"
          confirmLabel="Thoát"
          onCancel={() => setShowExitConfirmation(false)}
          onConfirm={onExit}
        />
      }
      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateX(100%); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes card-out {
          from { opacity: 1; transform: translateX(0); }
          to { opacity: 0; transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .card-slide { animation-duration: 1ms !important; }
        }
      `}</style>
    </div>
  );
}
