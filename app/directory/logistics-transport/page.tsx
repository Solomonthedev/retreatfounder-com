import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Retreat Logistics & Transport — The Retreat Founder',
  description:
    'Transfer companies, route planning, and logistics providers built for group travel. Nobody remembers smooth logistics — but everyone remembers the van that didn\'t show up.',
}

export const revalidate = 60

export default async function LogisticsTransportHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'Logistics & Transport')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Logistics & Transport"
      headline="Get everyone there"
      headlineAccent="and back again."
      bodyText="The invisible layer that makes or breaks a retreat. Transfer companies, route planning services, and logistics providers that understand group travel — because nobody remembers smooth logistics, but everyone remembers the van that didn't show up."
      tools={sectionTools}
      formId={formId}
    />
  )
}
