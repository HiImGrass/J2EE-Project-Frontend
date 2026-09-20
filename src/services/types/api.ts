// định nghĩa các type dùng chung trong request api

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T; 
}