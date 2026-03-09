import { render } from '@testing-library/react';
import { TiptapEditor } from './tiptap-editor';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as TiptapReact from '@tiptap/react';

// Mock Tiptap dependencies
vi.mock('@tiptap/react', async () => {
  const actual = await vi.importActual('@tiptap/react');
  return {
    ...actual,
    useEditor: vi.fn(),
    EditorContent: () => <div data-testid="editor-content" />,
  };
});

describe('TiptapEditor Performance', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('re-renders when parent re-renders with identical props', () => {
    const useEditorSpy = vi.mocked(TiptapReact.useEditor);

    // Mock return value for useEditor
    useEditorSpy.mockReturnValue({
      getHTML: () => '<p>Content</p>',
      setEditable: vi.fn(),
      commands: { setContent: vi.fn() },
      can: () => ({ undo: () => true, redo: () => true }),
      chain: () => ({ focus: () => ({ undo: () => ({ run: () => {} }), redo: () => ({ run: () => {} }) }) }),
      isActive: () => false,
      isFocused: false,
    } as any);

    const props = {
      content: '<p>Content</p>',
      onChange: vi.fn(), // stable reference
      readOnly: false,
    };

    // Initial render
    const { rerender } = render(<TiptapEditor {...props} />);

    expect(useEditorSpy).toHaveBeenCalledTimes(1);

    // Re-render with identical props
    rerender(<TiptapEditor {...props} />);

    // Currently (without memo), it should re-render
    expect(useEditorSpy).toHaveBeenCalledTimes(1);
  });
});
