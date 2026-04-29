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

    case 'Venues & Spaces':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <path d="M10 52 L 10 28 Q 10 10 32 10 Q 54 10 54 28 L 54 52" {...st} />
          <path d="M6 52 L 58 52" {...st} strokeWidth={0.7} />
          <path d="M22 52 L 22 36 Q 22 24 32 24 Q 42 24 42 36 L 42 52" {...st} strokeWidth={0.8} opacity={0.75} />
          <path d="M16 16 Q 20 12 26 11" {...st} strokeWidth={0.6} opacity={0.5} />
        </svg>
      )

    case 'Logistics & Transport':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="12" cy="16" r="4.5" {...st} />
          <circle cx="52" cy="48" r="4.5" {...st} />
          <path d="M12 21 Q 12 38 32 38 Q 52 38 52 43" {...st} />
          <path d="M26 30 Q 32 26 38 30" {...st} strokeWidth={0.5} opacity={0.5} />
          <path d="M44 20 L 56 26 M 50 14 L 56 26 L 44 28" {...st} strokeWidth={0.7} opacity={0.6} />
        </svg>
      )

    case 'People & Practitioners':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="32" cy="12" r="5.5" {...st} />
          <path d="M32 18 L 32 30" {...st} strokeWidth={0.8} />
          <path d="M19 50 Q 19 30 32 30 Q 45 30 45 50" {...st} strokeWidth={0.9} />
          <circle cx="14" cy="28" r="3.5" {...st} strokeWidth={0.8} opacity={0.7} />
          <circle cx="50" cy="28" r="3.5" {...st} strokeWidth={0.8} opacity={0.7} />
          <path d="M17 30 L 22 33 M 47 30 L 42 33" {...st} strokeWidth={0.6} opacity={0.5} />
        </svg>
      )

    case 'Knowledge & Training':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <path d="M8 28 L 32 18 L 56 28 L 32 38 Z" {...st} />
          <path d="M20 32 L 20 44 Q 26 52 32 52 Q 38 52 44 44 L 44 32" {...st} strokeWidth={0.9} opacity={0.85} />
          <path d="M52 28 L 52 41" {...st} strokeWidth={0.9} />
          <path d="M48 41 L 56 41" {...st} strokeWidth={0.8} />
          <path d="M26 36 Q 32 39 38 36" {...st} strokeWidth={0.5} opacity={0.5} />
        </svg>
      )

    case 'Equipment & Materials':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="32" cy="32" r="11" {...st} />
          <circle cx="32" cy="32" r="4.5" {...st} />
          <path d="M32 14 L 32 18 M 32 46 L 32 50 M 14 32 L 18 32 M 46 32 L 50 32" {...st} strokeWidth={1.1} />
          <path d="M20 20 L 23 23 M 44 20 L 41 23 M 20 44 L 23 41 M 44 44 L 41 41" {...st} strokeWidth={0.9} />
        </svg>
      )

    case 'Curriculum & Content':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <path d="M16 8 L 42 8 L 52 18 L 52 56 L 16 56 Z" {...st} />
          <path d="M42 8 L 42 18 L 52 18" {...st} strokeWidth={0.7} />
          <path d="M24 28 L 44 28 M 24 36 L 44 36 M 24 44 L 36 44" {...st} strokeWidth={0.7} opacity={0.7} />
          <path d="M24 20 L 38 20" {...st} strokeWidth={0.6} opacity={0.5} />
        </svg>
      )

    case 'Community & Partnerships':
      return (
        <svg viewBox="0 0 64 64" style={s} aria-hidden>
          <circle cx="32" cy="12" r="5" {...st} />
          <circle cx="12" cy="48" r="5" {...st} />
          <circle cx="52" cy="48" r="5" {...st} />
          <path d="M29 17 L 15 44 M 35 17 L 49 44 M 17 48 L 47 48" {...st} strokeWidth={0.9} />
          <circle cx="32" cy="32" r="3" {...st} strokeWidth={0.7} opacity={0.65} />
          <path d="M25 28 L 18 42 M 39 28 L 46 42" {...st} strokeWidth={0.5} opacity={0.45} />
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
