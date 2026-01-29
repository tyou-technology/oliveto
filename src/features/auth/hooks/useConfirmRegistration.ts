import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import {
  ConfirmRegistrationRequest,
  ConfirmRegistrationResponse,
} from "../types/auth.types";
import { toast } from "sonner";
import { cookieManager } from "@/lib/cookies";

export const useConfirmRegistration = () => {
  return useMutation<
    ConfirmRegistrationResponse,
    Error,
    ConfirmRegistrationRequest
  >({
    mutationFn: authApi.confirmRegistration,
    onSuccess: (data) => {
      // Store token if needed, or just let the user login
      cookieManager.setToken(data.token);
      toast.success("Conta verificada com sucesso!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message ||
        "Erro ao verificar conta. O link pode ter expirado.";
      toast.error(message);
    },
  });
};
