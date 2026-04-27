import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchTools, fetchTool } from '@/lib/airtable'
import { ToolDetail } from '@/components/ToolDetail'

export const revalidate = 60

export async function generateStaticParams() {
  const tools = await fetchTools()
  return tools
    .filter((t) => t.pillar === 'Marketing Tools')
    .map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = await fetchTool(slug, 'Marketing Tools')
  if (!tool) return {}
  return {
    title: `${tool.name} — Marketing Tools for Retreat Founders`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = await fetchTool(slug, 'Marketing Tools')
  if (!tool) notFound()

  return (
    <ToolDetail
      tool={tool}
      hubPath="/directory/marketing-tools/"
      hubLabel="Marketing tools"
    />
  )
}
