import { act, render, screen } from '@testing-library/react';
import { ScrambleText } from '@/components/atoms/scramble-text';
import React, { Profiler, type ProfilerOnRenderCallback } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('ScrambleText Performance', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders efficiently during animation', async () => {
    let renderCount = 0;
    const onRender: ProfilerOnRenderCallback = (id, phase) => {
      renderCount++;
    };

    const rafSpy = vi.spyOn(window, 'requestAnimationFrame');

    render(
      <Profiler id="scramble" onRender={onRender}>
        <ScrambleText text="Hello World" duration={1000} />
      </Profiler>
    );

    // Fast-forward time
    await act(async () => {
      vi.advanceTimersByTime(1100);
    });

    // Check final state
    expect(screen.getByText('Hello World')).toBeTruthy();

    console.log(`Render count (commits): ${renderCount}`);
    console.log(`RAF calls: ${rafSpy.mock.calls.length}`);

    // Clean up spy
    rafSpy.mockRestore();
  });
});
