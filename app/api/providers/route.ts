import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const allowedServices = new Set(['private-chef','catering','meal-prep','food-truck','experience','class']);
const allowedTypes = new Set(['chef','caterer','meal-prep','food-truck','instructor','culinary-business']);

function clean(value: FormDataEntryValue | null, max = 5000) {
  return typeof value === 'string' ? value.trim().slice(0,max) : '';
}

function validEmail(value:string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function toInt(value:string) {
  if (!value) return null;
  const n = Number.parseInt(value,10);
  return Number.isFinite(n) ? n : null;
}

export async function POST(req:Request) {
  try {
    const formData = await req.formData();
    if (clean(formData.get('company_website'),500)) return NextResponse.json({ok:false},{status:400});

    const services = formData.getAll('services').map(v=>String(v)).filter(v=>allowedServices.has(v));
    const requestedType = clean(formData.get('professional_type'),50);
    const professional_type = allowedTypes.has(requestedType) ? requestedType : 'chef';

    const profile = {
      display_name: clean(formData.get('display_name'),120),
      professional_type,
      services,
      city: clean(formData.get('city'),100),
      state: clean(formData.get('state'),50) || null,
      bio: clean(formData.get('bio'),3000),
      years_experience: toInt(clean(formData.get('years_experience'),3)),
      starting_price: toInt(clean(formData.get('starting_price'),12)),
      website_url: clean(formData.get('website_url'),500) || null,
      instagram_url: clean(formData.get('instagram_url'),500) || null,
      contact_name: clean(formData.get('contact_name'),120),
      contact_email: clean(formData.get('contact_email'),254).toLowerCase(),
      contact_phone: clean(formData.get('contact_phone'),50) || null,
      status: 'pending',
    };

    if (!profile.display_name || !profile.city || !profile.bio || !profile.contact_name || !validEmail(profile.contact_email) || services.length === 0) {
      return NextResponse.json({ok:false,error:'Name, city, bio, contact information and at least one service are required.'},{status:400});
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase.from('provider_profiles').insert(profile);
    if (error) throw error;

    return NextResponse.redirect(new URL('/talent/join?submitted=1',req.url),303);
  } catch (error) {
    console.error('CREATE PROVIDER PROFILE FAILED', error);
    return NextResponse.json({ok:false,error:'We could not submit this profile. Please try again.'},{status:500});
  }
}
