import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

function clean(v: FormDataEntryValue | null, max = 5000) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}
function validEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function toInt(v: string) {
  if (!v) return null;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData();
    if (clean(fd.get('company_website'), 500)) return NextResponse.json({ ok: false }, { status: 400 });

    const item = {
      opportunity_type: clean(fd.get('opportunity_type'), 20) === 'shift' ? 'shift' : 'job',
      role: clean(fd.get('role'), 140),
      company_name: clean(fd.get('company_name'), 140),
      city: clean(fd.get('city'), 100),
      state: clean(fd.get('state'), 50) || null,
      work_date: clean(fd.get('work_date'), 20) || null,
      start_time: clean(fd.get('start_time'), 20) || null,
      end_time: clean(fd.get('end_time'), 20) || null,
      pay_type: clean(fd.get('pay_type'), 20) || null,
      pay_min: toInt(clean(fd.get('pay_min'), 12)),
      pay_max: toInt(clean(fd.get('pay_max'), 12)),
      description: clean(fd.get('description'), 5000),
      contact_name: clean(fd.get('contact_name'), 120),
      contact_email: clean(fd.get('contact_email'), 254).toLowerCase(),
      contact_phone: clean(fd.get('contact_phone'), 50) || null,
    };

    if (!item.role || !item.company_name || !item.city || !item.description || !item.contact_name || !validEmail(item.contact_email)) {
      return NextResponse.json({ ok: false, error: 'Role, company, city, description and valid contact information are required.' }, { status: 400 });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase.from('talent_opportunities').insert(item);
    if (error) throw error;

    return NextResponse.redirect(new URL('/talent/post?submitted=1', req.url), 303);
  } catch (error) {
    console.error('CREATE TALENT OPPORTUNITY FAILED', error);
    return NextResponse.json({ ok: false, error: 'We could not post this opportunity.' }, { status: 500 });
  }
}
