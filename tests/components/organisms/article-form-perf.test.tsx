import { render, screen, act } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { useForm, Control } from 'react-hook-form';
import { ArticleMainContent } from '@/components/organisms/article-form/article-main-content';
import { CreateArticleDTO } from '@/lib/types/article';
import React from 'react';

// Mock TiptapEditor to trigger onChange
// We need to forward ref because react-hook-form might try to attach ref to it?
// No, TiptapEditor is uncontrolled mostly. But Controller uses ref.
// We'll just mock it as a simple functional component.
vi.mock('@/components/molecules/tiptap-editor', () => ({
  TiptapEditor: ({ onChange, content }: { onChange: (val: string) => void, content: string }) => (
    <div data-testid="tiptap-editor">
      <button onClick={() => onChange('new content')}>Type</button>
      <span data-testid="editor-content">{content}</span>
    </div>
  ),
}));

// Wrapper component to provide useForm context
function Wrapper({ onRender }: { onRender: () => void }) {
  const { register, formState: { errors }, watch, setValue, control } = useForm<CreateArticleDTO>({
    defaultValues: {
      content: '',
      title: '',
      briefing: ''
    },
  });

  // Spy on register function calls
  const registerSpy = vi.fn((...args: Parameters<typeof register>) => register(...args));

  // Call the onRender callback whenever the main content renders
  // We can't put onRender directly in ArticleMainContent because we can't modify it yet.
  // Instead, we pass a spy as `register` prop. Since ArticleMainContent calls register during render,
  // the spy will be called every time ArticleMainContent renders.

  return (
    <ArticleMainContent
      // @ts-ignore - we are passing a spy that mimics register
      register={onRender}
      errors={errors}
      watch={watch}
      setValue={setValue}
      // @ts-ignore - control will be added later, but for now it's ignored or passed if types allow
      control={control}
    />
  );
}

describe('ArticleMainContent Performance', () => {
  it('should verify re-renders when content changes', async () => {
    const renderSpy = vi.fn(() => ({ onBlur: vi.fn(), onChange: vi.fn(), ref: vi.fn(), name: 'test' }));

    render(<Wrapper onRender={renderSpy} />);

    // Initial render: register is called for 'title' and 'briefing'
    // In some environments (Strict Mode or async form init), it might render multiple times.
    // We just want to clear the spy before the user interaction.
    renderSpy.mockClear();

    // Trigger change in editor
    // This updates 'content' value in the form
    const button = screen.getByText('Type');
    await act(async () => {
      button.click();
    });

    // Verify re-render
    // CURRENT BEHAVIOR (Unoptimized):
    // Because ArticleMainContent calls watch('content'), it subscribes to 'content' changes.
    // When content updates, ArticleMainContent re-renders.
    // This causes register('title') and register('briefing') to be called again.
    // So we expect 2 calls.

    // AFTER OPTIMIZATION:
    // ArticleMainContent will NOT subscribe to 'content' via watch().
    // Instead, Controller handles the update.
    // So ArticleMainContent should NOT re-render.
    // Expect 0 calls.

    // For now, let's assert the CURRENT (bad) behavior to prove the issue.
    // If this test passes with 2 calls, we have reproduced the issue.
    // If it is 0, then my understanding is wrong or it's already optimized.

    // Note: React Hook Form's watch subscription might cause re-render asynchronously or in next tick?
    // act() handles that.

    const callCount = renderSpy.mock.calls.length;

    // With optimization (Controller), ArticleMainContent should NOT re-render.
    // So register spy should NOT be called.
    expect(callCount).toBe(0);
  });
});
