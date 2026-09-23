import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

function clean(v: FormDataEntryValue | null, max = 5000) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    if (clean(fd.get('company_website'), 500)) return NextResponse.json({ ok: false }, { status: 400 });

    const opportunity_id = clean(fd.get('opportunity_id'), 80);
    const item = {
      opportunity_id,
      applicant_name: clean(fd.get('applicant_name'), 120),
      applicant_email: clean(fd.get('applicant_email'), 254).toLowerCase(),
      applicant_phone: clean(fd.get('applicant_phone'), 50) || null,
      profile_url: clean(fd.get('profile_url'), 500) || null,
      message: clean(fd.get('message'), 3000),
    };

    if (!opportunity_id || !item.applicant_name || !validEmail(item.applicant_email) || !item.message) {
      return NextResponse.json({ ok: false, error: 'Name, valid email and message are required.' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase.from('talent_applications').insert(item);
    if (error) throw error;

    return NextResponse.redirect(new URL('/talent/opportunities/' + opportunity_id + '?applied=1', req.url), 303);
  } catch (error) {
    console.error('TALENT APPLICATION FAILED', error);
    return NextResponse.json({ ok: false, error: 'We could not submit this application.' }, { status: 500 });
  }
}
