import { render, screen } from '@testing-library/react'
import { ArticleCard } from './article-card'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

const mockArticle = {
  id: '1',
  title: 'Test Article',
  imageUrl: 'https://example.com/image.jpg',
  tags: [{ id: '1', name: 'Tag 1' }],
}

describe('ArticleCard', () => {
  it('renders image with sizes prop', () => {
    render(<ArticleCard article={mockArticle as any} />)
    const img = screen.getByAltText('Test Article')
    expect(img.getAttribute('sizes')).toBe('(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')
  })
})
