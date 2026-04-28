import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchTools } from '@/lib/airtable'
import { getFormId } from '@/lib/convertkit'
import { ToolCard } from '@/components/ToolCard'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

export const metadata: Metadata = {
  title: 'The Retreat Founder — The Resource Directory for Retreat Founders',
  description:
    'You\'re wearing every hat. This is the directory that tells you what actually works: curated tools, insurance guides, booking software comparisons. Honest verdicts, no noise.',
}

export const revalidate = 60

const CATEGORIES = [
  { label: 'Marketing tools',  href: '/directory/marketing-tools/' },
  { label: 'Insurance',        href: '/directory/insurance/' },
  { label: 'Booking software', href: '/directory/booking-software/' },
  { label: 'Legal templates',  href: '/directory/legal-templates/' },
  { label: 'Photography',      href: '/directory/photography/' },
]

export default async function HomePage() {
  const tools = await fetchTools()
  const recommended = tools.filter((t) => t.recommended).slice(0, 3)
  const NOTIFY_FORM = getFormId()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--color-ink)', padding: '72px 32px 80px' }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 64,
            alignItems: 'flex-end',
          }}
        >
          <div>
            <p
              className="font-body font-semibold"
              style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-field-green)',
                marginBottom: 24,
              }}
            >
              The Retreat Founder · The Resource Directory
            </p>
            <h1
              className="font-display text-ink uppercase"
              style={{
                fontSize: 68,
                lineHeight: 0.95,
                letterSpacing: '0.005em',
                margin: '0 0 32px',
              }}
            >
              For people<br />
              who run<br />
              <span style={{ color: 'var(--color-ember)' }}>retreats.</span>
            </h1>
            <p
              className="font-body"
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                color: 'var(--color-ink-60)',
                maxWidth: 460,
                marginBottom: 36,
              }}
            >
              You&rsquo;re wearing every hat &mdash; planner, facilitator, bookkeeper,
              marketer. This is the one resource built for people treating retreats
              like a real business: curated tools, insurance guides, booking software
              comparisons. Honest verdicts. No noise.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
              <Link
                href="/directory/marketing-tools/"
                className="font-body font-semibold no-underline"
                style={{
                  background: 'var(--color-ember)',
                  color: 'var(--color-cream)',
                  fontSize: 15,
                  padding: '12px 24px',
                  borderRadius: 4,
                }}
              >
                Browse the directory
              </Link>
              <Link
                href="/newsletter"
                className="font-body no-underline"
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--color-field-green)',
                }}
              >
                Get the letter →
              </Link>
            </div>
          </div>

          {/* Right: clean ruled category index */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                background: 'transparent',
                border: '1px solid var(--color-ink)',
                padding: '28px 0 0',
              }}
            >
              <p
                className="font-body font-semibold"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ink-40)',
                  padding: '0 0 16px 20px',
                  margin: 0,
                }}
              >
                In the directory
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {CATEGORIES.map(({ label, href }) => (
                  <li key={href} style={{ borderTop: '1px solid var(--color-ink)', padding: '14px 20px' }}>
                    <Link href={href} className="font-body no-underline" style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)' }}>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECOMMENDED TOOLS ────────────────────────────────────── */}
      {recommended.length > 0 && (
        <section style={{ padding: '64px 32px', borderBottom: '1px solid var(--color-cream-300)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 32,
                gap: 16,
              }}
            >
              <div>
                <p
                  className="font-body font-semibold"
                  style={{
                    fontSize: 11,
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--color-field-green)',
                    marginBottom: 10,
                  }}
                >
                  Recommended
                </p>
                <h2
                  className="font-display text-ink uppercase"
                  style={{ fontSize: 40, letterSpacing: '0.005em', lineHeight: 1.1 }}
                >
                  If you only try three.
                </h2>
              </div>
              <Link
                href="/directory/marketing-tools/"
                className="font-body no-underline"
                style={{ fontSize: 14, color: 'var(--color-field-green)', fontWeight: 500 }}
              >
                See all tools →
              </Link>
            </div>
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
            >
              {recommended.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NEWSLETTER SIGNUP ────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--color-field-green)',
          padding: '80px 32px',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          <div>
            <p
              className="font-body font-semibold"
              style={{
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-sticky)',
                marginBottom: 16,
              }}
            >
              The letter
            </p>
            <h2
              className="font-display uppercase"
              style={{
                fontSize: 52,
                lineHeight: 1.05,
                letterSpacing: '0.005em',
                color: 'var(--color-cream)',
                margin: '0 0 20px',
              }}
            >
              One short letter,<br />every Friday.
            </h2>
            <p
              className="font-body"
              style={{
                fontSize: 18,
                lineHeight: 1.55,
                color: 'var(--color-field-green-300)',
                maxWidth: 460,
                marginBottom: 32,
              }}
            >
              New tools, pricing insights, and one thing retreat founders actually used
              this week. No guru content. No funnel talk.
            </p>
            <div style={{ maxWidth: 400 }}>
              <EmailCaptureForm
                formId={NOTIFY_FORM}
                label="Subscribe"
                placeholder="you@retreat.co"
                onDark
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <blockquote style={{ borderLeft: '2px solid var(--color-field-green-300)', paddingLeft: 20, margin: 0 }}>
              <p className="font-body" style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--color-field-green-300)', fontStyle: 'italic', margin: '0 0 12px' }}>
                &ldquo;The only resource that treats retreat founders like the business owners they are.&rdquo;
              </p>
              <cite className="font-body" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-field-green-300)', fontStyle: 'normal' }}>
                The Retreat Founder
              </cite>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  )
}
