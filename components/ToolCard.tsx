import Link from 'next/link'
import Image from 'next/image'
import type { Tool } from '@/lib/types'
import { pillarToHubSlug } from '@/lib/pillar'

interface Props { tool: Tool }

const PILLAR_TINTS: Record<string, string> = {
  'Marketing Tools':    '#F0EDE5',
  'Insurance':          '#EAF0ED',
  'Booking Software':   '#F0EDE8',
  'Legal Templates':    '#EEEDF5',
  'Photography':        '#F0EDEE',
}

export function ToolCard({ tool }: Props) {
  const href = `/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`
  const tint = PILLAR_TINTS[tool.pillar] ?? '#F5F2EB'

  return (
    <Link
      href={href}
      className="no-underline flex flex-col group card-hover"
      style={{
        background: 'var(--color-cream)',
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid var(--color-cream-300)',
      }}
    >
      {/* Visual area — screenshot strip, ruled-paper + logo, or 4px accent bar */}
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
            background: tint,
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 11px, rgba(34,30,22,0.07) 11px, rgba(34,30,22,0.07) 12px)',
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
      ) : (
        <div
          style={{
            width: '100%',
            height: 4,
            background: tint,
            flexShrink: 0,
          }}
        />
      )}

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
          className="font-display text-ink uppercase"
          style={{ fontSize: 18, letterSpacing: '0.01em', lineHeight: 1.1, margin: '0 0 6px' }}
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
              color: 'var(--color-field-green)',
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
