import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";

export const useValidateToken = () => {
  const router = useRouter();
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
        router.push(ROUTES.ADMIN.LOGIN);
        toast.error(data.message || "Sessão inválida. Faça login novamente.");
      }
    }
  }, [isSuccess, data, setUser, clearUser, router]);

  useEffect(() => {
    if (isError) {
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
