import type { Metadata } from 'next'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import { StickyNote } from '@/components/StickyNote'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'The Letter — Weekly resources for retreat founders',
  description:
    'A short Friday letter for retreat founders. New tools, honest verdicts, and one specific thing that worked this week. No founder content. No funnel talk.',
}

const NOTIFY_FORM = getFormId()

export default function NewsletterPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 96px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: 80,
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
              color: 'var(--color-field-green)',
              marginBottom: 16,
            }}
          >
            The letter
          </p>
          <h1
            className="font-display text-ink uppercase"
            style={{
              fontSize: 72,
              lineHeight: 0.95,
              letterSpacing: '0.005em',
              margin: '0 0 24px',
            }}
          >
            One short<br />
            letter,<br />
            <span style={{ color: 'var(--color-ember)' }}>every Friday.</span>
          </h1>

          <hr
            style={{
              border: 0,
              height: 1,
              background: 'var(--color-ink)',
              margin: '32px 0',
            }}
          />

          <p
            className="font-body"
            style={{
              fontSize: 20,
              lineHeight: 1.55,
              color: 'var(--color-ink-60)',
              marginBottom: 40,
              maxWidth: 480,
            }}
          >
            New tools added to the directory, honest verdicts, and one specific thing
            that worked for a retreat founder this week.
            <br /><br />
            No founder content. No funnel talk. No emoji.
          </p>

          <div style={{ maxWidth: 420 }}>
            <EmailCaptureForm
              formId={NOTIFY_FORM}
              label="Subscribe"
              placeholder="you@retreat.co"
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 48, paddingTop: 32 }}>
          <StickyNote
            quote="New tools, honest verdicts, and one thing that actually worked for a retreat founder this week."
            attribution="The Retreat Founder"
            rotate={-1.8}
            maxWidth={300}
          />
          <StickyNote
            quote="Most retreat tools newsletters either sell you something or tell you nothing. This one tells you something useful every Friday."
            attribution="The Retreat Founder"
            rotate={1.5}
            maxWidth={280}
          />
        </div>
      </div>
    </div>
  )
}
