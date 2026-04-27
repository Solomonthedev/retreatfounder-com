import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Insurance — The Retreat Founder',
  description:
    "Insurance providers that actually understand retreat businesses. Liability, cancellation, and public liability coverage — compared honestly so you know what you're buying.",
}

export const revalidate = 60

export default async function InsuranceHub() {
  const tools = await fetchTools()
  const insuranceTools = tools.filter((t) => t.pillar === 'Insurance')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Insurance"
      headline="Don't discover the gaps"
      headlineAccent="mid-retreat."
      bodyText="Most retreat operators find out what their policy doesn't cover during a claim. These are the insurance providers that understand retreat businesses — liability, cancellation, public liability — compared honestly so you know exactly what you're buying before you need it."
      tools={insuranceTools}
      formId={formId}
    />
  )
}
