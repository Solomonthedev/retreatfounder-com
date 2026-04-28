'use client'
import { useState, useMemo } from 'react'
import type { Tool } from '@/lib/types'
import { ToolCard } from '@/components/ToolCard'

interface Props {
  tools: Tool[]
}

const PRICE_TIERS = ['Free', 'Freemium', 'Paid'] as const
type PriceTier = typeof PRICE_TIERS[number]

function getPriceTier(priceRange: string | null): PriceTier {
  if (!priceRange) return 'Paid'
  const p = priceRange.toLowerCase()
  if (p === 'free') return 'Free'
  if (p.includes('free')) return 'Freemium'
  return 'Paid'
}

const USE_CASES = [
  'Fill My Retreat',
  'Launch Retreats Faster',
  'Run Day-to-Day',
  'Get Protected',
  'Get Your Retreat Discovered',
] as const

export function DirectoryLibrary({ tools }: Props) {
  const [search, setSearch] = useState('')
  const [activeCategories, setActiveCategories] = useState<string[]>([])
  const [activePrices, setActivePrices] = useState<PriceTier[]>([])
  const [activeUseCases, setActiveUseCases] = useState<string[]>([])

  const pillars = useMemo(() => {
    const seen = new Set<string>()
    tools.forEach((t) => seen.add(t.pillar))
    return Array.from(seen).sort()
  }, [tools])

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return tools.filter((t) => {
      if (activeCategories.length > 0 && !activeCategories.includes(t.pillar)) return false
      if (activePrices.length > 0 && !activePrices.includes(getPriceTier(t.priceRange))) return false
      if (activeUseCases.length > 0 && !activeUseCases.some((uc) => t.useCases.includes(uc))) return false
      if (q) {
        const haystack = `${t.name} ${t.tagline ?? ''} ${t.description} ${t.tags.join(' ')}`.toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [tools, activeCategories, activePrices, activeUseCases, search])

  function toggleCategory(pillar: string) {
    setActiveCategories((prev) =>
      prev.includes(pillar) ? prev.filter((c) => c !== pillar) : [...prev, pillar]
    )
  }

  function togglePrice(tier: PriceTier) {
    setActivePrices((prev) =>
      prev.includes(tier) ? prev.filter((p) => p !== tier) : [...prev, tier]
    )
  }

  function toggleUseCase(uc: string) {
    setActiveUseCases((prev) =>
      prev.includes(uc) ? prev.filter((u) => u !== uc) : [...prev, uc]
    )
  }

  function clearAll() {
    setSearch('')
    setActiveCategories([])
    setActivePrices([])
    setActiveUseCases([])
  }

  const hasFilters = activeCategories.length > 0 || activePrices.length > 0 || activeUseCases.length > 0 || search.trim().length > 0

  return (
    <div style={{ display: 'flex', gap: 0, minHeight: '80vh', alignItems: 'flex-start' }}>

      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          flexShrink: 0,
          position: 'sticky',
          top: 80,
          padding: '40px 24px 40px 0',
          alignSelf: 'flex-start',
        }}
      >
        {/* Search */}
        <div style={{ marginBottom: 32 }}>
          <label
            className="font-body font-semibold"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-40)', display: 'block', marginBottom: 8 }}
          >
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to filter…"
            style={{
              width: '100%',
              padding: '9px 12px',
              fontSize: 13,
              fontFamily: 'inherit',
              background: '#fff',
              border: '1px solid var(--color-cream-300)',
              borderRadius: 8,
              color: 'var(--color-ink)',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Category filter */}
        <div style={{ marginBottom: 28 }}>
          <p
            className="font-body font-semibold"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-40)', margin: '0 0 10px' }}
          >
            Category
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {pillars.map((pillar) => {
              const active = activeCategories.includes(pillar)
              return (
                <button
                  key={pillar}
                  onClick={() => toggleCategory(pillar)}
                  className="font-body"
                  style={{
                    textAlign: 'left',
                    padding: '7px 10px',
                    fontSize: 13,
                    borderRadius: 7,
                    border: '1px solid',
                    borderColor: active ? 'var(--color-field-green)' : 'transparent',
                    background: active ? 'rgba(45,59,42,0.07)' : 'transparent',
                    color: active ? 'var(--color-field-green)' : 'var(--color-ink-60)',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {pillar}
                </button>
              )
            })}
          </div>
        </div>

        {/* Price filter */}
        <div style={{ marginBottom: 28 }}>
          <p
            className="font-body font-semibold"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-40)', margin: '0 0 10px' }}
          >
            Price
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {PRICE_TIERS.map((tier) => {
              const active = activePrices.includes(tier)
              return (
                <button
                  key={tier}
                  onClick={() => togglePrice(tier)}
                  className="font-body"
                  style={{
                    textAlign: 'left',
                    padding: '7px 10px',
                    fontSize: 13,
                    borderRadius: 7,
                    border: '1px solid',
                    borderColor: active ? 'var(--color-field-green)' : 'transparent',
                    background: active ? 'rgba(45,59,42,0.07)' : 'transparent',
                    color: active ? 'var(--color-field-green)' : 'var(--color-ink-60)',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {tier}
                </button>
              )
            })}
          </div>
        </div>

        {/* Use Case filter */}
        <div style={{ marginBottom: 28 }}>
          <p
            className="font-body font-semibold"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-40)', margin: '0 0 10px' }}
          >
            I want to…
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {USE_CASES.map((uc) => {
              const active = activeUseCases.includes(uc)
              return (
                <button
                  key={uc}
                  onClick={() => toggleUseCase(uc)}
                  className="font-body"
                  style={{
                    textAlign: 'left',
                    padding: '7px 10px',
                    fontSize: 13,
                    borderRadius: 7,
                    border: '1px solid',
                    borderColor: active ? 'var(--color-field-green)' : 'transparent',
                    background: active ? 'rgba(45,59,42,0.07)' : 'transparent',
                    color: active ? 'var(--color-field-green)' : 'var(--color-ink-60)',
                    cursor: 'pointer',
                    transition: 'all 150ms',
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {uc}
                </button>
              )
            })}
          </div>
        </div>

        {/* Clear filters */}
        {hasFilters && (
          <button
            onClick={clearAll}
            className="font-body"
            style={{
              fontSize: 11,
              color: 'var(--color-ink-40)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 0',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Clear all filters
          </button>
        )}
      </aside>

      {/* Divider */}
      <div style={{ width: 1, background: 'var(--color-cream-300)', alignSelf: 'stretch', flexShrink: 0, marginRight: 40 }} />

      {/* Grid */}
      <main style={{ flex: 1, padding: '40px 0 96px' }}>
        {/* Result count */}
        <p
          className="font-body"
          style={{ fontSize: 12, color: 'var(--color-ink-40)', margin: '0 0 24px' }}
        >
          {filtered.length === tools.length
            ? `${tools.length} tools`
            : `${filtered.length} of ${tools.length} tools`}
        </p>

        {filtered.length === 0 ? (
          <div style={{ paddingTop: 48 }}>
            <p className="font-body" style={{ fontSize: 16, color: 'var(--color-ink-60)' }}>
              No tools match those filters.{' '}
              <button
                onClick={clearAll}
                className="font-body"
                style={{ color: 'var(--color-field-green)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, fontSize: 16 }}
              >
                Clear filters
              </button>
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            {filtered.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
