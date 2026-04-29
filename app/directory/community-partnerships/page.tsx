import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Retreat Founder Communities & Networks — The Retreat Founder',
  description:
    'Associations, masterminds, affiliate networks, and partner communities for retreat founders. The rooms where the industry actually talks.',
}

export const revalidate = 60

export default async function CommunityPartnershipsHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'Community & Partnerships')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Community & Partnerships"
      headline="The network"
      headlineAccent="that compounds."
      bodyText="Associations, masterminds, affiliate networks, and partner communities for retreat founders. The rooms where the industry actually talks — and where the best opportunities come from people who've already solved the problem you're stuck on."
      tools={sectionTools}
      formId={formId}
    />
  )
}
