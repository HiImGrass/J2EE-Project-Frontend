import type { Vocabulary } from "./student-study.type";
import type { Answer } from "./question.type";

//step định nghĩa kiểu dữ liệu mỗi thẻ chuyển, thuộc tính định danh bắt buộc có: type, id
export type Step =
    | { type: "flashcard"; id: string; data: Vocabulary }
    | { type: "listen-write"; id: string; vocab: Vocabulary; answer: string }
    | { type: "fill-in-blank"; id: string; vocab: Vocabulary; answer: string }
    | { type: "text-to-audio"; id: string; vocab: Vocabulary; answer: number; options: Answer[] }
    | { type: "audio-to-text"; id: string; vocab: Vocabulary; answer: number; options: Answer[] }
    | { type: "multiple-choice"; id: string; vocab: Vocabulary; question: string; answer: number; options: Answer[] }

export type Phase = "enter" | "idle" | "exit";
