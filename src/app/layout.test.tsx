import { describe, it, expect, vi } from "vitest";
import RootLayout from "./layout";
import React from "react";

// Mock next/font/google
vi.mock("next/font/google", () => ({
  Golos_Text: () => ({ variable: "font-golos" }),
  Outfit: () => ({ variable: "font-outfit" }),
}));

// Mock @vercel/analytics/next
vi.mock("@vercel/analytics/next", () => ({
  Analytics: () => null,
}));

// Mock QueryProvider and Toaster
vi.mock("@/components/providers/query-provider", () => ({
  QueryProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/atoms/sonner", () => ({
  Toaster: () => null,
}));

describe("RootLayout Security", () => {
  it("renders the Content Security Policy meta tag", () => {
    // Call the component directly as a function
    const result = RootLayout({ children: <div>Test</div> });

    // Result is a React Element: <html ...> <head>...</head> <body>...</body> </html>
    // We can inspect its props and children.

    // Check type is 'html'
    expect(result.type).toBe('html');

    // Children of html: [head, body] usually, or just children if it's an array.
    const children = React.Children.toArray(result.props.children);

    // Find <head>
    const head = children.find((child: any) => child.type === 'head');
    expect(head).toBeDefined();

    // Children of head: <meta ... />
    const headChildren = React.Children.toArray(head.props.children);

    const cspMeta = headChildren.find((child: any) =>
      child.type === 'meta' && child.props.httpEquiv === 'Content-Security-Policy'
    );

    expect(cspMeta).toBeDefined();
    expect(cspMeta.props.content).toContain("default-src 'self'");
    expect(cspMeta.props.content).toContain("script-src 'self'");
    expect(cspMeta.props.content).toContain("unsafe-inline");
    expect(cspMeta.props.content).toContain("https://va.vercel-scripts.com");
  });
});
