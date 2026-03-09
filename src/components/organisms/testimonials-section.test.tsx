import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { TestimonialsSection } from "./testimonials-section";

describe("TestimonialsSection", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should autoplay testimonials", () => {
    render(<TestimonialsSection />);

    // Initial state: page 0
    // Testimonials has 3 items, itemsPerPage is 2.
    // Page 0: items 0 and 1. Page 1: item 2.
    // We can check for content to verify the page.

    // Page 0 content
    expect(screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)")).toBeDefined();

    // Advance time by 8 seconds (AUTO_PLAY_INTERVAL)
    act(() => {
      vi.advanceTimersByTime(8000);
    });

    // Should now be on page 1
    // Page 1 content
    expect(screen.getByText("DR PAULO AFONSO (ESTEVES E BAGGIO ADVOGADOS)")).toBeDefined();

    // Advance time by another 8 seconds
    act(() => {
      vi.advanceTimersByTime(8000);
    });

    // Should cycle back to page 0
    expect(screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)")).toBeDefined();
  });

  it("should pause autoplay on hover", () => {
    render(<TestimonialsSection />);

    const container = screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)").closest(".grid")!.parentElement!;

    // Hover
    fireEvent.mouseEnter(screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)").closest(".grid")!);

    // Advance time by 8 seconds
    act(() => {
      vi.advanceTimersByTime(8000);
    });

    // Should still be on page 0 because of hover
    expect(screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)")).toBeDefined();

    // Unhover
    fireEvent.mouseLeave(screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)").closest(".grid")!);

    // Advance time by 8 seconds
    act(() => {
      vi.advanceTimersByTime(8000);
    });

    // Should now move to page 1
    expect(screen.getByText("DR PAULO AFONSO (ESTEVES E BAGGIO ADVOGADOS)")).toBeDefined();
  });

  it("should reset timer on manual navigation", () => {
    render(<TestimonialsSection />);

    // Advance time by 4 seconds (halfway)
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // Manually click the second dot (index 1) to go to page 1
    const dots = screen.getAllByRole("button", { name: /Ir para página/i });
    fireEvent.click(dots[1]);

    // Should be on page 1 immediately
    expect(screen.getByText("DR PAULO AFONSO (ESTEVES E BAGGIO ADVOGADOS)")).toBeDefined();

    // Advance time by 4 seconds.
    // If timer wasn't reset, 4s (previous) + 4s (now) = 8s, so it would advance.
    // But since we clicked, it should have reset. So 4s is not enough.
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // Should still be on page 1
    expect(screen.getByText("DR PAULO AFONSO (ESTEVES E BAGGIO ADVOGADOS)")).toBeDefined();

    // Advance another 4 seconds (total 8s since click)
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // Now it should advance to page 0
    expect(screen.getByText("DR CLEITON SAGGIN (SAGGIN ADVOCACIA)")).toBeDefined();
  });
});
