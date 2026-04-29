interface Props {
  pillar: string
  size?: number
  strokeColor?: string
}

export function PillarGlyph({ pillar, size = 18, strokeColor = 'currentColor' }: Props) {
  const s = { width: size, height: size, display: 'block', flexShrink: 0 }
  const st = { stroke: strokeColor, strokeWidth: 1.1, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  switch (pillar) {
    case 'Marketing Tools':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="16" cy="48" r="3.5" {...st} />
          <path d="M22 42 Q 28 36 36 40" {...st} />
          <path d="M26 34 Q 36 26 48 32" {...st} />
          <path d="M30 26 Q 42 16 56 22" {...st} />
        </svg>
      )

    case 'Insurance':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <path d="M32 6 L 54 16 L 54 36 Q 54 52 32 58 Q 10 52 10 36 L 10 16 Z" {...st} />
          <path d="M22 32 L 28 38 L 42 24" {...st} />
        </svg>
      )

    case 'Booking Software':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <rect x="8" y="14" width="48" height="44" rx="2" {...st} />
          <path d="M8 26 L 56 26" {...st} />
          <path d="M22 8 L 22 20" {...st} />
          <path d="M42 8 L 42 20" {...st} />
          <rect x="18" y="34" width="8" height="8" rx="1" {...st} strokeWidth={0.8} />
          <rect x="36" y="34" width="8" height="8" rx="1" {...st} strokeWidth={0.8} />
          <rect x="18" y="46" width="8" height="8" rx="1" {...st} strokeWidth={0.8} />
        </svg>
      )

    case 'Legal Templates':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <path d="M14 6 L 40 6 L 54 20 L 54 58 L 14 58 Z" {...st} />
          <path d="M40 6 L 40 20 L 54 20" {...st} />
          <path d="M22 32 L 46 32" {...st} />
          <path d="M22 40 L 46 40" {...st} />
          <path d="M22 48 L 38 48" {...st} />
        </svg>
      )

    case 'Photography':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="32" cy="32" r="24" {...st} />
          <circle cx="32" cy="32" r="10" {...st} />
          <path d="M32 8 L 32 22" {...st} strokeWidth={0.8} />
          <path d="M32 42 L 32 56" {...st} strokeWidth={0.8} />
          <path d="M8 32 L 22 32" {...st} strokeWidth={0.8} />
          <path d="M42 32 L 56 32" {...st} strokeWidth={0.8} />
        </svg>
      )

    default:
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="32" cy="32" r="22" {...st} />
        </svg>
      )
  }
}
