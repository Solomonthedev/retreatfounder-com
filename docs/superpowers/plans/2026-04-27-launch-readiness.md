# Launch Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 6 QA blockers and 8 quality issues so retreatfounder.com can launch with 5 live categories, honest copy, correct routing, and clean trust signals.

**Architecture:** Extract shared `CategoryHub` and `ToolDetail` components to power all 5 category pages without duplication. Add a `pillarToHubSlug` utility so ToolCard hrefs are dynamic. Replace all 4 ComingSoon pages with real hub pages. Rewrite fabricated copy throughout.

**Tech Stack:** Next.js (App Router, ISR), Tailwind v4, Airtable (base `appx1ArpLyzF4CpLa`), ConvertKit, Jest + React Testing Library.

**Skills:** `@frontend-design` for hub UI · `@page-cro` for hub conversion · `@copywriting` for all copy · `@form-cro` for email forms · `@superpowers:test-driven-development` for all code

---

## File Map

### New files
| File | Responsibility |
|---|---|
| `lib/pillar.ts` | `pillarToHubSlug(pillar)` — maps pillar name to URL slug |
| `components/CategoryHub.tsx` | Shared hub page layout: header, featured grid, all-tools grid, email capture |
| `components/ToolDetail.tsx` | Shared tool detail layout: breadcrumb, left info, right verdict StickyNote, CTA |
| `app/directory/page.tsx` | `/directory/` landing — shows all 5 categories as navigable cards |
| `app/directory/insurance/[slug]/page.tsx` | Insurance tool detail page |
| `app/directory/booking-software/[slug]/page.tsx` | Booking software tool detail page |
| `app/directory/legal-templates/[slug]/page.tsx` | Legal templates tool detail page |
| `app/directory/photography/[slug]/page.tsx` | Photography tool detail page |
| `__tests__/lib/pillar.test.ts` | Tests for pillarToHubSlug |
| `__tests__/components/CategoryHub.test.tsx` | Tests for CategoryHub |
| `__tests__/components/ToolDetail.test.tsx` | Tests for ToolDetail |

### Modified files
| File | Change |
|---|---|
| `components/ToolCard.tsx` | Fix href: dynamic via `pillarToHubSlug(tool.pillar)` not hardcoded |
| `app/directory/marketing-tools/page.tsx` | Migrate to `CategoryHub` component |
| `app/directory/marketing-tools/[slug]/page.tsx` | Migrate to `ToolDetail` component, add disclosure |
| `app/directory/insurance/page.tsx` | Replace `ComingSoon` with `CategoryHub` |
| `app/directory/booking-software/page.tsx` | Replace `ComingSoon` with `CategoryHub` |
| `app/directory/legal-templates/page.tsx` | Replace `ComingSoon` with `CategoryHub` |
| `app/directory/photography/page.tsx` | Replace `ComingSoon` with `CategoryHub` |
| `components/Nav.tsx` | "The directory" link → `/directory/` (not marketing-tools) |
| `app/page.tsx` | Fix StickyNote quotes, remove "Soon" badges |
| `app/about/page.tsx` | Full copy rewrite — Solomon's story, correct affiliate position |
| `app/newsletter/page.tsx` | Remove duplicate StickyNote |
| `__tests__/components/ToolCard.test.tsx` | Add test for dynamic href |

---

## Task 1: `pillarToHubSlug` utility (TDD)

**Skill: `@superpowers:test-driven-development`**

**Files:**
- Create: `lib/pillar.ts`
- Create: `__tests__/lib/pillar.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// __tests__/lib/pillar.test.ts
import { pillarToHubSlug } from '@/lib/pillar'

test('Marketing Tools → marketing-tools', () => {
  expect(pillarToHubSlug('Marketing Tools')).toBe('marketing-tools')
})

test('Insurance → insurance', () => {
  expect(pillarToHubSlug('Insurance')).toBe('insurance')
})

test('Booking Software → booking-software', () => {
  expect(pillarToHubSlug('Booking Software')).toBe('booking-software')
})

test('Legal Templates → legal-templates', () => {
  expect(pillarToHubSlug('Legal Templates')).toBe('legal-templates')
})

test('Photography → photography', () => {
  expect(pillarToHubSlug('Photography')).toBe('photography')
})

test('empty string → empty string', () => {
  expect(pillarToHubSlug('')).toBe('')
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
cd ~/retreatfounder-com && npm test -- --testPathPatterns=pillar --no-coverage
```

Expected: FAIL "Cannot find module '@/lib/pillar'"

- [ ] **Step 3: Implement**

```ts
// lib/pillar.ts
export function pillarToHubSlug(pillar: string): string {
  return pillar
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
```

- [ ] **Step 4: Run to confirm PASS**

```bash
cd ~/retreatfounder-com && npm test -- --testPathPatterns=pillar --no-coverage
```

Expected: 6 passed

- [ ] **Step 5: Commit**

```bash
git add lib/pillar.ts __tests__/lib/pillar.test.ts
git commit -m "feat: add pillarToHubSlug utility"
```

---

## Task 2: Fix ToolCard href (TDD)

**Skill: `@superpowers:test-driven-development`**

**Files:**
- Modify: `components/ToolCard.tsx:48`
- Modify: `__tests__/components/ToolCard.test.tsx`

The current href is hardcoded: `` href={`/directory/marketing-tools/${tool.slug}`} ``
It must use `pillarToHubSlug(tool.pillar)` so Insurance tools etc. link correctly.

- [ ] **Step 1: Add failing test to existing ToolCard test file**

Add this test to `__tests__/components/ToolCard.test.tsx`:

```ts
import { pillarToHubSlug } from '@/lib/pillar'

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
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
cd ~/retreatfounder-com && npm test -- --testPathPatterns=ToolCard --no-coverage
```

