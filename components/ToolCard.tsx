import type { Tool } from '@/lib/types'

interface Props { tool: Tool }

export function ToolCard({ tool }: Props) {
  return (
    <article className="bg-white border border-ink/10 rounded-lg p-6 flex flex-col gap-4 hover:border-ochre transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-heading text-xl text-ink">{tool.name}</h3>
          {tool.priceRange && (
            <p className="font-mono text-sm text-ink/50 mt-1">{tool.priceRange}</p>
          )}
        </div>
        {tool.logoUrl && (
          <img src={tool.logoUrl} alt={`${tool.name} logo`} className="w-10 h-10 object-contain" />
        )}
      </div>

      <p className="text-ink/80 text-sm leading-relaxed">{tool.description}</p>

      {tool.turfVerdict && (
        <blockquote className="border-l-2 border-ochre pl-4 text-sm text-ink/70 italic">
          {tool.turfVerdict}
        </blockquote>
      )}

      {tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag) => (
            <span key={tag} className="font-mono text-xs bg-cream text-ink/60 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      {tool.affiliateUrl && (
        <a
          href={tool.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-body font-medium text-forest hover:text-ochre transition-colors"
        >
          Visit {tool.name} →
        </a>
      )}
    </article>
  )
}
