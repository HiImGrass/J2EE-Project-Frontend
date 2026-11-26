import { useEffect } from "react";
import authService from "@/features/auth/api/auth.service";
import { refreshAuthTokens } from "@/lib/axios";
import { useAuthStore } from "@/stores/auth.store";

export function useRestoreSession() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const setAuthInitialized = useAuthStore((state) => state.setAuthInitialized);

  useEffect(() => {
    const restoreSession = async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      const username = localStorage.getItem("authUsername");

      if (!refreshToken) {
        setAuthInitialized(true);
        return;
      }

      try {
        const tokens = await refreshAuthTokens(refreshToken);
        if (username) {
          const user = await authService.getUserByUsername(username, tokens.accessToken);
          setAuth(tokens.accessToken, user);
        }
      } catch {
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("authUsername");
        clearAuth();
      } finally {
        setAuthInitialized(true);
      }
    };

    void restoreSession();
  }, [clearAuth, setAuth, setAuthInitialized]);
}