Expected: FAIL "expected /directory/marketing-tools/convertkit but got something else" or href mismatch

- [ ] **Step 3: Update ToolCard href**

In `components/ToolCard.tsx`, add the import and fix the href:

```tsx
import { pillarToHubSlug } from '@/lib/pillar'

// Line ~48 — replace hardcoded href:
href={`/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`}
```

- [ ] **Step 4: Run all tests to confirm PASS + no regressions**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all existing tests still pass + 2 new tests pass

- [ ] **Step 5: Commit**

```bash
git add components/ToolCard.tsx __tests__/components/ToolCard.test.tsx
git commit -m "fix: ToolCard href now dynamic via pillarToHubSlug"
```

---

## Task 3: CategoryHub shared component (TDD)

**Skills: `@frontend-design` · `@page-cro` · `@form-cro`**

**Files:**
- Create: `components/CategoryHub.tsx`
- Create: `__tests__/components/CategoryHub.test.tsx`

This component replaces the layout currently duplicated in `marketing-tools/page.tsx` and will power all 5 category hub pages. It takes the following props:

```ts
interface CategoryHubProps {
  pillarName: string        // "Marketing Tools", "Insurance" etc.
  headline: string          // Display headline — can include <br/>
  headlineAccent: string    // The ember-coloured word at end of headline
  bodyText: string          // Editorial description paragraph (ICP language)
  tools: Tool[]             // All tools for this category (filtered by caller)
  formId: string            // ConvertKit form ID
}
```

The layout (from `@frontend-design`):
- Header section: breadcrumb kicker + headline + body + inline email capture
- "Editor's picks" grid: tools where `t.featured === true` (3-col)
- "All tools" grid: tools where `t.featured === false` (3-col)
- Empty state: "No tools loaded — check Airtable connection."

- [ ] **Step 1: Write failing tests**

```tsx
// __tests__/components/CategoryHub.test.tsx
import { render, screen } from '@testing-library/react'
import { CategoryHub } from '@/components/CategoryHub'
import type { Tool } from '@/lib/types'

const mockTool: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  description: 'Email marketing built for creators.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email'],
  logoUrl: null,
  priceRange: 'Free – $29/mo',
  turfVerdict: 'Recommended',
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
  expect(screen.getByText(/No tools loaded/)).toBeInTheDocument()
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
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
cd ~/retreatfounder-com && npm test -- --testPathPatterns=CategoryHub --no-coverage
```

Expected: FAIL "Cannot find module '@/components/CategoryHub'"

- [ ] **Step 3: Implement CategoryHub**

`components/CategoryHub.tsx` — extract and generalise the layout from `app/directory/marketing-tools/page.tsx`. Key points:
- `'use client'` NOT needed (no event handlers — EmailCaptureForm and ToolCard handle their own)
- Actually CategoryHub is a server component since it just renders layout. Mark it as such (no 'use client').
- Kicker: `The Retreat Founder · {pillarName} · {tools.length} tools curated`
- Headline: `{headline}` with `{headlineAccent}` in ember color on new line
- Featured grid: only if `featured.length > 0`, labelled "Editor's picks"
- All tools grid: tools where `!t.featured`, labelled "All tools"
- Inline email capture: top-right of header, `@form-cro` best practice (label "Get new tools by email", placeholder "your@email.com")

- [ ] **Step 4: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all tests pass

- [ ] **Step 5: Commit**

```bash
git add components/CategoryHub.tsx __tests__/components/CategoryHub.test.tsx
git commit -m "feat: CategoryHub shared component for all category hub pages"
```

---

## Task 4: ToolDetail shared component (TDD)

**Skills: `@frontend-design` · `@copywriting` · `@superpowers:test-driven-development`**

**Files:**
- Create: `components/ToolDetail.tsx`
- Create: `__tests__/components/ToolDetail.test.tsx`

Props:
```ts
interface ToolDetailProps {
  tool: Tool
  hubPath: string   // e.g. "/directory/marketing-tools/"
  hubLabel: string  // e.g. "Marketing tools"
}
```

- [ ] **Step 1: Write failing tests**

```tsx
// __tests__/components/ToolDetail.test.tsx
import { render, screen } from '@testing-library/react'
import { ToolDetail } from '@/components/ToolDetail'
import type { Tool } from '@/lib/types'

const mockTool: Tool = {
  id: 'rec1',
  name: 'ConvertKit',
  slug: 'convertkit',
  description: 'Email marketing built for creators. Sequences are simple and the free tier is genuinely useful.',
  pillar: 'Marketing Tools',
  category: 'Email Marketing',
  tags: ['Email', 'Sequences'],
  logoUrl: null,
  priceRange: 'Free – $29/mo',
  turfVerdict: 'Recommended',
  affiliateUrl: 'https://convertkit.com?ref=trf',
  featured: false,
  recommended: true,
  status: 'Live',
}

test('renders tool name', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  expect(screen.getByText('ConvertKit')).toBeInTheDocument()
})

test('renders full description (not truncated)', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  // Should render the FULL description, not just the first sentence
  expect(screen.getAllByText(/Sequences are simple/).length).toBeGreaterThan(0)
})

test('shows affiliate disclosure when affiliateUrl is set', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  expect(screen.getByText(/affiliate disclosure/i)).toBeInTheDocument()
  expect(screen.getByText(/never affects our verdict/i)).toBeInTheDocument()
})

test('does not show affiliate disclosure when no affiliateUrl', () => {
  const noAffiliate: Tool = { ...mockTool, affiliateUrl: null }
  render(<ToolDetail tool={noAffiliate} hubPath="/directory/marketing-tools/" hubLabel="Marketing tools" />)
  expect(screen.queryByText(/affiliate disclosure/i)).not.toBeInTheDocument()
})

test('back link uses hubPath', () => {
  render(<ToolDetail tool={mockTool} hubPath="/directory/insurance/" hubLabel="Retreat insurance" />)
  const backLink = screen.getByRole('link', { name: /back to all/i })
  expect(backLink).toHaveAttribute('href', '/directory/insurance/')
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
cd ~/retreatfounder-com && npm test -- --testPathPatterns=ToolDetail --no-coverage
```

