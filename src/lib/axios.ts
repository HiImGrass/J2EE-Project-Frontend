import axios, { type InternalAxiosRequestConfig } from 'axios';
import type { RefreshTokenResponse } from '@/features/auth/types/auth.types';
import { useAuthStore } from '@/stores/auth.store';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
  withCredentials: false,
});

interface RetriableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshRequest: Promise<RefreshTokenResponse> | null = null;

export async function refreshAuthTokens(refreshToken: string): Promise<RefreshTokenResponse> {
  refreshRequest ??= axios
    .post<RefreshTokenResponse>(
      `${axiosClient.defaults.baseURL}/api/auth/refresh`,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' }, timeout: axiosClient.defaults.timeout },
    )
    .then((response) => response.data)
    .finally(() => {
      refreshRequest = null;
    });

  const tokens = await refreshRequest;
  useAuthStore.getState().setAccessToken(tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  return tokens;
}

axiosClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config as RetriableRequestConfig | undefined;
    const refreshToken = localStorage.getItem('refreshToken');
    const isRefreshRequest = originalRequest?.url?.includes('/api/auth/refresh');

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry || isRefreshRequest || !refreshToken) {
      return Promise.reject(error?.response?.data || error);
    }

    originalRequest._retry = true;

    try {
      const tokens = await refreshAuthTokens(refreshToken);
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return axiosClient(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authUsername');
      useAuthStore.getState().clearAuth();
      return Promise.reject(refreshError);
    }
  },
);
