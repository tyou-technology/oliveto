import type { LeadFilters } from "@/lib/types/lead";

interface ArticleListFilters {
  page: number;
  size: number;
  publishedOnly: boolean;
}

export const QUERY_KEYS = {
  ANALYTICS: {
    DASHBOARD: ["analytics", "dashboard"] as const,
  },
  AUTH: {
    ME: ["auth", "me"] as const,
  },
  ARTICLES: {
    ALL: ["articles"] as const,
    LIST: (filters: ArticleListFilters) => ["articles", "list", filters] as const,
    INFINITE: (size: number, publishedOnly: boolean) =>
      ["articles", "infinite", size, publishedOnly] as const,
    BY_SLUG: (idOrSlug: string) => ["articles", "by-slug", idOrSlug] as const,
    COUNT: ["articles", "published", "count"] as const,
  },
  TAGS: {
    ALL: ["tags"] as const,
    LIST: (publishedOnly: boolean) => ["tags", "list", publishedOnly] as const,
  },
  LEADS: {
    ALL: ["leads"] as const,
    LIST: (filters: LeadFilters) => ["leads", "list", filters] as const,
    UNREAD_COUNT: ["leads", "unread-count"] as const,
  },
} as const;