Expected: FAIL "Cannot find module '@/components/ToolDetail'"

Key changes from current `[slug]/page.tsx`:
1. Add affiliate disclosure line near the CTA button (`@copy-editing`):
   ```
   Affiliate disclosure: we may earn a commission if you sign up via this link. 
   It never affects our verdict.
   ```
2. "Our take" StickyNote: use `tool.description` in full (not just first sentence split) — it was written as the verdict
3. `hubPath` is passed in so back-link and breadcrumb are correct per category

- [ ] **Step 3: Implement ToolDetail**

```tsx
// components/ToolDetail.tsx
// Server component — no 'use client'
import Link from 'next/link'
import { StickyNote } from './StickyNote'
import type { Tool } from '@/lib/types'

interface ToolDetailProps {
  tool: Tool
  hubPath: string
  hubLabel: string
}

export function ToolDetail({ tool, hubPath, hubLabel }: ToolDetailProps) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 32px 96px' }}>
      {/* Breadcrumb */}
      <nav className="font-body" style={{ fontSize: 13, color: 'var(--color-ink-40)', marginBottom: 32 }}>
        <Link href={hubPath} className="no-underline" style={{ color: 'var(--color-field-green)' }}>
          {hubLabel}
        </Link>
        <span style={{ margin: '0 8px', color: 'var(--color-cream-300)' }}>/</span>
        <span style={{ color: 'var(--color-ink-60)' }}>{tool.name}</span>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 16 }}>
            {hubLabel} · {tool.category}
          </p>
          <h1 className="font-display text-ink uppercase" style={{ fontSize: 64, lineHeight: 1.0, letterSpacing: '0.005em', margin: '0 0 8px' }}>
            {tool.name}
          </h1>
          {tool.priceRange && (
            <p className="font-body text-ink-60" style={{ fontSize: 16, marginBottom: 24 }}>{tool.priceRange}</p>
          )}
          <hr style={{ border: 0, height: 1, background: 'var(--color-ink)', margin: '32px 0' }} />
          <p className="font-body" style={{ fontSize: 19, lineHeight: 1.55, color: 'var(--color-ink-80)', marginBottom: 24 }}>
            {tool.description}
          </p>
          {tool.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {tool.tags.map((tag) => (
                <span key={tag} className="font-body" style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.02em', background: 'var(--color-field-green-100)', color: 'var(--color-field-green)', border: '1px solid var(--color-field-green)', padding: '4px 10px', borderRadius: 999 }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          {tool.affiliateUrl && (
            <>
              <a href={tool.affiliateUrl} target="_blank" rel="noopener noreferrer" className="font-body font-semibold no-underline btn-ember" style={{ display: 'inline-block', background: 'var(--color-ember)', color: 'var(--color-cream)', fontSize: 15, padding: '12px 24px', borderRadius: 4 }}>
                Visit {tool.name} →
              </a>
              <p className="font-body" style={{ fontSize: 12, color: 'var(--color-ink-40)', marginTop: 10, maxWidth: 340 }}>
                Affiliate disclosure: we may earn a commission if you sign up via this link. It never affects our verdict.
              </p>
            </>
          )}
        </div>

        {/* Right: verdict */}
        <div style={{ paddingTop: 80 }}>
          {tool.description && (
            <>
              <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-40)', marginBottom: 16 }}>
                Our take
              </p>
              <StickyNote quote={tool.description} attribution="The Retreat Founder" rotate={-1.5} maxWidth={380} />
            </>
          )}
          <div style={{ marginTop: 48 }}>
            <Link href={hubPath} className="font-body no-underline" style={{ fontSize: 14, color: 'var(--color-field-green)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              ← Back to all tools
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run all tests to confirm PASS**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: 5 new ToolDetail tests pass + all existing tests still pass

- [ ] **Step 5: Commit**

```bash
git add components/ToolDetail.tsx __tests__/components/ToolDetail.test.tsx
git commit -m "feat: ToolDetail shared component with affiliate disclosure + tests"
```

---

## Task 5: Migrate marketing-tools hub + detail pages to shared components

**Files:**
- Modify: `app/directory/marketing-tools/page.tsx`
- Modify: `app/directory/marketing-tools/[slug]/page.tsx`

- [ ] **Step 1: Migrate hub page**

Replace `app/directory/marketing-tools/page.tsx` entirely:

```tsx
import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Marketing Tools for Retreat Founders',
  description:
    'No sponsored rankings. Every tool on this page was chosen because retreat founders — people stalling at half capacity and struggling to break even — actually use it.',
}

export const revalidate = 60

