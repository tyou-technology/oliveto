import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";

export const useValidateToken = () => {
  const { setSession, clearSession, tokens } = useAuthStore();

  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.getMe,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!tokens?.accessToken,
  });

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
