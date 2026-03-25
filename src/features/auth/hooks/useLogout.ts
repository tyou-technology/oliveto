import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { clearSession } = useAuthStore();

  const handleLogout = () => {
    clearSession();
    queryClient.clear();
    // Hard redirect clears all in-memory React/React Query state reliably.
    window.location.href = ROUTES.ADMIN.LOGIN;
  };

  return useMutation({
    // POST /auth/logout tells the server to clear the HttpOnly refresh_token cookie.
    // We always attempt this even if we have no access token — the cookie might still be valid.
    mutationFn: () => authService.logout(),
    onSuccess: handleLogout,
    onError: (error) => {
      // Perform local logout regardless of API error (cookie may already be expired).
      handleLogout();
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
