import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import {
  ConfirmRegistrationRequest,
  ConfirmRegistrationResponse,
} from "../types/auth.types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";
import { getFriendlyErrorMessage } from "@/lib/utils/error-handler";

export const useConfirmRegistration = () => {
  const router = useRouter();

  return useMutation<
    ConfirmRegistrationResponse,
    Error,
    ConfirmRegistrationRequest
  >({
    mutationFn: async (data) => {
      return authApi.confirmRegistration(data);
    },
    onSuccess: () => {
      // Token is now handled via HttpOnly cookie
      toast.success("Cadastro confirmado com sucesso!");
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    },
    onError: (error) => {
      toast.error(getFriendlyErrorMessage(error));
    },
  });
};
