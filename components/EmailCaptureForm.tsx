'use client'
import { useState } from 'react'
import { subscribeToForm } from '@/lib/convertkit'

interface Props {
  formId: string
  label: string
  placeholder?: string
}

export function EmailCaptureForm({ formId, label, placeholder = 'Your email' }: Props) {
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
      <p className="text-forest font-body text-sm">
        You're on the list — we'll let you know when it's ready.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="email" className="sr-only">Email address</label>
      <input
        id="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="border border-ink/20 rounded px-4 py-2 text-sm font-body bg-cream focus:outline-none focus:border-forest"
      />
      <input
        type="url"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        placeholder="Your retreat website (optional)"
        aria-label="retreat website"
        className="border border-ink/20 rounded px-4 py-2 text-sm font-body bg-cream focus:outline-none focus:border-forest"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-forest text-cream font-body text-sm font-medium px-6 py-2 rounded hover:bg-ochre transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting…' : label}
      </button>
      {status === 'error' && (
        <p className="text-red-600 text-xs">Something went wrong — try again.</p>
      )}
    </form>
  )
}
