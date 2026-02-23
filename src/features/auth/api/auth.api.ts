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
    const { type, email, userId, firmId, role } = response.data;
    return { type, email, userId, firmId, role };
  },
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
  validateToken: async (): Promise<TokenValidationResponse> => {
    const response = await api.get<TokenValidationResponse>("/auth/validate");
    // Explicitly pick only the allowed fields
    const { valid, name, email, userId, firmId, role, message } = response.data;
    return { valid, name, email, userId, firmId, role, message };
  },
  confirmRegistration: async (
    data: ConfirmRegistrationRequest
  ): Promise<ConfirmRegistrationResponse> => {
    const response = await api.post<ConfirmRegistrationResponse>(
      "/auth/confirm-register",
      data
    );
    const { type, email, userId } = response.data;
    return { type, email, userId };
  },
};
