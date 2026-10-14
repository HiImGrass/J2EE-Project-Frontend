import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { VocabCreateForm } from '@/features/admin/components/VocabCreateForm'
import { mockTopics } from '@/features/admin/mockData'

export default function AdminVocabCreatePage() {
  const { id, topicId } = useParams<{
    id?: string
    topicId?: string
  }>()
  const navigate = useNavigate()

  const currentTopicId = topicId ? Number(topicId) : undefined
  const currentTopic = currentTopicId ? mockTopics.find((t) => t.id === currentTopicId) : undefined

  const handleBack = () => {
    if (id && topicId) {
      navigate(`/admin/learning-paths/${id}/topics/${topicId}/vocabularies`)
    } else {
      navigate(-1)
    }
  }

  return (
    <div className="flex flex-col gap-4 px-12 pt-6 pb-12">
      <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-3 shadow-xs">
        <BackButton />
        <span className="text-base font-semibold text-foreground">
          {currentTopic ? `Chủ đề ${currentTopic.name}` : 'Chi tiết chủ đề'}
        </span>
      </div>

      <VocabCreateForm topicId={currentTopicId} onCancel={handleBack} />
    </div>
  )
}
