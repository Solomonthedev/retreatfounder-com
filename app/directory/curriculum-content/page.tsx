import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Retreat Curriculum & Content Resources — The Retreat Founder',
  description:
    'Guided meditation scripts, workbook templates, facilitation guides. The content infrastructure that turns a loose schedule into a programme people talk about for years.',
}

export const revalidate = 60

export default async function CurriculumContentHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'Curriculum & Content')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Curriculum & Content"
      headline="What happens"
      headlineAccent="in the room."
      bodyText="Guided meditation scripts, workbook templates, facilitation guides, and session frameworks. The content infrastructure that turns a loose schedule into a programme people talk about for years."
      tools={sectionTools}
      formId={formId}
    />
  )
}
