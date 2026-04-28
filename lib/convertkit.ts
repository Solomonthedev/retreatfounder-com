interface SubscribeResult {
  success: boolean
  error?: string
}

export async function subscribeToForm({
  email,
  formId,
}: {
  email: string
  formId: string
}): Promise<SubscribeResult> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, formId }),
    })
    if (!res.ok) return { success: false, error: `error ${res.status}` }
    return { success: true }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}
