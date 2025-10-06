import { NextRequest, NextResponse } from 'next/server';
import { createWaitlistEntry } from '@/lib/sanity';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = typeof body?.email === 'string' ? body.email : '';
    const email = raw.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    await createWaitlistEntry(email, 'waitlist');
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[waitlist] error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


