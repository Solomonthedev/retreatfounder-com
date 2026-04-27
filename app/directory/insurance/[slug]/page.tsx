import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools
    .filter((t) => t.pillar === 'Insurance')
    .map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug, 'Insurance')
  if (!tool) return {}
  return { title: `${tool.name} — Retreat Insurance`, description: tool.description }
}

export default async function InsuranceToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug, 'Insurance')
  if (!tool) notFound()
  return <ToolDetail tool={tool} hubPath="/directory/insurance/" hubLabel="Retreat insurance" />
}
