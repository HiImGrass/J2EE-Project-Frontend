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

export interface CreateLearningPathRequest {
  name: string
  description?: string
}

export interface UpdateLearningPathRequest {
  name?: string
  description?: string
}

export interface CreateTopicRequest {
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
}

export interface CreateVocabularyRequest {
  word: string
  pronunciation: string
  partOfSpeech: string
  meaning: string
  topicId: number
}

export interface UpdateVocabularyRequest {
  word?: string
  pronunciation?: string
  partOfSpeech?: string
  meaning?: string
}
