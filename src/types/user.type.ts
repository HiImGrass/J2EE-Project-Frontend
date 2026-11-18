export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';
export type UserStatus = 'ACTIVE' | 'DISABLED' | 'LOCKED';

export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string | null;
  full_name: string;
  fullName?: string; // alias tương thích ngược
  phone_number?: string | null;
  phoneNumber?: string | null; // alias tương thích ngược
  password?: string;
  role: UserRole;
  status: UserStatus;
  created_at: string;
  updated_at?: string | null;
}

export type Account = User;
