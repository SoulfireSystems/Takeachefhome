import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

const statuses=['NEW','PROFILE INCOMPLETE','READY FOR REVIEW','REVIEWING','APPROVED','ACTIVE','AVAILABLE NOW','MATCHED','BOOKED','INACTIVE','PAUSED','REJECTED'];
const authorized=(req:NextRequest)=>{const token=req.headers.get('authorization')?.replace(/^Bearer\s+/i,'')||'';return Boolean(process.env.TALENT_ADMIN_KEY&&token===process.env.TALENT_ADMIN_KEY)};

export async function GET(req: NextRequest) {
  if(!authorized(req)) return NextResponse.json({error:'Unauthorized.'},{status:401});
  const {searchParams}=new URL(req.url); const city=(searchParams.get('city')||'').trim(); const role=(searchParams.get('role')||'').trim().toLowerCase(); const opportunity=(searchParams.get('opportunity')||'').trim(); const available=searchParams.get('available'); const status=(searchParams.get('status')||'').trim();
  const supabase=getSupabaseAdmin();
  let query=supabase.from('talent_profiles').select('talent_id,first_name,last_name,professional_name,email,phone,preferred_contact,primary_role,secondary_roles,talent_categories,city,state,zip,travel_radius,overnight_travel,years_experience,work_background,bio,skills,cuisine_specialties,opportunity_types,availability,available_now,earliest_start,compensation_type,compensation_min,compensation_max,transportation,certifications,verification_status,application_status,profile_completion,source,referral_source,hear_about,created_at,updated_at').order('created_at',{ascending:false}).limit(500);
  if(city) query=query.ilike('city',`%${city}%`); if(opportunity) query=query.contains('opportunity_types',[opportunity]); if(available==='true') query=query.eq('available_now',true); if(status) query=query.eq('application_status',status);
  const {data,error}=await query; if(error) return NextResponse.json({error:'Unable to load talent.'},{status:500});
  const talent=role?(data||[]).filter((t:any)=>String(t.primary_role||'').toLowerCase().includes(role)||(t.secondary_roles||[]).some((r:string)=>r.toLowerCase().includes(role))):(data||[]);
  return NextResponse.json({talent,statuses});
}

export async function PATCH(req:NextRequest){
  if(!authorized(req)) return NextResponse.json({error:'Unauthorized.'},{status:401});
  try{const body=await req.json();const talentId=String(body.talent_id||'').trim();const status=String(body.application_status||'').trim();if(!talentId||!statuses.includes(status))return NextResponse.json({error:'Invalid status update.'},{status:400});
    const supabase=getSupabaseAdmin();const patch:any={application_status:status};if(status==='AVAILABLE NOW')patch.available_now=true;if(['INACTIVE','PAUSED','BOOKED'].includes(status))patch.available_now=false;
    const {data,error}=await supabase.from('talent_profiles').update(patch).eq('talent_id',talentId).select('talent_id,application_status,available_now,updated_at').single();if(error)throw error;return NextResponse.json({ok:true,profile:data});
  }catch(error){console.error('Talent admin update failed',error);return NextResponse.json({error:'Unable to update talent status.'},{status:500});}
}
