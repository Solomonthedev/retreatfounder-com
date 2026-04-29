import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchTools } from '@/lib/airtable'
import { getFormId } from '@/lib/convertkit'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import { PillarGlyph } from '@/components/PillarGlyph'
import { Glyph } from '@/components/Glyphs'

export const metadata: Metadata = {
  title: 'The Retreat Founder — The Resource Directory',
  description:
    'Hand-checked tools, templates, and resources for retreat founders. No sponsored rankings. No 20% commissions.',
}

export const revalidate = 60

const ALL_SECTIONS = [
  {
    label: 'Marketing Tools',
    href: '/directory/marketing-tools/',
    subhead: 'Being found.',
    description: 'The tools that turn quiet programmes into full retreats — email, SEO, social, and the platforms that actually convert browsers into bookings.',
    num: '01',
  },
  {
    label: 'Insurance',
    href: '/directory/insurance/',
    subhead: 'Running protected.',
    description: 'You can\'t run a great retreat if you\'re exposed. The policies and providers retreat founders actually need — without the generic small-business filler.',
    num: '02',
  },
  {
    label: 'Booking Software',
    href: '/directory/booking-software/',
    subhead: 'Filling your retreat.',
    description: 'From waitlists to payment plans, the booking infrastructure that handles the admin so you can focus on the programme.',
    num: '03',
  },
  {
    label: 'Legal Templates',
    href: '/directory/legal-templates/',
    subhead: 'The paperwork that protects you.',
    description: 'Waivers, contracts, refund policies. Reviewed by people who understand retreat liability — not just generic business templates.',
    num: '04',
  },
  {
    label: 'Photography',
    href: '/directory/photography/',
    subhead: 'Capturing what you build.',
    description: 'The images that carry a retreat\'s atmosphere into a sales page. Photographers and tools that understand light, space, and the feeling you\'re selling.',
    num: '05',
  },
  {
    label: 'Venues & Spaces',
    href: '/directory/venues-spaces/',
    subhead: 'The space before a word is spoken.',
    description: 'Venue libraries, location agencies, and location scouts — the people who find retreat spaces so you don\'t have to start from zero.',
    num: '06',
  },
  {
    label: 'Logistics & Transport',
    href: '/directory/logistics-transport/',
    subhead: 'Getting everyone there.',
    description: 'Transfer companies, route planning, and logistics providers that understand group travel. Invisible when done right.',
    num: '07',
  },
  {
    label: 'People & Practitioners',
    href: '/directory/people-practitioners/',
    subhead: 'The team that makes it happen.',
    description: 'Chefs, facilitators, sound healers. The platforms and agencies where retreat founders actually find the practitioners they need.',
    num: '08',
  },
  {
    label: 'Knowledge & Training',
    href: '/directory/knowledge-training/',
    subhead: 'Learning from people who\'ve done it.',
    description: 'Certifications, courses, and programmes built for retreat operators — not generic business theory dressed in wellness language.',
    num: '09',
  },
  {
    label: 'Equipment & Materials',
    href: '/directory/equipment-materials/',
    subhead: 'The gear guests remember.',
    description: 'Yoga mats, sound equipment, cold plunge tubs, welcome packs. The suppliers retreat founders actually use — curated by what holds up in practice.',
    num: '10',
  },
  {
    label: 'Curriculum & Content',
    href: '/directory/curriculum-content/',
    subhead: 'What happens in the room.',
    description: 'Guided meditation scripts, workbook templates, facilitation guides. The content infrastructure that turns a loose schedule into a programme people talk about for years.',
    num: '11',
  },
  {
    label: 'Community & Partnerships',
    href: '/directory/community-partnerships/',
    subhead: 'The network that compounds.',
    description: 'Associations, masterminds, and partner networks for retreat founders. The rooms where the industry actually talks.',
    num: '12',
  },
]

