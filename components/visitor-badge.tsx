'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Eye, Users } from 'lucide-react';

type VisitorCounts = { count: number | null; live: number | null };

const emptyCounts: VisitorCounts = { count: null, live: null };
const VisitorContext = createContext(emptyCounts);
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

function getBrowserId() {
  try {
    const stored = localStorage.getItem('portfolio-browser-id');
    if (stored && uuid.test(stored)) return stored;

    const browserId = crypto.randomUUID();
    localStorage.setItem('portfolio-browser-id', browserId);
    return browserId;
  } catch {
    return null;
  }
}

export function VisitorPresence({ children }: { children: ReactNode }) {
  const [counts, setCounts] = useState(emptyCounts);

  useEffect(() => {
    const browserId = getBrowserId();
    if (!browserId) return;

    const request = new AbortController();
    let pending = false;

    async function heartbeat() {
      if (document.hidden || pending) return;
      pending = true;

      try {
        const response = await fetch('/api/visits', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ browserId }),
          signal: request.signal,
        });
        if (!response.ok) throw new Error('Counter unavailable');

        const data = await response.json();
        if (!request.signal.aborted) setCounts({ count: data.count, live: data.live });
      } catch {
        if (!request.signal.aborted) setCounts(previous => ({ count: previous.count, live: null }));
      } finally {
        pending = false;
      }
    }

    void heartbeat();
    const timer = window.setInterval(heartbeat, 25_000);
    document.addEventListener('visibilitychange', heartbeat);
    window.addEventListener('pageshow', heartbeat);

    return () => {
      request.abort();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', heartbeat);
      window.removeEventListener('pageshow', heartbeat);
    };
  }, []);

  return <VisitorContext.Provider value={counts}>{children}</VisitorContext.Provider>;
}

export function VisitorBadge() {
  const { count, live } = useContext(VisitorContext);

  return (
    <div className="visitor-badge" role="group" aria-label="Visitor counts">
      <span className="visitor-metric" title="Unique browsers that have visited this portfolio">
        <Users size={13} aria-hidden="true" />
        <strong>{count?.toLocaleString('en-IN') ?? '—'}</strong>
        <span>Total</span>
      </span>
      <span className="visitor-metric visitor-live" title="Unique browsers active in the last 90 seconds">
        <Eye size={14} aria-hidden="true" />
        <strong>{live?.toLocaleString('en-IN') ?? '—'}</strong>
        <span>Live</span>
      </span>
    </div>
  );
}
