export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: string
  tags: string[]
  logoUrl: string | null
  priceRange: string | null
  turfVerdict: string | null
  affiliateUrl: string | null
  featured: boolean
  recommended: boolean
  status: 'Active' | 'Coming Soon' | 'Archived'
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

export interface ConvertKitSubscribePayload {
  email: string
  formId: string
  fields?: {
    retreat_website?: string
    first_name?: string
  }
}
