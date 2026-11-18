import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudyResultCard } from "@/features/study/components/StudyResultCard";
import { StudyVocabularySaveCard } from "@/features/study/components/StudyVocabularySaveCard";
import { StudyFlow } from "@/components/StudyFlow";
import type { Vocabulary } from "@/types/student-study.type";
import type { Step } from "@/types/transition.type";

// Sau này thay bằng data fetch theo topic
const WORDS: Vocabulary[] = [
    {
        id: 1,
        topicId: 1,
        word: "student",
        example: "His younger sister is a student at that university.",
        pronunciation: "/ˈstuːdnt/",
        meaning: "Học sinh, sinh viên",
        partOfSpeech: "(n)",
        audioUrl: "student_wrif0p",
        imageUrl: "student_k9uyvr",
        createdAt: "2026-11-11T00:00:00Z",
        updatedAt: null,
    },
    {
        id: 2,
        topicId: 1,
        word: "teacher",
        example: "She is a teacher at a local school.",
        pronunciation: "/ˈtiːtʃər/",
        meaning: "Giáo viên",
        partOfSpeech: "(n)",
        audioUrl: "teacher_pwy4c4",
        imageUrl: "teacher_hmojib",
        createdAt: "2026-11-11T00:00:00Z",
        updatedAt: null,
    },
    {
        id: 3,
        topicId: 1,
        word: "classroom",
        example: "Our classroom is clean and spacious.",
        pronunciation: "/ˈklæs.ruːm/",
        meaning: "Phòng học",
        partOfSpeech: "(n)",
        audioUrl: "classroom_rvncgc",
        imageUrl: "classroom_w8gdex",
        createdAt: "2026-11-11T00:00:00Z",
        updatedAt: null,
    },
];

const STEPS: Step[] = WORDS.flatMap((w): Step[] => [
    { type: "flashcard", id: `fc-${w.word}`, data: w },
    { type: "listen-write", id: `lw-${w.word}`, vocab: w, answer: w.word },
    { type: "fill-in-blank", id: `fib-${w.word}`, vocab: w, answer: w.word }
]);

export function StudyPage() {
    const navigate = useNavigate();
    const [showSaveSelection, setShowSaveSelection] = useState(false);
    const [knownWordIds, setKnownWordIds] = useState<number[]>([]);
    const backToLearningPath = () => {
        navigate("/student-learning-path")
    }

    const handleSaveVocabularies = (selected: Vocabulary[]) => {
        console.log("Từ vựng được chọn để lưu vào Sổ tay:", selected);
        backToLearningPath();
    };

    return (
        <StudyFlow
            steps={STEPS}
            onExit={backToLearningPath}
            onWordMarkedKnown={(wordId) => {
                setKnownWordIds((current) => current.includes(wordId) ? current : [...current, wordId]);
            }}
            completion={
                showSaveSelection ? (
                    <StudyVocabularySaveCard
                        vocabularies={WORDS}
                        knownWordIds={knownWordIds}
                        onSave={handleSaveVocabularies}
                    />
                ) : (
                    <StudyResultCard
                        total={WORDS.length}
                        onContinue={() => setShowSaveSelection(true)}
                    />
                )
            }
        />
    );
}
