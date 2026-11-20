export enum QuestionType {
    LISTEN_WRITE = 'LISTEN_WRITE',
    WORD_BUILD = 'WORD_BUILD',
    TEXT_TO_AUDIO = 'TEXT_TO_AUDIO',
    AUDIO_TO_TEXT = 'AUDIO_TO_TEXT',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

/** Mirrors an answer row returned by the backend. Audio fields contain Cloudinary public IDs. */
export interface Answer {
    id: number;
    questionId: number;
    answerAudioUrl: string | null;
    answerContent: string | null;
    isCorrectAnswer: boolean | null;
}

/** Mirrors a question with its related answers for frontend seed/API data. */
export interface Question {
    id: number;
    vocabularyId: number;
    title: string;
    type: QuestionType;
    isNewWordQuestion: boolean | null;
    questionContent: string | null;
    questionAudioUrl: string | null;
    correctWord: string | null;
    answers: Answer[];
}
