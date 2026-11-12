import { NextRequest,NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-server';
import { getTalentProfileId } from '@/lib/talent-session';

const listingFields='id,opportunity_type,role,company_name,city,state,work_date,start_time,end_time,pay_type,pay_min,pay_max,description,employment_type,workers_needed,venue_area,requirements,expires_at,marketplace_lane,urgency,hourly_rate,created_at';

async function talentId(){return await getTalentProfileId();}

export async function GET(req:NextRequest){
  const id=await talentId();
  if(!id)return NextResponse.json({error:'Please access the board from your Talent Home.'},{status:401});
  const supabase=getSupabaseAdmin();
  const now=new Date().toISOString();
  const {searchParams}=new URL(req.url);
  let query=supabase.from('talent_opportunities').select(listingFields)
   .eq('talent_board_approved',true).eq('status','open')
   .or(`expires_at.is.null,expires_at.gt.${now}`)
   .order('created_at',{ascending:false}).limit(100);
  const state=searchParams.get('state')?.trim().toUpperCase()||'';
  const kind=searchParams.get('type')?.trim()||'';
  if(state&&/^[A-Z]{2}$/.test(state))query=query.eq('state',state);
  if(kind&&kind.length<=60)query=query.eq('opportunity_type',kind);
  const [{data:listings,error}, {data:interests,error:interestError}]=await Promise.all([
    query,
    supabase.from('talent_board_interests').select('opportunity_id,status,created_at').eq('talent_profile_id',id).order('created_at',{ascending:false}).limit(200)
  ]);
  if(error||interestError)return NextResponse.json({error:'Unable to load your opportunities right now.'},{status:500});
  return NextResponse.json({opportunities:listings||[],interests:interests||[]},{headers:{'Cache-Control':'no-store'}});
}

export async function POST(req:NextRequest){
  const id=await talentId();
  if(!id)return NextResponse.json({error:'Sign in through your Talent Passport.'},{status:401});
  let body:{opportunity_id?:string;action?:string;note?:string};
  try{body=await req.json()}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
  if(!body.opportunity_id||!/^[a-f0-9-]{36}$/i.test(body.opportunity_id)||!['save','interest','withdraw'].includes(body.action||''))return NextResponse.json({error:'Invalid board action.'},{status:400});
  const supabase=getSupabaseAdmin();
  const {data:listing,error:listingError}=await supabase.from('talent_opportunities').select('id').eq('id',body.opportunity_id).eq('status','open').eq('talent_board_approved',true).or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`).maybeSingle();
  if(listingError||!listing)return NextResponse.json({error:'This opportunity is not open.'},{status:404});
  const {data:existing}=await supabase.from('talent_board_interests').select('status,created_at').eq('talent_profile_id',id).eq('opportunity_id',listing.id).maybeSingle();
  if(body.action==='interest'&&['interested','reviewed','shortlisted'].includes(existing?.status||''))return NextResponse.json({error:'You already expressed interest in this opportunity.'},{status:409});
  if(body.action==='interest'&&existing?.status!=='interested'){
    const since=new Date(Date.now()-24*60*60*1000).toISOString();
    const {count,error:rateError}=await supabase.from('talent_board_interest_events').select('id',{count:'exact',head:true}).eq('talent_profile_id',id).gte('created_at',since);
    if(rateError)return NextResponse.json({error:'Unable to validate interest limit.'},{status:500});
    if((count||0)>=10)return NextResponse.json({error:'You have reached the daily interest limit. Please try again tomorrow.'},{status:429});
  }
  const status=body.action==='interest'?'interested':body.action==='withdraw'?'withdrawn':'saved';
  if(status==='interested'&&existing?.created_at&&Date.now()-new Date(existing.created_at).getTime()<30_000)return NextResponse.json({error:'Please wait before changing your interest.'},{status:429});
  const note=typeof body.note==='string'?body.note.trim().slice(0,400):'';
  const {error}=await supabase.from('talent_board_interests').upsert({
    opportunity_id:listing.id,talent_profile_id:id,status,
    note:status==='interested'?note:'',updated_at:new Date().toISOString()
  },{onConflict:'opportunity_id,talent_profile_id'});
  if(error)return NextResponse.json({error:'Could not save your selection.'},{status:500});
  if(status==='interested'){
    const {error:eventError}=await supabase.from('talent_board_interest_events').insert({talent_profile_id:id,opportunity_id:listing.id,action:'interest'});
    if(eventError)console.error('Interest event audit failed',eventError);
  }
  return NextResponse.json({ok:true,status});
}
