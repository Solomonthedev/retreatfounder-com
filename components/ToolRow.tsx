'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { pillarToHubSlug } from '@/lib/pillar'
import { PillarGlyph } from '@/components/PillarGlyph'

interface Props {
  tool: Tool
  index: number
}

export function ToolRow({ tool, index }: Props) {
  const [expanded, setExpanded] = useState(false)
  const href = `/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`
  const num = String(index + 1).padStart(3, '0')

  return (
    <>
      {/* Row */}
      <div
        onClick={() => setExpanded((x) => !x)}
        style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr 180px 100px 24px',
          gap: 20,
          alignItems: 'center',
          padding: '18px 0 16px',
          borderBottom: '1px solid var(--color-rule)',
          cursor: 'pointer',
          background: expanded ? 'var(--color-paper-deep)' : 'transparent',
          transition: 'background 140ms',
        }}
        onMouseEnter={(e) => { if (!expanded) (e.currentTarget as HTMLDivElement).style.background = 'var(--color-paper-deep)' }}
        onMouseLeave={(e) => { if (!expanded) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
      >
        {/* Index */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
          <span style={{ color: expanded ? 'var(--color-red)' : 'var(--color-ink-2)', transition: 'color 160ms' }}>
            <PillarGlyph pillar={tool.pillar} size={22} strokeColor="currentColor" />
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--color-ink-4)', letterSpacing: '0.06em' }}>{num}</span>
        </div>

        {/* Name + blurb + tags */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 400, color: expanded ? 'var(--color-red)' : 'var(--color-ink)', letterSpacing: '-0.01em', lineHeight: 1.15, transition: 'color 160ms' }}>
            {tool.name}
          </span>
          {tool.tagline && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-2)', lineHeight: 1.45 }}>
              {tool.tagline}
            </span>
          )}
          {tool.tags && tool.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 2 }}>
              {tool.tags.slice(0, 3).map((tag) => (
                <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink-3)', padding: '3px 7px', border: '1px solid var(--color-rule)', borderRadius: 2, background: 'var(--color-paper)' }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Category */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {tool.category && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink-3)', padding: '3px 7px', border: '1px solid var(--color-rule)', borderRadius: 2 }}>
              {tool.category}
            </span>
          )}
        </div>

        {/* Price */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-ink-3)', letterSpacing: '0.04em', textAlign: 'right' }}>
          {tool.priceRange && <span style={{ color: 'var(--color-ink)' }}>{tool.priceRange}</span>}
        </div>

        {/* Expand arrow */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: expanded ? 'var(--color-red)' : 'var(--color-ink-3)', transform: expanded ? 'rotate(45deg)' : 'none', transition: 'transform 160ms, color 160ms', textAlign: 'right' }}>
          +
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          className="row-detail-enter"
          style={{
            display: 'grid',
            gridTemplateColumns: '48px 1fr 280px',
            gap: 20,
            padding: '4px 0 22px',
            borderBottom: '1px solid var(--color-rule)',
            background: 'var(--color-paper-deep)',
          }}
        >
          <div style={{ borderLeft: '2px solid var(--color-red)', marginLeft: 22 }} />

          <div>
            {tool.description && (
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, lineHeight: 1.6, color: 'var(--color-ink-2)', margin: '0 0 10px', maxWidth: 540 }}>
                {tool.description}
              </p>
            )}
            <Link
              href={href}
              onClick={(e) => e.stopPropagation()}
              className="no-underline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-red)', borderBottom: '1px solid var(--color-red)', paddingBottom: 3, marginTop: 14, width: 'fit-content' }}
            >
              View full listing →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px', fontSize: 12 }}>
            {tool.category && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 2 }}>Category</div>
                <div style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>{tool.category}</div>
              </div>
            )}
            {tool.priceRange && (
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 2 }}>Price</div>
                <div style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>{tool.priceRange}</div>
              </div>
            )}
            {tool.turfVerdict && (
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 2 }}>Verdict</div>
                <div style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-body)' }}>{tool.turfVerdict}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
