import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { Pagination } from '@/components/Pagination'
import { ActionBar } from '@/features/admin/shared/components/ActionBar'
import { TopicCard } from '@/features/admin/manage-learning-path/components/TopicCard'
import { useLearningPathTopics } from '@/features/admin/manage-learning-path/hooks/use-learning-paths'

export default function AdminTopicPage() {
  const { id, learningPathId } = useParams<{ id?: string; learningPathId?: string }>()
  const currentLearningPathId = Number(id || learningPathId)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const listRef = useRef<HTMLDivElement>(null)
  const pageSize = 8
  const navigate = useNavigate()
  const isValidLearningPathId = Number.isFinite(currentLearningPathId) && currentLearningPathId > 0
  const topicsQuery = useLearningPathTopics(currentLearningPathId, isValidLearningPathId)
  const topics = (topicsQuery.data ?? []).map((topic, index) => ({
    id: topic.id,
    learningPathId: topic.learningPathId,
    name: topic.topicName,
    description: topic.description,
    order: index + 1,
  }))

  const filtered = topics.filter((topic) =>
    topic.name.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.ceil(filtered.length / pageSize)
  const activePage = Math.min(currentPage, Math.max(totalPages, 1))
  const visibleTopics = filtered.slice((activePage - 1) * pageSize, activePage * pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    listRef.current?.scrollTo({ top: 0 })
  }

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
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-12 pt-6 pb-4">
      <div className="flex items-center gap-2 rounded-lg bg-action-card px-4 py-3">
        <BackButton />
        <span className="text-base font-semibold text-foreground">
          Chi tiết lộ trình {currentLearningPathId > 0 ? `#${currentLearningPathId}` : ''}
        </span>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        onAddClick={handleAdd}
        addLabel="Thêm chủ đề"
        placeholder="Search"
      />

      <div ref={listRef} className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {!isValidLearningPathId && (
          <p className="py-10 text-center text-sm text-destructive">Mã lộ trình không hợp lệ.</p>
        )}

        {isValidLearningPathId && topicsQuery.isPending && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Đang tải danh sách chủ đề...
          </p>
        )}

        {isValidLearningPathId && topicsQuery.isError && (
          <p className="py-10 text-center text-sm text-destructive">
            Không thể tải danh sách chủ đề. Vui lòng thử lại.
          </p>
        )}

        {visibleTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
            className='shrink-0'
          />
        ))}

        {isValidLearningPathId && !topicsQuery.isPending && !topicsQuery.isError && filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Không tìm thấy chủ đề nào.
          </p>
        )}
        {isValidLearningPathId && !topicsQuery.isPending && !topicsQuery.isError && filtered.length > 0 && (
          <Pagination
            currentPage={activePage}
            pageSize={pageSize}
            totalItems={filtered.length}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}
