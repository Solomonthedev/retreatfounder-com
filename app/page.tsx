import { ToolCard } from '@/components/ToolCard'
import { ComingSoon } from '@/components/ComingSoon'
import { EmailCaptureForm } from '@/components/EmailCaptureForm'
import type { Tool } from '@/lib/types'

const previewTool: Tool = {
  id: 'preview',
  name: 'ConvertKit',
  slug: 'convertkit',
  description: 'Email marketing built for creators. Simple automations, clean sequences, and forms that retreat operators actually use.',
  category: 'Marketing Tools',
  tags: ['Email', 'Automation', 'Forms'],
  logoUrl: null,
  priceRange: 'Free – $29/mo',
  turfVerdict: 'Best starting point for retreat operators new to email. Easy to set up, good enough sequences, and the free tier gets you to 1,000 subscribers.',
  affiliateUrl: 'https://convertkit.com',
  featured: false,
  recommended: true,
  status: 'Active',
}

export default function PreviewPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-12 space-y-16">

      {/* Typography scale */}
      <section>
        <p className="font-mono text-xs text-ochre uppercase tracking-widest mb-4">Phase 0A — Design Review</p>
        <h1 className="font-heading text-5xl text-ink mb-3">Heading 1 — Gloock</h1>
        <h2 className="font-heading text-3xl text-ink mb-3">Heading 2 — Gloock</h2>
        <p className="font-body text-ink/80 max-w-xl mb-3">Body copy — Instrument Sans. The directory retreat operators actually need. Curated tools, honest verdicts, built in public.</p>
        <p className="font-mono text-sm text-ink/50">Mono label — DM Mono — Free – $29/mo</p>
      </section>

      {/* Colour swatches */}
      <section>
        <p className="font-mono text-xs text-ochre uppercase tracking-widest mb-4">Colour Palette</p>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded bg-forest flex items-end p-1"><span className="text-cream font-mono text-xs">forest</span></div>
          <div className="w-16 h-16 rounded bg-ochre flex items-end p-1"><span className="text-ink font-mono text-xs">ochre</span></div>
          <div className="w-16 h-16 rounded bg-ink flex items-end p-1"><span className="text-cream font-mono text-xs">ink</span></div>
          <div className="w-16 h-16 rounded bg-cream border border-ink/10 flex items-end p-1"><span className="text-ink font-mono text-xs">cream</span></div>
        </div>
      </section>

      {/* ToolCard */}
      <section>
        <p className="font-mono text-xs text-ochre uppercase tracking-widest mb-4">ToolCard Component</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ToolCard tool={previewTool} />
          <ToolCard tool={{ ...previewTool, id: 'p2', name: 'Beehiiv', slug: 'beehiiv', turfVerdict: null, affiliateUrl: null, tags: ['Newsletter', 'Monetisation'] }} />
          <ToolCard tool={{ ...previewTool, id: 'p3', name: 'Notion', slug: 'notion', priceRange: 'Free – $16/mo', tags: ['Productivity', 'All-in-One Platform'] }} />
        </div>
      </section>

      {/* EmailCaptureForm */}
      <section>
        <p className="font-mono text-xs text-ochre uppercase tracking-widest mb-4">EmailCaptureForm Component</p>
        <div className="max-w-sm">
          <EmailCaptureForm formId="preview" label="Join the list" placeholder="your@email.com" />
        </div>
      </section>

      {/* ComingSoon */}
      <section>
        <p className="font-mono text-xs text-ochre uppercase tracking-widest mb-4">ComingSoon Component</p>
        <ComingSoon categoryName="Retreat Insurance" formId="preview" description="Insurance providers who understand retreat businesses. Waiver-to-coverage guides included. Coming in Week 3." />
      </section>

    </div>
  )
}
