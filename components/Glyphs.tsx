interface GlyphProps {
  size?: number
  color?: string
  strokeWidth?: number
  style?: React.CSSProperties
}

function makeGlyph(viewBox: string, paths: React.ReactNode) {
  return function Glyph({ size = 28, color = 'currentColor', strokeWidth = 1.1, style }: GlyphProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
        aria-hidden
      >
        {paths}
      </svg>
    )
  }
}

export const GlyphMountain = makeGlyph('0 0 64 64', (
  <>
    <path d="M4 52 Q 8 50 12 48 L 22 30 Q 24 27 26 30 L 34 42 L 40 34 Q 42 31 44 34 L 60 52" />
    <path d="M22 30 L 26 36 M 40 34 L 36 40" strokeWidth={0.6} opacity={0.6} />
    <path d="M22 30 L 24 24 L 27 28 M 40 34 L 41 30 L 44 32" strokeWidth={0.7} opacity={0.7} />
    <path d="M3 53 Q 32 55 61 53" strokeWidth={0.6} opacity={0.5} />
  </>
))

export const GlyphLeaf = makeGlyph('0 0 64 64', (
  <>
    <path d="M14 50 Q 14 18 50 14 Q 52 42 18 52 Q 16 51 14 50 Z" />
    <path d="M14 50 Q 30 36 48 16" strokeWidth={0.7} opacity={0.7} />
    <path d="M22 42 Q 28 38 32 32 M 28 46 Q 36 40 40 32 M 34 48 Q 40 42 44 34" strokeWidth={0.5} opacity={0.5} />
  </>
))

export const GlyphSun = makeGlyph('0 0 64 64', (
  <>
    <circle cx="32" cy="32" r="11" />
    <path d="M32 12 V 6 M 32 58 V 52 M 12 32 H 6 M 58 32 H 52" strokeWidth={0.9} />
    <path d="M17 17 L 13 13 M 51 13 L 47 17 M 17 47 L 13 51 M 47 47 L 51 51" strokeWidth={0.9} opacity={0.8} />
    <path d="M26 32 Q 32 28 38 32" strokeWidth={0.6} opacity={0.6} />
  </>
))

export const GlyphHands = makeGlyph('0 0 64 64', (
  <>
    <path d="M14 46 Q 12 38 16 32 Q 18 28 22 28 L 24 22 Q 25 18 28 19 Q 30 20 30 24 L 30 32" />
    <path d="M30 32 L 30 22 Q 30 18 33 18 Q 36 18 36 22 L 36 30" />
    <path d="M36 30 L 36 24 Q 36 20 39 20 Q 42 20 42 24 L 42 32" />
    <path d="M42 32 L 42 28 Q 42 24 45 24 Q 48 24 48 28 L 48 38 Q 48 50 36 52 L 24 52 Q 14 50 14 46 Z" />
    <path d="M22 34 Q 24 36 28 35" strokeWidth={0.5} opacity={0.5} />
  </>
))

export const GlyphCompass = makeGlyph('0 0 64 64', (
  <>
    <circle cx="32" cy="32" r="22" />
    <circle cx="32" cy="32" r="18" strokeWidth={0.5} opacity={0.4} />
    <path d="M32 22 L 36 32 L 32 42 L 28 32 Z" />
    <path d="M32 22 L 28 32 L 32 42" strokeWidth={0.6} opacity={0.6} />
    <circle cx="32" cy="32" r="1.4" fill="currentColor" stroke="none" />
    <path d="M32 12 V 9 M 32 55 V 52 M 12 32 H 9 M 55 32 H 52" strokeWidth={0.7} />
  </>
))

export const GlyphHouse = makeGlyph('0 0 64 64', (
  <>
    <path d="M10 30 L 32 12 L 54 30" />
    <path d="M14 28 L 14 52 L 50 52 L 50 28" />
    <path d="M26 52 L 26 38 L 38 38 L 38 52" />
    <path d="M30 30 L 34 30 M 18 36 L 22 36 M 42 36 L 46 36" strokeWidth={0.6} opacity={0.6} />
    <path d="M44 18 L 44 24 L 49 24" strokeWidth={0.7} opacity={0.7} />
  </>
))

export const GlyphBowl = makeGlyph('0 0 64 64', (
  <>
    <path d="M12 32 Q 12 50 32 50 Q 52 50 52 32 Z" />
    <path d="M14 36 Q 32 40 50 36" strokeWidth={0.6} opacity={0.5} />
    <path d="M26 22 Q 24 18 26 14 M 32 22 Q 30 18 32 14 M 38 22 Q 36 18 38 14" strokeWidth={0.7} opacity={0.7} />
  </>
))

