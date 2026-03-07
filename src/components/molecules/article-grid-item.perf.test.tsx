import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ArticleGridItem } from "./article-grid-item";
import { ArticleResponseDTO, ArticleStatus, TagResponseDTO } from "@/lib/types/article";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("ArticleGridItem Performance", () => {
  it("should memoize visibleTags and not call slice on re-renders with stable props", () => {
    const createTag = (id: string): TagResponseDTO => ({
      id,
      name: `Tag ${id}`,
      color: "#ff0000",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
    });

    const tags = [createTag("1"), createTag("2"), createTag("3"), createTag("4")];

    // Spy on the slice method of this specific array instance
    const sliceSpy = vi.spyOn(tags, 'slice');

    const article: ArticleResponseDTO = {
      id: "1",
      title: "Test Article",
      status: ArticleStatus.PUBLISHED,
      createdAt: "2023-01-01",
      updatedAt: "2023-01-01",
      tags: tags, // Pass stable array
    };

    const tagsMap = new Map();

    const { rerender } = render(
      <ArticleGridItem article={article} tagsMap={tagsMap} />
    );

    // Initial render should call slice
    expect(sliceSpy).toHaveBeenCalledTimes(1);

    // Re-render with new article object but same tags reference
    rerender(
      <ArticleGridItem
        article={{ ...article }}
        tagsMap={tagsMap}
      />
    );

    // With optimization, slice should NOT be called again.
    // Without optimization, it is called again (total 2).
    expect(sliceSpy).toHaveBeenCalledTimes(1);
  });
});
