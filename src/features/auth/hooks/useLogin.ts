import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { useUserStore } from "@/stores/useUserStore";

export const useLogin = () => {
  const router = useRouter();
  const setTokens = useUserStore((state) => state.setTokens);

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      return authApi.login(data);
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      toast.success("Login realizado com sucesso!");
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
