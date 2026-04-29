import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Venue Libraries for Retreat Founders — The Retreat Founder',
  description:
    'Location agencies, venue libraries, and estate scouts that understand retreat requirements. Find the space that sets the mood before anyone says a word.',
}

export const revalidate = 60

export default async function VenuesSpacesHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'Venues & Spaces')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Venues & Spaces"
      headline="The space sets the mood"
      headlineAccent="before a word is spoken."
      bodyText="Venue libraries, location agencies, and estate scouts that understand retreat requirements. Not individual venues — the people and platforms that find them for you, across every format from country manors to forest bathing sites."
      tools={sectionTools}
      formId={formId}
    />
  )
}
