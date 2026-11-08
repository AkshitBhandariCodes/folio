import { NextResponse } from 'next/server';

const calendarUrl = 'https://github.com/users/AkshitBhandariCodes/contributions';

export async function GET() {
  try {
    const response = await fetch(calendarUrl, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error('Calendar unavailable');

    const html = await response.text();
    const counts = new Map<string, number>();
    for (const tooltip of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>\s*(No|[\d,]+) contributions?\b/g)) {
      counts.set(tooltip[1], tooltip[2] === 'No' ? 0 : Number(tooltip[2].replaceAll(',', '')));
    }

    const days = Array.from(html.matchAll(/<td\b[^>]*\bdata-date="(\d{4}-\d{2}-\d{2})"[^>]*\bid="([^"]+)"[^>]*\bdata-level="([0-4])"[^>]*>/g), match => ({
      date: match[1],
      level: Number(match[3]),
      count: counts.get(match[2]) ?? null,
    })).sort((a, b) => a.date.localeCompare(b.date));

    if (days.length < 300) throw new Error('Calendar format changed');
    return NextResponse.json({ days }, { headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400' } });
  } catch {
    return NextResponse.json({ days: [] }, { status: 503 });
  }
}
