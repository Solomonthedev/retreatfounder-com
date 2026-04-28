import { unstable_cache } from 'next/cache'
import type { Tool, Category } from './types'

const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`
const HEADERS = {
  Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
  'Content-Type': 'application/json',
}

async function airtableFetchAll(table: string, params: string = ''): Promise<{ records: { id: string; fields: Record<string, unknown> }[] }> {
  const pat = process.env.AIRTABLE_PAT
  if (process.env.NODE_ENV !== 'test' && (!pat || pat.startsWith('placeholder'))) {
    console.warn('[airtable] AIRTABLE_PAT not set — returning empty data')
    return { records: [] }
  }

  const allRecords: { id: string; fields: Record<string, unknown> }[] = []
  let offset: string | undefined

  do {
    const sep = params.includes('?') ? '&' : '?'
    const url = `${BASE_URL}/${encodeURIComponent(table)}${params}${offset ? `${sep}offset=${offset}` : ''}`
    const res = await fetch(url, { headers: HEADERS, next: { revalidate: 60 } })
    if (!res.ok) throw new Error(`Airtable error: ${res.status}`)
    const data = await res.json()
    allRecords.push(...(data.records ?? []))
    offset = data.offset
  } while (offset)

  return { records: allRecords }
}

function recordToTool(record: { id: string; fields: Record<string, unknown> }): Tool {
  const f = record.fields
  return {
    id: record.id,
    name: String(f['Name'] ?? ''),
    slug: String(f['Slug'] ?? ''),
    tagline: f['Tagline'] ? String(f['Tagline']) : null,
    description: String(f['Description'] ?? ''),
    pillar: String(f['Pillar'] ?? ''),
    category: String(f['Category'] ?? ''),
    tags: Array.isArray(f['Tags']) ? (f['Tags'] as string[]) : [],
    useCases: Array.isArray(f['Use Case']) ? (f['Use Case'] as string[]) : [],
    logoUrl: f['Logo URL'] ? String(f['Logo URL']) : null,
    priceRange: f['Price Range'] ? String(f['Price Range']) : null,
    website: f['Website'] ? String(f['Website']) : null,
    screenshotUrl: f['Screenshot URL'] ? String(f['Screenshot URL']) : null,
    turfVerdict: f['TRF Verdict'] ? String(f['TRF Verdict']) : null,
    affiliateUrl: f['Affiliate Link'] ? String(f['Affiliate Link']) : null,
    featured: String(f['TRF Verdict'] ?? '') === 'Featured',
    recommended: String(f['TRF Verdict'] ?? '') === 'Recommended',
    status: (f['Status'] as Tool['status']) ?? 'Live',
  }
}

const fetchToolsCached = unstable_cache(
  async (): Promise<Tool[]> => {
    const data = await airtableFetchAll('Resources', '?filterByFormula=({Status}="Live")')
    return data.records.map(recordToTool)
  },
  ['tools-live'],
  { revalidate: 60 }
)

export async function fetchTools(): Promise<Tool[]> {
  if (process.env.NODE_ENV === 'test') {
    const data = await airtableFetchAll('Resources', '?filterByFormula=({Status}="Live")')
    return data.records.map(recordToTool)
  }
  return fetchToolsCached()
}

export async function fetchTool(slug: string, pillar?: string): Promise<Tool | null> {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const safeSlug = slug.replace(/"/g, '\\"')
  const data = await airtableFetchAll(
    'Resources',
    `?filterByFormula=({Slug}="${safeSlug}")`
  )
  if (!data.records.length) return null
  const tool = recordToTool(data.records[0])
  if (pillar && tool.pillar !== pillar) return null
  return tool
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await airtableFetchAll('Categories')
  const categories = data.records.map((r) => ({
    id: r.id,
    name: String(r.fields['Name'] ?? ''),
    slug: String(r.fields['Slug'] ?? ''),
    description: r.fields['Description'] ? String(r.fields['Description']) : null,
    launchWeek: r.fields['Launch Week'] ? String(r.fields['Launch Week']) : null,
    status: (r.fields['Status'] as Category['status']) ?? 'Coming Soon',
    order: Number(r.fields['Order'] ?? 99),
  }))
  return categories.sort((a, b) => a.order - b.order)
}
