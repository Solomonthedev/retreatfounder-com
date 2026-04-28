'use client'
import { useState } from 'react'
import { subscribeToForm } from '@/lib/convertkit'

/* ─── Newsletter variant ─────────────────────────────────────────────── */
interface NewsletterCalloutProps {
  formId: string | null
  compact?: boolean
}

export function NewsletterCallout({ formId, compact = false }: NewsletterCalloutProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formId) return
    setStatus('loading')
    const res = await subscribeToForm({ email, formId })
    setStatus(res.success ? 'success' : 'error')
  }

  return (
    <div
      style={{
        background: 'var(--color-cream)',
        border: '2px solid var(--color-ink)',
        borderRadius: 12,
        padding: compact ? '24px' : '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <p
        className="font-body font-semibold"
        style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-field-green)', margin: 0 }}
      >
        The weekly read
      </p>
      <h3
        className="font-display text-ink uppercase"
        style={{ fontSize: compact ? 22 : 28, lineHeight: 1.0, letterSpacing: '0.005em', margin: 0 }}
      >
        For retreat founders<br />
        <span style={{ color: 'var(--color-ember)' }}>who read between calls.</span>
      </h3>
      <p
        className="font-body"
        style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--color-ink-60)', margin: 0, flex: 1 }}
      >
        New tools, honest reviews, one thing I learned from retreat founders this week.
      </p>
      {status === 'success' ? (
        <p className="font-body" style={{ fontSize: 14, color: 'var(--color-field-green)', fontWeight: 600 }}>
          You&rsquo;re on the list.
        </p>
      ) : !formId ? (
        <p className="font-body" style={{ fontSize: 12, color: 'var(--color-ink-40)', margin: 0 }}>
          Coming soon.
        </p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            aria-label="Email address"
            style={{
              padding: '9px 12px',
              fontSize: 13,
              fontFamily: 'inherit',
              background: '#fff',
              border: '1px solid var(--color-cream-300)',
              borderRadius: 6,
              color: 'var(--color-ink)',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="font-body font-semibold"
            style={{
              padding: '9px 16px',
              fontSize: 13,
              background: 'var(--color-ink)',
              color: 'var(--color-cream)',
              border: 0,
              borderRadius: 6,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.6 : 1,
            }}
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe free'}
          </button>
          {status === 'error' && (
            <p className="font-body" style={{ fontSize: 11, color: '#C0392B', margin: 0 }}>Something went wrong.</p>
          )}
        </form>
      )}
    </div>
  )
}

/* ─── Advertise here (empty partner slot) ───────────────────────────── */
export function AdvertiseHereCallout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        background: 'transparent',
        border: '2px dashed var(--color-cream-300)',
        borderRadius: 12,
        padding: '24px',
        height: '100%',
        boxSizing: 'border-box',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <p
        className="font-body font-semibold"
        style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ink-40)', margin: 0 }}
      >
        Partner slot
      </p>
      <h3 className="font-display text-ink-40 uppercase" style={{ fontSize: 22, lineHeight: 1.05, margin: 0 }}>
        Reach retreat<br />founders here.
      </h3>
      <p className="font-body" style={{ fontSize: 12, color: 'var(--color-ink-40)', lineHeight: 1.5, margin: 0 }}>
        This spot is available for tools and services built for retreat founders.
      </p>
      <a
        href="mailto:hello@retreatfounder.com?subject=Placement%20enquiry"
        className="font-body font-semibold no-underline"
        style={{ fontSize: 12, color: 'var(--color-field-green)' }}
      >
        Get in touch →
      </a>
    </div>
  )
}

/* ─── Video card variant ─────────────────────────────────────────────── */
interface VideoCalloutProps {
  title: string
  description: string
  href: string
  thumbnailUrl?: string | null
}

export function VideoCallout({ title, description, href, thumbnailUrl }: VideoCalloutProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline callout-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        background: 'var(--color-ink)',
        border: '2px solid var(--color-ink)',
        borderRadius: 12,
        overflow: 'hidden',
        height: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
    >
      {thumbnailUrl ? (
        <div style={{ height: 120, overflow: 'hidden', flexShrink: 0 }}>
          <img src={thumbnailUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div
          style={{
            height: 120,
            background: 'linear-gradient(135deg, #2D3B2A 0%, #1A1A1A 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 32, opacity: 0.4 }}>▶</span>
        </div>
      )}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <p
          className="font-body font-semibold"
          style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-ochre)', margin: 0 }}
        >
          For retreat founders
        </p>
        <h3 className="font-display uppercase" style={{ fontSize: 18, lineHeight: 1.05, color: 'var(--color-cream)', margin: 0 }}>
          {title}
        </h3>
        <p className="font-body" style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(245,240,232,0.6)', margin: 0, flex: 1 }}>
          {description}
        </p>
        <span className="font-body font-semibold" style={{ fontSize: 12, color: 'var(--color-ochre)' }}>
          Watch →
        </span>
      </div>
    </a>
  )
}
