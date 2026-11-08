'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';

const email = 'akshitbhandaricodes@gmail.com';

const flowers = [
  { x: 9, height: 38, color: 'iris', scale: 1.15 },
  { x: 26, height: 25, color: 'daisy', scale: 1 },
  { x: 38, height: 34, color: 'aster', scale: .92 },
  { x: 53, height: 18, color: 'poppy', scale: .72 },
  { x: 64, height: 24, color: 'iris', scale: .78 },
  { x: 78, height: 12, color: 'daisy', scale: .62 },
  { x: 161, height: 13, color: 'aster', scale: .63 },
  { x: 174, height: 22, color: 'daisy', scale: .75 },
  { x: 187, height: 18, color: 'poppy', scale: .73 },
  { x: 201, height: 35, color: 'iris', scale: 1.03 },
  { x: 217, height: 26, color: 'aster', scale: .91 },
  { x: 232, height: 39, color: 'daisy', scale: 1.15 },
];

function FooterGarden() {
  const [greeting, setGreeting] = useState(false);

  return (
    <div className="footer-garden">
      <svg className="garden-art" viewBox="0 0 240 56" shapeRendering="crispEdges" aria-hidden="true">
        <path d="M0 43h9v3h10v3h13v3h21v2h134v-2h21v-3h13v-3h10v-3h9v13H0z" fill="var(--garden-shadow)" />
        <path d="M0 49h14v2h23v2h27v2h112v-2h27v-2h23v-2h14v7H0z" fill="var(--garden-grass)" />
        <path d="M0 54h16v1h14v1H0zm27 0h12v1H27zm26 1h8v1h-8zm122 0h12v1h-12zm28-1h15v1h-15zm20 0h17v2h-17z" fill="var(--garden-leaf)" />
        <path d="M2 50v-9h2v4h2v-2h2v6zm14 1v-8h2v4h3v-2h2v6zm30 3v-6h2v3h4v2zm24 1v-5h2v3h4v2zm98 0v-6h2v3h3v-2h2v5zm24-1v-7h2v3h3v4zm32-3v-9h2v5h3v-2h2v6zm13-2v-8h2v8z" fill="var(--garden-stem)" />
        {flowers.map(({ x, height, color, scale }, index) => (
          <g key={x} transform={`translate(${x} 55)`}>
            <g className={`garden-flower flower-${color}`} style={{ animationDelay: `-${index * .43}s` }}>
              <path d={`M-1 0v-${height}h2v${height}z`} fill="var(--garden-stem)" />
              <path d="M0-4h-4v-2h-3v-3h4v2h2v2h1zm1-4v-2h2v-2h4v2H5v2H3v1z" fill="var(--garden-leaf)" />
              {height > 22 && <path d="M0-15h-3v-2h-3v-3h3v2h2v1h1zm1-5v-2h2v-2h4v2H5v2H3v1z" fill="var(--garden-leaf)" />}
              <g transform={`translate(0 -${height}) scale(${scale})`}>
                <path d="M-3-8h6v2h3v3h2v6H6v3H3v2h-6V6h-3V3h-2v-6h2v-3h3z" fill="currentColor" />
                <path d="M-2-7h4v2h2v2H2v-1h-4zm-5 5h2v2h2v2h-4z" fill="var(--garden-shine)" />
                <path d="M-2-3h4v1h1v4H2v1h-4V2h-1v-4h1z" fill="var(--garden-center)" />
                <path d="M-1-2h2v2h-2z" fill="var(--garden-seed)" />
              </g>
            </g>
          </g>
        ))}
        <path className="garden-spark" d="M23 12h1v2h2v1h-2v2h-1v-2h-2v-1h2zm51 12h2v2h-2zm84-7h1v2h2v1h-2v2h-1v-2h-2v-1h2zm50-8h2v2h-2z" fill="var(--garden-center)" />
      </svg>

      <div className="garden-pal">
        <span className="pal-greeting" id="footer-pal-greeting" role="status">{greeting ? 'hey, you made it!' : ''}</span>
        <button type="button" className="pal-button" aria-label="Say hello to Pal" aria-expanded={greeting}
          aria-controls="footer-pal-greeting" onClick={() => setGreeting(value => !value)}>
          <img src="/brand/pal.png" width={68} height={78} alt="" />
        </button>
      </div>
    </div>
  );
}

export function Footer() {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copyEmail() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
      timer.current = setTimeout(() => setCopyStatus('idle'), 2000);
    } catch {
      setCopyStatus('failed');
    }
  }

  return (
    <footer id="contact" className="profile-footer page-divider">
      <div className="footer-intro">
        <p className="footer-kicker"><i aria-hidden="true" /> Until the next build <i aria-hidden="true" /></p>
        <h2>Stay curious.<br /><span>Make something matter.</span></h2>
        <p className="footer-note">Tell me what you’re building, or just say hi.</p>
        <div className="footer-contact">
          <a href={`mailto:${email}`} className="mini-button button-primary"><Mail size={15} /> Say hello <ArrowUpRight size={12} /></a>
          <button type="button" className="mini-button" aria-label="Copy email address" onClick={copyEmail}>
            {copyStatus === 'copied' ? <Check size={14} /> : <Copy size={14} />}
            {copyStatus === 'copied' ? 'Copied!' : 'Copy email'}
          </button>
        </div>
        <p className={copyStatus === 'failed' ? 'copy-status' : 'sr-only'} role="status">
          {copyStatus === 'failed' ? email : copyStatus === 'copied' ? 'Email copied to clipboard.' : ''}
        </p>
        <nav className="footer-socials" aria-label="Footer links">
          <a href="https://github.com/AkshitBhandariCodes" target="_blank" rel="noreferrer" className="social-github"><Github size={13} /> GitHub</a>
          <a href="https://www.linkedin.com/in/akshitbhandaricodes" target="_blank" rel="noreferrer" className="social-linkedin"><Linkedin size={13} /> LinkedIn</a>
          <a href="#top"><ArrowUp size={13} /> Back to top</a>
        </nav>
      </div>
      <FooterGarden />
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Akshit Bhandari</span>
        <span>Always a work in progress. <b aria-hidden="true">✦</b></span>
      </div>
    </footer>
  );
}
