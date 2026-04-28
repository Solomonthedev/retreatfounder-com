import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Retreat Legal Templates — The Retreat Founder',
  description:
    'Contracts, liability waivers, and refund policy guides built for retreat operators. Written by lawyers who understand what actually goes wrong on a retreat.',
}

export const revalidate = 60

export default async function LegalTemplatesHub() {
  const tools = await fetchTools()
  const legalTools = tools.filter((t) => t.pillar === 'Legal Templates')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Legal Templates"
      headline="A waiver you wrote yourself"
      headlineAccent="isn't a waiver."
      bodyText="Retreat operators are often one incident away from a very expensive lesson in contract law. These are the templates and tools that give you proper participant waivers, booking contracts, refund policies, and photo release forms — built for the retreat context, not a generic small business."
      tools={legalTools}
      formId={formId}
    />
  )
}
