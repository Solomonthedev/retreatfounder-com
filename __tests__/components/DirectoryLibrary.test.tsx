import { render, screen, fireEvent, act } from '@testing-library/react'

beforeEach(() => jest.useFakeTimers())
afterEach(() => jest.useRealTimers())

import { DirectoryLibrary } from '@/components/DirectoryLibrary'
import type { Tool } from '@/lib/types'

const base: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  tagline: 'Build your retreat waitlist.',
  description: 'Email marketing for retreat operators.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email'],
  logoUrl: null,
  screenshotUrl: null,
  useCases: [],
  priceRange: 'Free – $29/mo',
  website: null,
  turfVerdict: 'Recommended',
  affiliateUrl: null,
  featured: false,
  recommended: true,
  status: 'Live',
}

const insuranceTool: Tool = {
  ...base,
  id: 'rec2',
  name: 'Markel',
  slug: 'markel',
  pillar: 'Insurance',
  category: 'Liability Insurance',
  tagline: 'UK liability cover for retreat founders.',
  description: 'Specialist insurance for UK retreat operators.',
  priceRange: 'From £15/mo',
  tags: ['UK', 'Liability'],
}

const freeTool: Tool = {
  ...base,
  id: 'rec3',
  name: 'Canva',
  slug: 'canva',
  pillar: 'Marketing Tools',
  category: 'Design',
  tagline: 'Design your retreat marketing materials.',
  description: 'Visual design tool for retreat marketing.',
  priceRange: 'Free',
  tags: ['Design'],
}

const tools = [base, insuranceTool, freeTool]

test('renders all tools by default', () => {
  render(<DirectoryLibrary tools={tools} />)
  expect(screen.getByText('ConvertKit')).toBeInTheDocument()
  expect(screen.getByText('Markel')).toBeInTheDocument()
  expect(screen.getByText('Canva')).toBeInTheDocument()
})

test('shows correct tool count', () => {
  render(<DirectoryLibrary tools={tools} />)
  expect(screen.getByText('3 tools')).toBeInTheDocument()
})

test('category filter hides non-matching tools', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Insurance' }))
  expect(screen.getByText('Markel')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
  expect(screen.queryByText('Canva')).not.toBeInTheDocument()
})

test('category filter shows filtered count', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Insurance' }))
  expect(screen.getByText(/1 of 3 tools/)).toBeInTheDocument()
})

test('price filter: Free shows only free tools', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Free' }))
  expect(screen.getByText('Canva')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
  expect(screen.queryByText('Markel')).not.toBeInTheDocument()
})

test('price filter: Freemium shows freemium tools', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Freemium' }))
  expect(screen.getByText('ConvertKit')).toBeInTheDocument()
  expect(screen.queryByText('Canva')).not.toBeInTheDocument()
})

test('search filters by tool name', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.change(screen.getByPlaceholderText('Search tools…'), { target: { value: 'Markel' } })
  act(() => jest.runAllTimers())
  expect(screen.getByText('Markel')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
})

test('search filters by description text', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.change(screen.getByPlaceholderText('Search tools…'), { target: { value: 'liability' } })
  act(() => jest.runAllTimers())
  expect(screen.getByText('Markel')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
})

test('shows empty state when no tools match', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.change(screen.getByPlaceholderText('Search tools…'), { target: { value: 'xyznotfound' } })
  act(() => jest.runAllTimers())
  expect(screen.getByText(/No tools match/)).toBeInTheDocument()
})

test('clear filters button restores all tools', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Insurance' }))
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
  fireEvent.click(screen.getByRole('button', { name: /clear all/i }))
  expect(screen.getByText('ConvertKit')).toBeInTheDocument()
})

test('category and price filters combine (AND logic)', () => {
  render(<DirectoryLibrary tools={tools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Marketing Tools' }))
  fireEvent.click(screen.getByRole('button', { name: 'Free' }))
  expect(screen.getByText('Canva')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
  expect(screen.queryByText('Markel')).not.toBeInTheDocument()
})

// N16: insert rendering
test('insert renders after the correct tool card when no filters active', () => {
  const insertNode = <div data-testid="callout-insert">Special callout</div>
  render(
    <DirectoryLibrary
      tools={tools}
      inserts={[{ afterIndex: 0, node: insertNode }]}
    />
  )
  expect(screen.getByTestId('callout-insert')).toBeInTheDocument()
})

test('insert is suppressed when category filter is active', () => {
  const insertNode = <div data-testid="callout-insert">Special callout</div>
  render(
    <DirectoryLibrary
      tools={tools}
      inserts={[{ afterIndex: 0, node: insertNode }]}
    />
  )
  fireEvent.click(screen.getByRole('button', { name: 'Insurance' }))
  expect(screen.queryByTestId('callout-insert')).not.toBeInTheDocument()
})

test('insert is suppressed when search is active', () => {
  const insertNode = <div data-testid="callout-insert">Special callout</div>
  render(
    <DirectoryLibrary
      tools={tools}
      inserts={[{ afterIndex: 0, node: insertNode }]}
    />
  )
  fireEvent.change(screen.getByPlaceholderText('Search tools…'), { target: { value: 'Markel' } })
  act(() => jest.runAllTimers())
  expect(screen.queryByTestId('callout-insert')).not.toBeInTheDocument()
})

// N17: use-case filter intersection
const useCaseTool: Tool = {
  ...base,
  id: 'rec4',
  name: 'Mailchimp',
  slug: 'mailchimp',
  pillar: 'Marketing Tools',
  useCases: ['Fill My Retreat', 'Get Your Retreat Discovered'],
}

const useCaseTools = [base, insuranceTool, useCaseTool]

test('use-case filter shows only tools with matching use case', () => {
  render(<DirectoryLibrary tools={useCaseTools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Fill My Retreat' }))
  expect(screen.getByText('Mailchimp')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
  expect(screen.queryByText('Markel')).not.toBeInTheDocument()
})

test('multiple use cases are OR logic within the use-case group', () => {
  render(<DirectoryLibrary tools={useCaseTools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Fill My Retreat' }))
  fireEvent.click(screen.getByRole('button', { name: 'Get Your Retreat Discovered' }))
  expect(screen.getByText('Mailchimp')).toBeInTheDocument()
  expect(screen.queryByText('ConvertKit')).not.toBeInTheDocument()
})

test('use-case and category filters combine (AND logic between groups)', () => {
  render(<DirectoryLibrary tools={useCaseTools} />)
  fireEvent.click(screen.getByRole('button', { name: 'Insurance' }))
  fireEvent.click(screen.getByRole('button', { name: 'Fill My Retreat' }))
  // Insurance + Fill My Retreat → no tool satisfies both
  expect(screen.queryByText('Mailchimp')).not.toBeInTheDocument()
  expect(screen.queryByText('Markel')).not.toBeInTheDocument()
  expect(screen.getByText(/No tools match/)).toBeInTheDocument()
})
