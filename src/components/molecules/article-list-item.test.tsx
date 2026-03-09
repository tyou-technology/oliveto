import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ArticleListItem } from "./article-list-item";
import { ArticleResponseDTO, ArticleStatus } from "@/lib/types/article";

// Mock date-fns to avoid locale issues and ensure consistent output
vi.mock("date-fns", async () => {
  const actual = await vi.importActual("date-fns");
  return {
    ...actual,
    format: () => "01 jan 2023",
  };
});

describe("ArticleListItem", () => {
  const mockArticle: ArticleResponseDTO = {
    id: "1",
    title: "Test Article Title",
    status: ArticleStatus.PUBLISHED,
    slug: "test-article-title",
    content: "<p>Content</p>",
    excerpt: "Excerpt",
    publishedAt: "2023-01-01T00:00:00Z",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    readingTime: 5,
    authorId: "author-1",
    author: {
      id: "author-1",
      name: "Author Name",
      email: "author@example.com",
    },
    tags: [],
  };

  const mockOnView = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  it("renders article details correctly", () => {
    render(
      <table>
        <tbody>
          <ArticleListItem
            article={mockArticle}
            onView={mockOnView}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    expect(screen.getByText("Publicado")).toBeInTheDocument();
    expect(screen.getByText("01 jan 2023")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(
      <table>
        <tbody>
          <ArticleListItem
            article={mockArticle}
            onView={mockOnView}
            onEdit={mockOnEdit}
            onDelete={mockOnDelete}
          />
        </tbody>
      </table>
    );

    // Check for specific labels including article title
    expect(screen.getByRole("button", { name: "Visualizar artigo: Test Article Title" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Editar artigo: Test Article Title" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Excluir artigo: Test Article Title" })).toBeInTheDocument();
  });
});
