import { render, screen } from '@testing-library/react'
import { ToolCard } from '@/components/ToolCard'
import type { Tool } from '@/lib/types'

const mockTool: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  description: 'Email marketing for creators and retreat operators.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email', 'Forms'],
  logoUrl: null,
  priceRange: 'Free – $29/mo',
  turfVerdict: 'Best for beginners. Simple sequences, clean interface.',
  affiliateUrl: 'https://convertkit.com?ref=trf',
  featured: false,
  recommended: true,
  status: 'Live',
}

test('renders tool name', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText('ConvertKit')).toBeInTheDocument()
})

test('renders TRF verdict', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText(/Best for beginners/)).toBeInTheDocument()
})

test('affiliate link uses affiliateUrl from Airtable', () => {
  render(<ToolCard tool={mockTool} />)
  const link = screen.getByRole('link', { name: /visit/i })
  expect(link).toHaveAttribute('href', 'https://convertkit.com?ref=trf')
})

test('affiliate link opens in new tab', () => {
  render(<ToolCard tool={mockTool} />)
  const link = screen.getByRole('link', { name: /visit/i })
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveAttribute('rel', 'noopener noreferrer')
})

test('renders tags', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText('Email')).toBeInTheDocument()
  expect(screen.getByText('Forms')).toBeInTheDocument()
})

test('renders price range', () => {
  render(<ToolCard tool={mockTool} />)
  expect(screen.getByText(/Free – \$29\/mo/)).toBeInTheDocument()
})

test('tool name links to correct category path based on pillar', () => {
  render(<ToolCard tool={mockTool} />)
  // mockTool has pillar: 'Marketing Tools' → marketing-tools
  const nameLink = screen.getByRole('link', { name: 'ConvertKit' })
  expect(nameLink).toHaveAttribute('href', '/directory/marketing-tools/convertkit')
})

test('insurance tool links to insurance hub path', () => {
  const insuranceTool: Tool = {
    ...mockTool,
    id: 'rec2',
    name: 'Markel',
    slug: 'markel',
    pillar: 'Insurance',
    category: 'Liability Insurance',
  }
  render(<ToolCard tool={insuranceTool} />)
  const nameLink = screen.getByRole('link', { name: 'Markel' })
  expect(nameLink).toHaveAttribute('href', '/directory/insurance/markel')
})

test('does not show Unrated for tools with no verdict', () => {
  const noVerdictTool: Tool = { ...mockTool, turfVerdict: null, recommended: false }
  render(<ToolCard tool={noVerdictTool} />)
  expect(screen.queryByText('Unrated')).not.toBeInTheDocument()
})
