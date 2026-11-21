export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export type RefreshTokenResponse = LoginResponse;

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  avatar: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
