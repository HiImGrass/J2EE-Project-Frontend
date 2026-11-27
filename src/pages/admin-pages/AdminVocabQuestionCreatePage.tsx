import { useParams } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { VocabQuestionCreateForm } from '@/features/admin/manage-vocabulary/components/VocabQuestionCreateForm'
import { mockTopics } from '@/features/admin/mockData'

export default function AdminVocabQuestionCreatePage() {
  const { topicId } = useParams<{ topicId?: string }>()
  const currentTopic = topicId
    ? mockTopics.find((topic) => topic.id === Number(topicId))
    : undefined

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-12 pt-6 pb-4">
      <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-3 shadow-xs">
        <BackButton />
        <span className="text-base font-semibold text-foreground">
          {currentTopic ? `Chủ đề ${currentTopic.name}` : 'Chi tiết chủ đề'}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <VocabQuestionCreateForm />
      </div>
    </div>
  )
}
