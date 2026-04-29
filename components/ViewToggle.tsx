interface Props {
  view: 'grid' | 'list'
  onToggle: (v: 'grid' | 'list') => void
}

export function ViewToggle({ view, onToggle }: Props) {
  const base: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '8px 16px',
    border: '1px solid var(--color-cream-300)',
    background: 'transparent',
    cursor: 'pointer',
    transition: 'background 0.12s, border-color 0.12s, color 0.12s',
    fontFamily: 'inherit',
  }
  const active: React.CSSProperties = {
    ...base,
    background: 'var(--color-ink)',
    borderColor: 'var(--color-ink)',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      <button
        onClick={() => onToggle('list')}
        title="Row view"
        style={view === 'list' ? active : base}
        aria-pressed={view === 'list'}
      >
        <ListIcon active={view === 'list'} />
        <span
          className="font-body"
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: view === 'list' ? '#F1E7D1' : 'var(--color-ink-60)',
          }}
        >
          Rows
        </span>
      </button>
      <button
        onClick={() => onToggle('grid')}
        title="Card view"
        style={{ ...(view === 'grid' ? active : base), borderLeft: 'none' }}
        aria-pressed={view === 'grid'}
      >
        <GridIcon active={view === 'grid'} />
        <span
          className="font-body"
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: view === 'grid' ? '#F1E7D1' : 'var(--color-ink-60)',
          }}
        >
          Cards
        </span>
      </button>
    </div>
  )
}

function GridIcon({ active }: { active: boolean }) {
  const c = active ? '#F1E7D1' : 'var(--color-ink-40)'
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect x="1" y="1" width="5" height="5" rx="0.5" stroke={c} strokeWidth="1.2" />
      <rect x="8" y="1" width="5" height="5" rx="0.5" stroke={c} strokeWidth="1.2" />
      <rect x="1" y="8" width="5" height="5" rx="0.5" stroke={c} strokeWidth="1.2" />
      <rect x="8" y="8" width="5" height="5" rx="0.5" stroke={c} strokeWidth="1.2" />
    </svg>
  )
}

function ListIcon({ active }: { active: boolean }) {
  const c = active ? '#F1E7D1' : 'var(--color-ink-40)'
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
      <line x1="1" y1="3.5" x2="13" y2="3.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="1" y1="7" x2="13" y2="7" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="1" y1="10.5" x2="13" y2="10.5" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}
