import { api } from "@/lib/api-client";
import { LeadResponseDTO, UnreadLeadsCountDTO, LeadOrigin, CreateLeadDTO } from "../types";

export interface PaginatedResponse<T> {
  content: T[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

// TOGGLE MOCK HERE
const USE_MOCK = false;

// Mock database simulation
let MOCK_LEADS: LeadResponseDTO[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "(11) 99999-9999",
    message: "Gostaria de um orçamento para auditoria.",
    origin: LeadOrigin.CONTACT,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    phone: "(21) 98888-8888",
    message: "Dúvida sobre imposto de renda.",
    origin: LeadOrigin.NEWSLETTER,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "3",
    name: "Carlos Souza",
    email: "carlos.souza@example.com",
    phone: "(31) 97777-7777",
    message: "Tenho interesse no material rico sobre gestão financeira.",
    origin: LeadOrigin.RICH_MATERIAL,
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
  {
    id: "4",
    name: "Empresa X",
    email: "contato@empresax.com",
    phone: "(41) 3333-3333",
    message: "Parceria comercial.",
    origin: LeadOrigin.OTHER,
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  },
];

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const leadsApi = {
  create: async (data: CreateLeadDTO): Promise<LeadResponseDTO> => {
    if (USE_MOCK) {
      await mockDelay(1000);
      const newLead: LeadResponseDTO = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        message: data.message || "",
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      MOCK_LEADS = [newLead, ...MOCK_LEADS];
      return newLead;
    }

    const response = await api.post<LeadResponseDTO>("/leads", data);
    return response.data;
  },

  findAll: async (page = 0, size = 10, isRead?: boolean | null): Promise<PaginatedResponse<LeadResponseDTO>> => {
    if (USE_MOCK) {
      await mockDelay(500);
      let filtered = [...MOCK_LEADS];
      if (isRead !== undefined && isRead !== null) {
        filtered = filtered.filter((l) => l.isRead === isRead);
      }
      // Sorting by date ASC (Oldest to Newest) as requested
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

      const start = page * size;
      const end = start + size;
      const content = filtered.slice(start, end);

      return {
        content,
        page: {
          size,
          number: page,
          totalElements: filtered.length,
          totalPages: Math.ceil(filtered.length / size),
        },
      };
    }

    const params: any = {
      page,
      size,
      sort: "createdAt,asc" // Request sorting by creation date ascending
    };
    if (isRead !== undefined && isRead !== null) {
      params.isRead = isRead;
    }
    const response = await api.get<PaginatedResponse<LeadResponseDTO>>("/leads", { params });
    return response.data;
  },

  markAsRead: async (id: string): Promise<void> => {
    if (USE_MOCK) {
      await mockDelay(300);
      const lead = MOCK_LEADS.find((l) => l.id === id);
      if (lead) lead.isRead = true;
      return;
    }

    await api.patch(`/leads/${id}/read`);
  },

  countUnread: async (): Promise<UnreadLeadsCountDTO> => {
    if (USE_MOCK) {
      await mockDelay(300);
      const count = MOCK_LEADS.filter((l) => !l.isRead).length;
      return { count };
    }

    const response = await api.get<UnreadLeadsCountDTO>("/leads/unread/count");
    return response.data;
  },
};
