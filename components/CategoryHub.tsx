'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { ToolCard } from '@/components/ToolCard'
import { ToolRow } from '@/components/ToolRow'
import { ViewToggle } from '@/components/ViewToggle'
import { DirectorySidebar } from '@/components/DirectorySidebar'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import { PillarGlyph } from '@/components/PillarGlyph'
import { Glyph } from '@/components/Glyphs'

const PILLARS = [
  { label: 'Marketing Tools',         href: '/directory/marketing-tools/' },
  { label: 'Insurance',               href: '/directory/insurance/' },
  { label: 'Booking Software',        href: '/directory/booking-software/' },
  { label: 'Legal Templates',         href: '/directory/legal-templates/' },
  { label: 'Photography',             href: '/directory/photography/' },
  { label: 'Venues & Spaces',         href: '/directory/venues-spaces/' },
  { label: 'Logistics & Transport',   href: '/directory/logistics-transport/' },
  { label: 'People & Practitioners',  href: '/directory/people-practitioners/' },
  { label: 'Knowledge & Training',    href: '/directory/knowledge-training/' },
  { label: 'Equipment & Materials',   href: '/directory/equipment-materials/' },
  { label: 'Curriculum & Content',    href: '/directory/curriculum-content/' },
  { label: 'Community & Partnerships', href: '/directory/community-partnerships/' },
]

interface CategoryHubProps {
  pillarName: string
  headline: string
  headlineAccent: string
  bodyText: string
  tools: Tool[]
  formId: string | null
}

const VIEW_KEY = 'trf-directory-view'

