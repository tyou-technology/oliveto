import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export const useValidateToken = () => {
  const { setSession, clearSession, tokens } = useAuthStore();

  // Trim-check guards against empty-string tokens that slipped past sanitization.
  const hasValidTokens = !!tokens?.accessToken?.trim();

  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authService.getMe,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: hasValidTokens,
  });

  useEffect(() => {
    if (!hasValidTokens && tokens) {
      // Tokens exist in store but are empty — clear immediately.
      clearSession();
    }
  }, [hasValidTokens, tokens, clearSession]);

  useEffect(() => {
    if (isSuccess && data && tokens) {
      setSession(data, tokens);
    } else if (isSuccess && !data) {
      clearSession();
    }
  }, [isSuccess, data, tokens, setSession, clearSession]);

  useEffect(() => {
    if (isError) {
      clearSession();
    }
  }, [isError, clearSession]);

  return {
    isAuthenticated: !!data,
    user: data,
    isLoading,
    isError,
    error,
  };
};
