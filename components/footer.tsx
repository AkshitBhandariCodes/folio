'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';

const email = 'akshitbhandaricodes@gmail.com';

function FooterScene() {
  const [greeting, setGreeting] = useState(false);

  return (
    <div className="footer-scene">
      <div className="footer-pal" data-greeting={greeting ? '' : undefined}>
        <span className="pal-greeting" id="footer-pal-greeting" role="status">{greeting ? 'hey, you made it!' : ''}</span>
        <button type="button" className="pal-button" aria-label="Say hello to Pal" aria-expanded={greeting}
          aria-controls="footer-pal-greeting" onClick={() => setGreeting(value => !value)}>
          <img src="/brand/pal.png" width={68} height={78} alt="" />
          <svg className="pal-hovercraft" viewBox="0 0 40 12" shapeRendering="crispEdges" aria-hidden="true">
            <path d="M8 1h24v2h5v2h2v2h-5v2H6V7H1V5h2V3h5z" fill="var(--raised)" stroke="var(--muted)" />
            <path d="M6 4h28v2H6z" fill="var(--footer-accent)" />
            <path d="M16 4h8v2h-8z" fill="var(--ink)" />
            <path className="pal-thruster" d="M8 8h5v2H8zm19 0h5v2h-5zM10 11h2v1h-2zm18 0h2v1h-2z" fill="var(--mint)" />
          </svg>
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
      <FooterScene />
      <div className="footer-base">
        <span>© {new Date().getFullYear()} Akshit Bhandari</span>
        <span>Always a work in progress. <b aria-hidden="true">✦</b></span>
      </div>
    </footer>
  );
}
