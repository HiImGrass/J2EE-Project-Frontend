import api from "../api/axios";
import type { User } from "../types/user_type";
import type { AuthData, LoginCredentials, LogoutResponse, RegisterUserData } from "./auth.types";

const login = async (credentials: LoginCredentials): Promise<AuthData> => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

const register = async (userData: RegisterUserData): Promise<AuthData> => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

const refreshToken = async (refreshToken: string): Promise<AuthData['tokens']> => {
    const response = await api.post("/auth/refresh", {
        refreshToken,
    });
    return response.data;
};

const logout = async (): Promise <LogoutResponse> => {
    const response = await api.post("/auth/logout");
    return response.data;
};

const getCurrentUser = async (): Promise<User> => {
    const response = await api.get("/auth/me");
    return response.data;
};

export default {
    login,
    register,
    refreshToken,
    logout,
    getCurrentUser,
};