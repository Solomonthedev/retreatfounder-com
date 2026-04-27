import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Photography — The Retreat Founder',
  description:
    'Photographers who shoot retreats as they actually are. Golden-hour light, long tables, real people. No yoga-mat pack shots.',
}

export const revalidate = 60

export default async function PhotographyHub() {
  const tools = await fetchTools()
  const photographyTools = tools.filter((t) => t.pillar === 'Photography')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Photography"
      headline="Your best retreat photos are on"
      headlineAccent="someone's phone."
      bodyText="People don't sign up for a retreat based on a description — they sign up because they saw a photo and felt something. These are photographers who shoot retreats as they actually are: golden-hour light, long tables, real people. Not staged yoga-mat pack shots. No AI. Just the real thing."
      tools={photographyTools}
      formId={formId}
    />
  )
}
