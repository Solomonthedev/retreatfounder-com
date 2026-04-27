'use client'
import { useState } from 'react'
import { subscribeToForm } from '@/lib/convertkit'

interface Props {
  formId: string
  label: string
  placeholder?: string
  onDark?: boolean
}

export function EmailCaptureForm({
  formId,
  label,
  placeholder = 'Your email',
  onDark = false,
}: Props) {
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const result = await subscribeToForm({
      email,
      formId,
      fields: { retreat_website: website || undefined },
    })
    setStatus(result.success ? 'success' : 'error')
  }

  if (status === 'success') {
    return (
      <p
        className="font-body"
        style={{
          fontSize: 16,
          color: onDark ? 'var(--color-cream)' : 'var(--color-field-green)',
        }}
      >
        You're on the list — we'll let you know when it's ready.
      </p>
    )
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: 15,
    padding: '11px 14px',
    borderRadius: 2,
    border: `1px solid ${onDark ? 'var(--color-cream)' : 'var(--color-cream-300)'}`,
    background: onDark ? 'transparent' : 'var(--color-cream)',
    color: onDark ? 'var(--color-cream)' : 'var(--color-ink)',
    outline: 'none',
    width: '100%',
    transition: 'border-color 140ms var(--ease-out)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={(e) => {
          ;(e.currentTarget as HTMLInputElement).style.borderColor =
            onDark ? 'var(--color-sticky)' : 'var(--color-field-green)'
        }}
        onBlur={(e) => {
          ;(e.currentTarget as HTMLInputElement).style.borderColor =
            onDark ? 'var(--color-cream)' : 'var(--color-cream-300)'
        }}
      />
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Your retreat website (optional)"
        aria-label="retreat website"
        style={inputStyle}
        onFocus={(e) => {
          ;(e.currentTarget as HTMLInputElement).style.borderColor =
            onDark ? 'var(--color-sticky)' : 'var(--color-field-green)'
        }}
        onBlur={(e) => {
          ;(e.currentTarget as HTMLInputElement).style.borderColor =
            onDark ? 'var(--color-cream)' : 'var(--color-cream-300)'
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="font-body font-semibold"
        style={{
          fontSize: 15,
          padding: '11px 20px',
          borderRadius: 4,
          border: 0,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          background: 'var(--color-ember)',
          color: 'var(--color-cream)',
          opacity: status === 'loading' ? 0.6 : 1,
          transition: 'background 140ms var(--ease-out)',
        }}
        onMouseOver={(e) => {
          if (status !== 'loading')
            (e.currentTarget as HTMLElement).style.background = 'var(--color-ember-700)'
        }}
        onMouseOut={(e) => {
          ;(e.currentTarget as HTMLElement).style.background = 'var(--color-ember)'
        }}
      >
        {status === 'loading' ? 'Submitting…' : label}
      </button>
      {status === 'error' && (
        <p className="font-body" style={{ fontSize: 13, color: '#C0392B' }}>
          Something went wrong — try again.
        </p>
      )}
    </form>
  )
}
