
import { ArticleResponseDTO, ArticleStatus } from "../src/lib/types/article";

// Mock data generation
const createMockArticle = (): ArticleResponseDTO => ({
  id: "550e8400-e29b-41d4-a716-446655440000",
  firmId: "550e8400-e29b-41d4-a716-446655440000",
  title: "Understanding Tax Implications for Small Businesses in 2024",
  subtitle: "A comprehensive guide to the new fiscal regulations and how they affect your bottom line.",
  briefing: "Key changes in tax laws include adjustments to deductions, new reporting requirements, and shifts in corporate tax rates.",
  // A reasonably long content string to simulate a real article
  content: `
    <h2>Introduction</h2>
    <p>As we approach the 2024 fiscal year, it is crucial for small business owners to stay ahead of the curve regarding tax regulations. This article explores the significant changes and provides actionable advice.</p>
    <h3>1. Deduction Adjustments</h3>
    <p>The standard deduction for businesses has been adjusted to account for inflation. This means that... ${"Lorem ipsum ".repeat(100)}</p>
    <h3>2. Digital Reporting</h3>
    <p>New mandates require digital reporting for all transactions over... ${"Lorem ipsum ".repeat(50)}</p>
    <img src="https://example.com/chart-2024.png" alt="Tax Chart" />
    <p>${"Lorem ipsum ".repeat(200)}</p>
  `,
  imageUrl: "https://example.com/banner-image-tax-2024.jpg",
  status: ArticleStatus.PUBLISHED,
  authorId: "user-123",
  authorName: "John Doe",
  tags: [
    {
      id: "tag-1",
      firmId: "firm-1",
      name: "Tax",
      color: "#FF0000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "tag-2",
      firmId: "firm-1",
      name: "Business",
      color: "#00FF00",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  publishedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const mockPaginatedResponse = {
  content: [createMockArticle()],
  page: {
    size: 1,
    number: 0,
    totalElements: 42,
    totalPages: 42,
  },
};

const mockCountResponse = 42;

function measure() {
  const currentPayload = JSON.stringify(mockPaginatedResponse);
  const optimizedPayload = JSON.stringify(mockCountResponse);

  const currentSize = Buffer.byteLength(currentPayload, 'utf8');
  const optimizedSize = Buffer.byteLength(optimizedPayload, 'utf8');

  console.log("--- Benchmark Results ---");
  console.log(`Current Payload (1 Article + Meta): ${currentSize} bytes`);
  console.log(`Optimized Payload (Count only):     ${optimizedSize} bytes`);
  console.log(`Reduction:                          ${((currentSize - optimizedSize) / currentSize * 100).toFixed(2)}%`);
  console.log("-------------------------");
}

measure();
