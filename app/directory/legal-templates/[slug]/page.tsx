import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools.filter((t) => t.pillar === 'Legal Templates').map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug, 'Legal Templates')
  if (!tool) return {}
  return { title: `${tool.name} — Retreat Legal Templates`, description: tool.description }
}

export default async function LegalToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug, 'Legal Templates')
  if (!tool) notFound()
  return <ToolDetail tool={tool} hubPath="/directory/legal-templates/" hubLabel="Legal templates" />
}
