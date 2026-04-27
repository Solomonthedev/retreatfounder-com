import Link from 'next/link'

export function Nav() {
  return (
    <nav className="border-b border-ink/10 bg-cream">
      <div className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-heading text-xl text-forest">
          The Retreat Founder
        </Link>
        <div className="flex items-center gap-6 text-sm font-body">
          <Link href="/directory/marketing-tools/" className="text-ink/70 hover:text-forest transition-colors">
            Directory
          </Link>
          <Link href="/newsletter" className="bg-forest text-cream px-4 py-1.5 rounded hover:bg-ochre transition-colors">
            Newsletter
          </Link>
        </div>
      </div>
    </nav>
  )
}
