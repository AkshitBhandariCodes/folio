'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Command, FileText, Github, Home, List, Mail, Moon, Search, Sun, X } from 'lucide-react';
import Link from 'next/link';

const homeSections = [
  ['work', 'Projects'], ['experience', 'Experience'],
  ['open-source', 'Open source'], ['activity', 'GitHub activity'], ['skills', 'Toolbox'],
  ['guestbook', 'Guestbook'], ['contact', 'Contact'],
];
const projectSections = [['preview', 'Product'], ['stack', 'How I used the stack'], ['challenges', 'Engineering decisions']];
const resumeSections = [
  ['education', 'Education'], ['experience', 'Experience'], ['open-source', 'Open source'],
  ['work', 'Technical projects'], ['skills', 'Technical skills'], ['achievements', 'Achievements'],
];

function pageSections(pathname: string) {
  if (pathname.startsWith('/projects/')) return projectSections;
  if (pathname === '/resume') return resumeSections;
  return homeSections;
}

export function Navigation() {
  const pathname = usePathname();
  const items = pageSections(pathname);
  const [active, setActive] = useState(items[0][0]);
  const [menu, setMenu] = useState(false);
  const [command, setCommand] = useState(false);
  const [query, setQuery] = useState('');
  const [light, setLight] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lightTheme = localStorage.getItem('portfolio-theme') === 'light';
    setLight(lightTheme);
    document.documentElement.classList.toggle('light', lightTheme);
  }, []);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      let current = items[0][0];
      for (const [id] of items) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < window.innerHeight * .42) current = id;
      }
      setActive(current);
    }
    function scroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('resize', scroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    };
  }, [items]);

  useEffect(() => {
    function keydown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommand(value => !value);
      }
    }
    document.addEventListener('keydown', keydown);
    return () => document.removeEventListener('keydown', keydown);
  }, []);

  useEffect(() => {
    if (command) {
      opener.current = document.activeElement as HTMLElement;
      dialog.current?.showModal();
    } else if (dialog.current?.open) {
      dialog.current.close();
      opener.current?.focus();
    }
  }, [command]);

  function toggleTheme(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    if (root.classList.contains('theme-switching')) return;

    const next = !light;
    function applyTheme() {
      setLight(next);
      root.classList.toggle('light', next);
      localStorage.setItem('portfolio-theme', next ? 'light' : 'dark');
    }

    if (!document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme();
      return;
    }

    const button = event.currentTarget.getBoundingClientRect();
    const x = button.left + button.width / 2;
    const y = button.top + button.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty('--theme-x', `${x}px`);
    root.style.setProperty('--theme-y', `${y}px`);
    root.style.setProperty('--theme-r', `${Math.ceil(radius)}px`);
    root.classList.add('theme-switching');

    const transition = document.startViewTransition(() => flushSync(applyTheme));
    void transition.finished.catch(() => {}).finally(() => {
      root.classList.remove('theme-switching');
      for (const property of ['--theme-x', '--theme-y', '--theme-r']) root.style.removeProperty(property);
    });
  }

  const commands = [
    { label: 'Portfolio home', href: '/', icon: Home },
    ...items.map(([id, label]) => ({ label, href: `#${id}`, icon: List })),
    { label: 'Résumé PDF', href: '/resume.pdf', icon: FileText },
    { label: 'Web résumé', href: '/resume', icon: FileText },
    { label: 'Plain-text résumé', href: '/llms.txt', icon: FileText },
    { label: 'GitHub', href: 'https://github.com/AkshitBhandariCodes', icon: Github },
    { label: 'Send an email', href: 'mailto:akshitbhandaricodes@gmail.com', icon: Mail },
  ].filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <div className="profile-tools">
        <button type="button" className="command-trigger" aria-label="Open command menu" onClick={() => setCommand(true)}><Command size={13} /><span>K</span></button>
        <button type="button" className="theme-trigger" onClick={toggleTheme} aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}>{light ? <Moon size={16} /> : <Sun size={16} />}</button>
      </div>
      <button type="button" className="mobile-index" aria-label={menu ? 'Close index' : 'Open index'} aria-expanded={menu} onClick={() => setMenu(!menu)}>
        {menu ? <X size={14} /> : <List size={14} />} Index
      </button>
      <aside className={`side-index ${menu ? 'index-open' : ''}`} aria-label="Page index">
        <nav aria-label="Main navigation">
          <span className="index-label">ON THIS PAGE</span>
          {items.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'index-active' : undefined}
              aria-current={active === id ? 'location' : undefined} onClick={() => { setActive(id); setMenu(false); }}>
              <span className="index-dash" />{label}
            </a>
          ))}
        </nav>
      </aside>
      <dialog ref={dialog} className="command-dialog" aria-label="Command menu"
        onCancel={() => setCommand(false)} onClose={() => setCommand(false)}
        onClick={event => { if (event.target === dialog.current) setCommand(false); }}>
        <div className="command-search">
          <Search size={18} />
          <input autoFocus placeholder="Search for a command…" aria-label="Search commands" value={query}
            onChange={event => setQuery(event.target.value)} onKeyDown={event => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                dialog.current?.querySelector<HTMLAnchorElement>('.command-results a')?.focus();
              }
            }} />
          <button type="button" onClick={() => setCommand(false)} aria-label="Close command menu"><X size={15} /></button>
        </div>
        <div className="command-results" onKeyDown={event => {
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
          const links = Array.from(dialog.current?.querySelectorAll<HTMLAnchorElement>('.command-results a') ?? []);
          if (!links.length) return;
          event.preventDefault();
          const index = links.indexOf(document.activeElement as HTMLAnchorElement);
          const direction = event.key === 'ArrowDown' ? 1 : -1;
          links[(index + direction + links.length) % links.length]?.focus();
        }}>
          {commands.length ? commands.map(({ label, href, icon: Icon }) => {
            const CommandLink = href.startsWith('#') ? 'a' : Link;
            return (
              <CommandLink key={href} href={href} onClick={() => { setCommand(false); setQuery(''); }}>
                <Icon size={15} /><span>{label}</span><ArrowUpRight size={12} />
              </CommandLink>
            );
          }) : <p>No matching commands.</p>}
        </div>
        <div className="command-hint">↑ ↓ to navigate <span>esc to close</span></div>
      </dialog>
    </>
  );
}
