import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

function clean(value: FormDataEntryValue | null) {
  return typeof value === 'string' ? value.trim() : '';
}

function toInt(value: string) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const opportunity = {
      category: clean(formData.get('category')) || 'private-chef',
      title: clean(formData.get('title')) || clean(formData.get('need')) || 'Food service request',
      description: clean(formData.get('description')) || clean(formData.get('details')) || 'Client submitted request',
      city: clean(formData.get('city')) || clean(formData.get('where')),
      state: clean(formData.get('state')) || null,
      event_date: clean(formData.get('event_date')) || clean(formData.get('date')) || null,
      guest_count: toInt(clean(formData.get('guest_count')) || clean(formData.get('guests'))),
      budget_min: toInt(clean(formData.get('budget_min'))),
      budget_max: toInt(clean(formData.get('budget_max')) || clean(formData.get('budget'))),
      client_name: clean(formData.get('name')),
      client_email: clean(formData.get('email')),
      client_phone: clean(formData.get('phone')) || null,
    };

    if (!opportunity.client_name || !opportunity.client_email || !opportunity.city) {
      return NextResponse.json(
        { ok: false, error: 'Name, email, and city are required.' },
        { status: 400 },
      );
    }

    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('opportunities')
      .insert(opportunity)
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.redirect(new URL(`/thanks?listing=${data.id}`, req.url), 303);
  } catch (error) {
    console.error('CREATE OPPORTUNITY FAILED', error);
    return NextResponse.json(
      { ok: false, error: 'We could not post this request. Please try again.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('opportunities')
      .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
      .in('status', ['open', 'responses-received'])
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json({ ok: true, opportunities: data });
  } catch (error) {
    console.error('LIST OPPORTUNITIES FAILED', error);
    return NextResponse.json({ ok: false, opportunities: [] }, { status: 500 });
  }
}
