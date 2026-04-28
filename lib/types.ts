export interface Tool {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string
  pillar: string
  category: string
  tags: string[]
  useCases: string[]
  logoUrl: string | null
  priceRange: string | null
  turfVerdict: string | null
  website: string | null
  screenshotUrl: string | null
  affiliateUrl: string | null
  featured: boolean
  recommended: boolean
  status: 'Live' | 'Coming Soon' | 'Archived'
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  launchWeek: string | null
  status: 'Live' | 'Coming Soon'
  order: number
}

export interface AffiliatePartner {
  id: string
  toolName: string
  affiliateUrl: string
  commissionRate: string | null
  network: string | null
}
