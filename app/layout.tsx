import type { Metadata } from 'next'
import { Gloock, Instrument_Sans, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import './globals.css'

const gloock = Gloock({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-gloock',
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: { default: 'The Retreat Founder', template: '%s | The Retreat Founder' },
  description: 'The resource directory for people building retreat businesses.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://retreatfounder.com'),
}

const BEEHIIV_EMBED_URL = 'https://embeds.beehiiv.com/PLACEHOLDER'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${gloock.variable} ${instrumentSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-cream text-ink font-body min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer beehiivEmbedUrl={BEEHIIV_EMBED_URL} />
        <Analytics />
      </body>
    </html>
  )
}
