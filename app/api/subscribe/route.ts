import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email, formId } = await req.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!formId || !/^\d+$/.test(String(formId))) {
    return NextResponse.json({ error: 'Invalid formId' }, { status: 400 })
  }

  const apiKey = process.env.CONVERTKIT_API_KEY
  if (!apiKey || apiKey.startsWith('placeholder')) {
    return NextResponse.json({ error: 'Newsletter not configured' }, { status: 503 })
  }

  const res = await fetch(
    `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: apiKey, email }),
    }
  )

  if (!res.ok) return NextResponse.json({ error: `upstream ${res.status}` }, { status: 502 })
  return NextResponse.json({ success: true })
}
