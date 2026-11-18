import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LearningPathCard } from '@/features/admin/components/LearningPathCard'
import { mockLearningPaths as MenuLearningPath } from '@/features/admin/mockData'
import { ActionBar } from '@/features/admin/components/ActionBar'

export default function AdminLearningPathPage() {
  const [search, setSearch] = useState('')

  const filtered = MenuLearningPath.filter((lp) =>
    lp.name.toLowerCase().includes(search.toLowerCase()),
  )

  const navigate = useNavigate()

  const handleAdd = () => {
    console.log('Thêm lộ trình')
  }

  const handleViewDetail = (id: number) => {
    navigate(`/admin/learning-paths/${id}/topics`)
  }

  const handleEdit = (id: number) => {
    console.log('Sửa:', id)
  }

  const handleDelete = (id: number) => {
    console.log('Xóa:', id)
  }

  return (
    <div className="flex flex-col gap-4 px-12 pt-6">
      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAdd}
        addLabel="Thêm lộ trình"
        placeholder="Search"
      />

      <div className="flex flex-col gap-3">
        {filtered.map((lp) => (
          <LearningPathCard
            key={lp.id}
            learningPath={lp}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Không tìm thấy lộ trình nào.
          </p>
        )}
      </div>
    </div>
  )
}
