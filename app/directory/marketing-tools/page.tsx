import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'
import { getFormId } from '@/lib/convertkit'

export const metadata: Metadata = {
  title: 'Marketing Tools for Retreat Founders',
  description:
    'No sponsored rankings. Every tool on this page was chosen because retreat founders — people stalling at half capacity and struggling to break even — actually use it.',
}

export const revalidate = 60

export default async function MarketingToolsHub() {
  const tools = await fetchTools()
  const marketingTools = tools.filter((t) => t.pillar === 'Marketing Tools')
  const formId = getFormId()

  return (
    <CategoryHub
      pillarName="Marketing Tools"
      headline="Stop stalling at"
      headlineAccent="half capacity."
      bodyText="No sponsored rankings. No generic listicles. Every tool here was chosen because retreat founders — people stalling at half capacity, struggling to price for profit — actually needed it. Affiliate links always disclosed."
      tools={marketingTools}
      formId={formId}
    />
  )
}
