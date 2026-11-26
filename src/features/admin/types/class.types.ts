export type ClassStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED'

export interface Classes {
  id: number
  teacher_id: number
  learning_path_id?: number | null
  classname: string
  number_of_students: number
  invitation_code: string
  status: ClassStatus
  created_at: string
  updated_at?: string | null
  teacher_name?: string
}

export type ClassStudentStatus = 'ACTIVE' | 'DROPPED' | 'COMPLETED'

export interface ClassStudent {
  id: number
  class_id: number
  student_id: number
  joined_at: string
  status: ClassStudentStatus | string
}

export type class_students = ClassStudent
export type class_student = ClassStudent
