import { ArticlesView } from "./articles-view";
import { articlesService } from "@/services/articles.service";

// Ensure the page is dynamically rendered to fetch fresh data on request
// or remove this line to allow static generation with revalidation (preferred for performance)
// keeping default behavior (static with revalidation time defined in api call)

export default async function ArticlesPage() {
  const size = 6;

  try {
    const [initialArticlesPage, initialTags] = await Promise.all([
      articlesService.getPublicPublished(0, size),
      articlesService.getPublishedTags(),
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
  } catch {
    return <ArticlesView />;
  }
}
