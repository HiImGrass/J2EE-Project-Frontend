import type { LearningPath, Topic, Vocabulary } from '@/types/vocabulary'

export const mockLearningPaths: LearningPath[] = [
  { id: 1, name: '1000 từ cơ bản', totalTopics: 30 },
  { id: 2, name: 'IELTS cơ bản', totalTopics: 30 },
  { id: 3, name: 'IELTS nâng cao', totalTopics: 30 },
]

export const mockTopics: Topic[] = [
  { id: 1, name: 'School', order: 1, learningPathId: 1 },
  { id: 2, name: 'Examination', order: 2, learningPathId: 1 },
  { id: 3, name: 'Extracurricular Activities', order: 3, learningPathId: 1 },
]

export const mockVocabularies: Vocabulary[] = [
  { id: 1, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 2, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 3, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 4, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 5, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 6, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 7, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 8, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
]

export const MenuLearningPath = mockLearningPaths
export const MenuTopicPath = mockTopics
export const MenuVocabList = mockVocabularies
