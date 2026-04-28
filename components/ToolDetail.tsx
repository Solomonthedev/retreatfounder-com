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
          {tool.tagline && (
            <p className="font-body" style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.45, color: 'var(--color-ink)', marginBottom: 16 }}>
              {tool.tagline}
            </p>
          )}
          <p className="font-body" style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--color-ink-60)', marginBottom: 24 }}>
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
                {"Affiliate disclosure: we may earn a commission if you sign up via this link — we only list tools we'd recommend without it."}
              </p>
            </>
          )}
        </div>

        {/* Right: verdict */}
        <div style={{ paddingTop: 80 }}>
          <>
            <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-40)', marginBottom: 16 }}>
              Our take
            </p>
            <StickyNote quote={tool.description} attribution="The Retreat Founder" rotate={-1.5} maxWidth={380} />
          </>
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
