import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/config/routes";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      // Artificial delay to show the loader (optional, remove if not desired)
      await new Promise((resolve) => setTimeout(resolve, 4000));
      return authApi.login(data);
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      
      toast.success("Login realizado com sucesso!");
      router.push(ROUTES.ADMIN.DASHBOARD.HOME);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Erro ao realizar login. Verifique suas credenciais.";
      toast.error(message);
    },
  });
};
