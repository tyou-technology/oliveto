import { apiClient } from "@/lib/api/client";
import { AnalyticsResponse } from "@/lib/types/analytics";

export const analyticsService = {
  getDashboard: async (): Promise<AnalyticsResponse> => {
    const response = await apiClient.get<AnalyticsResponse>("/analytics");
    return response.data;
  },
};
