export interface AnalyticsStats {
  publishedArticles: number;
  totalViews: number;
  totalLeads: number;
  unreadLeads: number;
}

export interface AnalyticsLeadsByStatus {
  new: number;
  contacted: number;
  qualified: number;
  converted: number;
  lost: number;
}

export interface AnalyticsLeadsByOrigin {
  contactForm: number;
  newsletter: number;
  referral: number;
  socialMedia: number;
  googleAds: number;
  organicSearch: number;
}

export interface AnalyticsMonthlyTrend {
  month: string;
  count: number;
}

export interface AnalyticsTrendingTag {
  id: string;
  name: string;
  color: string;
  icon: string;
  articleCount: number;
  totalViews: number;
}

export interface AnalyticsTopArticle {
  id: string;
  title: string;
  slug: string;
  visitsCount: number;
  readingTime: number;
  publishedAt: string | null;
}

export interface AnalyticsData {
  stats: AnalyticsStats;
  leads: {
    byStatus: AnalyticsLeadsByStatus;
    byOrigin: AnalyticsLeadsByOrigin;
    conversionRate: number;
    monthlyTrend: AnalyticsMonthlyTrend[];
  };
  articles: {
    byStatus: { draft: number; published: number; archived: number };
    trendingTags: AnalyticsTrendingTag[];
    topArticles: AnalyticsTopArticle[];
  };
}

export interface AnalyticsResponse {
  data: AnalyticsData;
  _links: Record<string, { href: string; method: string }>;
}
