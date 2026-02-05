export enum LeadOrigin {
  NEWSLETTER = "NEWSLETTER",
  CONTACT = "CONTACT",
  RICH_MATERIAL = "RICH_MATERIAL",
  OTHER = "OTHER",
}

export interface LeadResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  origin: LeadOrigin;
  isRead: boolean;
  createdAt: string; // ISO string
}

export interface UnreadLeadsCountDTO {
  count: number;
}

export interface LeadFilters {
  isRead?: boolean | null;
  page?: number;
  size?: number;
}
