export const QUERY_CONFIG = {
  // Default stale time for most queries (used in QueryProvider)
  DEFAULT_STALE_TIME: 1000 * 60, // 1 minute
  // Stale time for articles and related data (used in article hooks)
  ARTICLES_STALE_TIME: 1000 * 60 * 5, // 5 minutes
} as const;
