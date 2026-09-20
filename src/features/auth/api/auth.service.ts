import { axiosClient } from "@/lib/axios";
import type { User } from "../../../types/user.type";
import type { AuthData, LoginCredentials, LogoutResponse, RegisterUserData } from "../types/auth.types";

const login = async (credentials: LoginCredentials): Promise<AuthData> => {
    const response = await axiosClient.post("/auth/login", credentials);
    return response.data;
};

const register = async (userData: RegisterUserData): Promise<AuthData> => {
    const response = await axiosClient.post("/auth/register", userData);
    return response.data;
};

const refreshToken = async (refreshToken: string): Promise<AuthData['tokens']> => {
    const response = await axiosClient.post("/auth/refresh", {
        refreshToken,
    });
    return response.data;
};

const logout = async (): Promise<LogoutResponse> => {
    const response = await axiosClient.post("/auth/logout");
    return response.data;
};

const getCurrentUser = async (): Promise<User> => {
    const response = await axiosClient.get("/auth/me");
    return response.data;
};

export default {
    login,
    register,
    refreshToken,
    logout,
    getCurrentUser,
};