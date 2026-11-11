import type { ReactNode } from 'react';

export function PageSideline({ side, note, children }: {
  side: 'left' | 'right';
  note: { href: `#${string}`; text: string };
  children: ReactNode;
}) {
  return (
    <div className={`page-sideline sideline-${side}`}>
      <a className="sideline-link" href={note.href}>
        <span className="sideline-note">
          <span>{note.text}</span>
          <svg viewBox="0 0 95 39" fill="none" aria-hidden="true">
            <path d="M3 5c13 15 29 23 43 17 10-4 10-13 4-13-8 0-8 11 1 18 11 9 25 8 41-1m0 0-11-3m11 3-7 9" />
          </svg>
        </span>
        {children}
      </a>
    </div>
  );
}

export type StickerKind = 'guestbook' | 'clipboard' | 'rocket' | 'flag' | 'pull' | 'review' | 'terminal' | 'preview';

const pointingPose = 'M88 59c-4 12-3 28 3 43m-2-34C65 67 48 60 32 48l-9-10m9 10-14-3m14 3-2-13m56 41c-15 8-29 10-42 9m47 17-17 17m17-17 20 12';

const poses: Partial<Record<StickerKind, string>> = {
  pull: 'M95 60c5 8 9 20 10 33m-8-28L82 79l-17-9m36 5L86 88l-18-10m37 15-24 16-12 1m36-17 15 21h11',
  review: 'M94 60c-3 10-1 23 5 34m-6-26L74 73l-9-12m31 16 13 11 10-5m-20 11-17 18h-9m26-18 12 19h10',
  terminal: 'M52 61l5 31 17 3 2 19m-19-22-14 9-1 13m11-45 14 12 19-5m-31-2 10 12 20-3M39 94h26m-21 0v22m16-22v22',
  preview: 'M100 60c4 8 5 24 4 35m-4-26L79 60l-8-11m32 28 16-8 4-11m-19 37-13 18H80m24-18 17 17h9',
};

export function SidelineSticker({ kind = 'guestbook' }: { kind?: StickerKind }) {
  const pose = poses[kind];

  return (
    <svg className={`sideline-sticker sticker-${kind}`} viewBox="0 0 144 127" fill="none" aria-hidden="true">
      <g className="sticker-figure" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d={pose ?? pointingPose} />
        <g transform={kind === 'terminal' ? 'translate(-43 1)' : undefined}>
          <path d="M66 42c1-15 14-26 32-26 18 1 30 11 30 27 0 13-12 20-31 21-21 1-34-7-31-22Z" fill="var(--paper)" />
          <path d="M68 33c4-16 23-26 42-17l9 8c-16-4-32-2-51 9Z" fill="var(--sticker-accent)" />
          <path d="M68 33c-8 2-14 5-18 8 10 2 24 1 36-3" fill="var(--sticker-accent)" />
          <path d="M78 41h15v9H78zm24-1h15v9h-15z" fill="currentColor" />
          <path d="M93 44h9m15-2 9-4M91 56c5 2 9 2 13-1" />
        </g>
      </g>
      {kind === 'pull' && (
        <g className="sticker-motion" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M42 50c7 5 9 16 23 20l3 8" />
          <path d="m34 39 11 9-17 21 8 7-25 3-2-26 8 7z" fill="var(--sticker-accent)" />
          <path d="m12 42-6-5m17-2-1-7m-9 63-6 2" stroke="var(--sticker-accent)" />
        </g>
      )}
      {kind === 'review' && (
        <>
          <g stroke="var(--sticker-accent)" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 63v33m0-8c0-11 16-8 16-22" />
            <circle cx="21" cy="61" r="4" fill="var(--paper)" />
            <circle cx="21" cy="99" r="4" fill="var(--paper)" />
            <circle cx="37" cy="63" r="4" fill="var(--paper)" />
          </g>
          <g className="sticker-motion" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="53" cy="51" r="14" fill="var(--paper)" />
            <path d="m63 61 10 11" strokeWidth="4" />
            <path d="m47 51 4 4 7-8" stroke="var(--sticker-accent)" />
          </g>
        </>
      )}
      {kind === 'terminal' && (
        <g stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 90h56m-50 0v26m43-26v26" />
          <path d="M87 77h38l6-25H95zM87 77l-8 7h47l-1-7" fill="var(--paper)" />
          <path className="sticker-motion" d="m100 59 5 4-7 5m10 1h9" stroke="var(--sticker-accent)" />
          <path d="M123 43v-5m7 7 4-3" stroke="var(--sticker-accent)" />
        </g>
      )}
      {kind === 'preview' && (
        <g className="sticker-motion" transform="rotate(-9 42 51)" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="11" y="29" width="61" height="45" rx="4" fill="var(--paper)" />
          <path d="M11 40h61m-54-6h2m5 0h2m5 0h2" />
          <path d="M36 47v17l15-8z" fill="var(--sticker-accent)" />
        </g>
      )}
      {kind === 'clipboard' && (
        <g className="sticker-motion" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M103 75h25v25h-25z" fill="var(--paper)" />
          <path d="M109 73h13v6h-13z" fill="var(--sticker-accent)" />
          <path d="M109 85h13m-13 6h10" />
        </g>
      )}
      {kind === 'rocket' && (
        <g className="sticker-motion" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M108 96c-1-11 8-21 19-23 2 11-3 23-15 26z" fill="var(--sticker-accent)" />
          <path d="m109 88-7 5 5 2m11 0-1 7-6-2m-5 2-4 6m19-26h2" />
        </g>
      )}
      {kind === 'flag' && (
        <g className="sticker-motion" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
          <path d="M106 105V72" />
          <path d="M106 73c8-5 15 6 24 0v13c-9 6-16-5-24 0z" fill="var(--sticker-accent)" />
        </g>
      )}
      {!pose && (
        <path className="sticker-motion" d="m42 27 2-6m-8 11-6-3m100 34 3 5m-10-1 1 6" stroke="var(--sticker-accent)" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}
