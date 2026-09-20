import type { ApiResponse } from "../types/api";
import type { User } from "../types/user_type";


// để type tạm thời, lúc tích hợp thì sửa lại thuộc tính sau
export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterUserData {
    username: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthData {
    user: User;
    tokens: AuthTokens;
}

export interface LogoutData {
    message: string
}

export type LoginResponse = ApiResponse<AuthData>;
export type RegisterResponse = ApiResponse<AuthData>;
export type RefreshTokenResponse = ApiResponse<AuthTokens>;
export type LogoutResponse = ApiResponse<LogoutData>;
export type GetCurrentUserResponse = ApiResponse<User>;