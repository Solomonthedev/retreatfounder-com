import { render, screen } from '@testing-library/react'
import { ToolDetail } from '@/components/ToolDetail'
import type { Tool } from '@/lib/types'

const mockTool: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  tagline: 'Build your retreat waitlist and welcome sequence before lunch.',
  description: 'Email marketing built for creators. Sequences are simple and the free tier is genuinely useful.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email', 'Sequences'],
  logoUrl: null,
  screenshotUrl: null,
  useCases: [],
  priceRange: 'Free – $29/mo',
  turfVerdict: 'Recommended',
  affiliateUrl: 'https://convertkit.com?ref=trf',
  featured: false,
  recommended: true,
  status: 'Live',
  website: null,
}

test('renders tool name', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  expect(screen.getByRole('heading', { name: 'ConvertKit' })).toBeInTheDocument()
})

test('renders full description (not truncated)', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  // Should render the FULL description, not just the first sentence
  expect(screen.getAllByText(/Sequences are simple/).length).toBeGreaterThan(0)
})

test('shows affiliate disclosure when affiliateUrl is set', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  expect(screen.getByText(/affiliate disclosure/i)).toBeInTheDocument()
  expect(screen.getByText(/we only list tools we'd recommend without it/i)).toBeInTheDocument()
})

test('does not show affiliate disclosure when no affiliateUrl', () => {
  const noAffiliate: Tool = { ...mockTool, affiliateUrl: null }
  render(<ToolDetail tool={noAffiliate} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  expect(screen.queryByText(/affiliate disclosure/i)).not.toBeInTheDocument()
})

test('back link uses hubPath', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/insurance/" hubLabel="Retreat insurance" />)
  const backLink = screen.getByRole('link', { name: /back to all/i })
  // Next.js <Link> strips trailing slashes in the test environment
  expect(backLink).toHaveAttribute('href', '/directory/insurance')
})
