export type Word = {
    word: string;
    example: string;
    pronunciation: string;
    meaning: string;
    partOfSpeech: string;
    exampleMeaning: string;
};

//step định nghĩa kiểu dữ liệu mỗi thẻ chuyển, thuộc tính định danh bắt buộc có: type, id
export type Step =
    | { type: "flashcard"; id: string; data: Word }
    | { type: "listen-write"; id: string; vocab: Word, answer: string };
// | các type bài tập khác

export type Phase = "enter" | "idle" | "exit";