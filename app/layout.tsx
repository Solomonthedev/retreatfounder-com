import type { Metadata } from 'next'
import { Gloock, Instrument_Sans, DM_Mono } from 'next/font/google'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${gloock.variable} ${instrumentSans.variable} ${dmMono.variable}`}
    >
      <body className="bg-cream text-ink font-body min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
