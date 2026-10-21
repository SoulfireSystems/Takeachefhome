import { createHash } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';

const hash=(v:string)=>createHash('sha256').update(v).digest('hex');
const clean=(v:unknown,max=500)=>typeof v==='string'?v.trim().slice(0,max):'';
const strings=(v:unknown,max=30)=>Array.isArray(v)?v.filter(x=>typeof x==='string').map(x=>x.trim()).filter(Boolean).slice(0,max):[];
const editableSelect='talent_id,first_name,last_name,professional_name,email,phone,preferred_contact,primary_role,secondary_roles,city,state,zip,travel_radius,overnight_travel,bio,opportunity_types,availability,available_now,earliest_start,compensation_type,compensation_min,compensation_max,transportation,certifications,profile_completion,updated_at';

async function authorized(talentId:string,token:string){
  const supabase=getSupabaseAdmin();
  const {data,error}=await supabase.from('talent_profiles').select(`${editableSelect},edit_token_hash`).eq('talent_id',talentId).single();
  if(error||!data||!data.edit_token_hash||data.edit_token_hash!==hash(token)) return null;
  return {supabase,profile:data};
}

export async function GET(req:NextRequest){
  const url=new URL(req.url); const talentId=clean(url.searchParams.get('talent'),40); const token=clean(url.searchParams.get('token'),200);
  if(!talentId||!token) return NextResponse.json({error:'Missing profile access.'},{status:400});
  const auth=await authorized(talentId,token); if(!auth) return NextResponse.json({error:'Invalid or expired profile update link.'},{status:401});
  const {edit_token_hash,...profile}=auth.profile; return NextResponse.json({profile});
}

export async function PATCH(req:NextRequest){
  try{
    const body=await req.json(); const talentId=clean(body.talent_id,40); const token=clean(body.token,200);
    const auth=await authorized(talentId,token); if(!auth) return NextResponse.json({error:'Invalid or expired profile update link.'},{status:401});
    const secondary_roles=strings(body.secondary_roles,40); const primary_role=clean(body.primary_role,120)||auth.profile.primary_role;
    const patch={
      first_name:clean(body.first_name,80)||auth.profile.first_name,last_name:clean(body.last_name,80)||auth.profile.last_name,professional_name:clean(body.professional_name,140)||null,
      email:clean(body.email,180).toLowerCase()||auth.profile.email,phone:clean(body.phone,40)||auth.profile.phone,preferred_contact:clean(body.preferred_contact,20)||auth.profile.preferred_contact,
      primary_role,secondary_roles,city:clean(body.city,100)||auth.profile.city,state:clean(body.state,2).toUpperCase()||auth.profile.state,zip:clean(body.zip,15)||auth.profile.zip,
      travel_radius:clean(body.travel_radius,40),overnight_travel:clean(body.overnight_travel,20),bio:clean(body.bio,1200)||null,opportunity_types:strings(body.opportunity_types,20),availability:strings(body.availability,20),
      available_now:Boolean(body.available_now),earliest_start:clean(body.earliest_start,40),compensation_type:strings(body.compensation_type,10),
      compensation_min:body.compensation_min===''||body.compensation_min==null?null:Number(body.compensation_min),compensation_max:body.compensation_max===''||body.compensation_max==null?null:Number(body.compensation_max),
      transportation:clean(body.transportation,40)||null,certifications:strings(body.certifications,20)
    };
    const {data,error}=await auth.supabase.from('talent_profiles').update(patch).eq('talent_id',talentId).select(editableSelect).single();
    if(error) throw error;
    return NextResponse.json({ok:true,profile:data});
  }catch(error){console.error('Talent profile update failed',error);return NextResponse.json({error:'Unable to update profile.'},{status:500});}
}