export function CategoryHub({
  pillarName,
  headline,
  headlineAccent,
  bodyText,
  tools,
  formId,
}: CategoryHubProps) {
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [activeFilter, setActiveFilter] = useState<string>('All')

  useEffect(() => {
    const stored = localStorage.getItem(VIEW_KEY)
    if (stored === 'grid' || stored === 'list') setView(stored)
  }, [])

  function handleToggle(v: 'grid' | 'list') {
    setView(v)
    localStorage.setItem(VIEW_KEY, v)
  }

  const categories = ['All', ...Array.from(new Set(tools.map((t) => t.category).filter(Boolean)))]
  const featured = tools.filter((t) => t.featured)
  const rest = tools.filter((t) => !t.featured)
  const filteredRest = activeFilter === 'All' ? rest : rest.filter((t) => t.category === activeFilter)
  const categoryCounts = categories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === 'All' ? rest.length : rest.filter((t) => t.category === cat).length
    return acc
  }, {})

  return (
    <>
      {/* ── Hub header ─────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--color-ink)', padding: '48px 36px 56px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 56, alignItems: 'start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--color-red)' }}>●</span>
              The Retreat Founder · {pillarName} · {tools.length} tools curated
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4vw, 56px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 24px', fontWeight: 300 }}>
              {headline}<br />
              <em style={{ color: 'var(--color-red)', fontStyle: 'italic' }}>{headlineAccent}</em>
            </h1>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 18, lineHeight: 1.55, color: 'var(--color-ink-2)', maxWidth: 480, fontWeight: 300 }}>
              {bodyText}
            </p>
          </div>

          {/* Newsletter card */}
          <div style={{ border: '1px solid var(--color-rule)', background: 'var(--color-paper-deep)', padding: '20px', position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }} className="signup-stripe">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-3)', display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px dashed var(--color-rule)' }}>
              <span>The Newsletter <span style={{ color: 'var(--color-red)' }}>/ Weekly</span></span>
            </div>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--color-ink)', margin: 0, fontWeight: 400 }}>
              Sent every Wednesday at 7am.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.55, color: 'var(--color-ink-2)', margin: 0 }}>
              One thing to act on. Three resources worth trusting. Written for the founder building this alone.
            </p>
            <EmailCaptureForm formId={formId} label="Subscribe →" placeholder="your@email.com" />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--color-ink-3)', margin: 0 }}>
              For retreat founders who want sold out retreats — without feeling sales-y.
            </p>
          </div>
        </div>
      </section>

      {/* ── Pillar switcher strip ───────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--color-rule)', background: 'var(--color-paper)', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 36px', display: 'flex', alignItems: 'stretch', overflowX: 'auto' }}>
          {PILLARS.map(({ label, href }) => {
            const isActive = label === pillarName
            return (
              <Link key={href} href={href} className="no-underline" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: isActive ? 500 : 400, color: isActive ? 'var(--color-ink)' : 'var(--color-ink-3)', padding: '13px 20px', borderBottom: isActive ? '2px solid var(--color-ink)' : '2px solid transparent', whiteSpace: 'nowrap', transition: 'color 0.12s, border-color 0.12s', display: 'block' }}>
                {label}
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Featured picks ─────────────────────────────── */}
      {featured.length > 0 && (
        <section style={{ padding: '40px 36px 0', borderBottom: '1px solid var(--color-rule)' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 24 }}>
              Editor&rsquo;s picks
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, paddingBottom: 56 }}>
              {featured.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Main: 2-col ─────────────────────────────────── */}
      <section style={{ padding: '32px 36px 72px' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'start' }}>

          {/* Directory header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 24, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: 4 }}>
                  <Glyph name="Pen" size={28} color="var(--color-red)" strokeWidth={1.1} />
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, letterSpacing: '-0.02em', margin: 0 }}>
                  The <em style={{ fontStyle: 'italic' }}>Directory</em>
                </h2>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-ink-3)', letterSpacing: '0.1em' }}>
                  {filteredRest.length} of {rest.length}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 15, color: 'var(--color-ink-2)', maxWidth: 320, textAlign: 'right', margin: 0, lineHeight: 1.5 }}>
                Vetted resources for retreat founders.
              </p>
            </div>

            {/* Filter bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '14px 0', borderTop: '1px solid var(--color-rule)', borderBottom: '1px solid var(--color-rule)', margin: '24px 0 0', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginRight: 8 }}>Filter</span>
                {categories.map((cat) => {
                  const isActive = activeFilter === cat
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, letterSpacing: '0.02em', padding: '6px 12px', border: `1px solid ${isActive ? 'var(--color-ink)' : 'var(--color-rule)'}`, background: isActive ? 'var(--color-ink)' : 'transparent', color: isActive ? 'var(--color-paper)' : 'var(--color-ink-2)', borderRadius: 999, cursor: 'pointer', transition: 'all 120ms', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      {cat}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.6 }}>{categoryCounts[cat]}</span>
                    </button>
                  )
                })}
                {activeFilter !== 'All' && (
                  <button onClick={() => setActiveFilter('All')} style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 500, padding: '6px 12px', border: '1px dashed var(--color-red)', background: 'transparent', color: 'var(--color-red)', borderRadius: 999, cursor: 'pointer' }}>
                    Clear ✕
                  </button>
                )}
              </div>

              {/* View toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>View</span>
                <ViewToggle view={view} onToggle={handleToggle} />
              </div>
            </div>

            {/* Spacer */}
            <div style={{ marginBottom: 0, borderBottom: '2px solid var(--color-ink)' }} />

            {/* Tool list */}
            <div style={{ marginTop: 0 }}>
              {tools.length === 0 && (
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-ink-3)', padding: '60px 0', textAlign: 'center', fontSize: 15 }}>
                  Nothing here yet — check Airtable connection.
                </p>
              )}
              {filteredRest.length === 0 && tools.length > 0 && (
                <div style={{ padding: '60px 0', textAlign: 'center', borderBottom: '1px solid var(--color-rule)' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-ink-2)', margin: 0, fontSize: 15 }}>
                    Nothing here yet. Try a different filter.
                  </p>
                </div>
              )}
              {filteredRest.length > 0 && (
                view === 'grid' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, paddingTop: 20 }}>
                    {filteredRest.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
                  </div>
                ) : (
                  <div>
                    {filteredRest.map((tool, i) => <ToolRow key={tool.id} tool={tool} index={i} />)}
                  </div>
                )
              )}
            </div>
          </div>

          {/* Right — sticky sidebar */}
          <div style={{ position: 'sticky', top: 24 }}>
            <DirectorySidebar tools={tools} />
          </div>
        </div>
      </section>
    </>
  )
}
