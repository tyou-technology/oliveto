export enum LeadOrigin {
  CONTACT_FORM = "CONTACT_FORM",
  NEWSLETTER = "NEWSLETTER",
  REFERRAL = "REFERRAL",
  SOCIAL_MEDIA = "SOCIAL_MEDIA",
  GOOGLE_ADS = "GOOGLE_ADS",
  ORGANIC_SEARCH = "ORGANIC_SEARCH",
}

export enum LeadStatus {
  NEW = "NEW",
  CONTACTED = "CONTACTED",
  QUALIFIED = "QUALIFIED",
  LOST = "LOST",
  CONVERTED = "CONVERTED",
}

export interface LeadResponseDTO {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  origin: LeadOrigin;
  status: LeadStatus;
  isRead: boolean;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UnreadLeadsCountDTO {
  count: number;
}

export interface LeadFilters {
  isRead?: boolean | null;
  status?: string;
  origin?: string;
  page?: number;
  limit?: number;
}

export interface CreateLeadDTO {
  name: string;
  email: string;
  phone: string;
  message?: string;
  origin: LeadOrigin;
  company?: string;
  service?: string;
}