export default async function MarketingToolsHub() {
  const tools = await fetchTools()
  const marketingTools = tools.filter((t) => t.pillar === 'Marketing Tools')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Marketing Tools"
      headline="Tools that actually"
      headlineAccent="work."
      bodyText="No sponsored rankings. No generic listicles. Every tool here was chosen because retreat founders — people stalling at half capacity, struggling to price for profit — actually needed it. Affiliate links always disclosed."
      tools={marketingTools}
      formId={formId}
    />
  )
}
```

- [ ] **Step 2: Migrate tool detail page**

Replace `app/directory/marketing-tools/[slug]/page.tsx` entirely:

```tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools
    .filter((t) => t.pillar === 'Marketing Tools')
    .map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) return {}
  return {
    title: `${tool.name} — Marketing Tools for Retreat Founders`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) notFound()

  return (
    <ToolDetail
      tool={tool}
      hubPath="/directory/marketing-tools/"
      hubLabel="Marketing tools"
    />
  )
}
```

- [ ] **Step 3: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all 16+ tests pass

- [ ] **Step 4: Verify in browser**

Dev server should already be running at localhost:3000. Check:
- `/directory/marketing-tools/` — renders as before, same layout
- `/directory/marketing-tools/convertkit` (or any slug) — renders with affiliate disclosure text

- [ ] **Step 5: Commit**

```bash
git add app/directory/marketing-tools/page.tsx app/directory/marketing-tools/\[slug\]/page.tsx
git commit -m "refactor: migrate marketing-tools pages to shared CategoryHub + ToolDetail"
```

---

## Task 6: Build Insurance hub + detail pages

**Skills: `@frontend-design` · `@copywriting`**

**Files:**
- Modify: `app/directory/insurance/page.tsx`
- Create: `app/directory/insurance/[slug]/page.tsx`

ICP context: "Missing legal basics — no insurance, no contracts" is pain #7. "Don't discover your policy gaps during the event." ICP language: "afraid of doing it wrong, losing money."

- [ ] **Step 1: Replace insurance hub (ComingSoon → CategoryHub)**

```tsx
// app/directory/insurance/page.tsx
import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Insurance — The Retreat Founder',
  description:
    'Insurance providers that actually understand retreat businesses. Liability, cancellation, and public liability coverage — compared honestly so you know what you\'re buying.',
}

export const revalidate = 60

export default async function InsuranceHub() {
  const tools = await fetchTools()
  const insuranceTools = tools.filter((t) => t.pillar === 'Insurance')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Insurance"
      headline="Don't discover the gaps"
      headlineAccent="mid-retreat."
      bodyText="Most retreat operators find out what their policy doesn't cover during a claim. These are the insurance providers that understand retreat businesses — liability, cancellation, public liability — compared honestly so you know exactly what you're buying before you need it."
      tools={insuranceTools}
      formId={formId}
    />
  )
}
```

- [ ] **Step 2: Create insurance tool detail page**

```tsx
// app/directory/insurance/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools
    .filter((t) => t.pillar === 'Insurance')
    .map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) return {}
  return {
    title: `${tool.name} — Retreat Insurance`,
    description: tool.description,
  }
}

export default async function InsuranceToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) notFound()

  return <ToolDetail tool={tool} hubPath="/directory/insurance/" hubLabel="Retreat insurance" />
}
```

- [ ] **Step 3: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add app/directory/insurance/page.tsx app/directory/insurance/\[slug\]/page.tsx
git commit -m "feat: insurance hub page (replaces coming soon)"
```

---

## Task 7: Build Booking Software hub + detail pages

**Skills: `@frontend-design` · `@copywriting`**

**Files:**
- Modify: `app/directory/booking-software/page.tsx`
- Create: `app/directory/booking-software/[slug]/page.tsx`

ICP context: Booking Software is the cash cow — highest affiliate commissions ($41 CPC adjacent). From Step 8 Insight F: "Draft comparison piece week 1. Refresh quarterly." Language: "your calendar shouldn't require a manual to operate."

- [ ] **Step 1: Replace booking software hub**

```tsx
// app/directory/booking-software/page.tsx
import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Booking Software — The Retreat Founder',
  description:
    'Booking software built for retreat operators, not hotels. Deposits, group bookings, intake forms, and payment processing — without the hotel-tier fees.',
}

export const revalidate = 60

export default async function BookingSoftwareHub() {
  const tools = await fetchTools()
  const bookingTools = tools.filter((t) => t.pillar === 'Booking Software')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Booking Software"
      headline="Your calendar shouldn't need"
      headlineAccent="a manual."
      bodyText="WeTravel, FareHarbor, Retreat Guru — there are more booking platforms than you'd think, and they're not all built the same. These are the tools that handle deposits, group bookings, intake forms, and payment processing without charging hotel-tier fees or requiring a developer to set up."
      tools={bookingTools}
      formId={formId}
    />
  )
}
```

- [ ] **Step 2: Create booking software detail page**

```tsx
// app/directory/booking-software/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools.filter((t) => t.pillar === 'Booking Software').map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) return {}
  return { title: `${tool.name} — Retreat Booking Software`, description: tool.description }
}

export default async function BookingToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) notFound()
  return <ToolDetail tool={tool} hubPath="/directory/booking-software/" hubLabel="Booking software" />
}
```

- [ ] **Step 3: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add app/directory/booking-software/page.tsx app/directory/booking-software/\[slug\]/page.tsx
git commit -m "feat: booking software hub page (replaces coming soon)"
```

---

## Task 8: Build Legal Templates hub + detail pages

**Skills: `@frontend-design` · `@copywriting`**

**Files:**
- Modify: `app/directory/legal-templates/page.tsx`
- Create: `app/directory/legal-templates/[slug]/page.tsx`

ICP context: "Missing legal basics — no insurance, no contracts" is pain #7. "A waiver you wrote yourself is not a waiver." ICP language: "afraid of doing it wrong."

- [ ] **Step 1: Replace legal templates hub**

```tsx
// app/directory/legal-templates/page.tsx
import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Legal Templates — The Retreat Founder',
  description:
    'Contracts, liability waivers, and refund policy guides built for retreat operators. Written by lawyers who understand what actually goes wrong on a retreat.',
}

export const revalidate = 60

