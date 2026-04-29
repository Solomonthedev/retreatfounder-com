import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Training & Education for Retreat Founders — The Retreat Founder',
  description:
    'Certifications, courses, and programmes built for retreat operators. The education that actually applies — not generic business school theory dressed in wellness language.',
}

export const revalidate = 60

export default async function KnowledgeTrainingHub() {
  const tools = await fetchTools()
  const sectionTools = tools.filter((t) => t.pillar === 'Knowledge & Training')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Knowledge & Training"
      headline="Learn from people"
      headlineAccent="who've done it."
      bodyText="Certifications, courses, masterminds, and programmes built for retreat operators — not generic business theory dressed in wellness language. The education that actually applies when you're running a real retreat business."
      tools={sectionTools}
      formId={formId}
    />
  )
}
