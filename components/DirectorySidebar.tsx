import Link from 'next/link'
import type { Tool } from '@/lib/types'
import { Glyph } from '@/components/Glyphs'

interface Props {
  tools: Tool[]
}

const UPCOMING_GUIDES = [
  'The tools that actually fill retreats',
  'Insurance: what retreat founders actually need',
  'Booking software compared — honestly',
  'Legal templates for retreat founders',
]

const mod: React.CSSProperties = {
  background: 'var(--color-paper)',
  border: '1px solid var(--color-rule)',
  padding: '18px',
  position: 'relative',
}

const moduleLabel: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--color-ink-3)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '1px dashed var(--color-rule)',
}

export function DirectorySidebar({ tools }: Props) {
  const allTags = tools.flatMap((t) => t.tags ?? [])
  const tagCounts = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag] = (acc[tag] ?? 0) + 1
    return acc
  }, {})
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([tag]) => tag)

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Upcoming Guides */}
      <div style={mod}>
        <div style={moduleLabel}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Glyph name="Book" size={14} strokeWidth={1} />
            Upcoming guides
          </span>
          <span style={{ color: 'var(--color-red)' }}>Coming</span>
        </div>
        {UPCOMING_GUIDES.map((title) => (
          <Link
            key={title}
            href="/newsletter"
            className="no-underline"
            style={{ display: 'grid', gridTemplateColumns: '1fr 14px', gap: 10, padding: '12px 0', borderBottom: '1px dashed var(--color-rule)', alignItems: 'start', color: 'inherit' }}
          >
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 400, lineHeight: 1.3, color: 'var(--color-ink)', transition: 'color 140ms' }}>{title}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--color-ink-3)', paddingTop: 3 }}>→</div>
          </Link>
        ))}
        <Link href="/newsletter" className="no-underline" style={{ display: 'inline-block', marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 2, textDecoration: 'none' }}>
          Get notified →
        </Link>
      </div>

      {/* Reader Offer — Track A video offer */}
      <div style={{ background: 'var(--color-paper-deep)', border: '1px solid var(--color-ink)', padding: 0, overflow: 'hidden' }}>
        <div style={{ height: 6, background: 'repeating-linear-gradient(90deg, var(--color-red) 0 8px, transparent 8px 14px)', opacity: 0.85 }} />
        <div style={{ padding: '18px' }}>
          <div style={{ ...moduleLabel, color: 'var(--color-red)', borderBottomColor: 'rgba(200,54,42,0.2)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Glyph name="Bird" size={14} strokeWidth={1} color="var(--color-red)" />
              Reader Offer
            </span>
            <span>Free</span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            See your retreat as a short film.
          </h4>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.5, color: 'var(--color-ink-2)', margin: 0 }}>
            We take your best caption and turn it into a 60-second AI voiceover — matched to B-roll from your own content. Free for the first 10 founders who ask.
          </p>
          <a href="mailto:hello@retreatfounder.com?subject=Short film offer" style={{ display: 'block', textAlign: 'center', background: 'var(--color-ink)', color: 'var(--color-paper)', padding: 11, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 14, transition: 'background 120ms' }}>
            Claim your free video →
          </a>
        </div>
      </div>

      {/* Submit */}
      <div style={{ ...mod, border: '1px dashed var(--color-ink)', background: 'transparent' }}>
        <div style={{ marginBottom: 8 }}>
          <Glyph name="Flame" size={42} color="var(--color-red)" strokeWidth={1.1} />
        </div>
        <div style={moduleLabel}>
          <span>Submit</span>
          <span>Free</span>
        </div>
        <h4 style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 18, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
          Have a tool worth listing?
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-2)', lineHeight: 1.5, margin: 0 }}>
          We add 2–3 new resources a week. If you&rsquo;ve built or used something founders should know about, send it in.
        </p>
        <a href="mailto:hello@retreatfounder.com?subject=Resource submission" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink)', borderBottom: '1px solid var(--color-ink)', paddingBottom: 2, marginTop: 12, textDecoration: 'none' }}>
          Submit a resource →
        </a>
      </div>

      {/* Browse by Tag */}
      {topTags.length > 0 && (
        <div style={mod}>
          <div style={moduleLabel}>
            <span>Browse by tag</span>
            <span style={{ color: 'var(--color-red)' }}>{topTags.length}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {topTags.map((tag) => (
              <button key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', padding: '4px 8px', border: '1px solid var(--color-rule)', borderRadius: 999, color: 'var(--color-ink-2)', cursor: 'pointer', background: 'transparent', transition: 'border-color 120ms, color 120ms' }}>
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}
