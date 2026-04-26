import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData.entries());

  console.log('NEW LEAD:', data);

  return NextResponse.json({ success: true });
}

export function GET() {
  return NextResponse.json({ ok: true });
}
