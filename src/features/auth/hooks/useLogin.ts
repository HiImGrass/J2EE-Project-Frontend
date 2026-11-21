import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth.store";
import authService from "../api/auth.service";
import type { LoginCredentials } from "../types/auth.types";

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const tokens = await authService.login(credentials);
      const user = await authService.getUserByUsername(credentials.username, tokens.accessToken);
      return { tokens, user };
    },
    onSuccess: ({ tokens, user }) => {
      setAuth(tokens.accessToken, user);
      localStorage.setItem("refreshToken", tokens.refreshToken);
    },
  });
}
