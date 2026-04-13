import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";
import { LoginRequest } from "../types/auth.types";
import { AuthTokenResponse } from "@/lib/types/api.types";
import { QUERY_KEYS } from "@/lib/config/query-keys";

export const useLogin = () => {
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
        // Pre-populate the React Query cache so useValidateToken (AuthGuard) finds
        // fresh data on mount and does not fire an immediate refetch. This prevents
        // a race-condition in Safari where a failing ME refetch clears the session.
        queryClient.setQueryData(QUERY_KEYS.AUTH.ME, user);
      } catch {
        // Access token is still valid even if profile fetch fails.
      }

      toast.success("Login realizado com sucesso!");
      window.location.href = ROUTES.ADMIN.DASHBOARD.HOME;
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
