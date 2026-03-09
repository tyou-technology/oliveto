import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearSession, tokens } = useAuthStore();

  const handleLogout = () => {
    clearSession();
    queryClient.clear();
    // Hard redirect clears all in-memory React/React Query state reliably.
    // router.push() leaves stale query state that can cause the loader to get stuck.
    window.location.href = ROUTES.ADMIN.LOGIN;
  };

  return useMutation({
    mutationFn: async () => {
      if (tokens?.refreshToken) {
        return authService.logout(tokens.refreshToken);
      }
    },
    onSuccess: handleLogout,
    onError: (error) => {
      handleLogout();
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
