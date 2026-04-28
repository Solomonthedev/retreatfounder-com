import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchTools } from '@/lib/airtable'
import { DirectoryLibrary } from '@/components/DirectoryLibrary'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

export const metadata: Metadata = {
  title: 'The Directory — The Retreat Founder',
  description:
    'Every tool, resource, and service a retreat founder needs — curated honestly. Search and filter by category, price, and what you\'re trying to do.',
}

export const revalidate = 60

const PILLAR_POSTS = [
  {
    slug: 'insurance',
    label: 'Insurance',
    headline: 'What retreat insurance do you actually need?',
    href: '/directory/insurance/',
  },
  {
    slug: 'booking-software',
    label: 'Booking Software',
    headline: 'The booking software comparison every retreat founder needs',
    href: '/directory/booking-software/',
  },
  {
    slug: 'marketing-tools',
    label: 'Marketing',
    headline: 'The marketing stack for retreat founders who hate marketing',
    href: '/directory/marketing-tools/',
  },
]

export default async function DirectoryPage() {
  const tools = await fetchTools()
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <>
      {/* Page header */}
      <section style={{ borderBottom: '1px solid var(--color-ink)', padding: '56px 32px 64px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p
            className="font-body font-semibold"
            style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 16 }}
          >
            The Retreat Founder · Resource Library
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <h1
                className="font-display text-ink uppercase"
                style={{ fontSize: 64, lineHeight: 0.95, letterSpacing: '0.005em', margin: '0 0 20px' }}
              >
                Every tool.<br />
                <span style={{ color: 'var(--color-ember)' }}>Honestly curated.</span>
              </h1>
              <p
                className="font-body"
                style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--color-ink-60)', maxWidth: 480, margin: 0 }}
              >
                {tools.length} tools across insurance, booking, marketing, legal, and photography —
                filtered down to what retreat founders actually use.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {[
                { href: '/directory/insurance/', label: 'Insurance' },
                { href: '/directory/booking-software/', label: 'Booking' },
                { href: '/directory/marketing-tools/', label: 'Marketing' },
                { href: '/directory/legal-templates/', label: 'Legal' },
                { href: '/directory/photography/', label: 'Photography' },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="font-body font-semibold no-underline"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: 'var(--color-ink-60)',
                    padding: '8px 14px',
                    border: '1px solid var(--color-cream-300)',
                    borderRadius: 999,
                    transition: 'border-color 150ms, color 150ms',
                  }}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Library */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <DirectoryLibrary tools={tools} />
      </div>

      {/* Newsletter strip */}
      <section
        style={{
          borderTop: '1px solid var(--color-ink)',
          background: 'var(--color-ink)',
          padding: '72px 32px',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            {/* Left — newsletter invite */}
            <div>
              <p
                className="font-body font-semibold"
                style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ochre)', marginBottom: 16 }}
              >
                The weekly read
              </p>
              <h2
                className="font-display uppercase"
                style={{ fontSize: 44, lineHeight: 0.95, letterSpacing: '0.005em', color: 'var(--color-cream)', margin: '0 0 20px' }}
              >
                For retreat founders<br />
                <span style={{ color: 'var(--color-ochre)' }}>who read between calls.</span>
              </h2>
              <p
                className="font-body"
                style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(245,240,232,0.6)', maxWidth: 380, margin: '0 0 28px' }}
              >
                New tools, honest reviews, and one thing I learned from retreat founders this week.
                No filler.
              </p>
              <EmailCaptureForm formId={formId} label="Subscribe" placeholder="your@email.com" onDark />
            </div>

            {/* Right — pillar post teasers */}
            <div>
              <p
                className="font-body font-semibold"
                style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.4)', marginBottom: 20 }}
              >
                From the guides
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {PILLAR_POSTS.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={post.href}
                    className="no-underline"
                    style={{
                      display: 'block',
                      padding: '20px 0',
                      borderTop: i === 0 ? '1px solid rgba(245,240,232,0.12)' : '1px solid rgba(245,240,232,0.12)',
                    }}
                  >
                    <span
                      className="font-body font-semibold"
                      style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ochre)', display: 'block', marginBottom: 6 }}
                    >
                      {post.label}
                    </span>
                    <span
                      className="font-display uppercase"
                      style={{ fontSize: 18, letterSpacing: '0.01em', color: 'var(--color-cream)', lineHeight: 1.2 }}
                    >
                      {post.headline}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
