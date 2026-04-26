import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  console.log('NEW LEAD:', data);

  return NextResponse.redirect(new URL('/thanks', req.url));
}

export function GET() {
  return NextResponse.json({ ok: true });
}
