import { apiClient } from "@/lib/api/client";
import { ApiListResponse } from "@/lib/types/api.types";
import {
  LeadResponseDTO,
  UnreadLeadsCountDTO,
  CreateLeadDTO,
} from "@/lib/types/lead";

export const leadsService = {
  create: async (data: CreateLeadDTO): Promise<LeadResponseDTO> => {
    const response = await apiClient.post<{ data: LeadResponseDTO }>("/leads", data);
    return response.data.data;
  },

  findAll: async (
    page = 1,
    limit = 10,
    isRead?: boolean | null,
    status?: string,
    origin?: string
  ): Promise<ApiListResponse<LeadResponseDTO>> => {
    const params: Record<string, unknown> = { page, limit };
    if (isRead !== undefined && isRead !== null) params.isRead = isRead;
    if (status) params.status = status;
    if (origin) params.origin = origin;

    const response = await apiClient.get<ApiListResponse<LeadResponseDTO>>("/leads", { params });
    return response.data;
  },

  getById: async (id: string): Promise<LeadResponseDTO> => {
    const response = await apiClient.get<{ data: LeadResponseDTO }>(`/leads/${id}`);
    return response.data.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await apiClient.patch(`/leads/${id}/read`);
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    await apiClient.patch(`/leads/${id}/status`, { status });
  },

  updateNotes: async (id: string, notes: string): Promise<void> => {
    await apiClient.patch(`/leads/${id}/notes`, { notes });
  },

  countUnread: async (): Promise<UnreadLeadsCountDTO> => {
    const response = await apiClient.get<{ data: UnreadLeadsCountDTO }>("/leads/unread/count");
    return response.data.data;
  },
};
