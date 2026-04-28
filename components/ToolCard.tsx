'use client'
import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { pillarToHubSlug } from '@/lib/pillar'

interface Props { tool: Tool }

const PILLAR_GRADIENTS: Record<string, string> = {
  'Marketing Tools':    'linear-gradient(135deg, #2D3B2A 0%, #4a5e45 100%)',
  'Insurance':          'linear-gradient(135deg, #1A2E3B 0%, #2a4a5e 100%)',
  'Booking Software':   'linear-gradient(135deg, #3B2A1A 0%, #5e4a2a 100%)',
  'Legal Templates':    'linear-gradient(135deg, #2A1A3B 0%, #4a2a5e 100%)',
  'Photography':        'linear-gradient(135deg, #3B1A2A 0%, #5e2a4a 100%)',
}

export function ToolCard({ tool }: Props) {
  const href = `/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`
  const filteredTags = tool.tags.filter(
    (t) => t.toLowerCase() !== tool.category.toLowerCase()
  )
  const gradient = PILLAR_GRADIENTS[tool.pillar] ?? 'linear-gradient(135deg, #2D3B2A 0%, #4a5e45 100%)'
  const initial = tool.name.charAt(0).toUpperCase()

  return (
    <Link
      href={href}
      className="no-underline flex flex-col group"
      style={{
        background: 'var(--color-cream)',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 220ms var(--ease-out), transform 220ms var(--ease-out)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'var(--shadow-lift)'
        el.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.boxShadow = 'var(--shadow-card)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Visual area — screenshot or gradient */}
      <div
        style={{
          width: '100%',
          height: 160,
          position: 'relative',
          overflow: 'hidden',
          background: gradient,
          flexShrink: 0,
        }}
      >
        {tool.screenshotUrl ? (
          <img
            src={tool.screenshotUrl}
            alt={`${tool.name} screenshot`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top center',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {tool.logoUrl ? (
              <img
                src={tool.logoUrl}
                alt={`${tool.name} logo`}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  objectFit: 'contain',
                  background: 'rgba(255,255,255,0.12)',
                  padding: 8,
                }}
              />
            ) : (
              <span
                className="font-display"
                style={{
                  fontSize: 48,
                  color: 'rgba(255,255,255,0.25)',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {initial}
              </span>
            )}
          </div>
        )}

        {/* Price badge */}
        {tool.priceRange && (
          <span
            className="font-body"
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              padding: '3px 8px',
              borderRadius: 999,
              backdropFilter: 'blur(4px)',
            }}
          >
            {tool.priceRange}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={{ padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category */}
        <p
          className="font-body font-semibold"
          style={{
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-40)',
            margin: '0 0 6px',
          }}
        >
          {tool.category}
        </p>

        {/* Name */}
        <h3
          className="font-display text-ink uppercase"
          style={{ fontSize: 20, letterSpacing: '0.01em', lineHeight: 1.1, margin: '0 0 8px' }}
        >
          {tool.name}
        </h3>

        {/* Tagline */}
        {tool.tagline && (
          <p
            className="font-body"
            style={{
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.45,
              color: 'var(--color-ink-80)',
              margin: '0 0 6px',
            }}
          >
            {tool.tagline}
          </p>
        )}

        {/* Description */}
        <p
          className="font-body"
          style={{
            fontSize: 12,
            lineHeight: 1.6,
            color: 'var(--color-ink-60)',
            margin: '0 0 14px',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.description}
        </p>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
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
                  padding: '3px 7px',
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
              fontSize: 11,
              color: 'var(--color-field-green)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Read our take →
          </span>
        </div>
      </div>
    </Link>
  )
}
