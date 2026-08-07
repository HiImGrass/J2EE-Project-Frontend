import api from "../api/axios";

const login = async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

const register = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};

const refreshToken = async (refreshToken) => {
    const response = await api.post("/auth/refresh", {
        refreshToken,
    });
    return response.data;
};

const logout = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

const getCurrentUser = async () => {
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