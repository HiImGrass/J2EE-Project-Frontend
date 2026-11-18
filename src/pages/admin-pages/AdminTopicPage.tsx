import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { ActionBar } from '@/features/admin/components/ActionBar'
import { TopicCard } from '@/features/admin/components/TopicCard'
import { mockLearningPaths, mockTopics } from '@/features/admin/mockData'

export default function AdminTopicPage() {
  const { id, learningPathId } = useParams<{ id?: string; learningPathId?: string }>()
  const currentLearningPathId = Number(id || learningPathId)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const currentLearningPath = mockLearningPaths.find((lp) => lp.id === currentLearningPathId)
  const topicsByPath = mockTopics.filter((t) => t.learningPathId === currentLearningPathId)
  const filtered = topicsByPath.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))

  const handleAdd = () => {
    console.log('Thêm chủ đề cho lộ trình:', currentLearningPathId)
  }

  const handleViewDetail = (topicId: number) => {
    navigate(`/admin/learning-paths/${currentLearningPathId}/topics/${topicId}/vocabularies`)
  }

  const handleEdit = (topicId: number) => {
    console.log('Sửa:', topicId)
  }

  const handleDelete = (topicId: number) => {
    console.log('Xóa:', topicId)
  }

  return (
    <div className="flex flex-col gap-3 px-12 pt-6">
      <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-3">
        <BackButton />
        <span className="text-base font-semibold text-foreground">
          {currentLearningPath ? `Bộ ${currentLearningPath.name}` : 'Chi tiết lộ trình'}
        </span>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAdd}
        addLabel="Thêm chủ đề"
        placeholder="Search"
      />

      <div className="flex flex-col">
        {filtered.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Không tìm thấy chủ đề nào.
          </p>
        )}
      </div>
    </div>
  )
}
