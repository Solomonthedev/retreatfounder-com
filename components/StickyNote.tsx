'use client'

interface Props {
  quote: string
  attribution?: string
  rotate?: number
  maxWidth?: number
  className?: string
}

export function StickyNote({
  quote,
  attribution,
  rotate = -2,
  maxWidth = 260,
  className = '',
}: Props) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--color-sticky)',
        padding: '22px 20px 16px',
        boxShadow: 'var(--shadow-sticky)',
        transform: `rotate(${rotate}deg)`,
        maxWidth,
        transition: 'transform 240ms var(--ease-out)',
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.transform = `rotate(${rotate * 0.4}deg)`
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.transform = `rotate(${rotate}deg)`
      }}
    >
      <p
        className="font-body"
        style={{
          fontStyle: 'italic',
          fontSize: 16,
          lineHeight: 1.35,
          color: 'var(--color-ink)',
          margin: 0,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      {attribution && (
        <p
          className="font-body"
          style={{
            marginTop: 12,
            fontSize: 9,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            fontWeight: 700,
          }}
        >
          — {attribution}
        </p>
      )}
    </div>
  )
}
