export enum Role {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  _links?: Record<string, { href: string; method: string }>;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: PaginationMeta;
  _links?: Record<string, { href: string; method: string }>;
}

/** Returned wrapped in ApiResponse ({ data: AuthTokenResponse }) by /auth/login, /auth/register, and /auth/refresh. */
export interface AuthTokenResponse {
  type: string;
  accessToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
