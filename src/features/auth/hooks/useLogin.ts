import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      return authApi.login(data);
    },
    onSuccess: async (data) => {
      setTokens(data.accessToken, data.refreshToken);

      // Fetch user profile immediately to get role and other details
      try {
        const userProfile = await authApi.validateToken();
        if (userProfile) {
          setUser(userProfile);
        }
      } catch (error) {
        console.error("Failed to fetch user profile after login", error);
      }

      // Invalidate any queries that might depend on auth state
      queryClient.invalidateQueries({ queryKey: ["validateToken"] });

      toast.success("Login realizado com sucesso!");
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
