'use client'
import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { pillarToHubSlug } from '@/lib/pillar'

interface Props { tool: Tool }

export function ToolCard({ tool }: Props) {
  const isRecommended = tool.turfVerdict === 'Recommended'
  const filteredTags = tool.tags.filter(
    (t) => t.toLowerCase() !== tool.category.toLowerCase()
  )
  return (
    <article
      className="bg-white flex flex-col gap-3"
      style={{
        borderRadius: 8,
        padding: '24px 24px 20px',
        boxShadow: 'var(--shadow-card)',
        transition: 'box-shadow 240ms var(--ease-out)',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lift)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
      }}
    >
      {/* Category label */}
      <p
        className="font-body font-semibold"
        style={{
          fontSize: 10,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-40)',
          margin: 0,
        }}
      >
        {tool.category}
      </p>

      {/* Name + price */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href={`/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`}
            className="no-underline"
          >
            <h3
              className="font-display text-ink uppercase"
              style={{ fontSize: 22, letterSpacing: '0.01em', lineHeight: 1.1 }}
            >
              {tool.name}
            </h3>
          </Link>
          {tool.priceRange && (
            <p
              className="font-body text-ink-40"
              style={{ fontSize: 12, marginTop: 4 }}
            >
              {tool.priceRange}
            </p>
          )}
        </div>
        {tool.logoUrl && (
          <img
            src={tool.logoUrl}
            alt={`${tool.name} logo`}
            className="object-contain"
            style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 6 }}
          />
        )}
      </div>

      {/* Description — this IS the verdict, in full */}
      <p className="font-body text-ink-80" style={{ fontSize: 15, lineHeight: 1.6, flexGrow: 1 }}>
        {tool.description}
      </p>

      {/* Verdict badge + tags */}
      <div className="flex flex-wrap items-center gap-1.5" style={{ marginTop: 4 }}>
        <span
          className="font-body font-semibold"
          style={{
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: 999,
            background: isRecommended
              ? 'var(--color-field-green-100)'
              : 'rgba(0,0,0,0.05)',
            color: isRecommended
              ? 'var(--color-field-green)'
              : 'var(--color-ink-40)',
            border: isRecommended
              ? '1px solid var(--color-field-green)'
              : '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {tool.turfVerdict ?? 'Unrated'}
        </span>
        {filteredTags.map((tag) => (
          <span
            key={tag}
            className="font-body"
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: 'var(--color-cream)',
              color: 'var(--color-ink-60)',
              border: '1px solid var(--color-cream-300)',
              padding: '4px 10px',
              borderRadius: 999,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Affiliate CTA */}
      {tool.affiliateUrl && (
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body no-underline"
          style={{
            marginTop: 4,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--color-field-green)',
            transition: 'color 140ms var(--ease-out)',
          }}
          onMouseOver={(e) =>
            ((e.currentTarget as HTMLElement).style.color = 'var(--color-ember)')
          }
          onMouseOut={(e) =>
            ((e.currentTarget as HTMLElement).style.color = 'var(--color-field-green)')
          }
          onClick={() => {
            if (
              typeof window !== 'undefined' &&
              (window as Window & { va?: (...a: unknown[]) => void }).va
            ) {
              ;(window as Window & { va?: (...a: unknown[]) => void }).va?.(
                'event',
                { name: 'affiliate_click', tool: tool.slug, category: tool.category }
              )
            }
          }}
        >
          Visit {tool.name} →
        </a>
      )}
    </article>
  )
}
