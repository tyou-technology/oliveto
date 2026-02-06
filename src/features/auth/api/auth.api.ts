import { api } from "@/lib/api-client";
import {
  ConfirmRegistrationRequest,
  ConfirmRegistrationResponse,
  LoginRequest,
  LoginResponse,
  TokenValidationResponse,
} from "../types/auth.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
  validateToken: async (): Promise<TokenValidationResponse> => {
    const response = await api.get<TokenValidationResponse>("/auth/validate");
    return response.data;
  },
  confirmRegistration: async (
    data: ConfirmRegistrationRequest
  ): Promise<ConfirmRegistrationResponse> => {
    const response = await api.post<ConfirmRegistrationResponse>(
      "/auth/confirm-register",
      data
    );
    return response.data;
  },
};
