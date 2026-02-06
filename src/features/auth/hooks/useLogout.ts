import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export const useLogout = () => {
  const router = useRouter();
  const { clearUser } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      return authApi.logout();
    },
    onSuccess: () => {
      clearUser();
      router.push(ROUTES.ADMIN.LOGIN);
    },
    onError: (error: any) => {
      // Even if logout API fails, we should clear local state
      clearUser();
      router.push(ROUTES.ADMIN.LOGIN);
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
