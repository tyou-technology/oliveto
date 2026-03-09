import { render, screen } from '@testing-library/react';
import { Footer } from './footer';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';

// Create a spy for the Image component
const ImageSpy = vi.fn((props: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} data-testid="next-image" />;
});

// Mock next/image to verify props using the spy
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => ImageSpy(props),
}));

describe('Footer', () => {
  it('renders the logo without priority to improve performance', () => {
    render(<Footer />);

    // Check if the spy was called with priority: true for the logo
    // Find the call for the Logo image
    const logoCall = ImageSpy.mock.calls.find(call => call[0].alt === 'Logo');

    expect(logoCall).toBeDefined();

    // Assert that the priority prop is NOT present (or is false) in the PROPS passed to Next Image
    // This assertion should FAIL if priority is present in the code.
    expect(logoCall![0].priority).toBeFalsy();
  });
});
