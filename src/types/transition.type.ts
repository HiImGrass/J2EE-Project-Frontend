import type { AudioOption } from "@/features/vocabulary-training/components/TextToAudioExercise";
import type { Vocabulary } from "./student-study.type";
import type { TextOption } from "@/features/vocabulary-training/components/AudioToTextExercise";
import type { ChoiceOption } from "@/features/vocabulary-training/components/MultipleChoiceExercise";

//step định nghĩa kiểu dữ liệu mỗi thẻ chuyển, thuộc tính định danh bắt buộc có: type, id
export type Step =
    | { type: "flashcard"; id: string; data: Vocabulary }
    | { type: "listen-write"; id: string; vocab: Vocabulary, answer: string }
    | { type: "fill-in-blank"; id: string; vocab: Vocabulary, answer: string }
    | { type: "fill-in-blank"; id: string; vocab: Vocabulary, answer: string }
    | { type: "text-to-audio"; id: string; vocab: Vocabulary; answer: string; options: AudioOption[] }
    | { type: "audio-to-text"; id: string; vocab: Vocabulary; answer: string; options: TextOption[]; audioUrl?: string }
    | { type: "multiple-choice"; id: string; vocab: Vocabulary; question: string; answer: string; options: ChoiceOption[] }

export type Phase = "enter" | "idle" | "exit";