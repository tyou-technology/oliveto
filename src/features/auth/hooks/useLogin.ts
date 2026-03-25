import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { LoginRequest } from "../types/auth.types";
import { AuthTokenResponse } from "@/lib/types/api.types";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export const useLogin = () => {
  const router = useRouter();
  const { setAccessToken, setSession } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<AuthTokenResponse, Error, LoginRequest>({
    mutationFn: (data) => authService.login(data),
    onSuccess: async ({ accessToken }) => {
      // Store the access token first so the next request has the Authorization header.
      setAccessToken(accessToken);

      try {
        const user = await authService.getMe();
        setSession(user, accessToken);
      } catch {
        // Access token is still valid even if profile fetch fails.
      }

      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTH.ME });

      toast.success("Login realizado com sucesso!");
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
