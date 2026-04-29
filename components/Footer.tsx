import Link from 'next/link'
import { GlyphWave } from '@/components/Glyphs'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-ink)', background: 'var(--color-paper)', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '36px 36px 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'end',
          gap: 24,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-3)',
        }}>
          <div>
            retreatfounder.com<br />
            MMXXVI / Vol. 1
          </div>

          <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, textTransform: 'none', letterSpacing: 0, color: 'var(--color-ink-2)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <GlyphWave size={18} color="var(--color-ink-3)" strokeWidth={1} />
            A small project, made carefully.
          </div>

          <div style={{ textAlign: 'right', display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
            <Link href="/newsletter" className="no-underline footer-link" style={{ color: 'var(--color-ink-2)' }}>Newsletter</Link>
            <Link href="/about" className="no-underline footer-link" style={{ color: 'var(--color-ink-2)' }}>About</Link>
            <a href="mailto:hello@retreatfounder.com" className="no-underline footer-link" style={{ color: 'var(--color-ink-2)' }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
