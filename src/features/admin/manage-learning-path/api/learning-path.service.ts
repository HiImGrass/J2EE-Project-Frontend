import { axiosClient } from '@/lib/axios'

export interface LearningPathResponse {
  id: number
  learningPathName: string
  numberOfTopics: number
  description: string
  createdAt: string
  updatedAt: string
}

export interface TopicResponse {
  id: number
  learningPathId: number
  topicName: string
  imageUrl: string | null
  description: string
  createdAt: string
  updatedAt: string
}

export interface VocabularyResponse {
  id: number
  topicId: {
    id: number
    topicName: string
  }
  word: string
  pronunciation: string | null
  meaning: string
  partOfSpeech: string
  example: string | null
  audioUrl: string | null
  imageUrl: string | null
  createdAt: string
  updatedAt: string
}

interface ApiResponse<T> {
  message: string
  status: number
  data: T
}

const getLearningPaths = async (): Promise<LearningPathResponse[]> => {
  const response = (await axiosClient.get('/api/learning-paths')) as ApiResponse<LearningPathResponse[]>
  return response.data
}

const getTopicsByLearningPathId = async (learningPathId: number): Promise<TopicResponse[]> => {
  const response = (await axiosClient.get(`/api/learning-paths/${learningPathId}/topics`)) as ApiResponse<TopicResponse[]>
  return response.data
}

const getVocabulariesByTopicId = async (topicId: number): Promise<VocabularyResponse[]> => {
  const response = (await axiosClient.get(`/api/vocabularies/topic/${topicId}`)) as ApiResponse<VocabularyResponse[]>
  return response.data
}

export interface LearningPathRequest {
  learningPathName: string
  description: string
}

const createLearningPath = async (data: LearningPathRequest): Promise<LearningPathResponse> => {
  return (await axiosClient.post('/api/learning-paths', data)) as LearningPathResponse
}

const updateLearningPath = async (
  id: number,
  data: LearningPathRequest,
): Promise<LearningPathResponse> => {
  return (await axiosClient.put(`/api/learning-paths/${id}`, data)) as LearningPathResponse
}

export default {
  getLearningPaths,
  getTopicsByLearningPathId,
  getVocabulariesByTopicId,
  createLearningPath,
  updateLearningPath,
}
