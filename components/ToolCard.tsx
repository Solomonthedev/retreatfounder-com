'use client'
import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { pillarToHubSlug } from '@/lib/pillar'

interface Props { tool: Tool }

export function ToolCard({ tool }: Props) {
  const href = `/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`
  const filteredTags = tool.tags.filter(
    (t) => t.toLowerCase() !== tool.category.toLowerCase()
  )

  return (
    <Link
      href={href}
      className="no-underline flex flex-col"
      style={{
        background: 'var(--color-cream)',
        borderRadius: 8,
        padding: '22px 24px 20px',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 200ms var(--ease-out), background 200ms var(--ease-out)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'var(--shadow-lift)'
        el.style.background = '#fff'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'var(--shadow-card)'
        el.style.background = 'var(--color-cream)'
      }}
    >
      {/* Category */}
      <p
        className="font-body font-semibold"
        style={{
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-40)',
          margin: '0 0 10px',
        }}
      >
        {tool.category}
      </p>

      {/* Name row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 4 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            className="font-display text-ink uppercase"
            style={{ fontSize: 21, letterSpacing: '0.01em', lineHeight: 1.1, margin: 0 }}
          >
            {tool.name}
          </h3>
        </div>
        {tool.logoUrl && (
          <img
            src={tool.logoUrl}
            alt={`${tool.name} logo`}
            className="object-contain flex-shrink-0"
            style={{ width: 34, height: 34, borderRadius: 6, marginTop: 2 }}
          />
        )}
      </div>

      {/* Price */}
      {tool.priceRange && (
        <p
          className="font-body"
          style={{ fontSize: 12, color: 'var(--color-ink-40)', margin: '0 0 14px' }}
        >
          {tool.priceRange}
        </p>
      )}

      {/* Separator */}
      <hr style={{ border: 0, height: 1, background: 'var(--color-ink)', opacity: 0.08, margin: '0 0 14px' }} />

      {/* Tagline */}
      {tool.tagline && (
        <p
          className="font-body"
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.45,
            color: 'var(--color-ink-80)',
            margin: '0 0 8px',
          }}
        >
          {tool.tagline}
        </p>
      )}

      {/* Description — truncated to 2 lines */}
      <p
        className="font-body"
        style={{
          fontSize: 13,
          lineHeight: 1.6,
          color: 'var(--color-ink-60)',
          margin: '0 0 16px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {tool.description}
      </p>

      {/* Bottom row: tags + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {filteredTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="font-body"
              style={{
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                background: 'transparent',
                color: 'var(--color-ink-40)',
                border: '1px solid var(--color-cream-300)',
                padding: '3px 8px',
                borderRadius: 999,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="font-body font-semibold"
          style={{
            fontSize: 12,
            color: 'var(--color-field-green)',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Read our take →
        </span>
      </div>
    </Link>
  )
}
