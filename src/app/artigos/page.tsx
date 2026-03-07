import { ArticlesView } from "./articles-view";
import { articlesApi } from "@/features/articles/api/articles.api";
import { env } from "@/lib/env";

// Ensure the page is dynamically rendered to fetch fresh data on request
// or remove this line to allow static generation with revalidation (preferred for performance)
// keeping default behavior (static with revalidation time defined in api call)

export default async function ArticlesPage() {
  const firmId = env.NEXT_PUBLIC_FIRM_ID;
  const size = 6;

  try {
    const [initialArticlesPage, initialTags] = await Promise.all([
      articlesApi.getPublicPublishedByFirmId(firmId, 0, size),
      articlesApi.getPublishedTagsByFirmId(firmId),
    ]);

    const initialArticles = {
      pages: [initialArticlesPage],
      pageParams: [1], // Initial page param is 0
    };

    return (
      <ArticlesView
        initialArticles={initialArticles}
        initialTags={initialTags}
      />
    );
  } catch (error) {
    console.error("Failed to fetch initial data for Articles Page:", error);
    // If server fetch fails, we render the view without initial data,
    // allowing the client to attempt fetching (and likely failing/showing error state)
    // or we could throw error to show error boundary.
    // For resilience, let's return without data so client can handle it (or show skeleton/error).
    return <ArticlesView />;
  }
}
