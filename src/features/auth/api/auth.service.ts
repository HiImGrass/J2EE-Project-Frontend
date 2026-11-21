import { axiosClient } from "@/lib/axios";
import type { AuthUser, LoginCredentials, LoginResponse, RefreshTokenResponse } from "../types/auth.types";

const login = (credentials: LoginCredentials): Promise<LoginResponse> =>
  axiosClient.post("/api/auth/login", credentials) as unknown as Promise<LoginResponse>;

const logout = (refreshToken: string | null) =>
  axiosClient.post("/api/auth/logout", { refreshToken });

const refreshToken = (refreshToken: string): Promise<RefreshTokenResponse> =>
  axiosClient.post("/api/auth/refresh", { refreshToken }) as unknown as Promise<RefreshTokenResponse>;

const getUserByUsername = (username: string, accessToken: string): Promise<AuthUser> =>
  axiosClient.get(`/api/users/username/${encodeURIComponent(username)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  }) as unknown as Promise<AuthUser>;

export default {
    login,
    logout,
    refreshToken,
    getUserByUsername,
};
