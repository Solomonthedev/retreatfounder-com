import type { Metadata } from 'next'
import Link from 'next/link'
import { StickyNote } from '@/components/StickyNote'

export const metadata: Metadata = {
  title: 'About',
  description:
    'The Retreat Founder is a resource directory for people building retreat businesses — built in public, by someone running the same gauntlet.',
}

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 96px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 80,
          alignItems: 'start',
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
              marginBottom: 16,
            }}
          >
            About this project
          </p>
          <h1
            className="font-display text-ink uppercase"
            style={{
              fontSize: 64,
              lineHeight: 1.0,
              letterSpacing: '0.005em',
              margin: '0 0 32px',
            }}
          >
            Built in public,<br />from scratch.
          </h1>

          <hr
            style={{
              border: 0,
              height: 1,
              background: 'var(--color-ink)',
              margin: '0 0 32px',
            }}
          />

          <div
            className="font-body"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--color-ink-80)',
              maxWidth: 580,
            }}
          >
            <p>
              The Retreat Founder is a curated resource directory for retreat operators — run
              by Solomon Oyemade, a filmmaker and community organiser who kept watching retreat
              founders get treated like hobbyists when they were doing serious founder work.
            </p>
            <p>
              The retreat industry is one of the most underestimated business categories going.
              Operators are wearing every hat — planner, facilitator, bookkeeper, marketer —
              and still end up making maybe a few hundred pounds for themselves at the end of
              the day. Nobody was building infrastructure for them.
            </p>
            <p>
              So we did. The gold rush is the retreat. We&rsquo;re here for the retreat maker.
            </p>
            <p>
              Some links in the directory are affiliate links — we earn a small commission if
              you sign up. It never affects our verdict. We&rsquo;d tell you if a tool was
              rubbish.
            </p>
          </div>

          <div style={{ marginTop: 48 }}>
            <Link
              href="/directory/marketing-tools/"
              className="font-body font-semibold no-underline"
              style={{
                background: 'var(--color-ember)',
                color: 'var(--color-cream)',
                fontSize: 15,
                padding: '12px 24px',
                borderRadius: 4,
                display: 'inline-block',
              }}
            >
              Browse the directory →
            </Link>
          </div>
        </div>

        <div style={{ paddingTop: 96 }}>
          <StickyNote
            quote="Nobody was treating retreat founders like the business owners they are. So we built the thing that should exist."
            attribution="The Retreat Founder"
            rotate={-2}
            maxWidth={280}
          />
        </div>
      </div>
    </div>
  )
}
