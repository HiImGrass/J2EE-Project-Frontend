export interface LearningPath {
  id: number
  name: string
  description?: string
  totalTopics: number
}

export interface Topic {
  id: number
  name: string
  description?: string
  order: number
  learningPathId: number
}

export interface Vocabulary {
  id: number
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  topicId: number
  example: string
  audioFile?: File | null
  audioFileName?: string
  imageFile?: File | null
  imageFileName?: string
}

export interface CreateVocabularyRequest {
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  example: string
  audioFile?: File | null
  audioFileName?: string
  imageFile?: File | null
  imageFileName?: string
}
