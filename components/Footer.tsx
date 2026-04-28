import Link from 'next/link'

const DIRECTORY_LINKS = [
  { label: 'Marketing tools', href: '/directory/marketing-tools/' },
  { label: 'Insurance', href: '/directory/insurance/' },
  { label: 'Booking software', href: '/directory/booking-software/' },
  { label: 'Legal templates', href: '/directory/legal-templates/' },
  { label: 'Photography', href: '/directory/photography/' },
]

const LETTER_LINKS = [
  { label: 'Subscribe', href: '/newsletter' },
]

const PROJECT_LINKS = [
  { label: 'About this project', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Footer() {
  const underlineSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280 8' preserveAspectRatio='none'><path d='M2 5 Q 40 1 80 4 T 160 5 T 240 4 T 278 3' stroke='%23EFD37A' stroke-width='1.8' fill='none' stroke-linecap='round'/></svg>`

  return (
    <footer style={{ background: 'var(--color-ink)', color: 'var(--color-cream-200)' }}>
      <div className="mx-auto px-8 pt-16 pb-8" style={{ maxWidth: 1280 }}>
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <div>
            <span className="inline-flex items-baseline gap-1.5 leading-none">
              <span
                className="font-body italic font-semibold"
                style={{ fontSize: '0.55rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-sticky)', transform: 'translateY(-3px)', display: 'inline-block' }}
              >
                The
              </span>
              <span
                className="font-display uppercase"
                style={{ fontSize: '1.35rem', letterSpacing: '0.005em', position: 'relative', paddingBottom: 5, color: 'var(--color-cream)' }}
              >
                Retreat Founder
                <span
                  aria-hidden
                  style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: `url("${underlineSvg}") no-repeat center / 100% 100%` }}
                />
              </span>
            </span>
            <p className="font-body" style={{ fontSize: 14, lineHeight: 1.5, marginTop: 16, color: 'var(--color-cream-300)', maxWidth: 300 }}>
              The resource directory for retreat founders. Curated tools, honest verdicts, built in public.
            </p>
          </div>

          <FooterCol title="The directory" links={DIRECTORY_LINKS} />
          <FooterCol title="The letter" links={LETTER_LINKS} />
          <FooterCol title="About" links={PROJECT_LINKS} />
        </div>

        <div
          className="flex justify-between font-body"
          style={{ borderTop: '1px solid rgba(241,231,209,0.12)', paddingTop: 24, fontSize: 12, color: 'var(--color-ink-40)' }}
        >
          <span>© {new Date().getFullYear()} The Retreat Founder</span>
          <span>Set with Brownist, Hanken Grotesk &amp; Super Malibu 2.</span>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="font-body font-semibold" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-sticky)', marginBottom: 14 }}>
        {title}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {links.map(({ label, href }) => (
          <li key={href} style={{ marginBottom: 10 }}>
            <Link href={href} className="font-body no-underline footer-link" style={{ fontSize: 14, color: 'var(--color-cream-200)' }}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
