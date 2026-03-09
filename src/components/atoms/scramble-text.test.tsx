import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ScrambleText } from './scramble-text';

describe('ScrambleText', () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it('renders text with accessibility attributes', () => {
    render(<ScrambleText text="Accessible Text" />);

    // Check for visually hidden text for screen readers.
    // Since there are multiple elements with the same text (one hidden, one visible/animated),
    // we filter by class name.
    const allTexts = screen.getAllByText('Accessible Text');
    const srText = allTexts.find(el => el.className.includes('sr-only'));
    expect(srText).not.toBeUndefined();

    // Check for animated text container being hidden from screen readers
    const animatedText = allTexts.find(el => el.getAttribute('aria-hidden') === 'true');
    expect(animatedText).not.toBeUndefined();
  });

  it('respects prefers-reduced-motion', () => {
    // Update mock to simulate reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    render(<ScrambleText text="Static Text" />);

    // In reduced motion mode, the text should be immediately visible and not scrambled.
    // We should find two instances of "Static Text": one sr-only, one aria-hidden (but static content).
    const allTexts = screen.getAllByText('Static Text');
    expect(allTexts).toHaveLength(2);

    const animatedText = allTexts.find(el => el.getAttribute('aria-hidden') === 'true');
    expect(animatedText).not.toBeUndefined();

    // Verify that the "animated" text is exactly the original text (not scrambled)
    // implicitly checked by getAllByText finding it.
  });
});
