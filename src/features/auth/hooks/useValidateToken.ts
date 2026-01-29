import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { cookieManager } from "@/lib/cookies";

export const useValidateToken = () => {
  const router = useRouter();
  const { setUser, clearUser } = useUserStore();

  const { data, isError, isLoading, error, isSuccess } = useQuery({
    queryKey: ["validateToken"],
    queryFn: authApi.validateToken,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data) {
      if (data.valid) {
        setUser(data);
      } else {
        cookieManager.removeToken();
        clearUser();
        router.push(ROUTES.ADMIN.LOGIN);
        toast.error(data.message || "Sessão inválida. Faça login novamente.");
      }
    }
  }, [isSuccess, data, setUser, clearUser, router]);

  useEffect(() => {
    if (isError) {
      cookieManager.removeToken();
      clearUser();
      router.push(ROUTES.ADMIN.LOGIN);
      const message =
        (error as any)?.response?.data?.message ||
        "Sessão expirada. Faça login novamente.";
      toast.error(message);
    }
  }, [isError, router, error, clearUser]);

  return {
    isAuthenticated: data?.valid === true,
    user: data,
    isLoading,
    isError,
  };
};
