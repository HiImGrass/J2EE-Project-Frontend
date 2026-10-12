import { useState } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { ActionBar } from '@/features/admin/components/ActionBar'
import { VocabCard } from '@/features/admin/components/VocabCard'
import { mockTopics, mockVocabularies } from '@/features/admin/mockData'

export default function AdminVocabPage() {
  const { topicId } = useParams<{
    id?: string
    learningPathId?: string
    topicId?: string
  }>()
  const currentTopicId = Number(topicId)
  const [search, setSearch] = useState('')

  const currentTopic = mockTopics.find((t) => t.id === currentTopicId)
  const vocabsInTopic = mockVocabularies.filter((v) => v.topicId === currentTopicId)

  const filtered = vocabsInTopic.filter(
    (v) =>
      v.word.toLowerCase().includes(search.toLowerCase()) ||
      v.meaning.toLowerCase().includes(search.toLowerCase()),
  )

  const handleAdd = () => {
    console.log('Thêm từ vựng, topicId:', currentTopicId)
  }

  const handleViewDetail = (vocabId: number) => {
    console.log('Xem chi tiết từ vựng:', vocabId)
  }

  const handleEdit = (vocabId: number) => {
    console.log('Sửa từ vựng:', vocabId)
  }

  const handleDelete = (vocabId: number) => {
    console.log('Xóa từ vựng:', vocabId)
  }

  return (
    <div className="flex flex-col gap-3 px-12 pt-6">
      <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-3">
        <BackButton />
        <span className="text-base font-semibold text-foreground">
          {currentTopic ? `Chủ đề ${currentTopic.name}` : 'Chi tiết chủ đề'}
        </span>
      </div>

      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAdd}
        addLabel="Thêm từ vựng"
        placeholder="Search"
      />

      <div className="overflow-hidden rounded-lg bg-card">
        <div className="grid grid-cols-[2fr_1.5fr_2fr_2fr] border-b border-border px-6 py-3">
          <span className="text-sm text-muted-foreground">Từ</span>
          <span className="text-sm text-muted-foreground">Từ loại</span>
          <span className="text-sm text-muted-foreground">Nghĩa</span>
          <span className="text-sm text-muted-foreground">Hành động</span>
        </div>

        {filtered.map((vocab) => (
          <VocabCard
            key={vocab.id}
            vocab={vocab}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Không tìm thấy từ vựng nào.
          </p>
        )}
      </div>
    </div>
  )
}
