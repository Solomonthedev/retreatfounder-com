'use client'
import Link from 'next/link'
import { GlyphMountain } from '@/components/Glyphs'

export function Nav() {
  return (
    <header style={{
      borderBottom: '1px solid var(--color-rule)',
      background: 'var(--color-paper)',
      position: 'sticky',
      top: 0,
      zIndex: 20,
    }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 36px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: '18px 0',
        }}>
          {/* Left — mono labels */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
            <span>Est. 2024</span>
            <span>Issue № 042</span>
          </div>

          {/* Centre — brand */}
          <Link href="/" className="no-underline" style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--color-ink)' }}>
            <GlyphMountain size={22} color="var(--color-red)" strokeWidth={1.1} />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: 20, letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>
              retreatfounder
            </span>
          </Link>

          {/* Right — nav links */}
          <nav style={{ display: 'flex', gap: 24, justifyContent: 'flex-end', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            <Link href="/directory/" className="no-underline nav-link" style={{ color: 'var(--color-ink-2)' }}>
              Directory
            </Link>
            <Link href="/newsletter" className="no-underline nav-link" style={{ color: 'var(--color-ink-2)' }}>
              Newsletter
            </Link>
            <Link href="/directory/" className="no-underline" style={{ color: 'var(--color-red)' }}>
              Browse →
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