export default async function LegalTemplatesHub() {
  const tools = await fetchTools()
  const legalTools = tools.filter((t) => t.pillar === 'Legal Templates')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Legal Templates"
      headline="A waiver you wrote yourself"
      headlineAccent="isn't a waiver."
      bodyText="Retreat operators are often one incident away from a very expensive lesson in contract law. These are the templates and tools that give you proper participant waivers, booking contracts, refund policies, and photo release forms — built for the retreat context, not a generic small business."
      tools={legalTools}
      formId={formId}
    />
  )
}
```

- [ ] **Step 2: Create legal templates detail page**

```tsx
// app/directory/legal-templates/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools.filter((t) => t.pillar === 'Legal Templates').map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) return {}
  return { title: `${tool.name} — Retreat Legal Templates`, description: tool.description }
}

export default async function LegalToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) notFound()
  return <ToolDetail tool={tool} hubPath="/directory/legal-templates/" hubLabel="Legal templates" />
}
```

- [ ] **Step 3: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add app/directory/legal-templates/page.tsx app/directory/legal-templates/\[slug\]/page.tsx
git commit -m "feat: legal templates hub page (replaces coming soon)"
```

---

## Task 9: Build Photography hub + detail pages

**Skills: `@frontend-design` · `@copywriting`**

**Files:**
- Modify: `app/directory/photography/page.tsx`
- Create: `app/directory/photography/[slug]/page.tsx`

ICP context: Step 8 Insight D — every photographer added is also a potential interview subject. "Your best photos are still on someone's phone." Pain #4: no social proof — can't show what the experience looks like.

- [ ] **Step 1: Replace photography hub**

```tsx
// app/directory/photography/page.tsx
import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Photography — The Retreat Founder',
  description:
    'Photographers who shoot retreats as they actually are. Golden-hour light, long tables, real people. No yoga-mat pack shots.',
}

export const revalidate = 60

export default async function PhotographyHub() {
  const tools = await fetchTools()
  const photographyTools = tools.filter((t) => t.pillar === 'Photography')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Photography"
      headline="Your best retreat photos are on"
      headlineAccent="someone's phone."
      bodyText="People don't sign up for a retreat based on a description — they sign up because they saw a photo and felt something. These are photographers who shoot retreats as they actually are: golden-hour light, long tables, real people. Not staged yoga-mat pack shots. No AI. Just the real thing."
      tools={photographyTools}
      formId={formId}
    />
  )
}
```

- [ ] **Step 2: Create photography detail page**

```tsx
// app/directory/photography/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools.filter((t) => t.pillar === 'Photography').map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) return {}
  return { title: `${tool.name} — Retreat Photography`, description: tool.description }
}

export default async function PhotographyToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug)
  if (!tool) notFound()
  return <ToolDetail tool={tool} hubPath="/directory/photography/" hubLabel="Photography" />
}
```

- [ ] **Step 3: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all tests pass

- [ ] **Step 4: Commit**

```bash
git add app/directory/photography/page.tsx app/directory/photography/\[slug\]/page.tsx
git commit -m "feat: photography hub page (replaces coming soon)"
```

---

## Task 10: Build /directory/ landing page

**Skills: `@frontend-design` · `@page-cro`**

**Files:**
- Create: `app/directory/page.tsx`

This is the top-level directory page showing all 5 category hubs as navigable cards. Operators land here from nav and from homepage CTA.

- [ ] **Step 1: Implement**

```tsx
// app/directory/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Directory — The Retreat Founder',
  description:
    'Five curated categories of tools, services, and resources for retreat founders. Marketing, insurance, booking software, legal templates, photography.',
}

const CATEGORIES = [
  {
    slug: 'marketing-tools',
    name: 'Marketing Tools',
    description: 'Email, CRM, scheduling, social — the tools that fill retreats.',
    status: 'live' as const,
  },
  {
    slug: 'booking-software',
    name: 'Booking Software',
    description: 'Deposits, group bookings, intake forms, payment processing.',
    status: 'live' as const,
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    description: 'Liability, cancellation, public liability — compared honestly.',
    status: 'live' as const,
  },
  {
    slug: 'legal-templates',
    name: 'Legal Templates',
    description: 'Waivers, contracts, refund policies built for retreat context.',
    status: 'live' as const,
  },
  {
    slug: 'photography',
    name: 'Photography',
    description: 'Photographers who shoot retreats as they actually are.',
    status: 'live' as const,
  },
]

export default function DirectoryPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 96px' }}>
      <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 16 }}>
        The Retreat Founder · The Directory
      </p>
      <h1 className="font-display text-ink uppercase" style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: '0.005em', margin: '0 0 48px' }}>
        Five categories.<br />
        <span style={{ color: 'var(--color-ember)' }}>No noise.</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/directory/${cat.slug}/`}
            className="no-underline"
            style={{
              display: 'block',
              padding: '40px 36px',
              background: 'var(--color-cream)',
              border: '1px solid var(--color-ink)',
              transition: 'background 180ms',
            }}
          >
            <p className="font-body font-semibold" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 12 }}>
              Live
            </p>
            <h2 className="font-display text-ink uppercase" style={{ fontSize: 32, letterSpacing: '0.005em', margin: '0 0 12px' }}>
              {cat.name}
            </h2>
            <p className="font-body" style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--color-ink-60)', margin: 0 }}>
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Run tests + commit**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
git add app/directory/page.tsx
git commit -m "feat: /directory/ landing page with all 5 categories"
```

---

## Task 11: Update Nav to link to /directory/

**Files:**
- Modify: `components/Nav.tsx`

Currently both "The directory" and "Browse tools" link to `/directory/marketing-tools/`. Fix "The directory" to go to `/directory/`. Keep "Browse tools" going to marketing-tools (it's the primary CTA for the main use case).

- [ ] **Step 1: Update Nav**

In `components/Nav.tsx`, change line ~55:
```tsx
// FROM:
href="/directory/marketing-tools/"
// with text "The directory"

