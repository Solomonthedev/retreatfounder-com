import { render, screen } from '@testing-library/react'
import { CategoryHub } from '@/components/CategoryHub'
import type { Tool } from '@/lib/types'

const mockTool: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  tagline: 'Email marketing built for creators.',
  description: 'Email marketing built for creators.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email'],
  logoUrl: null,
  screenshotUrl: null,
  useCases: [],
  priceRange: 'Free – $29/mo',
  turfVerdict: 'Recommended',
  website: null,
  affiliateUrl: 'https://convertkit.com?ref=trf',
  featured: false,
  recommended: true,
  status: 'Live',
}

const featuredTool: Tool = { ...mockTool, id: 'rec2', name: 'Kit', slug: 'kit', featured: true, recommended: false }

test('renders headline and accent', () => {
  render(
    <CategoryHub
      pillarName="Marketing Tools"
      headline="Tools that actually"
      headlineAccent="work."
      bodyText="No sponsored rankings."
      tools={[mockTool]}
      formId="preview"
    />
  )
  expect(screen.getByText('Tools that actually')).toBeInTheDocument()
  expect(screen.getByText('work.')).toBeInTheDocument()
})

test('renders body text', () => {
  render(
    <CategoryHub pillarName="Marketing Tools" headline="H" headlineAccent="W" bodyText="No sponsored rankings." tools={[]} formId="preview" />
  )
  expect(screen.getByText('No sponsored rankings.')).toBeInTheDocument()
})

test('renders tool count in kicker', () => {
  render(
    <CategoryHub pillarName="Marketing Tools" headline="H" headlineAccent="W" bodyText="B" tools={[mockTool, featuredTool]} formId="preview" />
  )
  expect(screen.getByText(/2 tools curated/)).toBeInTheDocument()
})

test('shows empty state when no tools', () => {
  render(
    <CategoryHub pillarName="Insurance" headline="H" headlineAccent="W" bodyText="B" tools={[]} formId="preview" />
  )
  expect(screen.getByText(/check Airtable connection/)).toBeInTheDocument()
})

test('shows editor picks section when featured tools exist', () => {
  render(
    <CategoryHub pillarName="Marketing Tools" headline="H" headlineAccent="W" bodyText="B" tools={[featuredTool]} formId="preview" />
  )
  expect(screen.getByText(/editor.*picks/i)).toBeInTheDocument()
})

test('does not show editor picks section when no tools are featured', () => {
  render(
    <CategoryHub pillarName="Insurance" headline="H" headlineAccent="W" bodyText="B" tools={[mockTool]} formId="preview" />
  )
  // mockTool has featured: false
  expect(screen.queryByText(/editor.*picks/i)).not.toBeInTheDocument()
})
