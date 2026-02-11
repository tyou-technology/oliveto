import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export const useValidateToken = () => {
  const { setUser, clearUser } = useUserStore();

  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: authApi.validateToken,
    retry: false,
    refetchOnWindowFocus: false,
    // Always try to validate session on load
    enabled: true,
  });

  useEffect(() => {
    if (isSuccess && data) {
      if (data.valid) {
        setUser(data);
      } else {
        clearUser();
      }
    }
  }, [isSuccess, data, setUser, clearUser]);

  useEffect(() => {
    if (isError) {
      clearUser();
    }
  }, [isError, clearUser]);

  return {
    isAuthenticated: data?.valid === true,
    user: data,
    isLoading,
    isError,
    error,
  };
};