// TO:
href="/directory/"
// with text "The directory"
```

The "Browse tools" CTA button stays as `/directory/marketing-tools/`.

- [ ] **Step 2: Run tests + commit**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
git add components/Nav.tsx
git commit -m "fix: nav 'The directory' links to /directory/ landing"
```

---

## Task 12: Copy overhaul — StickyNotes, homepage, About, Newsletter

**Skill: `@copywriting`**

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/newsletter/page.tsx`

This task fixes all fabricated testimonials and generic copy, replacing with ICP language and Solomon's real voice.

### ICP Language Bank (verbatim — use these, do not paraphrase):
- "stall at half capacity"
- "wearing every hat: planner, facilitator, bookkeeper, and now, marketer"
- "end up making maybe a few hundred dollars for themselves at the end of the day"
- "you can't just post once and hope people show up"
- "make you want to cry into your tea every other week"
- "pricing for profit"
- "sustainable retreat business"
- "treating this like a real business"

### Brand voice rules (from MemPalace solomon-oyemade-tone-of-voice.md):
- Warmth 8/10, Directness 8/10, zero jargon
- "Pub in Hackney" test: could I explain this to a friend without them rolling their eyes?
- No guru clichés, no startup waffle
- Use "we" and "you" to create shared journey

### a) Homepage StickyNotes

**Current (fabricated):**
- Hero: `"Run your retreat better."` / attribution: "The Retreat Founder"
- Newsletter section: `"Finally something that treats me like a business owner, not a yoga class."` / attribution: "Retreat founder"

**Replace with (editorial voice — no false attribution):**
- Hero: `"You can't just post once and hope people show up."` / no attribution (or "From the community")
- Newsletter section: `"The only newsletter that treats retreat founders like the business owners they are."` / attribution: "The Retreat Founder" (editorial, not testimonial)

Also: update the homepage CATEGORIES array to show `live: true` for all 5 categories and update the `href` for each to correct paths. Remove the "Live/Soon" badge display logic since all categories will be live.

### b) About page — full rewrite

Remove the fabricated "Run your retreat better." sticky note. Rewrite body copy with:
1. Solomon's actual story: filmmaker, community organiser, saw retreat founders being treated like hobbyists
2. The north star made explicit: "The gold rush is the retreat. The prospector is the retreat maker."
3. Correct affiliate position: "Some links in the directory are affiliate links — we earn a small commission if you sign up. It never affects our verdict. We'd tell you if a tool was rubbish."
4. The "built in public" angle given actual meaning: what does "in public" mean? Updates, process, real numbers.

**Correct StickyNote for About page:**
```
"Nobody was treating retreat founders like the business owners they are. So we built the thing that should exist."
```
Attribution: "The Retreat Founder" (editorial, not testimonial)

### c) Newsletter page — fix both StickyNotes

The newsletter page (`app/newsletter/page.tsx` lines 86–97) has two StickyNotes:
- **First** (lines 86–92): `"The only newsletter I read that doesn't make me feel like a SaaS founder."` attributed to `"Reader"` — **this is a fabricated testimonial. Remove attribution entirely OR rewrite as editorial voice.**
- **Second** (lines 93–97): `"No founder content. No funnel talk. No emoji."` — **this is a word-for-word copy of the body text above it. Replace with something that does different work.**

**Replace both:**

```tsx
<StickyNote
  quote="New tools, honest verdicts, and one thing that actually worked for a retreat founder this week."
  attribution="The Retreat Founder"
  rotate={-1.8}
  maxWidth={300}
/>
<StickyNote
  quote="Most retreat tools newsletters either sell you something or tell you nothing. This one tries to tell you something useful every single week."
  attribution="The Retreat Founder"
  rotate={1.5}
  maxWidth={280}
/>
```

- [ ] **Step 1: Update homepage StickyNotes and CATEGORIES**

In `app/page.tsx`:

**Replace the CATEGORIES constant (remove `live` field entirely — all categories are live now):**

```tsx
const CATEGORIES = [
  { label: 'Marketing tools',  href: '/directory/marketing-tools/' },
  { label: 'Insurance',        href: '/directory/insurance/' },
  { label: 'Booking software', href: '/directory/booking-software/' },
  { label: 'Legal templates',  href: '/directory/legal-templates/' },
  { label: 'Photography',      href: '/directory/photography/' },
]
```

**Update the category list item JSX** — remove the `live ? ... : ...` colour conditionals and the "Live/Soon" badge span entirely. All items should render with the same cream colour and no status badge:

```tsx
{CATEGORIES.map(({ label, href }) => (
  <li key={href} style={{ borderTop: '1px solid rgba(241, 231, 209, 0.15)', padding: '14px 0' }}>
    <Link href={href} className="font-body no-underline" style={{ fontSize: 17, fontWeight: 500, color: 'var(--color-cream)' }}>
      {label}
    </Link>
  </li>
))}
```

**Replace hero StickyNote** (currently `"Run your retreat better."` / "The Retreat Founder"):
```tsx
<StickyNote
  quote="You can't just post once and hope people show up."
  attribution="From the community"
  rotate={2.5}
  maxWidth={210}
/>
```

**Replace newsletter section StickyNote** (currently fake quote attributed to "Retreat founder"):
```tsx
<StickyNote
  quote="The only resource that treats retreat founders like the business owners they are."
  attribution="The Retreat Founder"
  rotate={2.4}
  maxWidth={280}
