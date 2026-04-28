import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import './globals.css'

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata: Metadata = {
  title: { default: 'The Retreat Founder', template: '%s | The Retreat Founder' },
  description: 'The resource directory for people building retreat businesses.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://retreatfounder.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={hankenGrotesk.variable}>
      <head>
        <link rel="preload" href="/fonts/Brownist.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="bg-cream text-ink font-body min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
