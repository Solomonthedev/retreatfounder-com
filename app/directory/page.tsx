import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchTools } from '@/lib/airtable'
import { getFormId } from '@/lib/convertkit'
import { DirectoryLibrary } from '@/components/DirectoryLibrary'
import { NewsletterCallout, AdvertiseHereCallout, VideoCallout } from '@/components/CalloutCard'

export const metadata: Metadata = {
  title: 'The Directory — The Retreat Founder',
  description:
    'Every tool, resource, and service a retreat founder needs — curated honestly. Search and filter by category, price, and what you\'re trying to do.',
  openGraph: {
    title: 'The Retreat Founder — Resource Directory',
    description: 'Every tool a retreat founder needs. Curated honestly. No sponsored rankings.',
    images: [{ url: '/og-directory.svg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Retreat Founder — Resource Directory',
    description: 'Every tool a retreat founder needs. Curated honestly. No sponsored rankings.',
    images: ['/og-directory.svg'],
  },
}

export const revalidate = 60

const CATEGORY_LINKS = [
  { href: '/directory/insurance/', label: 'Insurance' },
  { href: '/directory/booking-software/', label: 'Booking' },
  { href: '/directory/marketing-tools/', label: 'Marketing' },
  { href: '/directory/legal-templates/', label: 'Legal' },
  { href: '/directory/photography/', label: 'Photography' },
]

export default async function DirectoryPage() {
  const tools = await fetchTools()
  const formId = getFormId()

  // Grid inserts — callout cards woven into the tool grid
  const inserts = [
    {
      afterIndex: 7,
      node: <AdvertiseHereCallout />,
    },
    {
      afterIndex: 15,
      node: (
        <VideoCallout
          title="How I'd fill my first retreat"
          description="A short guide for founders who've built the programme but not the list."
          href="https://youtube.com/@retreatfounder"
        />
      ),
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Retreat Founder Resource Directory',
    description: 'Curated tools for retreat founders across insurance, booking, marketing, legal, and photography.',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: tool.name,
      url: `https://retreatfounder.com/directory/${tool.pillar.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/${tool.slug}`,
      description: tool.description,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Hero — headline left, newsletter module right */}
      <section style={{ borderBottom: '1px solid var(--color-ink)', padding: 'clamp(32px, 5vw, 56px) clamp(16px, 4vw, 32px) clamp(40px, 5vw, 64px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: 40, alignItems: 'start' }}>

            {/* Left — headline + nav pills */}
            <div>
              <p
                className="font-body font-semibold"
                style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 16 }}
              >
                The Retreat Founder · Resource Library
              </p>
              <h1
                className="font-display text-ink uppercase"
                style={{ fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 0.95, letterSpacing: '0.005em', margin: '0 0 20px' }}
              >
                Every tool.<br />
                <span style={{ color: 'var(--color-ember)' }}>Honestly curated.</span>
              </h1>
              <p
                className="font-body"
                style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--color-ink-60)', maxWidth: 480, margin: '0 0 32px' }}
              >
                {Math.max(tools.length, 60)}+ tools across insurance, booking, marketing, legal, and photography.
                No sponsored rankings.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {CATEGORY_LINKS.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="font-body font-semibold no-underline"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      color: 'var(--color-ink-60)',
                      padding: '7px 14px',
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

            {/* Right — newsletter callout box */}
            <NewsletterCallout formId={formId} />
          </div>
        </div>
      </section>

      {/* Library — full width, no sidebar */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        <DirectoryLibrary tools={tools} inserts={inserts} />
      </div>
    </>
  )
}
