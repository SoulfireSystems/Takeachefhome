import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const allowedCategories = new Set(['private-chef', 'catering', 'meal-prep', 'food-truck', 'experience', 'class']);

function clean(value: FormDataEntryValue | null, max = 5000) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function toInt(value: string) {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Honeypot: real visitors never see or fill this field.
    if (clean(formData.get('company_website'), 500)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const requestedCategory = clean(formData.get('category'), 50) || 'private-chef';
    const category = allowedCategories.has(requestedCategory) ? requestedCategory : 'private-chef';

    const opportunity = {
      category,
      title: clean(formData.get('title'), 140) || clean(formData.get('need'), 140) || 'Food service request',
      description: clean(formData.get('description'), 5000) || clean(formData.get('details'), 5000) || 'Client submitted request',
      city: clean(formData.get('city'), 100) || clean(formData.get('where'), 100),
      state: clean(formData.get('state'), 50) || null,
      event_date: clean(formData.get('event_date'), 20) || clean(formData.get('date'), 20) || null,
      guest_count: toInt(clean(formData.get('guest_count'), 12) || clean(formData.get('guests'), 12)),
      budget_min: toInt(clean(formData.get('budget_min'), 12)),
      budget_max: toInt(clean(formData.get('budget_max'), 12) || clean(formData.get('budget'), 12)),
      client_name: clean(formData.get('name'), 120),
      client_email: clean(formData.get('email'), 254).toLowerCase(),
      client_phone: clean(formData.get('phone'), 50) || null,
    };

    if (!opportunity.client_name || !validEmail(opportunity.client_email) || !opportunity.city || !opportunity.title || !opportunity.description) {
      return NextResponse.json(
        { ok: false, error: 'Name, valid email, city, title, and details are required.' },
        { status: 400 },
      );
    }

    if (opportunity.guest_count !== null && (opportunity.guest_count < 1 || opportunity.guest_count > 100000)) {
      return NextResponse.json({ ok: false, error: 'Guest count is outside the allowed range.' }, { status: 400 });
    }

    if (opportunity.budget_min !== null && opportunity.budget_min < 0) {
      return NextResponse.json({ ok: false, error: 'Budget cannot be negative.' }, { status: 400 });
    }

    if (opportunity.budget_max !== null && opportunity.budget_max < 0) {
      return NextResponse.json({ ok: false, error: 'Budget cannot be negative.' }, { status: 400 });
    }

    if (opportunity.budget_min !== null && opportunity.budget_max !== null && opportunity.budget_max < opportunity.budget_min) {
      return NextResponse.json({ ok: false, error: 'Maximum budget must be greater than or equal to minimum budget.' }, { status: 400 });
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
    return NextResponse.json({ ok: true, opportunities: data ?? [] });
  } catch (error) {
    console.error('LIST OPPORTUNITIES FAILED', error);
    return NextResponse.json({ ok: false, opportunities: [] }, { status: 500 });
  }
}
