import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { getTalentProfileId, TALENT_COOKIE, talentCookieOptions } from '@/lib/talent-session';

const fields = 'talent_id,first_name,last_name,professional_name,email,phone,preferred_contact,primary_role,secondary_roles,talent_categories,city,state,zip,travel_radius,overnight_travel,years_experience,work_background,bio,skills,cuisine_specialties,opportunity_types,availability,available_now,earliest_start,compensation_type,compensation_min,compensation_max,transportation,certifications,application_status,verification_status,profile_completion,resume_url,headshot_url,portfolio_urls,created_at';

export async function GET() {
  const id=await getTalentProfileId();
  if(!id) return NextResponse.json({error:'Sign in required',signedIn:false},{status:401});
  const {data,error}=await getSupabaseAdmin().from('talent_profiles').select(fields).eq('id',id).single();
  if(error || !data) return NextResponse.json({error:'Profile unavailable'},{status:404});
  return NextResponse.json({profile:data});
}

export async function PATCH(req:NextRequest) {
  const id=await getTalentProfileId();
  if(!id) return NextResponse.json({error:'Sign in required'},{status:401});
  let body:Record<string,unknown>;
  try{body=await req.json()}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
  const allowedStrings=['phone','preferred_contact','city','zip','travel_radius','overnight_travel','bio','earliest_start','transportation','professional_name'];
  const allowedArrays=['availability','opportunity_types','skills','certifications','cuisine_specialties'];
  const update:Record<string,unknown>={};
  for(const key of allowedStrings){
    if(key in body && typeof body[key]==='string') update[key]=(body[key] as string).trim().slice(0,key==='bio'?1200:140);
  }
  for(const key of allowedArrays){
    if(Array.isArray(body[key]) && (body[key] as unknown[]).every(v=>typeof v==='string')) update[key]=(body[key] as string[]).slice(0,30).map(v=>v.trim().slice(0,100)).filter(Boolean);
  }
  if(typeof body.available_now==='boolean') update.available_now=body.available_now;
  if(typeof body.state==='string' && /^[A-Z]{2}$/i.test(body.state)) update.state=body.state.toUpperCase();
  if(!Object.keys(update).length)return NextResponse.json({error:'No editable changes supplied'},{status:400});
  if('city' in update && !update.city || 'zip' in update && !update.zip) return NextResponse.json({error:'City and ZIP cannot be empty'},{status:400});
  const {data,error}=await getSupabaseAdmin().from('talent_profiles').update(update).eq('id',id).select(fields).single();
  if(error){console.error('Talent profile update failed',error);return NextResponse.json({error:'Unable to save changes'},{status:500})}
  return NextResponse.json({profile:data});
}

export async function DELETE() {
  const response=NextResponse.json({ok:true});
  response.cookies.set(TALENT_COOKIE,'',{...talentCookieOptions(),maxAge:0});
  return response;
}
