import { api } from "@/lib/api-client";
import { LeadResponseDTO, UnreadLeadsCountDTO, CreateLeadDTO, LeadQueryParams, UpdateLeadDTO } from "../types";

export interface PaginatedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export const leadsApi = {
  create: async (data: CreateLeadDTO): Promise<LeadResponseDTO> => {
    const response = await api.post<LeadResponseDTO>("/leads", data);
    return response.data;
  },

  findAll: async (page = 0, size = 10, isRead?: boolean | null): Promise<PaginatedResponse<LeadResponseDTO>> => {
    const params: LeadQueryParams = {
      page,
      size,
      sort: "createdAt,desc"
    };
    if (isRead !== undefined && isRead !== null) {
      params.isRead = isRead;
    }
    const response = await api.get<PaginatedResponse<LeadResponseDTO>>("/leads", { params });
    return response.data;
  },

  getById: async (id: string): Promise<LeadResponseDTO> => {
    const response = await api.get<LeadResponseDTO>(`/leads/${id}`);
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    await api.patch(`/leads/${id}/read`);
  },

  update: async (id: string, data: UpdateLeadDTO): Promise<LeadResponseDTO> => {
    const response = await api.put<LeadResponseDTO>(`/leads/${id}`, data);
    return response.data;
  },

  countUnread: async (): Promise<UnreadLeadsCountDTO> => {
    const response = await api.get<UnreadLeadsCountDTO>("/leads/unread/count");
    return response.data;
  },
};
