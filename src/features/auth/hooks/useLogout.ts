import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export const useLogout = () => {
  const router = useRouter();
  const { clearAuth, refreshToken } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        return authApi.logout(refreshToken);
      }
      return Promise.resolve();
    },
    onSuccess: () => {
      clearAuth();
      router.push(ROUTES.ADMIN.LOGIN);
    },
    onError: (error) => {
      // Even if logout API fails, we should clear local state
      clearAuth();
      router.push(ROUTES.ADMIN.LOGIN);
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
