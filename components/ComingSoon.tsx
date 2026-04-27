import { EmailCaptureForm } from './EmailCaptureForm'
import { StickyNote } from './StickyNote'

interface Props {
  categoryName: string
  formId: string
  description?: string
  quote?: string
  quoteAttribution?: string
}

export function ComingSoon({
  categoryName,
  formId,
  description,
  quote,
  quoteAttribution,
}: Props) {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px 96px' }}>
      <div style={{ maxWidth: 680 }}>
        <p
          className="font-body font-semibold"
          style={{
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-ember)',
            marginBottom: 16,
          }}
        >
          Coming soon
        </p>
        <h1
          className="font-display text-ink uppercase"
          style={{ fontSize: 56, lineHeight: 1.05, letterSpacing: '0.005em', margin: '0 0 20px' }}
        >
          {categoryName}
        </h1>
        <p
          className="font-body"
          style={{
            fontSize: 20,
            lineHeight: 1.5,
            color: 'var(--color-ink-60)',
            marginBottom: 40,
            maxWidth: 520,
          }}
        >
          {description ??
            `We're curating the best resources for this category. Be the first to know when it's live.`}
        </p>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 360 }}>
            <EmailCaptureForm formId={formId} label="Notify me" placeholder="your@email.com" />
          </div>
          {quote && (
            <StickyNote quote={quote} attribution={quoteAttribution} rotate={-1.5} maxWidth={240} />
          )}
        </div>
      </div>

      {/* Editorial rule */}
      <div
        style={{
          marginTop: 96,
          borderTop: '1px solid var(--color-cream-300)',
        }}
      />
    </div>
  )
}
