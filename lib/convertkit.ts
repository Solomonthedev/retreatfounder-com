import type { ConvertKitSubscribePayload } from './types'

interface SubscribeResult {
  success: boolean
  error?: string
}

export async function subscribeToForm(
  payload: ConvertKitSubscribePayload
): Promise<SubscribeResult> {
  try {
    const res = await fetch(
      `https://api.convertkit.com/v3/forms/${payload.formId}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email: payload.email,
          fields: payload.fields ?? {},
        }),
      }
    )
    if (!res.ok) return { success: false, error: `API error ${res.status}` }
    return { success: true }
  } catch (e) {
    return { success: false, error: String(e) }
  }
}
