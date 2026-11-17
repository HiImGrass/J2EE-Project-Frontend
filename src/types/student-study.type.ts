export type Vocabulary = {
    id: number;
    topicId: number;
    word: string;
    pronunciation: string | null;
    meaning: string;
    partOfSpeech: string;
    example: string | null;
    audioUrl: string | null;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string | null;
};
