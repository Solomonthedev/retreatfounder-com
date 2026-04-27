import type { Tool, Category } from './types'

const BASE_URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`
const HEADERS = {
  Authorization: `Bearer ${process.env.AIRTABLE_PAT}`,
  'Content-Type': 'application/json',
}

async function airtableFetch(table: string, params: string = '') {
  const res = await fetch(`${BASE_URL}/${encodeURIComponent(table)}${params}`, {
    headers: HEADERS,
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Airtable error: ${res.status}`)
  return res.json()
}

function recordToTool(record: { id: string; fields: Record<string, unknown> }): Tool {
  const f = record.fields
  return {
    id: record.id,
    name: String(f['Name'] ?? ''),
    slug: String(f['Slug'] ?? ''),
    description: String(f['Description'] ?? ''),
    category: String(f['Category'] ?? ''),
    tags: Array.isArray(f['Tags']) ? (f['Tags'] as string[]) : [],
    logoUrl: f['Logo URL'] ? String(f['Logo URL']) : null,
    priceRange: f['Price Range'] ? String(f['Price Range']) : null,
    turfVerdict: f['TRF Verdict'] ? String(f['TRF Verdict']) : null,
    affiliateUrl: f['Affiliate URL'] ? String(f['Affiliate URL']) : null,
    featured: Boolean(f['Featured']),
    recommended: Boolean(f['Recommended']),
    status: (f['Status'] as Tool['status']) ?? 'Active',
  }
}

export async function fetchTools(): Promise<Tool[]> {
  const data = await airtableFetch('Resources', '?filterByFormula=({Status}="Active")')
  return (data.records as { id: string; fields: Record<string, unknown> }[]).map(recordToTool)
}

export async function fetchTool(slug: string): Promise<Tool | null> {
  const data = await airtableFetch(
    'Resources',
    `?filterByFormula=({Slug}="${slug}")`
  )
  if (!data.records.length) return null
  return recordToTool(data.records[0])
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await airtableFetch('Categories')
  const categories = (data.records as { id: string; fields: Record<string, unknown> }[]).map(
    (r) => ({
      id: r.id,
      name: String(r.fields['Name'] ?? ''),
      slug: String(r.fields['Slug'] ?? ''),
      description: r.fields['Description'] ? String(r.fields['Description']) : null,
      launchWeek: r.fields['Launch Week'] ? String(r.fields['Launch Week']) : null,
      status: (r.fields['Status'] as Category['status']) ?? 'Coming Soon',
      order: Number(r.fields['Order'] ?? 99),
    })
  )
  return categories.sort((a, b) => a.order - b.order)
}