export const GlyphBook = makeGlyph('0 0 64 64', (
  <>
    <path d="M8 18 Q 20 16 32 22 Q 44 16 56 18 L 56 50 Q 44 48 32 54 Q 20 48 8 50 Z" />
    <path d="M32 22 L 32 54" strokeWidth={0.7} />
    <path d="M14 26 Q 22 25 28 28 M 14 32 Q 22 31 28 34 M 14 38 Q 22 37 28 40" strokeWidth={0.5} opacity={0.6} />
    <path d="M36 28 Q 44 25 50 26 M 36 34 Q 44 31 50 32 M 36 40 Q 44 37 50 38" strokeWidth={0.5} opacity={0.6} />
  </>
))

export const GlyphPine = makeGlyph('0 0 64 64', (
  <>
    <path d="M32 8 L 22 22 L 28 22 L 18 34 L 26 34 L 14 48 L 50 48 L 38 34 L 46 34 L 36 22 L 42 22 Z" />
    <path d="M32 48 L 32 56" strokeWidth={0.9} />
    <path d="M28 56 L 36 56" strokeWidth={0.7} />
  </>
))

export const GlyphBird = makeGlyph('0 0 64 64', (
  <>
    <path d="M8 36 Q 18 24 30 28 Q 38 30 44 24 Q 50 18 54 22 Q 52 30 46 34 Q 40 38 32 38 Q 22 38 16 44" />
    <path d="M30 28 Q 28 24 30 20 M 36 28 Q 36 22 40 18" strokeWidth={0.6} opacity={0.6} />
    <circle cx="49" cy="24" r="0.8" fill="currentColor" stroke="none" />
  </>
))

export const GlyphWave = makeGlyph('0 0 64 64', (
  <>
    <path d="M6 38 Q 14 30 22 38 T 38 38 T 54 38 T 62 38" />
    <path d="M6 46 Q 14 38 22 46 T 38 46 T 54 46 T 62 46" strokeWidth={0.8} opacity={0.7} />
    <path d="M6 30 Q 14 22 22 30 T 38 30 T 54 30 T 62 30" strokeWidth={0.6} opacity={0.5} />
  </>
))

export const GlyphPen = makeGlyph('0 0 64 64', (
  <>
    <path d="M14 50 L 18 46 L 46 18 L 50 22 L 22 50 Z" />
    <path d="M44 20 L 48 24" strokeWidth={0.7} />
    <path d="M14 50 L 18 46 L 14 50 L 12 52 Z" fill="currentColor" stroke="none" />
    <path d="M22 50 L 30 50" strokeWidth={0.6} opacity={0.5} />
  </>
))

export const GlyphLantern = makeGlyph('0 0 64 64', (
  <>
    <path d="M22 16 L 42 16" />
    <path d="M32 8 L 32 16" />
    <path d="M20 18 Q 18 32 20 46 L 44 46 Q 46 32 44 18 Z" />
    <path d="M20 22 L 44 22 M 20 42 L 44 42" strokeWidth={0.6} opacity={0.6} />
    <path d="M28 28 Q 32 32 36 28 M 28 36 Q 32 32 36 36" strokeWidth={0.5} opacity={0.5} />
    <path d="M32 46 L 32 54 M 28 54 L 36 54" strokeWidth={0.7} />
  </>
))

export const GlyphFlame = makeGlyph('0 0 64 64', (
  <>
    <path d="M32 8 Q 22 22 22 36 Q 22 50 32 54 Q 42 50 42 36 Q 42 26 36 18 Q 34 24 30 22 Q 32 16 32 8 Z" />
    <path d="M28 38 Q 32 44 36 38 Q 36 32 32 30 Q 28 32 28 38 Z" strokeWidth={0.7} opacity={0.7} />
  </>
))

export const GlyphHeart = makeGlyph('0 0 64 64', (
  <>
    <path d="M32 52 Q 12 40 12 24 Q 12 14 22 14 Q 28 14 32 22 Q 36 14 42 14 Q 52 14 52 24 Q 52 40 32 52 Z" />
    <path d="M22 22 Q 26 24 28 28" strokeWidth={0.5} opacity={0.5} />
  </>
))

export const GLYPHS = {
  Mountain: GlyphMountain,
  Leaf:     GlyphLeaf,
  Sun:      GlyphSun,
  Hands:    GlyphHands,
  Compass:  GlyphCompass,
  House:    GlyphHouse,
  Bowl:     GlyphBowl,
  Book:     GlyphBook,
  Pine:     GlyphPine,
  Bird:     GlyphBird,
  Wave:     GlyphWave,
  Pen:      GlyphPen,
  Lantern:  GlyphLantern,
  Flame:    GlyphFlame,
  Heart:    GlyphHeart,
} as const

export type GlyphName = keyof typeof GLYPHS

export function Glyph({ name, size = 28, color = 'currentColor', strokeWidth = 1.1, style }: GlyphProps & { name: GlyphName }) {
  const G = GLYPHS[name]
  return <G size={size} color={color} strokeWidth={strokeWidth} style={style} />
}
