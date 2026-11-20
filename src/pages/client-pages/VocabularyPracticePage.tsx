import { useNavigate } from "react-router-dom";
import { StudyResultCard } from "@/features/study/components/StudyResultCard";
import { StudyFlow } from "@/components/StudyFlow";
import type { Vocabulary } from "@/types/student-study.type";
import type { Step } from "@/types/transition.type";
import type { Answer } from "@/types/question.type";

// TODO: replace this sample content with vocabulary loaded for the current session.
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

const STEPS: Step[] = WORDS.flatMap((word, wordIndex): Step[] => {
    // mock đáp án nhiễu bằng từ vựng được mock phía trên
    const distractors = WORDS.filter((_, index) => index !== wordIndex);
    const choices = [word, ...distractors];
    const createAnswers = (
        questionId: number,
        getContent: (vocab: Vocabulary) => string | null,
        getAudio: (vocab: Vocabulary) => string | null = () => null,
    ): Answer[] => choices.map((choice, index) => ({
        id: questionId * 100 + index + 1,
        questionId,
        answerAudioUrl: getAudio(choice),
        answerContent: getContent(choice),
        isCorrectAnswer: index === 0,
    }));

    const textToAudioQuestionId = wordIndex * 3 + 1;
    const audioToTextQuestionId = wordIndex * 3 + 2;
    const multipleChoiceQuestionId = wordIndex * 3 + 3;
    const audioAnswers = createAnswers(textToAudioQuestionId, () => null, (choice) => choice.audioUrl ?? null);
    const textAnswers = createAnswers(audioToTextQuestionId, (choice) => choice.word);
    const meaningAnswers = createAnswers(multipleChoiceQuestionId, (choice) => choice.meaning);

    return [
        { type: "listen-write", id: `listen-write-${word.word}`, vocab: word, answer: word.word },
        { type: "fill-in-blank", id: `fill-in-blank-${word.word}`, vocab: word, answer: word.word },
        {
            type: "text-to-audio",
            id: `text-to-audio-${word.word}`,
            vocab: word,
            answer: audioAnswers.find((answer) => answer.isCorrectAnswer)!.id,
            options: audioAnswers,
        },
        {
            type: "audio-to-text",
            id: `audio-to-text-${word.word}`,
            vocab: word,
            answer: textAnswers.find((answer) => answer.isCorrectAnswer)!.id,
            options: textAnswers,
        },
        {
            type: "multiple-choice",
            id: `multiple-choice-${word.word}`,
            vocab: word,
            question: `What does ${word.word} mean?`,
            answer: meaningAnswers.find((answer) => answer.isCorrectAnswer)!.id,
            options: meaningAnswers,
        },
    ];
});

export default function VocabularyPracticePage() {
    const navigate = useNavigate();

    return (
        <StudyFlow
            steps={STEPS}
            onExit={() => navigate("/student-vocabulary-training")}
            completion={
                <StudyResultCard
                    total={WORDS.length}
                    onContinue={() => navigate("/student-vocabulary-training")}
                />
            }
            transitionMessage="Luyện tập từ vựng"
        />
    );
}
