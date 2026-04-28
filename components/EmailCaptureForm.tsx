'use client'
import { useState } from 'react'
import { subscribeToForm } from '@/lib/convertkit'

interface Props {
  formId: string | null
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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formId) return
    setStatus('loading')
    const result = await subscribeToForm({ email, formId })
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
        {"You're on the list — see you Friday."}
      </p>
    )
  }

  if (!formId) {
    return (
      <p className="font-body" style={{ fontSize: 14, color: onDark ? 'rgba(245,240,232,0.5)' : 'var(--color-ink-40)' }}>
        Newsletter coming soon.
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
      <label htmlFor="email-capture" className="sr-only">
        Email address
      </label>
      <input
        id="email-capture"
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
      <button
        type="submit"
        disabled={status === 'loading'}
        className="font-body font-semibold btn-ember"
        style={{
          fontSize: 15,
          padding: '11px 20px',
          borderRadius: 4,
          border: 0,
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          background: 'var(--color-ember)',
          color: 'var(--color-cream)',
          opacity: status === 'loading' ? 0.6 : 1,
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
