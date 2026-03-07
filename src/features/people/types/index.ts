import { z } from "zod";

export interface UserProfileResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfileRequest {
  avatarUrl?: string;
}

export interface UpdateUserRoleRequest {
  role: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export type UserListResponse = PaginatedResponse<UserProfileResponse>;

export const UpdateUserProfileSchema = z.object({
  avatarUrl: z.string().url().optional(),
});

export const UpdateUserRoleSchema = z.object({
  role: z.enum(["ADMIN", "USER", "EDITOR"]), // Adjust roles as needed
});