/>
```

- [ ] **Step 2: Rewrite About page**

Replace the body paragraphs and StickyNote in `app/about/page.tsx`.

- [ ] **Step 3: Fix Newsletter page**

In `app/newsletter/page.tsx`, replace the second StickyNote with non-duplicate editorial copy.

- [ ] **Step 4: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

Expected: all tests pass (copy changes don't break tests unless test matches exact strings)

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/about/page.tsx app/newsletter/page.tsx
git commit -m "copy: rewrite homepage/about/newsletter with ICP language, remove fake testimonials"
```

---

## Task 13: Fix ToolCard "Unrated" fallback

**Files:**
- Modify: `components/ToolCard.tsx`

Currently: `{tool.turfVerdict ?? 'Unrated'}` — shows "Unrated" publicly.

Two things needed:
1. Default should be `'Neutral'` not `'Unrated'` — if we've listed it, we have a position
2. Only show the verdict badge if `turfVerdict` is not null — don't advertise data gaps

- [ ] **Step 1: Add failing test**

```ts
// In __tests__/components/ToolCard.test.tsx
test('does not show Unrated for tools with no verdict', () => {
  const noVerdictTool: Tool = { ...mockTool, turfVerdict: null, recommended: false }
  render(<ToolCard tool={noVerdictTool} />)
  expect(screen.queryByText('Unrated')).not.toBeInTheDocument()
})
```

- [ ] **Step 2: Run to confirm FAIL**

```bash
cd ~/retreatfounder-com && npm test -- --testPathPatterns=ToolCard --no-coverage
```

- [ ] **Step 3: Fix ToolCard**

Change the verdict badge section to only render if `tool.turfVerdict` is not null:

```tsx
{tool.turfVerdict && (
  <span ... >
    {tool.turfVerdict}
  </span>
)}
```

