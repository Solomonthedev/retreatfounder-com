'use client'
import { useState, useMemo, useRef, useCallback, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import type { Tool } from '@/lib/types'
import { ToolCard } from '@/components/ToolCard'

export interface GridInsert {
  afterIndex: number // insert this node after the nth tool card (0-based)
  node: ReactNode
}

interface Props {
  tools: Tool[]
  inserts?: GridInsert[]
}

// Canonical pillar order — business priority, not alphabetical
const PILLARS = [
  'Insurance',
  'Booking Software',
  'Marketing Tools',
  'Legal Templates',
  'Photography',
  'Venues & Spaces',
  'Logistics & Transport',
  'People & Practitioners',
  'Knowledge & Training',
  'Equipment & Materials',
  'Curriculum & Content',
  'Community & Partnerships',
] as const

const PRICE_TIERS = ['Free', 'Freemium', 'Paid'] as const
type PriceTier = typeof PRICE_TIERS[number]

const USE_CASES = [
  'Fill My Retreat',
  'Launch Retreats Faster',
  'Run Day-to-Day',
  'Get Protected',
  'Get Your Retreat Discovered',
] as const

function getPriceTier(priceRange: string | null): PriceTier {
  if (!priceRange) return 'Paid'
  const p = priceRange.toLowerCase().trim()
  if (p === 'free' || p === '$0' || p === '£0' || p === '€0') return 'Free'
  if (p.startsWith('free') || p.includes('freemium') || p.includes('free plan') || p.includes('free tier') || p.includes('/free')) return 'Freemium'
  if (p.includes('free')) return 'Freemium'
  return 'Paid'
}

function PillGroup<T extends string>({
  label,
  options,
  active,
  onToggle,
}: {
  label: string
  options: readonly T[]
  active: T[]
  onToggle: (v: T) => void
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <span
        className="font-body font-semibold"
        style={{
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-40)',
          whiteSpace: 'nowrap',
          minWidth: 72,
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map((opt) => {
          const isActive = active.includes(opt)
          return (
            <button
              key={opt}
              onClick={() => onToggle(opt)}
              aria-pressed={isActive}
              className="font-body"
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: isActive ? 600 : 400,
                borderRadius: 999,
                border: '1.5px solid',
                borderColor: isActive ? 'var(--color-field-green)' : 'var(--color-cream-300)',
                background: isActive ? 'var(--color-field-green)' : 'transparent',
                color: isActive ? '#fff' : 'var(--color-ink-60)',
                cursor: 'pointer',
                transition: 'all 140ms',
                lineHeight: 1,
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function DirectoryLibrary({ tools, inserts = [] }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(() => searchParams.get('q') ?? '')
  const [activeCategories, setActiveCategories] = useState<string[]>(() =>
    searchParams.getAll('cat').filter(Boolean)
  )
  const [activePrices, setActivePrices] = useState<PriceTier[]>(() =>
    (searchParams.getAll('price') as PriceTier[]).filter((p) => (PRICE_TIERS as readonly string[]).includes(p))
  )
  const [activeUseCases, setActiveUseCases] = useState<string[]>(() =>
    searchParams.getAll('use').filter(Boolean)
  )

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const setSearchDebounced = useCallback((val: string) => {
    setSearch(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const p = new URLSearchParams(window.location.search)
      val ? p.set('q', val) : p.delete('q')
      router.replace(`?${p.toString()}`, { scroll: false })
    }, 150)
  }, [router])

  useEffect(() => {
    const p = new URLSearchParams()
    activeCategories.forEach((c) => p.append('cat', c))
    activePrices.forEach((pr) => p.append('price', pr))
    activeUseCases.forEach((u) => p.append('use', u))
    if (search) p.set('q', search)
    router.replace(`?${p.toString()}`, { scroll: false })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategories, activePrices, activeUseCases])

  const pillars = PILLARS

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

  function toggle<T extends string>(setter: React.Dispatch<React.SetStateAction<T[]>>, val: T) {
    setter((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val])
  }

  function clearAll() {
    setSearch('')
    setActiveCategories([])
    setActivePrices([])
    setActiveUseCases([])
  }

  const hasFilters = activeCategories.length > 0 || activePrices.length > 0 || activeUseCases.length > 0 || search.trim().length > 0
  const activeCount = activeCategories.length + activePrices.length + activeUseCases.length

  const insertMap = useMemo(() => {
    const m = new Map<number, ReactNode>()
    if (!hasFilters) inserts.forEach((ins) => m.set(ins.afterIndex, ins.node))
    return m
  }, [inserts, hasFilters])

  return (
    <div style={{ padding: '40px 0 96px' }}>

      {/* Filter bar */}
      <div
        role="search"
        aria-label="Filter tools"
        style={{
          background: 'var(--color-cream)',
          border: '1px solid var(--color-cream-300)',
          borderRadius: 12,
          padding: '20px 24px',
          marginBottom: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            className="font-body font-semibold"
            style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-40)', minWidth: 72 }}
          >
            Search
          </span>
          <label htmlFor="tool-search" className="sr-only">Search tools</label>
          <input
            id="tool-search"
            type="text"
            value={search}
            onChange={(e) => setSearchDebounced(e.target.value)}
            placeholder="Search tools…"
            aria-label="Search tools"
            style={{
              flex: 1,
              maxWidth: 320,
              padding: '6px 12px',
              fontSize: 13,
              fontFamily: 'inherit',
              background: '#fff',
              border: '1.5px solid var(--color-cream-300)',
              borderRadius: 999,
              color: 'var(--color-ink)',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ height: 1, background: 'var(--color-cream-300)' }} />

        <PillGroup
          label="Category"
          options={pillars}
          active={activeCategories}
          onToggle={(v) => toggle(setActiveCategories, v)}
        />

        <PillGroup
          label="I want to…"
          options={USE_CASES}
          active={activeUseCases}
          onToggle={(v) => toggle(setActiveUseCases, v)}
        />

        <PillGroup
          label="Price"
          options={PRICE_TIERS}
          active={activePrices}
          onToggle={(v) => toggle(setActivePrices, v)}
        />

        {hasFilters && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="font-body" style={{ fontSize: 12, color: 'var(--color-ink-40)' }}>
              {filtered.length} of {tools.length} tools
              {activeCount > 0 && ` · ${activeCount} filter${activeCount > 1 ? 's' : ''} active`}
            </span>
            <button
              onClick={clearAll}
              className="font-body"
              style={{
                fontSize: 11,
                color: 'var(--color-ink-40)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                padding: 0,
              }}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Result count when no filters */}
      {!hasFilters && (
        <p className="font-body" style={{ fontSize: 12, color: 'var(--color-ink-40)', margin: '0 0 24px' }}>
          {tools.length} tools
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ paddingTop: 48 }}>
          <p className="font-body" style={{ fontSize: 16, color: 'var(--color-ink-60)' }}>
            No tools match those filters.{' '}
            <button
              onClick={clearAll}
              className="font-body"
              style={{ color: 'var(--color-field-green)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3, fontSize: 16, padding: 0 }}
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
          {filtered.reduce<ReactNode[]>((acc, tool, i) => {
            acc.push(<ToolCard key={tool.id} tool={tool} />)
            const insert = insertMap.get(i)
            if (insert) acc.push(<div key={`insert-${i}`}>{insert}</div>)
            return acc
          }, [])}
        </div>
      )}
    </div>
  )
}
