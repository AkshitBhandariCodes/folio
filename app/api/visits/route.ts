import { NextResponse } from 'next/server';

const emptyCounts = { count: null, live: null };
const uuid = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (typeof body?.browserId !== 'string' || !uuid.test(body.browserId)) {
    return NextResponse.json(emptyCounts, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json(emptyCounts, { status: 503 });

  try {
    const response = await fetch(`${url}/rest/v1/rpc/register_portfolio_presence`, {
      method: 'POST',
      headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitor_id: body.browserId }),
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Counter unavailable');

    const [result] = await response.json();
    const count = Number(result?.total);
    const live = Number(result?.live);
    if (!Number.isSafeInteger(count) || !Number.isSafeInteger(live) || live < 1 || live > count) {
      throw new Error('Invalid counts');
    }

    return NextResponse.json({ count, live });
  } catch {
    return NextResponse.json(emptyCounts, { status: 503 });
  }
}
