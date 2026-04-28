import type { Metadata } from 'next'
import { fetchTools } from '@/lib/airtable'
import { CategoryHub } from '@/components/CategoryHub'

export const metadata: Metadata = {
  title: 'Retreat Booking Software — The Retreat Founder',
  description:
    'Booking software built for retreat operators, not hotels. Deposits, group bookings, intake forms, and payment processing — without the hotel-tier fees.',
}

export const revalidate = 60

export default async function BookingSoftwareHub() {
  const tools = await fetchTools()
  const bookingTools = tools.filter((t) => t.pillar === 'Booking Software')
  const formId = process.env.CONVERTKIT_NOTIFY_FORM_ID ?? 'preview'

  return (
    <CategoryHub
      pillarName="Booking Software"
      headline="Your bookings shouldn't live"
      headlineAccent="in your inbox."
      bodyText="WeTravel, FareHarbor, Retreat Guru — there are more booking platforms than you'd think, and they're not all built the same. These are the tools that handle deposits, group bookings, intake forms, and payment processing without charging hotel-tier fees or requiring a developer to set up."
      tools={bookingTools}
      formId={formId}
    />
  )
}
