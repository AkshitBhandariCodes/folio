'use client';

import { useEffect, useState } from 'react';

const gear = {
  cricket: { label: 'Swing the cricket bat', color: '#edbd71', reaction: 'THAT’S A SIX!' },
  badminton: { label: 'Hit the shuttlecock', color: '#bca6ff', reaction: 'OVER THE NET!' },
  football: { label: 'Kick the football', color: '#8ee5b0', reaction: 'GOAL!' },
} as const;

type Sport = keyof typeof gear;

function GearSprite({ sport }: { sport: Sport }) {
  if (sport === 'cricket') return (
    <svg className="gear-art" viewBox="0 0 96 108" shapeRendering="crispEdges" aria-hidden="true">
      <g className="gear-swing">
        <path d="M42 5h13v3h3v35h4v47h-3v8h-4v5H33v-4h-4V50h4V40h6V9h3z" fill="#2a1c19" />
        <path d="M43 8h11v31H43z" fill="#ba574b" />
        <path d="M44 10h3v27h-3zM51 12h4v4h-4zm0 8h4v4h-4zm0 8h4v4h-4z" fill="#eb8a72" />
        <path d="M40 38h17v6h3v47h-5v7H35v-4h-3V50h4v-7h4z" fill="#d09351" />
        <path d="M40 44h15v48H35V52h5z" fill="#f4c780" />
        <path d="M38 55h3v33h-3zM44 49h2v15h-2zm6 13h2v24h-2z" fill="#ffe5af" />
        <path d="M40 45h15v8H40zm4 10h7v2h-7z" fill="#9a4a3f" />
        <path d="M35 96h21v3H35z" fill="#89473a" />
      </g>
      <g className="gear-ball">
        <path d="M67 74h12v3h4v11h-3v5H67v-3h-4V79h4z" fill="#b9424b" />
        <path d="M68 76h10v3h-6v4h-5v-4h1z" fill="#f38d7b" />
        <path d="M80 80v4h-4v4h-5v4h-2v-5h5v-4h4v-3z" fill="#ffe4be" />
      </g>
    </svg>
  );
  if (sport === 'badminton') return (
    <svg className="gear-art" viewBox="0 0 96 108" shapeRendering="crispEdges" aria-hidden="true">
      <g className="gear-swing">
        <path d="M34 5h25v4h9v8h6v27h-5v9h-8v6H52v14h3v30H40V73h3V59h-8v-5h-9v-9h-5V18h5v-8h8z" fill="#382a57" />
        <path d="M35 8h23v4h9v8h4v22h-4v9h-8v5H35v-5h-8v-9h-3V20h5v-8h6z" fill="#ae94fb" />
        <path d="M36 14h21v4h7v6h2v15h-3v8h-8v4H37v-4h-7v-8h-2V25h3v-7h5z" fill="#241c38" />
        <path d="M36 15h1v34h-1zm7 0h1v35h-1zm7 0h1v35h-1zm7 0h1v34h-1zM30 22h33v1H30zm-2 7h38v1H28zm0 7h38v1H28zm3 7h32v1H31z" fill="#8272b2" />
        <path d="M35 9h23v2H35zm-7 9h2v22h-2z" fill="#ebdaff" />
        <path d="M46 53h4v25h-4z" fill="#cdb7ff" />
        <path d="M42 74h11v26H42z" fill="#9a75dd" />
        <path d="M43 76h9v3h-9zm0 6h9v3h-9zm0 6h9v3h-9zm0 6h9v3h-9z" fill="#dac4ff" />
      </g>
      <g className="gear-ball">
        <path d="M70 66h18v4h-3v6h-3v7H72v-7h-3v-6h-2v-4z" fill="#f2dcff" />
        <path d="M72 70h2v8h-2zm5 0h2v9h-2zm5 0h2v6h-2z" fill="#ae96cc" />
        <path d="M73 81h9v5h-2v3h-6v-3h-1z" fill="#f4b97f" />
      </g>
    </svg>
  );
  return (
    <svg className="gear-art" viewBox="0 0 96 65" shapeRendering="crispEdges" aria-hidden="true">
      <path d="M31 13h54v39H31z" fill="#18352b" />
      <path d="M38 17h2v33h-2zm9 0h2v33h-2zm9 0h2v33h-2zm9 0h2v33h-2zm9 0h2v33h-2zM32 22h51v2H32zm0 8h51v2H32zm0 8h51v2H32zm0 8h51v2H32z" fill="#4f9a76" />
      <path d="M28 11h60v43h-5V16H33v38h-5z" fill="#a9e4ba" />
      <path d="M23 54h69v3H23z" fill="#426e58" />
      <g className="gear-ball">
        <path d="M11 41h10v3h4v10h-4v4H10v-4H6V44h5z" fill="#eeeee0" />
        <path d="M12 47h7v6h-7zM8 43h4v4H8zm11 11h4v3h-4z" fill="#28352c" />
      </g>
    </svg>
  );
}

export function SportsEquipment({ sport }: { sport: Sport }) {
  const { label, color, reaction } = gear[sport];
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    if (!turn) return;
    const timer = window.setTimeout(() => setTurn(0), 1350);
    return () => window.clearTimeout(timer);
  }, [turn]);

  return (
    <div className={`sideline-equipment gear-${sport}`} style={{ '--gear-color': color } as React.CSSProperties}>
      <button type="button" className="gear-button" aria-label={label} onClick={() => setTurn(n => n + 1)}>
        <span className="gear-pin" aria-hidden="true" />
        <span className="gear-hanging">
          <span className="gear-strap" aria-hidden="true" />
          <span key={turn} className={turn ? 'gear-play' : undefined}><GearSprite sport={sport} /></span>
        </span>
      </button>
      <span className="gear-status" role="status">{turn > 0 && <span key={turn} className="gear-reaction">{reaction}</span>}</span>
    </div>
  );
}
