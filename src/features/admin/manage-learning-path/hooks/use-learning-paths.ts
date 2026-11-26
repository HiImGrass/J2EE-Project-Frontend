import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import learningPathService from '../api/learning-path.service'
import type { LearningPathRequest } from '../api/learning-path.service'

export const learningPathQueryKeys = {
  all: ['learning-paths'] as const,
  topics: (learningPathId: number) => ['learning-paths', learningPathId, 'topics'] as const,
  vocabularies: (topicId: number) => ['vocabularies', 'topic', topicId] as const,
}

export function useLearningPaths() {
  return useQuery({
    queryKey: learningPathQueryKeys.all,
    queryFn: learningPathService.getLearningPaths,
  })
}

export function useCreateLearningPath() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: learningPathService.createLearningPath,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: learningPathQueryKeys.all }),
  })
}

export function useUpdateLearningPath() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: LearningPathRequest }) =>
      learningPathService.updateLearningPath(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: learningPathQueryKeys.all }),
  })
}

export function useLearningPathTopics(learningPathId: number, enabled = true) {
  return useQuery({
    queryKey: learningPathQueryKeys.topics(learningPathId),
    queryFn: () => learningPathService.getTopicsByLearningPathId(learningPathId),
    enabled: enabled && Number.isFinite(learningPathId) && learningPathId > 0,
  })
}

export function useTopicVocabularies(topicId: number, enabled = true) {
  return useQuery({
    queryKey: learningPathQueryKeys.vocabularies(topicId),
    queryFn: () => learningPathService.getVocabulariesByTopicId(topicId),
    enabled: enabled && Number.isFinite(topicId) && topicId > 0,
  })
}
