import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '') || '';
  if (!process.env.TALENT_ADMIN_KEY || token !== process.env.TALENT_ADMIN_KEY) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const city = (searchParams.get('city') || '').trim();
  const role = (searchParams.get('role') || '').trim();
  const opportunity = (searchParams.get('opportunity') || '').trim();
  const available = searchParams.get('available');
  const status = (searchParams.get('status') || '').trim();

  const supabase = getSupabaseAdmin();
  let query = supabase.from('talent_profiles').select('talent_id,first_name,last_name,professional_name,email,phone,preferred_contact,primary_role,secondary_roles,talent_categories,city,state,zip,travel_radius,overnight_travel,years_experience,work_background,bio,skills,cuisine_specialties,opportunity_types,availability,available_now,earliest_start,compensation_type,compensation_min,compensation_max,transportation,certifications,verification_status,application_status,profile_completion,source,referral_source,hear_about,created_at').order('created_at', { ascending: false }).limit(500);
  if (city) query = query.ilike('city', `%${city}%`);
  if (role) query = query.or(`primary_role.ilike.%${role}%,secondary_roles.cs.{${role}}`);
  if (opportunity) query = query.contains('opportunity_types', [opportunity]);
  if (available === 'true') query = query.eq('available_now', true);
  if (status) query = query.eq('application_status', status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: 'Unable to load talent.' }, { status: 500 });
  return NextResponse.json({ talent: data || [] });
}
