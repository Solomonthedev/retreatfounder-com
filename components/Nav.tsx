'use client'
import Link from 'next/link'

export function Nav() {
  const underlineSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 8' preserveAspectRatio='none'><path d='M2 5 Q 50 1 100 4 T 200 5 T 300 4 T 358 3' stroke='%23C84A1F' stroke-width='1.8' fill='none' stroke-linecap='round'/></svg>`

  return (
    <header className="sticky top-0 z-10 bg-cream border-b border-cream-300">
      <div
        className="mx-auto px-8 py-4 flex items-center justify-between"
        style={{ maxWidth: 1280 }}
      >
        <Link href="/" className="no-underline hover:opacity-80 transition-opacity">
          <span className="inline-flex items-baseline gap-1.5 leading-none">
            <span
              className="font-body italic font-semibold text-ember"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                transform: 'translateY(-3px)',
                display: 'inline-block',
              }}
            >
              The
            </span>
            <span
              className="font-display text-ink uppercase"
              style={{
                fontSize: '1.35rem',
                letterSpacing: '0.005em',
                position: 'relative',
                paddingBottom: 5,
              }}
            >
              Retreat Founder
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 5,
                  background: `url("${underlineSvg}") no-repeat center / 100% 100%`,
                }}
              />
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-7">
          <Link
            href="/directory/"
            className="font-body text-sm font-medium text-ink no-underline hover:text-field-green transition-colors"
          >
            The directory
          </Link>
          <Link
            href="/newsletter"
            className="font-body text-sm font-medium text-ink no-underline hover:text-field-green transition-colors"
          >
            The letter
          </Link>
          <Link
            href="/directory/"
            className="font-body text-sm font-semibold no-underline transition-colors"
            style={{
              background: 'var(--color-ember)',
              color: 'var(--color-cream)',
              padding: '10px 20px',
              borderRadius: 4,
            }}
            onMouseOver={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'var(--color-ember-700)')
            }
            onMouseOut={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'var(--color-ember)')
            }
          >
            Browse tools
          </Link>
        </nav>
      </div>
    </header>
  )
}
