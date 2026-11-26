import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { Pagination } from '@/components/Pagination'
import { ActionBar } from '@/features/admin/shared/components/ActionBar'
import { VocabCard } from '@/features/admin/manage-vocabulary/components/VocabCard'
import { useTopicVocabularies } from '@/features/admin/manage-learning-path/hooks/use-learning-paths'

export default function AdminVocabPage() {
  const { id, learningPathId, topicId } = useParams<{
    id?: string
    learningPathId?: string
    topicId?: string
  }>()
  const navigate = useNavigate()
  const currentTopicId = Number(topicId)
  const currentLearningPathId = id || learningPathId || '1'
  const isValidTopicId = Number.isFinite(currentTopicId) && currentTopicId > 0
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const listRef = useRef<HTMLDivElement>(null)
  const pageSize = 8
  const vocabulariesQuery = useTopicVocabularies(currentTopicId, isValidTopicId)
  const vocabularies = vocabulariesQuery.data ?? []
  const topicName = vocabularies[0]?.topicId.topicName
  const filtered = vocabularies.filter(
    (vocab) =>
      vocab.word.toLowerCase().includes(search.toLowerCase()) ||
      vocab.meaning.toLowerCase().includes(search.toLowerCase()),
  )
  const totalPages = Math.ceil(filtered.length / pageSize)
  const activePage = Math.min(currentPage, Math.max(totalPages, 1))
  const visibleVocabularies = filtered.slice((activePage - 1) * pageSize, activePage * pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    listRef.current?.scrollTo({ top: 0 })
  }

  const handleAdd = () => {
    navigate(`/admin/learning-paths/${currentLearningPathId}/topics/${currentTopicId}/vocabularies/create`)
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-12 pt-6 pb-4">
      <div className="flex items-center gap-2 rounded-lg bg-action-card px-4 py-3">
        <BackButton />
        <span className="text-base font-semibold text-foreground">
          {topicName ? `Chủ đề ${topicName}` : `Chi tiết chủ đề #${isValidTopicId ? currentTopicId : ''}`}
        </span>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        onAddClick={handleAdd}
        addLabel="Thêm từ vựng"
        placeholder="Tìm từ vựng"
      />

      {!isValidTopicId && (
        <p className="py-10 text-center text-sm text-destructive">Mã chủ đề không hợp lệ.</p>
      )}
      {isValidTopicId && vocabulariesQuery.isPending && (
        <p className="py-10 text-center text-sm text-muted-foreground">Đang tải danh sách từ vựng...</p>
      )}
      {isValidTopicId && vocabulariesQuery.isError && (
        <p className="py-10 text-center text-sm text-destructive">
          Không thể tải danh sách từ vựng. Vui lòng thử lại.
        </p>
      )}

      {isValidTopicId && !vocabulariesQuery.isPending && !vocabulariesQuery.isError && (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg bg-card">
          <div className="grid grid-cols-[2fr_1.5fr_2fr_2fr] border-b border-border px-6 py-3">
            <span className="text-sm text-muted-foreground">Từ</span>
            <span className="text-sm text-muted-foreground">Từ loại</span>
            <span className="text-sm text-muted-foreground">Nghĩa</span>
            <span className="text-sm text-muted-foreground">Hành động</span>
          </div>
          <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto">
          {visibleVocabularies.map((vocab) => (
            <VocabCard
              key={vocab.id}
              vocab={{
                id: vocab.id,
                word: vocab.word,
                pronunciation: vocab.pronunciation ?? '',
                partOfSpeech: vocab.partOfSpeech.toLowerCase(),
                meaning: vocab.meaning,
                example: vocab.example ?? '',
                topicId: vocab.topicId.id,
              }}
            />
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">Không tìm thấy từ vựng nào.</p>
          )}
          {filtered.length > 0 && (
            <Pagination
              currentPage={activePage}
              pageSize={pageSize}
              totalItems={filtered.length}
              onPageChange={handlePageChange}
            />
          )}
          </div>
        </div>
      )}
    </div>
  )
}
