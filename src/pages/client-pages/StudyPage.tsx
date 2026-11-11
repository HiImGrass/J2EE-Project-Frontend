import { useNavigate } from "react-router-dom";
import { StudyResultCard } from "@/features/study/components/StudyResultCard";
import { StudyFlow } from "@/components/StudyFlow";
import type { Word } from "@/types/student-study.type";
import type { Step } from "@/types/transition.type";

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
    { type: "listen-write", id: `lw-${w.word}`, vocab: w, answer: w.word },
    { type: "fill-in-blank", id: `fib-${w.word}`, vocab: w, answer: w.word }
]);

export function StudyPage() {
    const navigate = useNavigate();
    const backToLearningPath = () => {
        navigate("/student-learning-path")
    }

    return (
        <StudyFlow
            steps={STEPS}
            completion={
                <StudyResultCard total={WORDS.length} onBackToLearningPath={backToLearningPath} />
            }
        />
    );
}
