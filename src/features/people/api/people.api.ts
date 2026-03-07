import { api } from "@/lib/api-client";
import {
  UserProfileResponse,
  UpdateUserProfileRequest,
  UpdateUserRoleRequest,
  UserListResponse,
} from "../types";

export const peopleApi = {
  getMe: async (): Promise<UserProfileResponse> => {
    const response = await api.get<UserProfileResponse>("/users/me");
    return response.data;
  },
  updateMe: async (data: UpdateUserProfileRequest): Promise<UserProfileResponse> => {
    const response = await api.patch<UserProfileResponse>("/users/me", data);
    return response.data;
  },
  listUsers: async (page = 1, limit = 10): Promise<UserListResponse> => {
    const response = await api.get<UserListResponse>("/users", {
      params: { page, limit },
    });
    return response.data;
  },
  updateUserRole: async (userId: string, data: UpdateUserRoleRequest): Promise<void> => {
    await api.patch(`/users/${userId}/role`, data);
  },
};
