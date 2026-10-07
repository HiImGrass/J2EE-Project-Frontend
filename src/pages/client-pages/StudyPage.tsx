import { FlashCard } from "@/features/learn-new-vocab/FlashCard";
import { ProgressBar } from "@/features/learn-new-vocab/ProgressBar";
import { useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImgButton } from '../../components/ui/ImgButton';
import StudyTransition from "@/features/learn-new-vocab/StudyTransition";

type Word = {
    word: string;
    example: string;
    pronunciation: string;
    meaning: string;
    partOfSpeech: string;
};

// Sau này thay bằng data fetch theo topic
const WORDS: Word[] = [
    {
        word: "student",
        example: "His younger sister is a student at that university.",
        pronunciation: "/ˈstuːdnt/",
        meaning: "Học sinh, sinh viên",
        partOfSpeech: "(n)",
    },
    {
        word: "teacher",
        example: "She is a teacher at a local school.",
        pronunciation: "/ˈtiːtʃər/",
        meaning: "Giáo viên",
        partOfSpeech: "(n)",
    },
    {
        word: "library",
        example: "I often study at the library after class.",
        pronunciation: "/ˈlaɪbreri/",
        meaning: "Thư viện",
        partOfSpeech: "(n)",
    },
];

const SLIDE_MS = 350;

type Phase = "enter" | "idle" | "exit";

export function StudyPage() {

    // (tuỳ chọn) nhận toạ độ click từ trang trước: navigate("/study/abc", { state: { origin: {x, y} } })
    const location = useLocation();
    const origin = location.state?.origin;

    const [showTransition, setShowTransition] = useState(true);
    const [index, setIndex] = useState(0);
    const [phase, setPhase] = useState<Phase>("enter");

    const total = WORDS.length;
    const finished = index >= total;

    const current = WORDS[index];

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
                <StudyTransition origin={origin} onComplete={handleTransitionDone} />
            )}

            <ProgressBar current={index} total={total} iconName="progress-mark" />

            <div className="h-full w-full overflow-hidden flex flex-col gap-6 justify-center items-center">
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
                            <FlashCard
                                word={current.word}
                                example={current.example}
                                pronunciation={current.pronunciation}
                                meaning={current.meaning}
                                partOfSpeech={current.partOfSpeech}
                            />
                            <div className="flex flex-col items-center gap-2">
                                <ImgButton
                                    text="Tiếp tục"
                                    onClick={goNext}
                                    className="p-4 bg-primary text-white rounded-xl text-center text-nowrap"
                                />
                                <ImgButton
                                    className="underline"
                                    text="Mình đã thuộc từ này"
                                    onClick={goNext}
                                />
                            </div>
                        </div>

                    </div>
                )}

                {!showTransition && finished && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold">Hoàn thành! 🎉</h2>
                        <p className="text-gray-500">Bạn đã học {total} từ trong chủ đề này.</p>
                        <button
                            className="bg-primary text-white p-4"
                            onClick={() => backToLearningPath()}
                        >
                            trở về
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}