export default async function HomePage() {
  const tools = await fetchTools()
  const toolCount = tools.length
  const NOTIFY_FORM = getFormId()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--color-rule)', padding: '64px 36px 48px', position: 'relative' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 56, alignItems: 'end' }} className="hero-grid">

          {/* Left — headline */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ color: 'var(--color-red)' }}>●</span>
              The resource directory for retreat founders
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(44px, 5.6vw, 80px)', lineHeight: 0.98, letterSpacing: '-0.025em', fontWeight: 300, margin: '0 0 28px' }}>
              The{' '}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                resources
                <span aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: '0.06em', height: '0.32em', background: 'var(--color-red-wash)', zIndex: -1 }} />
              </span>
              {' '}retreat founders<br />
              <em style={{ fontStyle: 'italic', fontWeight: 400, color: 'var(--color-red)' }}>actually deserve.</em>
            </h1>

            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.55, color: 'var(--color-ink-2)', maxWidth: 560, margin: '0 0 32px', fontWeight: 300 }}>
              A hand-checked index of tools, templates, and resources — built for the
              yoga teacher, breathwork coach, or wellness facilitator turning retreats
              into a real business. No sponsored rankings. No 20% commissions.
            </p>

            {/* Glyph wayfinding row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 32, paddingTop: 18, borderTop: '1px dashed var(--color-rule)', color: 'var(--color-ink-2)' }}>
              <Glyph name="Mountain" size={22} strokeWidth={1.1} />
              <Glyph name="Wave" size={22} strokeWidth={1.1} />
              <Glyph name="Pine" size={22} strokeWidth={1.1} />
              <Glyph name="Sun" size={22} strokeWidth={1.1} />
              <Glyph name="Bird" size={22} strokeWidth={1.1} />
              <Glyph name="Bowl" size={22} strokeWidth={1.1} />
              <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, color: 'var(--color-ink-3)', marginLeft: 4 }}>— what&rsquo;s inside</span>
            </div>
          </div>

          {/* Right — newsletter signup card */}
          <div style={{ background: 'var(--color-paper-deep)', border: '1px solid var(--color-rule)', padding: '22px 22px 20px', position: 'relative' }} className="signup-stripe">
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)', display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span>The Newsletter <span style={{ color: 'var(--color-red)' }}>/ Weekly</span></span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
              <Glyph name="Lantern" size={36} color="var(--color-red)" strokeWidth={1.1} />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, lineHeight: 1.15, fontWeight: 400, margin: 0, letterSpacing: '-0.01em' }}>
                Sent every Wednesday at 7am.
              </h2>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-ink-2)', margin: '0 0 16px', lineHeight: 1.5 }}>
              One thing to act on. Three resources worth trusting. Written for the founder building this alone.
            </p>

            <EmailCaptureForm formId={NOTIFY_FORM} label="Subscribe →" placeholder="your@email.com" />

            <div style={{ marginTop: 12, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--color-ink-3)' }}>
              For retreat founders who want sold out retreats — without feeling sales-y.
            </div>
          </div>
        </div>

        {/* Stats bar — glyph promise cards */}
        <div style={{ maxWidth: 1240, margin: '40px auto 0', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px dashed var(--color-rule)' }}>
          {/* Card 1 — Welcome */}
          <div style={{ padding: '20px 20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Glyph name="Mountain" size={28} color="var(--color-red)" strokeWidth={1.1} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1.25 }}>
              For the solo retreat founder.
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--color-ink-3)', lineHeight: 1.55 }}>
              Written by one, for one. No corporate voice.
            </div>
          </div>

          {/* Card 2 — Trust */}
          <div style={{ padding: '20px 20px 22px', borderLeft: '1px dashed var(--color-rule)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Glyph name="Bowl" size={28} color="var(--color-red)" strokeWidth={1.1} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1.25 }}>
              {toolCount} resources. Curated, not aggregated.
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--color-ink-3)', lineHeight: 1.55 }}>
              Hand-checked. No commissions taken.
            </div>
          </div>

          {/* Card 3 — Wayfinding */}
          <div style={{ padding: '20px 20px 22px', borderLeft: '1px dashed var(--color-rule)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Glyph name="Compass" size={28} color="var(--color-red)" strokeWidth={1.1} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1.25 }}>
              Twelve threads worth following.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {ALL_SECTIONS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="no-underline"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-ink-2)', padding: '3px 8px', border: '1px solid var(--color-rule)', borderRadius: 999 }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Card 4 — Cadence */}
          <div style={{ padding: '20px 20px 22px', borderLeft: '1px dashed var(--color-rule)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Glyph name="Lantern" size={28} color="var(--color-red)" strokeWidth={1.1} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 400, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1.25 }}>
              Updated every Wednesday.
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--color-ink-3)', lineHeight: 1.55 }}>
              One thing to act on. Free, always.
            </div>
          </div>
        </div>

        {/* Rotated stamp */}
        <div style={{ position: 'absolute', top: 56, right: 64, width: 96, height: 96, border: '1.5px solid var(--color-red)', borderRadius: '50%', display: 'grid', placeItems: 'center', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.16em', color: 'var(--color-red)', textTransform: 'uppercase', transform: 'rotate(-8deg)', lineHeight: 1.4, opacity: 0.85 }}>
          <span style={{ position: 'absolute', inset: 5, border: '1px solid var(--color-red)', borderRadius: '50%' }} />
          Hand<br />checked<br />2026
        </div>
      </section>

      {/* ── FIVE THREADS ─────────────────────────────────────────── */}
      <section style={{ borderBottom: '1px solid var(--color-rule)', padding: '56px 36px 60px', background: 'var(--color-paper-deep)', position: 'relative' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 36, maxWidth: 640 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: 'var(--color-red)' }}>●</span> Twelve threads we follow
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.4vw, 44px)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0 }}>
              Everything a retreat founder{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--color-red)' }}>needs to get right.</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderTop: '1px solid var(--color-rule)', borderBottom: '1px solid var(--color-rule)' }}>
            {ALL_SECTIONS.map(({ label, href, subhead, description, num }, i) => (
              <Link
                key={href}
                href={href}
                className="no-underline"
                style={{
                  padding: '28px 22px 24px',
                  borderLeft: i % 4 !== 0 ? '1px dashed var(--color-rule)' : 'none',
                  borderTop: i >= 4 ? '1px dashed var(--color-rule)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--color-ink-3)', marginBottom: 4 }}>{num}</div>
                <div style={{ height: 56, display: 'flex', alignItems: 'center', color: i % 2 === 1 ? 'var(--color-red)' : 'var(--color-ink)', margin: '6px 0 12px' }}>
                  <PillarGlyph pillar={label} size={48} strokeColor="currentColor" />
                </div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, letterSpacing: '-0.01em', color: 'var(--color-ink)', lineHeight: 1.1 }}>{subhead}</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13.5, lineHeight: 1.5, color: 'var(--color-ink-2)' }}>{description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
