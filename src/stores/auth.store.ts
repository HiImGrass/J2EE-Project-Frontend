import { create } from "zustand";
import type { AuthUser } from "@/features/auth/types/auth.types";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  authInitialized: boolean;
  setAccessToken: (accessToken: string) => void;
  setAuth: (accessToken: string, user: AuthUser) => void;
  clearAuth: () => void;
  setAuthInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  authInitialized: false,
  setAccessToken: (accessToken) => set({ accessToken }),
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setAuthInitialized: (authInitialized) => set({ authInitialized }),
}));
