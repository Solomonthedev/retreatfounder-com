import Link from 'next/link'
import Image from 'next/image'
import type { Tool } from '@/lib/types'
import { pillarToHubSlug } from '@/lib/pillar'

interface Props { tool: Tool }

const PILLAR_ACCENTS: Record<string, string> = {
  'Marketing Tools':   'var(--color-ink-3)',
  'Insurance':         'var(--color-ink-3)',
  'Booking Software':  'var(--color-ink-3)',
  'Legal Templates':   'var(--color-ink-3)',
  'Photography':       'var(--color-ink-3)',
}

export function ToolCard({ tool }: Props) {
  const href = `/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`
  const accent = PILLAR_ACCENTS[tool.pillar] ?? '#B5AFA6'

  return (
    <Link
      href={href}
      className="no-underline flex flex-col group card-hover"
      style={{
        background: 'var(--color-paper)',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid var(--color-rule)',
        borderLeft: `2px solid var(--color-rule)`,
      }}
    >
      {/* Visual area — screenshot strip, ruled-paper + logo, or nothing */}
      {tool.screenshotUrl ? (
        <div
          style={{
            width: '100%',
            height: 80,
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            src={tool.screenshotUrl}
            alt={`${tool.name} screenshot`}
            fill
            sizes="(min-width: 768px) 320px, 100vw"
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
      ) : tool.logoUrl ? (
        <div
          className="ruled-paper"
          style={{
            width: '100%',
            height: 80,
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--color-paper-deep)',
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 11px, rgba(29,26,20,0.07) 11px, rgba(29,26,20,0.07) 12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Image
            src={tool.logoUrl}
            alt={`${tool.name} logo`}
            width={40}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </div>
      ) : null}

      {/* Card body */}
      <div style={{ padding: '18px 20px 16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Pillar/category label */}
        {tool.category && (
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
        )}

        {/* Name */}
        <h3
          className="font-serif text-ink"
          style={{ fontSize: 15, letterSpacing: 'normal', lineHeight: 1.1, margin: '0 0 6px' }}
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
              margin: '0 0 8px',
            }}
          >
            {tool.tagline}
          </p>
        )}

        {/* Description */}
        <p
          className="font-body"
          style={{
            fontSize: 12.5,
            lineHeight: 1.6,
            color: 'var(--color-ink-60)',
            margin: '0 0 12px',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, margin: '0 0 10px' }}>
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-body"
                style={{
                  fontSize: 9,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-40)',
                  background: 'var(--color-cream-200)',
                  padding: '2px 6px',
                  borderRadius: 2,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Use cases row */}
        {tool.useCases && tool.useCases.length > 0 && (
          <p
            className="font-body"
            style={{
              fontSize: 11,
              lineHeight: 1.4,
              color: 'var(--color-ink-40)',
              margin: '0 0 14px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
            }}
          >
            → {tool.useCases.slice(0, 2).join(' · ')}
          </p>
        )}

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginTop: 'auto' }}>
          {tool.priceRange ? (
            <span
              className="font-body"
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-ink-60)',
              }}
            >
              {tool.priceRange}
            </span>
          ) : <span />}
          <span
            className="font-body"
            style={{
              fontSize: 16,
              color: 'var(--color-red)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  )
}
