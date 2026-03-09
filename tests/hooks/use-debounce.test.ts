import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/use-debounce';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('useDebounce Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should update the value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    rerender({ value: 'updated', delay: 500 });

    // Value should still be 'initial' immediately after change
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should update the value after the default delay (500ms)', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset the timeout if the value changes before the delay expires', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    rerender({ value: 'first update', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    rerender({ value: 'second update', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // It has been 600ms since the first update, but only 300ms since the second update.
    // The first timer should have been cleared.
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current).toBe('second update');
  });

  it('should handle rapid changes and only update to the last value', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      }
    );

    rerender({ value: 'update 1', delay: 500 });
    rerender({ value: 'update 2', delay: 500 });
    rerender({ value: 'update 3', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('update 3');
  });

  it('should clear timeout on unmount', () => {
    const spy = vi.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() => useDebounce('value', 500));

    unmount();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
