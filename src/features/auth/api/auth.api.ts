import { api } from "@/lib/api-client";
import { LoginRequest, LoginResponse, TokenValidationResponse } from "../types/auth.types";

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", data);
    return response.data;
  },
  validateToken: async (): Promise<TokenValidationResponse> => {
    const response = await api.get<TokenValidationResponse>("/auth/validate");
    return response.data;
  },
};
