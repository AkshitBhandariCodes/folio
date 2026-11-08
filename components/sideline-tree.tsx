const canopy = [
  { x: 106, y: 10, scale: 1.55 },
  { x: 75, y: 13, scale: 1.46 },
  { x: 50, y: 18, scale: 1.35 },
  { x: 28, y: 26, scale: 1.18 },
  { x: 11, y: 37, scale: 1.17 },
  { x: 4, y: 47, scale: .86 },
  { x: 22, y: 46, scale: 1.34 },
  { x: 44, y: 34, scale: 1.46 },
  { x: 64, y: 32, scale: 1.6 },
  { x: 88, y: 26, scale: 1.75 },
  { x: 115, y: 32, scale: 1.55 },
  { x: 106, y: 49, scale: 1.4 },
  { x: 77, y: 52, scale: 1.15 },
  { x: 52, y: 54, scale: 1.12 },
  { x: 30, y: 63, scale: .86 },
  { x: 58, y: 70, scale: .77 },
  { x: 88, y: 70, scale: .84 },
];

export function SidelineTree() {
  return (
    <div className="sideline-tree">
      <svg viewBox="0 0 140 155" shapeRendering="crispEdges" role="img" aria-label="Snip Pal hanging from a red pixel tree">
        <path d="M140 136v19H88v-3h12v-3h13v-4h11v-5h8v-4z" fill="var(--tree-ground)" />
        <path d="M140 143v12h-35v-3h12v-3h12v-3h7v-3z" fill="var(--tree-leaf-shadow)" />

        <path d="M140 155h-32v-4h12v-5h9v-7h6v-11h2v-15h-2V99h-4V87h-6V75h-11v-7h-12v-4H89v-5H75v-3H60v-5H45v-3H30v-5H18v-4h14v4h15v3h15v4h15v3h15v4h13v-4h-9v-7H85v-5H72v-6h13v3h12v5h12v7h12v8h10v8h9z" fill="var(--tree-bark)" />
        <path d="M127 74h6v9h4v12h3v45h-6v6h-8v4h-9v-3h7v-5h7v-9h4v-13h1v-11h-3V96h-3V84h-3zm-24-15h12v4h8v6h-5v-3h-9v-4h-6z" fill="var(--tree-bark-light)" />
        <path d="M131 81h-10v-4h-12v-4H96v-5H82v-4H70v-5H58v-5H45v-4h15v4h12v4h13v4h15v4h11v4h12v4h8zM126 88h-11v-4h-9v-5H94v-4h14v4h10v4h8zM107 80H95v-4H85v-3H73v-4H62v-4h12v3h13v4h10v4h10z" fill="var(--tree-bark)" />

        <path d="M6 47h6V36h10v-7h16v-8h20v-6h20v-5h26V7h36v61h-10v5h-16v-4H98v2H82v-5H66v3H47v-6H31v-4H17v-5H6z" fill="var(--tree-leaf-shadow)" />
        {canopy.map(({ x, y, scale }) => (
          <g key={x + '-' + y} transform={`translate(${x} ${y}) scale(${scale})`}>
            <path d="M0 8h3V5h5V3h6V0h10v2h5v3h6v4h5v5h-4v3h-6v3H18v-2h-7v-2H5v-3H0z" fill="var(--tree-leaf)" />
            <path d="M4 7h5V5h7V3h8v2h6v3h5v3h-9V9h-8v2h-7v2H4z" fill="var(--tree-leaf-light)" />
            <path d="M7 14h5v2H7zm12 1h7v3h-7zm10-3h6v2h-6z" fill="var(--tree-leaf-shadow)" />
            <path d="M11 6h3v2h-3zm7-2h3v2h-3zm9 4h3v2h-3z" fill="var(--tree-bloom)" />
          </g>
        ))}

        <g className="tree-pal-swing">
          <path d="M105 81h1.5v22H105z" fill="var(--tree-rope)" />
          <image href="/brand/pal.png" x="94" y="102" width="23" height="27" />
        </g>
        <path className="tree-petals" d="M22 78h3v2h-3zm38 11h3v2h-3zm18 15h2v2h-2zm-29 12h3v2h-3zm73-21h2v2h-2zM100 151h4v2h-4z" fill="var(--tree-bloom)" />
      </svg>
    </div>
  );
}
