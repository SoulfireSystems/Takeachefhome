import { createHash, randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase-server';

const clean = (v: unknown, max = 500) => typeof v === 'string' ? v.trim().slice(0, max) : '';
const strings = (v: unknown, maxItems = 30) => Array.isArray(v) ? v.filter(x => typeof x === 'string').map(x => x.trim()).filter(Boolean).slice(0,maxItems) : [];
const num = (v: unknown) => v === '' || v === null || v === undefined ? null : Number.isFinite(Number(v)) ? Number(v) : null;
const hash = (value:string) => createHash('sha256').update(value).digest('hex');

async function sendConfirmations(profile:{talent_id:string;first_name:string;email:string;city:string;state:string;primary_role:string;profile_completion:number}, editToken:string){
  if(!process.env.RESEND_API_KEY) return;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.TALENT_FROM_EMAIL || 'TakeAChefHome Talent <talent@takeachefhome.com>';
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.takeachefhome.com';
  const editUrl = `${site}/talent/profile?talent=${encodeURIComponent(profile.talent_id)}&token=${encodeURIComponent(editToken)}`;
  const applicant = resend.emails.send({
    from,
    to: profile.email,
    subject: `You're in the TakeAChefHome Talent Network — ${profile.talent_id}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:640px;margin:auto"><h1>You're in the network.</h1><p>Hi ${profile.first_name}, your TakeAChefHome Talent profile has been received.</p><p><strong>Talent ID:</strong> ${profile.talent_id}<br/><strong>Profile completion:</strong> ${profile.profile_completion}%</p><p>As relevant opportunities develop, your profile may be considered for matching. Creating a profile does not guarantee employment or bookings.</p><p><a href="${editUrl}">Update your talent profile</a></p><p>Keep this email. The private update link lets you change your availability, contact information, market and professional details.</p></div>`
  });
  const internalTo = process.env.LEAD_NOTIFICATION_EMAIL;
  const internal = internalTo ? resend.emails.send({
    from,
    to: internalTo,
    subject: `New Talent: ${profile.first_name} · ${profile.primary_role} · ${profile.city}, ${profile.state}`,
    html: `<p><strong>${profile.first_name}</strong> joined the TakeAChefHome Talent Network.</p><p>${profile.primary_role} · ${profile.city}, ${profile.state}<br/>Talent ID: ${profile.talent_id}<br/>Completion: ${profile.profile_completion}%</p><p><a href="${site}/talent/admin">Open Talent Admin</a></p>`
  }) : Promise.resolve();
  const results = await Promise.allSettled([applicant, internal]);
  results.forEach(r=>{ if(r.status==='rejected') console.error('Talent email failed',r.reason); });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const first_name = clean(body.first_name, 80);
    const last_name = clean(body.last_name, 80);
    const email = clean(body.email, 180).toLowerCase();
    const phone = clean(body.phone, 40);
    const city = clean(body.city, 100);
    const state = clean(body.state, 2).toUpperCase();
    const zip = clean(body.zip, 15);
    const roles = strings(body.roles, 40);
    const categories = strings(body.talent_categories, 15);
    const opportunity_types = strings(body.opportunity_types, 15);
    const availability = strings(body.availability, 15);
    const compensation_type = strings(body.compensation_type, 10);

    if (!first_name || !last_name || !email.includes('@') || !phone || !city || state.length !== 2 || !zip || !roles.length || !categories.length || !opportunity_types.length || !availability.length || !body.communications_consent) {
      return NextResponse.json({ error: 'Please complete all required fields before joining the network.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: existing } = await supabase.from('talent_profiles').select('talent_id').eq('email', email).limit(1).maybeSingle();
    if(existing) return NextResponse.json({ error: `A talent profile already exists for this email. Use your profile update link instead. Talent ID: ${existing.talent_id}` }, { status: 409 });

    const completionChecks = [roles.length>0,categories.length>0,city&&state&&zip,body.years_experience,strings(body.work_background).length>0,clean(body.bio).length>=20,strings(body.skills).length>0,opportunity_types.length>0,availability.length>0,compensation_type.length>0,body.transportation,first_name&&last_name&&email&&phone,strings(body.certifications).length>0,Boolean(body.has_resume),Boolean(body.has_headshot),Boolean(body.has_portfolio)];
    const profile_completion = Math.round((completionChecks.filter(Boolean).length / completionChecks.length) * 100);
    const application_status = body.available_now ? 'AVAILABLE NOW' : profile_completion >= 70 ? 'READY FOR REVIEW' : 'PROFILE INCOMPLETE';
    const editToken = randomBytes(32).toString('hex');

    const { data, error } = await supabase.from('talent_profiles').insert({
      first_name,last_name,professional_name:clean(body.professional_name,140)||null,email,phone,preferred_contact:clean(body.preferred_contact,20)||'Text',
      primary_role:roles[0],secondary_roles:roles.slice(1),talent_categories:categories,city,state,zip,travel_radius:clean(body.travel_radius,40),overnight_travel:clean(body.overnight_travel,20),
      years_experience:clean(body.years_experience,30),work_background:strings(body.work_background),bio:clean(body.bio,1200)||null,skills:strings(body.skills,50),cuisine_specialties:strings(body.cuisine_specialties,30),
      opportunity_types,availability,available_now:Boolean(body.available_now),earliest_start:clean(body.earliest_start,40),compensation_type,compensation_min:num(body.compensation_min),compensation_max:num(body.compensation_max),
      transportation:clean(body.transportation,40)||null,certifications:strings(body.certifications,20),verification_status:'SELF-REPORTED',application_status,profile_completion,
      source:clean(body.source,120)||'talent-site',referral_source:clean(body.referral_source,120)||null,hear_about:clean(body.hear_about,80)||null,communications_consent:Boolean(body.communications_consent),marketing_consent:Boolean(body.marketing_consent),edit_token_hash:hash(editToken)
    }).select('id,talent_id,first_name,email,city,state,primary_role,profile_completion,referral_code').single();

    if (error || !data) {
      console.error('Talent insert failed', error);
      return NextResponse.json({ error: 'We could not save your profile right now. Please try again.' }, { status: 500 });
    }

    void sendConfirmations(data, editToken);
    return NextResponse.json({ ok:true,talent_id:data.talent_id,profile_completion:data.profile_completion,referral_code:data.referral_code,edit_token:editToken }, { status: 201 });
  } catch (error) {
    console.error('Talent API error', error);
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }
}
