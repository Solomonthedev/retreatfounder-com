interface Props {
  beehiivEmbedUrl: string
}

export function Footer({ beehiivEmbedUrl }: Props) {
  return (
    <footer className="border-t border-ink/10 bg-cream mt-20">
      <div className="max-w-[1200px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="font-heading text-lg text-forest mb-2">The Retreat Founder</p>
          <p className="text-sm text-ink/60 max-w-xs">
            The resource directory for people building retreat businesses.
          </p>
        </div>
        <div>
          <p className="font-body text-sm font-medium text-ink mb-3">Join the waiting list</p>
          <iframe
            src={beehiivEmbedUrl}
            title="Beehiiv newsletter signup"
            className="w-full h-16 border-0"
          />
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 pb-6 text-xs text-ink/40 font-mono">
        © {new Date().getFullYear()} The Retreat Founder
      </div>
    </footer>
  )
}
