// app/api/leads/route.ts or route.js
import { NextResponse } from 'next/server';

// Simple placeholder handler so the app can build without Supabase set up yet.
export async function POST(req: Request) {
  let data: unknown = null;

  try {
    data = await req.json();
  } catch {
    // no body or invalid JSON – that's fine for now
  }

  console.log('Received lead (placeholder API):', data);

  return NextResponse.json(
    { success: true, message: 'Lead endpoint placeholder – Supabase not wired yet.' },
    { status: 200 }
  );
}

export function GET() {
  return NextResponse.json(
    { ok: true, message: 'Lead endpoint is online (placeholder).' },
    { status: 200 }
  );
}
