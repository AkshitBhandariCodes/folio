'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, GitCommitHorizontal } from 'lucide-react';

type Day = { date: string; level: number; count: number | null };
const profile = 'https://github.com/AkshitBhandariCodes';
const fullDate = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' });
const monthName = new Intl.DateTimeFormat('en', { month: 'short', timeZone: 'UTC' });

function dayLabel(day: Day) {
  const date = fullDate.format(new Date(day.date));
  if (day.count === null) return date;
  return `${date} · ${day.count} ${day.count === 1 ? 'contribution' : 'contributions'}`;
}

export function GitHubActivity() {
  const [days, setDays] = useState<Day[]>([]);
  const [selected, setSelected] = useState(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = new AbortController();
    fetch('/api/github-activity', { signal: request.signal })
      .then(response => response.json())
      .then(data => {
        setDays(data.days ?? []);
        setLoading(false);
      })
      .catch(() => {
        if (!request.signal.aborted) setLoading(false);
      });
    return () => request.abort();
  }, []);

  const total = days.reduce((sum, day) => sum + (day.count ?? 0), 0);
  const complete = days.length > 0 && days.every(day => day.count !== null);
  const offset = days.length ? new Date(days[0].date).getUTCDay() : 0;
  const weeks = Math.ceil((days.length + offset) / 7);
  const months = days.flatMap((day, index) => {
    const month = day.date.slice(0, 7);
    return index === 0 || month !== days[index - 1].date.slice(0, 7)
      ? [{ label: monthName.format(new Date(day.date)), column: Math.floor((index + offset) / 7) + 1, month }]
      : [];
  });

  function move(event: KeyboardEvent<HTMLDivElement>) {
    const delta = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 }[event.key];
    if (delta === undefined || !days.length) return;
    event.preventDefault();
    const index = selected < 0 ? days.length - 1 : selected + delta;
    setSelected(Math.max(0, Math.min(days.length - 1, index)));
  }

  return (
    <div className="activity-panel">
      <div className="activity-top">
        <div><GitCommitHorizontal size={17} /> <span>{complete ? `${total.toLocaleString('en-IN')} contributions` : 'Contribution calendar'}</span></div>
        <a href={profile} target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={13} /></a>
      </div>
      {days.length ? (
        <div className="calendar-scroll" tabIndex={0} onKeyDown={move} aria-label="GitHub contribution calendar. Use arrow keys to explore dates.">
          <div className="calendar-months" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
            {months.map(month => <span key={month.month} style={{ gridColumn: month.column }}>{month.label}</span>)}
          </div>
          <div className="calendar-cells" style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}>
            {Array.from({ length: offset }, (_, index) => <i key={index} aria-hidden="true" />)}
            {days.map((day, index) => (
              <span key={day.date} title={dayLabel(day)} aria-hidden="true"
                className={`calendar-cell level-${day.level} ${selected === index ? 'calendar-selected' : ''}`}
                onPointerEnter={() => setSelected(index)} onClick={() => setSelected(index)} />
            ))}
          </div>
        </div>
      ) : loading ? <div className="calendar-loading">Loading public GitHub activity…</div> : (
        <a href={profile} className="calendar-fallback" target="_blank" rel="noreferrer">
          <img src="https://ghchart.rshah.org/40c463/AkshitBhandariCodes" alt="Public GitHub contribution calendar" width="663" height="104" />
        </a>
      )}
      <div className="calendar-footer">
        <span aria-live="polite">{days[selected] ? dayLabel(days[selected]) : 'Public GitHub contributions · past year'}</span>
        <span className="calendar-legend">Less {[0, 1, 2, 3, 4].map(level => <i key={level} className={`level-${level}`} />)} More</span>
      </div>
    </div>
  );
}
