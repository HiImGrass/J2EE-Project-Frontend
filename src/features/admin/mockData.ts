import type { LearningPath, Topic, Vocabulary } from '@/types/vocabulary'
import type { User } from '@/types/user.type'
import type { Classes, ClassStudent } from '@/features/admin/types/class.types'

export const mockLearningPaths: LearningPath[] = [
  { id: 1, name: '1000 từ cơ bản', totalTopics: 30 },
  { id: 2, name: 'IELTS cơ bản', totalTopics: 30 },
  { id: 3, name: 'IELTS nâng cao', totalTopics: 30 },
]

export const mockTopics: Topic[] = [
  { id: 1, name: 'School', order: 1, learningPathId: 1 },
  { id: 2, name: 'Examination', order: 2, learningPathId: 1 },
  { id: 3, name: 'Extracurricular Activities', order: 3, learningPathId: 1 },
]

export const mockVocabularies: Vocabulary[] = [
  {
    id: 1,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 2,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 3,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 4,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 5,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 6,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 7,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
  {
    id: 8,
    word: 'School',
    pronunciation: '/skuːl/',
    partOfSpeech: 'v',
    meaning: 'Trường học',
    topicId: 1,
    example: ''
  },
]

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin_master',
    email: 'admin@system.edu.vn',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    full_name: 'Nguyễn Văn Quản Trị',
    phone_number: '0901234567',
    role: 'ADMIN',
    status: 'ACTIVE',
    created_at: '2024-01-10T08:30:00Z',
    updated_at: '2024-03-01T14:20:00Z',
  },
  {
    id: 2,
    username: 'teacher_loc',
    email: 'loc.teacher@gmail.com',
    avatar: null,
    full_name: 'Đào Song Lộc',
    phone_number: '0912345678',
    role: 'TEACHER',
    status: 'ACTIVE',
    created_at: '2024-02-15T09:15:00Z',
    updated_at: '2024-02-28T16:00:00Z',
  },
  {
    id: 3,
    username: 'teacher_an',
    email: 'an.teacher@gmail.com',
    avatar: null,
    full_name: 'Nguyễn Ngọc Thiên Ân',
    phone_number: '0933456789',
    role: 'TEACHER',
    status: 'ACTIVE',
    created_at: '2024-02-20T11:45:00Z',
    updated_at: '2024-03-05T08:10:00Z',
  },
  {
    id: 4,
    username: 'student_hoanganh',
    email: 'hoanganh2003@gmail.com',
    avatar:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    full_name: 'Phạm Hoàng Anh',
    phone_number: '0987654321',
    role: 'STUDENT',
    status: 'ACTIVE',
    created_at: '2024-03-01T14:00:00Z',
    updated_at: '2024-03-10T10:30:00Z',
  },
  {
    id: 5,
    username: 'student_thuylinh',
    email: 'thuylinh.dang@outlook.com',
    avatar:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    full_name: 'Đặng Thùy Linh',
    phone_number: '0977889900',
    role: 'STUDENT',
    status: 'ACTIVE',
    created_at: '2024-03-05T16:20:00Z',
    updated_at: '2024-03-12T09:40:00Z',
  },
  {
    id: 6,
    username: 'student_quocbao',
    email: 'bao.quoc.99@gmail.com',
    avatar: null,
    full_name: 'Vũ Quốc Bảo',
    phone_number: '0944556677',
    role: 'STUDENT',
    status: 'LOCKED',
    created_at: '2024-01-25T10:00:00Z',
    updated_at: '2024-03-08T15:00:00Z',
  },
  {
    id: 7,
    username: 'student_maihuong',
    email: 'maihuong.le@yahoo.com',
    avatar: null,
    full_name: 'Lê Mai Hương',
    phone_number: '0966112233',
    role: 'STUDENT',
    status: 'ACTIVE',
    created_at: '2024-03-11T13:10:00Z',
    updated_at: '2024-03-11T13:10:00Z',
  },
]

export const mockClasses: Classes[] = [
  {
    id: 1,
    teacher_id: 2,
    learning_path_id: 2,
    classname: 'Lớp luyện thi IELTS Khóa 23',
    number_of_students: 130,
    invitation_code: 'IELTS23A',
    status: 'ACTIVE',
    created_at: '2024-02-18T08:00:00Z',
    updated_at: '2024-03-10T10:15:00Z',
    teacher_name: 'Đào Song Lộc',
  },
  {
    id: 2,
    teacher_id: 3,
    learning_path_id: 3,
    classname: 'Lớp luyện thi IELTS Nâng cao K12',
    number_of_students: 85,
    invitation_code: 'IELTS12B',
    status: 'ACTIVE',
    created_at: '2024-02-22T09:30:00Z',
    updated_at: '2024-03-12T14:00:00Z',
    teacher_name: 'Nguyễn Ngọc Thiên Ân',
  },
  {
    id: 3,
    teacher_id: 2,
    learning_path_id: 1,
    classname: 'Lớp 1000 từ vựng cơ bản - Nhóm 1',
    number_of_students: 64,
    invitation_code: 'BASIC01C',
    status: 'ACTIVE',
    created_at: '2024-03-01T07:45:00Z',
    updated_at: '2024-03-15T11:20:00Z',
    teacher_name: 'Đào Song Lộc',
  },
  {
    id: 4,
    teacher_id: 3,
    learning_path_id: 2,
    classname: 'Lớp Giao tiếp & Từ vựng TOEIC 650+',
    number_of_students: 48,
    invitation_code: 'TOEIC650',
    status: 'ACTIVE',
    created_at: '2024-03-06T13:15:00Z',
    updated_at: null,
    teacher_name: 'Nguyễn Ngọc Thiên Ân',
  },
  {
    id: 5,
    teacher_id: 2,
    learning_path_id: null,
    classname: 'Lớp Ôn tập Từ vựng Tổng hợp K20',
    number_of_students: 112,
    invitation_code: 'REV2024K',
    status: 'INACTIVE',
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-02-28T16:40:00Z',
    teacher_name: 'Đào Song Lộc',
  },
]

export const mockClassStudents: ClassStudent[] = [
  { id: 1, class_id: 1, student_id: 4, joined_at: '2024-02-19T08:30:00Z', status: 'ACTIVE' },
  { id: 2, class_id: 1, student_id: 5, joined_at: '2024-02-20T09:15:00Z', status: 'ACTIVE' },
  { id: 3, class_id: 1, student_id: 6, joined_at: '2024-02-21T10:00:00Z', status: 'ACTIVE' },
  { id: 4, class_id: 1, student_id: 7, joined_at: '2024-02-22T11:45:00Z', status: 'ACTIVE' },
  { id: 5, class_id: 2, student_id: 4, joined_at: '2024-02-23T14:00:00Z', status: 'ACTIVE' },
  { id: 6, class_id: 2, student_id: 5, joined_at: '2024-02-24T15:30:00Z', status: 'ACTIVE' },
  { id: 7, class_id: 3, student_id: 6, joined_at: '2024-03-02T08:00:00Z', status: 'ACTIVE' },
  { id: 8, class_id: 3, student_id: 7, joined_at: '2024-03-03T09:20:00Z', status: 'ACTIVE' },
  { id: 9, class_id: 4, student_id: 4, joined_at: '2024-03-07T10:10:00Z', status: 'ACTIVE' },
]

export const MenuLearningPath = mockLearningPaths
export const MenuTopicPath = mockTopics
export const MenuVocabList = mockVocabularies
export const mockAccounts = mockUsers
