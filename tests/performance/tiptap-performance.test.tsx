import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TiptapEditor } from '@/components/molecules/tiptap-editor';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('TiptapEditor Performance', () => {
  it('calls onChange only once after debouncing (Optimized)', async () => {
    vi.useFakeTimers();
    const onChange = vi.fn();
    const { container } = render(<TiptapEditor content="" onChange={onChange} />);

    const editorContent = container.querySelector('.ProseMirror');
    if (!editorContent) throw new Error('Editor content not found');

    // Simulate typing characters quickly
    await act(async () => {
      const inputs = ['H', 'e', 'l', 'l', 'o'];
      let currentText = '';

      for (const char of inputs) {
        currentText += char;
        editorContent.textContent = currentText;
        editorContent.dispatchEvent(new InputEvent('input', {
          bubbles: true,
          inputType: 'insertText',
          data: char
        }));
        // Small delay between keystrokes
        vi.advanceTimersByTime(50);
      }
    });

    // Should not have been called yet
    expect(onChange).not.toHaveBeenCalled();

    // Fast-forward debounce time (300ms)
    await act(async () => {
      vi.advanceTimersByTime(350);
    });

    console.log(`Optimized onChange calls: ${onChange.mock.calls.length}`);

    // Should be called exactly once with the final content
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.stringContaining('Hello'));

    vi.useRealTimers();
  });

  it('updates content when prop changes externally (e.g. form reset)', async () => {
    const { rerender, container } = render(<TiptapEditor content="Initial" />);
    const editorContent = container.querySelector('.ProseMirror');

    expect(editorContent?.textContent).toContain('Initial');

    // Rerender with new content (simulating reset or data load)
    rerender(<TiptapEditor content="Updated Content" />);

    expect(editorContent?.textContent).toContain('Updated Content');
  });
});
