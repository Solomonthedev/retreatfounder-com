import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Find Retreat Practitioners — The Retreat Founder',
  description:
    'Platforms and agencies where retreat founders find chefs, facilitators, sound healers, and more. Not individual profiles — the places where the right people actually are.',
}

export const revalidate = 60

export default async function PeoplePractitionersHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'People & Practitioners')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="People & Practitioners"
      headline="Find the people"
      headlineAccent="who make it happen."
      bodyText="Chefs, facilitators, sound healers, breathwork guides. The platforms and agencies where retreat founders actually find practitioners — not the ones who show up in Google, the ones who understand what a retreat actually needs."
      tools={sectionTools}
      formId={formId}
    />
  )
}
