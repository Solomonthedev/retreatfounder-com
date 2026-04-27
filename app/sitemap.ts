import type { MetadataRoute } from 'next'
import { fetchTools } from '@/lib/airtable'
import { pillarToHubSlug } from '@/lib/pillar'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://retreatfounder.com'
  const tools = await fetchTools()

  const staticRoutes = [
    '',
    '/about',
    '/newsletter',
    '/directory',
    '/directory/marketing-tools',
    '/directory/insurance',
    '/directory/booking-software',
    '/directory/legal-templates',
    '/directory/photography',
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  const toolRoutes = tools.map((tool) => ({
    url: `${base}/directory/${pillarToHubSlug(tool.pillar)}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...toolRoutes]
}
