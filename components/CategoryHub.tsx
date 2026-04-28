import type { Tool } from '@/lib/types'
import { ToolCard } from '@/components/ToolCard'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'

interface CategoryHubProps {
  pillarName: string
  headline: string
  headlineAccent: string
  bodyText: string
  tools: Tool[]
  formId: string | null
}

export function CategoryHub({
  pillarName,
  headline,
  headlineAccent,
  bodyText,
  tools,
  formId,
}: CategoryHubProps) {
  const featured = tools.filter((t) => t.featured)
  const rest = tools.filter((t) => !t.featured)

  return (
    <>
      {/* Hub header */}
      <section style={{ borderBottom: '1px solid var(--color-ink)', padding: '64px 32px 72px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 640 }}>
              <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 16 }}>
                The Retreat Founder · {pillarName} · {tools.length} tools curated
              </p>
              <h1 className="font-display text-ink uppercase" style={{ fontSize: 56, lineHeight: 0.95, letterSpacing: '0.005em', margin: '0 0 24px' }}>
                {headline}<br />
                <span style={{ color: 'var(--color-ember)' }}>{headlineAccent}</span>
              </h1>
              <p className="font-body" style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--color-ink-60)', maxWidth: 480 }}>
                {bodyText}
              </p>
            </div>
            <div style={{ maxWidth: 300, width: '100%' }}>
              <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-60)', marginBottom: 12 }}>
                New tools, every week
              </p>
              <EmailCaptureForm formId={formId} label="Notify me" placeholder="your@email.com" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section style={{ padding: '56px 32px 0', borderBottom: '1px solid var(--color-cream-300)' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', marginBottom: 24 }}>
              Editor&rsquo;s picks
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, paddingBottom: 56 }}>
              {featured.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
            </div>
          </div>
        </section>
      )}

      {/* All tools */}
      <section style={{ padding: '56px 32px 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {tools.length === 0 && (
            <p className="font-body text-ink-60" style={{ fontSize: 17 }}>
              No tools loaded — check Airtable connection.
            </p>
          )}
          {rest.length > 0 && (
            <>
              <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-40)', marginBottom: 24 }}>
                All tools
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
                {rest.map((tool) => <ToolCard key={tool.id} tool={tool} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  )
}
