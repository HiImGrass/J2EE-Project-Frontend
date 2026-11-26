import { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '@/components/BackButton'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LearningPathCard } from '@/features/admin/manage-learning-path/components/LearningPathCard'
import { StudentListCard } from '@/features/admin/manage-classes/components/StudentListCard'
import {
  mockClasses,
  mockClassStudents,
  mockLearningPaths,
  mockUsers,
} from '@/features/admin/mockData'
import type { User } from '@/types/user.type'
import type { ClassStudent } from '@/features/admin/types/class.types'
import {CheckCircle2 } from 'lucide-react'
import { ActionBar } from '@/features/admin/shared/components/ActionBar'
import { AddStudentDialog } from '@/features/admin/manage-classes/components/AddStudentDialog'

export default function AdminClassDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const classId = Number(id)

  const currentClass = mockClasses.find((cls) => cls.id === classId)

  const [classStudentsList, setClassStudentsList] = useState<ClassStudent[]>(mockClassStudents)
  const [notification, setNotification] = useState<string | null>(null)
  const [addStudentOpen, setAddStudentOpen] = useState(false)

  const showNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr))
    }, 2500)
  }

  const studentIdsInClass = useMemo(() => {
    return classStudentsList.filter((cs) => cs.class_id === classId).map((cs) => cs.student_id)
  }, [classStudentsList, classId])

  const studentsInClass = useMemo(() => {
    return mockUsers.filter((u) => studentIdsInClass.includes(u.id))
  }, [studentIdsInClass])

  const learningPathsInClass = useMemo(() => {
    if (!currentClass?.learning_path_id) return []
    return mockLearningPaths.filter((lp) => lp.id === currentClass.learning_path_id)
  }, [currentClass])

  
  if (!currentClass) {
    return (
      <div className="flex flex-col gap-4 px-12 pt-6">
        <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-3">
        <BackButton />

      </div>
        <p className="py-10 text-center text-sm text-muted-foreground">
          Lớp học với mã #{id} không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    )
  }

  const handleViewLearningPath = (pathId: number) => {
    navigate(`/admin/learning-paths/${pathId}/topics`)
  }

  const handleViewStudent = () => {
    console.log('Xem chi tiết:', id)
  }

  const handleDeleteStudent = (student: User) => {
    setClassStudentsList((prev) =>
      prev.filter((cs) => !(cs.class_id === classId && cs.student_id === student.id)),
    )
    showNotification(
      `Đã xóa học viên "${student.full_name || student.fullName || student.username}" khỏi lớp học`,
    )
  }

  const handleAddLP = () => {
    console.log('Thêm chủ đề cho lộ trình 1')
  }
    const handleAdd = () => {
    setAddStudentOpen(true)
  }


  return (
    <div className="flex flex-col gap-5 px-12 pt-6 pb-12">
      {notification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm font-medium text-background shadow-lg transition-all">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-4 shadow-xs">
        <div className="flex items-center gap-4">
          <BackButton/>
        <span className="text-base font-semibold text-foreground">
            {currentClass ? `${currentClass.classname}` : 'Chi tiết lớp học'}
        </span>
        </div>
      </div>

      

      <Tabs defaultValue="learning" className="w-full">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="learning" className="gap-2">
            Học tập
            <span className="rounded-full bg-muted-foreground/20 px-2 py-0.5 text-xs font-semibold">
              {learningPathsInClass.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="students" className="gap-2">
            Học viên
            <span className="rounded-full bg-muted-foreground/20 px-2 py-0.5 text-xs font-semibold">
              {studentsInClass.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="learning" className="mt-4">
            <div className="flex flex-col gap-3">
                <ActionBar
                searchValue={search}
                onSearchChange={setSearch}
                onAddClick={handleAddLP}
                addLabel="Thêm Lộ trình"
                placeholder="Search"
            />
                {learningPathsInClass.map((lp) => (
                <LearningPathCard
                    key={lp.id}
                    learningPath={lp}
                    onViewDetail={handleViewLearningPath}
                />
                ))}

                {learningPathsInClass.length === 0 && (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-12 text-center">
                    <p className="text-sm text-muted-foreground">
                    Lớp học này hiện chưa được gán lộ trình học tập nào.
                    </p>
                </div>
                )}
            </div>
        </TabsContent>

        <TabsContent value="students" className="mt-4">
            <div className="flex flex-col gap-3">
            <ActionBar
              searchValue={search}
              onSearchChange={setSearch}
              onAddClick={handleAdd}
              addLabel="Thêm học viên"
              placeholder="Search"
            />
            <StudentListCard
                classId={currentClass.id}
                students={studentsInClass}
                classStudents={classStudentsList}
                onView={handleViewStudent}
                onDelete={handleDeleteStudent}
                emptyMessage="Lớp học này hiện chưa có học viên nào."
            />
            </div>
        </TabsContent>
      </Tabs>

      <AddStudentDialog
        open={addStudentOpen}
        onClose={() => setAddStudentOpen(false)}
        invitationCode={currentClass.invitation_code}
      />

    </div>
  )
}