- [ ] **Step 4: Run all tests + commit**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
git add components/ToolCard.tsx __tests__/components/ToolCard.test.tsx
git commit -m "fix: hide verdict badge when turfVerdict is null (removes Unrated)"
```

---

## Task 14: Update sitemap to include all category pages

**Files:**
- Modify: `app/sitemap.ts`

The current `toolRoutes` hardcodes `/directory/marketing-tools/${tool.slug}` for ALL tools regardless of pillar. Once other categories are seeded, insurance/booking tools will have wrong sitemap URLs. Fix by using `pillarToHubSlug`.

- [ ] **Step 1: Rewrite sitemap.ts**

```ts
// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { fetchTools } from '@/lib/airtable'
import { pillarToHubSlug } from '@/lib/pillar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://retreatfounder.com'
  const tools = await fetchTools()

  const staticRoutes = [
    '',
    '/about',
    '/newsletter',
    '/directory',
    '/directory/marketing-tools',
    '/directory/insurance',
    '/directory/booking-software',
    '/directory/legal-templates',
    '/directory/photography',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const toolRoutes = tools.map((tool) => ({
    url: `${base}/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...toolRoutes]
}
```

- [ ] **Step 2: Run tests + commit**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
git add app/sitemap.ts
git commit -m "feat: sitemap covers /directory/ landing + all 5 hubs + per-pillar tool URLs"
```

---

## Airtable Data Seed (separate session — not code)

Before Task 6–9 show real content, Airtable needs entries in the 4 new categories. Use the Airtable MCP (`mcp__b6065f76...`) in a dedicated session to create records.

**Minimum viable per category (12+ entries each):**

### Insurance (Pillar = "Insurance")
Research-confirmed providers for retreat operators:
1. Markel — specialist event/retreat liability (UK)
2. Hiscox — small business + event cover (UK/US)
3. Towergate — event insurance, adventure activities rider
4. Next Insurance — US-based, retreat/wellness businesses
5. Thimble — short-term event liability (US)
6. EventHelper — US-based, online instant quote
7. K&K Insurance — US specialist, yoga/wellness events
8. Insure My Equipment — photographers / gear-adjacent
9. Stuart Lunn Insurance — UK retreat specialist
10. Protecht — Australia/NZ event insurance
11. AXA Business Insurance — mainstream UK, retreat-compatible
12. Simply Business — UK SME comparison aggregator

### Booking Software (Pillar = "Booking Software")
1. WeTravel — built for multi-day/retreat bookings, deposit splits
2. Retreat Guru — dedicated retreat marketplace + bookings
3. FareHarbor — tours/activities, retreat-compatible
4. BookRetreats — marketplace listing + booking
5. Checkfront — activity bookings, group deposits
6. Acuity Scheduling — simple scheduling, 1:1 + group
7. Cal.com — open-source, free, customisable
8. TripWorks — activity tour bookings
9. Xola — online booking for experiences
10. Rezdy — tour/experience booking (popular AU/NZ)
11. Regiondo — European experience bookings
12. SimplyBook.me — versatile, retreat-compatible

### Legal Templates (Pillar = "Legal Templates")
1. Legal Templates (legaltemplates.net) — US, event waiver/contract
2. Rocket Lawyer — subscription, template library
3. LegalZoom — US small business contracts
4. Docracy — free open-source legal templates
5. Law Depot — downloadable retreat/event templates
6. And Co (HoneyBook) — contracts for service businesses
7. Hello Bonsai — contract + invoice for solo operators
8. Dubsado — CRM + contract management
9. PandaDoc — e-sign, template library
10. Jotform — e-sign + intake forms
11. Termly — privacy policy / cancellation policy generator
12. Claustack — AI contract drafting (emerging)

### Photography (Pillar = "Photography")

**Category decision:** This is "hire a retreat photographer" (people/services) PLUS "tools to find and work with photographers." Not general SaaS. The editorial position ("photographers who shoot retreats as they actually are") sets this expectation.

Note: Step 8 Insight D — every photographer added is a potential interview subject. DM each: "Have you ever thought about hosting your own photo retreat?"

1. Find Me A Photographer — UK directory, can filter by event type
2. Snappr — on-demand photographer booking platform (UK/US/AU)
3. Thumbtack — US photographer search, retreat/event filters
4. Bark.com — UK freelancer directory, photographers listed
5. PhotoSesh — hourly photographer booking (US)
6. The Knot Pro (photographer directory) — wedding/event photographers who also do retreats
7. Unsplash — free stock (clearly labelled "for brand/editorial use, not as primary retreat photos")
8. Pixieset — how retreat photographers deliver galleries to you post-shoot
9. ShootProof — gallery delivery platform photographers use
10. Pic-Time — automated gallery delivery and ordering
11. VSCO — editing app many retreat photographers use (relevant for operators doing own iPhone photography)
12. Lightroom Mobile — free tier, industry standard for editing retreat photos yourself

**Note for Airtable entry:** Use `Category` sub-field to distinguish: "Hire a photographer" (1–6), "Stock & editorial" (7), "Gallery delivery" (8–10), "DIY editing" (11–12).

**Each Airtable record needs:** Name, Slug, Description (peer voice verdict), Pillar, Category (sub-category), Tags, Price Range, Website, TRF Verdict (Recommended/Neutral), Status=Live

---

## Task 15a: Add pillar guard to `fetchTool` (cross-category data bleed fix)

**Files:**
- Modify: `lib/airtable.ts`

Without this fix, `/directory/insurance/convertkit` would load the ConvertKit record and render it under the "Retreat insurance" hub label. Each `[slug]/page.tsx` only generates static params for its own pillar, but `fetchTool` fetches by slug alone — a direct URL hit would return the wrong tool.

Fix: add an optional `pillar` param to `fetchTool`. Each `[slug]/page.tsx` passes its pillar; if the returned tool's pillar doesn't match, return null (triggers 404).

- [ ] **Step 1: Update `fetchTool` in `lib/airtable.ts`**

```ts
export async function fetchTool(slug: string, pillar?: string): Promise<Tool | null> {
  const data = await airtableFetch(
    'Resources',
    `?filterByFormula=({Slug}="${slug}")`
  )
  if (!data.records.length) return null
  const tool = recordToTool(data.records[0])
  if (pillar && tool.pillar !== pillar) return null
  return tool
}
```

- [ ] **Step 2: Update all `[slug]/page.tsx` files to pass pillar**

In each category's `[slug]/page.tsx`, update the fetchTool call:
- marketing-tools: `fetchTool(slug, 'Marketing Tools')`
- insurance: `fetchTool(slug, 'Insurance')`
- booking-software: `fetchTool(slug, 'Booking Software')`
- legal-templates: `fetchTool(slug, 'Legal Templates')`
- photography: `fetchTool(slug, 'Photography')`

Update `generateMetadata` calls in the same way.

- [ ] **Step 3: Add failing test**

```ts
// In __tests__/lib/airtable.test.ts — add:
test('fetchTool returns null if pillar does not match', async () => {
  // This test verifies the pillar guard — mock the fetch to return a Marketing Tools tool
  // then request it with pillar='Insurance' — should get null
  // (Implementation detail: use the existing mock pattern from the file)
})
```

Note: check the existing `__tests__/lib/airtable.test.ts` for the mock pattern before writing this test.

- [ ] **Step 4: Run all tests**

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage
```

- [ ] **Step 5: Commit**

```bash
git add lib/airtable.ts app/directory/marketing-tools/\[slug\]/page.tsx app/directory/insurance/\[slug\]/page.tsx app/directory/booking-software/\[slug\]/page.tsx app/directory/legal-templates/\[slug\]/page.tsx app/directory/photography/\[slug\]/page.tsx
git commit -m "fix: fetchTool pillar guard prevents cross-category data bleed"
```

---

## Final QA Checklist (Task 16 — before declaring done)

**Skill: `@superpowers:verification-before-completion`**

- [ ] All 5 hub pages load at localhost:3000 with real tool listings
- [ ] `/directory/` landing shows all 5 categories, all links work
- [ ] ToolCard hrefs correct for each category (no /marketing-tools/ for insurance tools)
- [ ] No "Unrated" badges visible on any card
- [ ] No "Coming Soon" kicker labels visible anywhere
- [ ] No fabricated testimonial attributions ("Retreat founder", "Reader")
- [ ] Affiliate disclosure visible on all tool detail pages with affiliate links
- [ ] About page no longer says "no affiliate nonsense"
- [ ] **Cross-category data bleed:** navigate to `/directory/insurance/convertkit` — must return 404
- [ ] All tests pass: `npm test -- --no-coverage`
- [ ] Build passes: `npm run build`
- [ ] Sitemap URL for a non-marketing tool uses correct pillar path (not /marketing-tools/)

```bash
cd ~/retreatfounder-com && npm test -- --no-coverage && npm run build
```

---

## Skill Reference Summary

| Task | Primary Skill | Secondary Skill |
|---|---|---|
| 1–2 (pillar utility, ToolCard fix) | `@superpowers:test-driven-development` | — |
| 3–4 (CategoryHub, ToolDetail) | `@frontend-design` + `@superpowers:test-driven-development` | `@page-cro`, `@form-cro` |
| 5–9 (hub pages) | `@frontend-design` | `@copywriting` |
| 10 (directory landing) | `@frontend-design` | `@page-cro` |
| 11 (Nav) | — | — |
| 12 (copy overhaul) | `@copywriting` | — |
| 13 (Unrated fix) | `@superpowers:test-driven-development` | — |
| 14 (sitemap) | `@schema-markup` | — |
| 15a (pillar guard) | `@superpowers:test-driven-development` | — |
| 16 (final QA) | `@superpowers:verification-before-completion` | — |
