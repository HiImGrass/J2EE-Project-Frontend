import { ProgressBar } from "@/features/learn-new-vocab/ProgressBar";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyTransition from "@/features/learn-new-vocab/StudyTransition";
import { StudyResultCard } from "@/features/study/components/StudyResultCard";
import type { Phase, Step, Word } from "@/features/study/types";
import { StepView } from "@/features/study/components/StepView";

// Sau này thay bằng data fetch theo topic
const WORDS: Word[] = [
    {
        word: "student",
        example: "His younger sister is a student at that university.",
        exampleMeaning: "Em gái của anh ấy là sinh viên tại trường đại học đó.",
        pronunciation: "/ˈstuːdnt/",
        meaning: "Học sinh, sinh viên",
        partOfSpeech: "(n)",
    },
    {
        word: "teacher",
        example: "She is a teacher at a local school.",
        exampleMeaning: "Cô ấy là giáo viên tại một trường học địa phương.",
        pronunciation: "/ˈtiːtʃər/",
        meaning: "Giáo viên",
        partOfSpeech: "(n)",
    },
    {
        word: "library",
        example: "I often study at the library after class.",
        exampleMeaning: "Tôi thường học ở thư viện sau giờ học.",
        pronunciation: "/ˈlaɪbreri/",
        meaning: "Thư viện",
        partOfSpeech: "(n)",
    },
];

const STEPS: Step[] = WORDS.flatMap((w): Step[] => [
    { type: "flashcard", id: `fc-${w.word}`, data: w },
    { type: "listen-write", id: `lw-${w.word}`, vocab: w, answer: w.word }
]);

const SLIDE_MS = 350;

export function StudyPage() {

    const [showTransition, setShowTransition] = useState(true);
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>("enter"); // state lưu trạng thái đang hoạt động của thẻ, tránh spam khi đang chuyển

    const total = STEPS.length;
    const finished = index >= total;

    const current = STEPS[index];

    const handleTransitionDone = useCallback(() => setShowTransition(false), []);

    const goNext = () => {
        if (phase === "exit") return; // chặn bấm liên tục khi đang animate
        setPhase("exit");
        setTimeout(() => {
            // setLearned((v) => v + 1);
            setIndex((v) => v + 1);
            setPhase("enter");
        }, SLIDE_MS);
    };

    const navigate = useNavigate();
    const backToLearningPath = () => {
        navigate("/student-learning-path")
    }

    const { topic } = useParams();// id topic


    return (
        <div className="h-full flex flex-col items-center px-3 py-3 gap-10">
            <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateX(100%); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes card-out {
          from { opacity: 1; transform: translateX(0); }
          to   { opacity: 0; transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .card-slide { animation-duration: 1ms !important; }
        }
      `}</style>

            {showTransition && (
                <StudyTransition onComplete={handleTransitionDone} />
            )}

            <ProgressBar current={index} total={total} iconName="progress-mark" />

            <div className="h-full w-full overflow-hidden flex flex-col gap-6">
                {!showTransition && !finished && (
                    <div>
                        <div
                            key={index}
                            className="card-slide flex flex-col gap-4"
                            style={{
                                animation:
                                    phase === "exit"
                                        ? `card-out ${SLIDE_MS}ms cubic-bezier(.7,0,.3,1) forwards`
                                        : `card-in ${SLIDE_MS + 50}ms cubic-bezier(.2,.9,.3,1) both`,
                            }}
                            onAnimationEnd={() => phase === "enter" && setPhase("idle")}
                        >
                            <StepView step={current} onNext={goNext} />
                        </div>

                    </div>
                )}

                {!showTransition && finished && (
                    <StudyResultCard
                        total={WORDS.length}
                        onBackToLearningPath={() => backToLearningPath()}
                    />
                )}
            </div>
        </div>
    );
}