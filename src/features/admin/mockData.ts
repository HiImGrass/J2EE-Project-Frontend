import type { LearningPath, Topic, Vocabulary } from '@/types/vocabulary'
import type { User } from '@/types/user.type'

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
  { id: 1, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 2, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 3, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 4, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 5, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 6, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 7, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
  { id: 8, word: 'School', pronunciation: '/skuːl/', partOfSpeech: 'v', meaning: 'Trường học', topicId: 1 },
]

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin_master',
    email: 'admin@system.edu.vn',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    full_name: 'Nguyễn Văn Quản Trị',
    phone_number: '0901234567',
    role: 'ADMIN',
    status: 'ACTIVE',
    created_at: '2024-01-10T08:30:00Z',
    updated_at: '2024-03-01T14:20:00Z',
  },
  {
    id: 2,
    username: 'teacher_lananh',
    email: 'lananh.teacher@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    full_name: 'Trần Thị Lan Anh',
    phone_number: '0912345678',
    role: 'TEACHER',
    status: 'ACTIVE',
    created_at: '2024-02-15T09:15:00Z',
    updated_at: '2024-02-28T16:00:00Z',
  },
  {
    id: 3,
    username: 'teacher_minhtri',
    email: 'tri.leminh@languagehub.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    full_name: 'Lê Minh Trí',
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
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
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
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
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

export const MenuLearningPath = mockLearningPaths
export const MenuTopicPath = mockTopics
export const MenuVocabList = mockVocabularies
export const mockAccounts = mockUsers
