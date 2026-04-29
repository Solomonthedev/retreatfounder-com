import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Retreat Equipment & Supplies — The Retreat Founder',
  description:
    'Yoga mats, sound equipment, cold plunge tubs, welcome pack suppliers. The gear retreat founders actually use — curated by what holds up in practice.',
}

export const revalidate = 60

export default async function EquipmentMaterialsHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'Equipment & Materials')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Equipment & Materials"
      headline="The gear"
      headlineAccent="guests remember."
      bodyText="Yoga mats, sound equipment, cold plunge tubs, welcome packs. The suppliers retreat founders actually use — curated by what holds up in practice, not what has the best affiliate rate. Affiliate links always disclosed."
      tools={sectionTools}
      formId={formId}
    />
  )
}
