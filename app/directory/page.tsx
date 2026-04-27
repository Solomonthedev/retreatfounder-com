import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Directory — The Retreat Founder',
  description:
    'Five curated categories of tools, services, and resources for retreat founders. Marketing, insurance, booking software, legal templates, photography.',
}

const CATEGORIES = [
  {
    slug: 'marketing-tools',
    name: 'Marketing Tools',
    description: 'Email, CRM, scheduling, social — the tools that fill retreats.',
  },
  {
    slug: 'booking-software',
    name: 'Booking Software',
    description: 'Deposits, group bookings, intake forms, payment processing.',
  },
  {
    slug: 'insurance',
    name: 'Insurance',
    description: 'Liability, cancellation, public liability — compared honestly.',
  },
  {
    slug: 'legal-templates',
    name: 'Legal Templates',
    description: 'Waivers, contracts, refund policies built for retreat context.',
  },
  {
    slug: 'photography',
    name: 'Photography',
    description: 'Photographers who shoot retreats as they actually are.',
  },
]

export default function DirectoryPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 32px 96px' }}>
      <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 16 }}>
        The Retreat Founder · The Directory
      </p>
      <h1 className="font-display text-ink uppercase" style={{ fontSize: 72, lineHeight: 0.95, letterSpacing: '0.005em', margin: '0 0 48px' }}>
        Five categories.<br />
        <span style={{ color: 'var(--color-ember)' }}>No noise.</span>
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/directory/${cat.slug}/`}
            className="no-underline"
            style={{
              display: 'block',
              padding: '40px 36px',
              background: 'var(--color-cream)',
              border: '1px solid var(--color-ink)',
              transition: 'background 180ms',
            }}
          >
            <p className="font-body font-semibold" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 12 }}>
              Live
            </p>
            <h2 className="font-display text-ink uppercase" style={{ fontSize: 32, letterSpacing: '0.005em', margin: '0 0 12px' }}>
              {cat.name}
            </h2>
            <p className="font-body" style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--color-ink-60)', margin: 0 }}>
              {cat.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
