import { render, screen } from '@testing-library/react'
import { ToolCard } from '@/components/ToolCard'
import type { Tool } from '@/lib/types'

const mockTool: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  tagline: 'Build your retreat waitlist and welcome sequence before lunch.',
  description: 'Email marketing for creators and retreat operators.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email', 'Forms'],
  logoUrl: null,
  screenshotUrl: null,
  useCases: [],
  priceRange: 'Free – $29/mo',
  website: null,
  turfVerdict: 'Recommended',
  affiliateUrl: 'https://convertkit.com?ref=trf',
  featured: false,
  recommended: true,
  status: 'Live',
}

test('renders tool name', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText('ConvertKit')).toBeInTheDocument()
})

test('renders tagline when present', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText(/Build your retreat waitlist/)).toBeInTheDocument()
})

test('does not render tagline when absent', () => {
  const noTagline: Tool = { ...mockTool, tagline: null }
  render(<ToolCard tool={noTagline} />)
  expect(screen.queryByText(/Build your retreat waitlist/)).not.toBeInTheDocument()
})

test('renders description', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText(/Email marketing for creators/)).toBeInTheDocument()
})

test('renders price range', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText(/Free – \$29\/mo/)).toBeInTheDocument()
})

test('renders tags', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Forms')).toBeInTheDocument()
})

test('renders Read our take CTA', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText(/Read our take/)).toBeInTheDocument()
})

test('entire card links to correct tool detail path', () => {
  render(<ToolCard tool={mockTool} />)
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', '/directory/marketing-tools/convertkit')
})

test('insurance tool links to insurance hub path', () => {
  const insuranceTool: Tool = {
    ...mockTool,
    id: 'rec2',
    name: 'Markel',
    slug: 'markel',
    pillar: 'Insurance',
    category: 'Liability Insurance',
    tagline: 'UK specialist for retreat liability.',
  }
  render(<ToolCard tool={insuranceTool} />)
  const link = screen.getByRole('link')
  expect(link).toHaveAttribute('href', '/directory/insurance/markel')
})

test('does not show verdict badge', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.queryByText('Recommended')).not.toBeInTheDocument()
  expect(screen.queryByText('Neutral')).not.toBeInTheDocument()
})
