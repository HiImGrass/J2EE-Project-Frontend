export type UserRole = 'ADMIN' | 'TEACHER' | 'STUDENT';
export type UserStatus = 'ACTIVE' | 'DISABLED';

export interface User {
  id: number;                   
  username: string;             
  email: string;                
  fullName: string;             
  role: UserRole;               
  status: UserStatus;
  avatar?: string;       
  phoneNumber?: string;
}