import { useNavigate } from "react-router-dom";
import { StudyResultCard } from "@/features/study/components/StudyResultCard";
import { StudyFlow } from "@/components/StudyFlow";
import type { AudioOption } from "@/features/vocabulary-training/components/TextToAudioExercise";
import type { TextOption } from "@/features/vocabulary-training/components/AudioToTextExercise";
import type { ChoiceOption } from "@/features/vocabulary-training/components/MultipleChoiceExercise";
import type { Word } from "@/types/student-study.type";
import type { Step } from "@/types/transition.type";

// TODO: replace this sample content with vocabulary loaded for the current session.
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

const makeAudioUrl = (text: string) =>
    `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(text)}`;

const STEPS: Step[] = WORDS.flatMap((word, wordIndex): Step[] => {
    const distractors = WORDS.filter((_, index) => index !== wordIndex);
    const audioOptions: AudioOption[] = [word, ...distractors].map((optionWord, index) => ({
        id: `text-audio-${wordIndex}-${index}`,
        audioUrl: makeAudioUrl(optionWord.word),
    }));
    const textOptions: TextOption[] = [word, ...distractors].map((optionWord, index) => ({
        id: `audio-text-${wordIndex}-${index}`,
        text: optionWord.word,
    }));
    const choiceOptions: ChoiceOption[] = [word, ...distractors].map((optionWord, index) => ({
        id: `meaning-${wordIndex}-${index}`,
        text: optionWord.meaning,
    }));

    return [
        { type: "listen-write", id: `listen-write-${word.word}`, vocab: word, answer: word.word },
        { type: "fill-in-blank", id: `fill-in-blank-${word.word}`, vocab: word, answer: word.word },
        {
            type: "text-to-audio",
            id: `text-to-audio-${word.word}`,
            vocab: word,
            answer: audioOptions[0].id,
            options: audioOptions,
        },
        {
            type: "audio-to-text",
            id: `audio-to-text-${word.word}`,
            vocab: word,
            answer: textOptions[0].id,
            options: textOptions,
        },
        {
            type: "multiple-choice",
            id: `multiple-choice-${word.word}`,
            vocab: word,
            question: `What does ${word.word} mean?`,
            answer: choiceOptions[0].id,
            options: choiceOptions,
        },
    ];
});

export default function VocabularyPracticePage() {
    const navigate = useNavigate();

    return (
        <StudyFlow
            steps={STEPS}
            completion={
                <StudyResultCard
                    total={WORDS.length}
                    onBackToLearningPath={() => navigate("/student-learning-path")}
                />
            }
            transitionMessage="Luyện tập từ vựng"
        />
    );
}
