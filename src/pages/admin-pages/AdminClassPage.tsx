import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ActionBar } from '@/features/admin/components/ActionBar'
import { ClassCard } from '@/features/admin/components/ClassCard'
import { mockClasses, mockUsers } from '@/features/admin/mockData'

export default function AdminClassPage() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const teacherNameById = useMemo(() => {
    const map = new Map<number, string>()
    for (const user of mockUsers) {
      map.set(user.id, user.full_name || user.fullName || user.username)
    }
    return map
  }, [])

  const filtered = mockClasses.filter((cls) => {
    const term = search.toLowerCase().trim()
    if (!term) return true
    const teacherName = teacherNameById.get(cls.teacher_id) || cls.teacher_name || ''
    return (
      cls.classname.toLowerCase().includes(term) ||
      teacherName.toLowerCase().includes(term) ||
      cls.invitation_code.toLowerCase().includes(term)
    )
  })

  const handleAdd = () => {
    console.log('Thêm lớp học')
  }

  const handleViewDetail = (id: number) => {
    navigate(`/admin/classes/${id}`)
  }

  const handleEdit = (id: number) => {
    console.log('Sửa lớp học:', id)
  }

  const handleDelete = (id: number) => {
    console.log('Xóa lớp học:', id)
  }

  return (
    <div className="flex flex-col gap-4 px-12 pt-6 pb-12">
      <ActionBar
        searchValue={search}
        onSearchChange={setSearch}
        onAddClick={handleAdd}
        addLabel="Thêm lớp học"
        placeholder="Search"
      />

      <div className="flex flex-col gap-3">
        {filtered.map((cls) => (
          <ClassCard
            key={cls.id}
            classItem={cls}
            teacherName={teacherNameById.get(cls.teacher_id)}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Không tìm thấy lớp học nào.
          </p>
        )}
      </div>
    </div>
  )
}
