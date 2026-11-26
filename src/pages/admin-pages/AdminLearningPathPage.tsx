import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DataForm, type DataFormValues } from '@/components/DataForm'
import { Pagination } from '@/components/Pagination'
import { LearningPathCard } from '@/features/admin/manage-learning-path/components/LearningPathCard'
import {
  useCreateLearningPath,
  useLearningPaths,
  useUpdateLearningPath,
} from '@/features/admin/manage-learning-path/hooks/use-learning-paths'
import type { LearningPathRequest } from '@/features/admin/manage-learning-path/api/learning-path.service'
import { ActionBar } from '@/features/admin/shared/components/ActionBar'

export default function AdminLearningPathPage() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const listRef = useRef<HTMLDivElement>(null)
  const [editingPathId, setEditingPathId] = useState<number | null>(null)
  const [formError, setFormError] = useState('')
  const learningPathsQuery = useLearningPaths()
  const createLearningPath = useCreateLearningPath()
  const updateLearningPath = useUpdateLearningPath()
  const navigate = useNavigate()

  const learningPaths = (learningPathsQuery.data ?? []).map((item) => ({
    id: item.id,
    name: item.learningPathName,
    totalTopics: item.numberOfTopics,
    description: item.description,
  }))
  const filtered = learningPaths.filter((lp) =>
    lp.name.toLowerCase().includes(search.toLowerCase()),
  )
  const pageSize = 8
  const totalPages = Math.ceil(filtered.length / pageSize)
  const activePage = Math.min(currentPage, Math.max(totalPages, 1))
  const visibleLearningPaths = filtered.slice((activePage - 1) * pageSize, activePage * pageSize)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    listRef.current?.scrollTo({ top: 0 })
  }
  const editingPath = learningPaths.find((item) => item.id === editingPathId)
  const isSaving = createLearningPath.isPending || updateLearningPath.isPending

  useEffect(() => {
    if (editingPathId === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSaving) setEditingPathId(null)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [editingPathId, isSaving])

  const handleAdd = () => {
    setFormError('')
    setEditingPathId(0)
  }

  const handleViewDetail = (id: number) => {
    navigate(`/admin/learning-paths/${id}/topics`)
  }

  const handleEdit = (id: number) => {
    setFormError('')
    setEditingPathId(id)
  }

  const handleFormSubmit = async (values: DataFormValues) => {
    const request: LearningPathRequest = {
      learningPathName: String(values.name ?? '').trim(),
      description: String(values.description ?? '').trim(),
    }

    setFormError('')
    try {
      if (editingPathId && editingPathId > 0) {
        await updateLearningPath.mutateAsync({ id: editingPathId, data: request })
      } else {
        await createLearningPath.mutateAsync(request)
      }
      setEditingPathId(null)
    } catch {
      setFormError('Không thể lưu lộ trình. Vui lòng thử lại.')
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-12 pt-6 pb-4">
      <ActionBar
        searchValue={search}
        onSearchChange={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        onAddClick={handleAdd}
        addLabel="Thêm lộ trình"
        placeholder="Tìm lộ trình"
      />

      {editingPathId !== null && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/40 px-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSaving) setEditingPathId(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={editingPathId === 0 ? 'Thêm lộ trình' : 'Cập nhật lộ trình'}
            className="my-auto w-full max-w-lg"
          >
            {formError && (
              <p
                role="alert"
                className="mb-3 rounded-lg border border-destructive/30 bg-card px-4 py-3 text-sm text-destructive shadow-lg"
              >
                {formError}
              </p>
            )}
            <DataForm
              key={editingPathId}
              mode={editingPathId === 0 ? 'create' : 'edit'}
              title={editingPathId === 0 ? 'Thêm lộ trình' : 'Cập nhật lộ trình'}
              description="Điền tên và mô tả cho lộ trình học."
              fields={[
                {
                  name: 'name',
                  label: 'Tên lộ trình',
                  placeholder: 'Nhập tên lộ trình',
                  required: true,
                },
                {
                  name: 'description',
                  label: 'Mô tả',
                  type: 'textarea',
                  placeholder: 'Nhập mô tả lộ trình',
                  className: 'sm:col-span-2',
                },
              ]}
              initialValues={{
                name: editingPath?.name ?? '',
                description: editingPath?.description ?? '',
              }}
              onSubmit={handleFormSubmit}
              onCancel={() => {
                setEditingPathId(null)
                setFormError('')
              }}
              isSubmitting={isSaving}
            />
          </section>
        </div>
      )}

      <div ref={listRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
        {learningPathsQuery.isPending && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Đang tải danh sách lộ trình...
          </p>
        )}

        {learningPathsQuery.isError && (
          <p className="py-10 text-center text-sm text-destructive">
            Không thể tải danh sách lộ trình. Vui lòng thử lại.
          </p>
        )}

        {visibleLearningPaths.map((lp) => (
          <LearningPathCard
            key={lp.id}
            learningPath={lp}
            onViewDetail={handleViewDetail}
            onEdit={handleEdit}
            className='shrink-0'
          />
        ))}

        {!learningPathsQuery.isPending && !learningPathsQuery.isError && filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Không tìm thấy lộ trình nào.
          </p>
        )}
        {!learningPathsQuery.isPending && !learningPathsQuery.isError && filtered.length > 0 && (
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
