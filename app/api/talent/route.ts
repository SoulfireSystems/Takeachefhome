import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { ok:false, error:'Use the dedicated Job or ALL DAY Shift posting route.' },
    { status:410 }
  );
}
