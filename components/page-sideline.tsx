export function PageSideline({ side, note, children }: {
  side: 'left' | 'right';
  note?: { href: `#${string}`; text: string };
  children?: React.ReactNode;
}) {
  return (
    <div className={`page-sideline sideline-${side}`}>
      {note && (
        <a className="sideline-note" href={note.href}>
          <span>{note.text}</span>
          <svg viewBox="0 0 95 39" fill="none" aria-hidden="true">
            <path d="M3 5c13 15 29 23 43 17 10-4 10-13 4-13-8 0-8 11 1 18 11 9 25 8 41-1m0 0-11-3m11 3-7 9" />
          </svg>
        </a>
      )}
      {children}
    </div>
  );
}

export type StickerKind = 'guestbook' | 'clipboard' | 'rocket' | 'flag';

export function SidelineSticker({ kind = 'guestbook' }: { kind?: StickerKind }) {
  return (
    <svg className={`sideline-sticker sticker-${kind}`} viewBox="0 0 144 127" fill="none" aria-hidden="true">
      <g className="sticker-figure" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M88 59c-4 12-3 28 3 43m-2-34C65 67 48 60 32 48l-9-10m9 10-14-3m14 3-2-13m56 41c-15 8-29 10-42 9m47 17-17 17m17-17 20 12" />
        <path d="M66 42c1-15 14-26 32-26 18 1 30 11 30 27 0 13-12 20-31 21-21 1-34-7-31-22Z" fill="var(--paper)" />
        <path d="M68 33c4-16 23-26 42-17l9 8c-16-4-32-2-51 9Z" fill="var(--sticker-accent)" />
        <path d="M68 33c-8 2-14 5-18 8 10 2 24 1 36-3" fill="var(--sticker-accent)" />
        <path d="M78 41h15v9H78zm24-1h15v9h-15z" fill="currentColor" />
        <path d="M93 44h9m15-2 9-4M91 56c5 2 9 2 13-1" />
      </g>
      {kind === 'clipboard' && (
        <g className="sticker-prop" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M103 75h25v25h-25z" fill="var(--paper)" />
          <path d="M109 73h13v6h-13z" fill="var(--sticker-accent)" />
          <path d="M109 85h13m-13 6h10" />
        </g>
      )}
      {kind === 'rocket' && (
        <g className="sticker-prop" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M108 96c-1-11 8-21 19-23 2 11-3 23-15 26z" fill="var(--sticker-accent)" />
          <path d="m109 88-7 5 5 2m11 0-1 7-6-2m-5 2-4 6m19-26h2" />
        </g>
      )}
      {kind === 'flag' && (
        <g className="sticker-prop" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M106 105V72" />
          <path d="M106 73c8-5 15 6 24 0v13c-9 6-16-5-24 0z" fill="var(--sticker-accent)" />
        </g>
      )}
      <path d="m42 27 2-6m-8 11-6-3m100 34 3 5m-10-1 1 6" stroke="var(--sticker-accent)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
