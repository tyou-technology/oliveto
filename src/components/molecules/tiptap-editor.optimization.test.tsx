import { render } from '@testing-library/react';
import { TiptapEditor } from './tiptap-editor';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
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

describe('TiptapEditor Performance Optimization', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls getHTML on every keystroke (bottleneck)', () => {
    const useEditorSpy = vi.mocked(TiptapReact.useEditor);
    const getHTMLSpy = vi.fn().mockReturnValue('<p>Content</p>');

    let capturedOnUpdate: any;

    useEditorSpy.mockImplementation((options) => {
      // Capture the onUpdate callback
      capturedOnUpdate = options?.onUpdate;

      return {
        getHTML: getHTMLSpy,
        setEditable: vi.fn(),
        commands: { setContent: vi.fn() },
        can: () => ({ undo: () => true, redo: () => true }),
        chain: () => ({ focus: () => ({ undo: () => ({ run: () => {} }), redo: () => ({ run: () => {} }) }) }),
        isActive: () => false,
        isFocused: false,
      } as any;
    });

    const props = {
      content: '<p>Content</p>',
      onChange: vi.fn(),
    };

    render(<TiptapEditor {...props} />);

    // Simulate 5 rapid keystrokes
    const editorInstance = { getHTML: getHTMLSpy };

    // Ensure onUpdate was captured
    expect(capturedOnUpdate).toBeDefined();

    // Fire onUpdate 5 times
    capturedOnUpdate({ editor: editorInstance });
    capturedOnUpdate({ editor: editorInstance });
    capturedOnUpdate({ editor: editorInstance });
    capturedOnUpdate({ editor: editorInstance });
    capturedOnUpdate({ editor: editorInstance });

    // EXPECTATION AFTER OPTIMIZATION:
    // getHTML called 1 time (useEffect) + 0 times (debounced)
    expect(getHTMLSpy).toHaveBeenCalledTimes(1);

    // Advance timer to trigger debounce
    vi.advanceTimersByTime(300);

    // EXPECTATION AFTER OPTIMIZATION:
    // getHTML called 1 time (useEffect) + 1 time (debounced)
    expect(getHTMLSpy).toHaveBeenCalledTimes(2);
  });
});
