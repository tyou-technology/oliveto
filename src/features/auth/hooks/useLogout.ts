import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export const useLogout = () => {
  const router = useRouter();
  const { clearSession, tokens } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      if (tokens?.refreshToken) {
        return authService.logout(tokens.refreshToken);
      }
    },
    onSuccess: () => {
      clearSession();
      router.push(ROUTES.ADMIN.LOGIN);
    },
    onError: (error) => {
      // Clear local state even if the API call fails
      clearSession();
      router.push(ROUTES.ADMIN.LOGIN);
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
