import { api } from "@/lib/api-client";
import { LeadResponseDTO, UnreadLeadsCountDTO, CreateLeadDTO } from "../types";

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const leadsApi = {
  create: async (data: CreateLeadDTO): Promise<LeadResponseDTO> => {
    const response = await api.post<{ data: LeadResponseDTO }>("/leads", data);
    return response.data.data;
  },

  findAll: async (
    page = 1,
    limit = 10,
    isRead?: boolean | null,
    status?: string,
    origin?: string
  ): Promise<PaginatedResponse<LeadResponseDTO>> => {
    const params: Record<string, unknown> = { page, limit };
    if (isRead !== undefined && isRead !== null) {
      params.isRead = isRead;
    }
    if (status) params.status = status;
    if (origin) params.origin = origin;

    const response = await api.get<PaginatedResponse<LeadResponseDTO>>("/leads", { params });
    return response.data;
  },

  getById: async (id: string): Promise<LeadResponseDTO> => {
    const response = await api.get<{ data: LeadResponseDTO }>(`/leads/${id}`);
    return response.data.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/leads/${id}/read`);
  },

  updateStatus: async (id: string, status: string): Promise<void> => {
    await api.patch(`/leads/${id}/status`, { status });
  },

  updateNotes: async (id: string, notes: string): Promise<void> => {
    await api.patch(`/leads/${id}/notes`, { notes });
  },

  countUnread: async (): Promise<UnreadLeadsCountDTO> => {
    const response = await api.get<{ data: UnreadLeadsCountDTO }>("/leads/unread/count");
    return response.data.data;
  },
};
