import { NextRequest,NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabase-server';

function authorized(req:NextRequest){
  const actual=Buffer.from(req.headers.get('authorization')?.replace(/^Bearer\s+/i,'')||'');
  const expected=Buffer.from(process.env.TALENT_ADMIN_KEY||'');
  return expected.length>15&&expected.length===actual.length&&timingSafeEqual(expected,actual);
}
const text=(v:unknown,max=200)=>typeof v==='string'?v.trim().slice(0,max):'';
const validUuid=(v:string)=>/^[0-9a-f-]{36}$/i.test(v);
const adminFields='id,opportunity_type,role,company_name,city,state,work_date,start_time,end_time,pay_type,pay_min,pay_max,description,employment_type,workers_needed,requirements,status,expires_at,talent_board_approved,created_at';

export async function GET(req:NextRequest){
  if(!authorized(req))return NextResponse.json({error:'Unauthorized'},{status:401});
  const sb=getSupabaseAdmin();
  const [listings,interests]=await Promise.all([
    sb.from('talent_opportunities').select(adminFields).order('created_at',{ascending:false}).limit(100),
    sb.from('talent_board_interests').select('id,opportunity_id,talent_profile_id,status,note,created_at').order('created_at',{ascending:false}).limit(200)
  ]);
  if(listings.error||interests.error)return NextResponse.json({error:'Unable to load Talent Board admin'},{status:500});
  const profiles=interests.data?.length? await sb.from('talent_profiles').select('id,talent_id,first_name,last_name,primary_role,city,state,email,phone').in('id',[...new Set(interests.data.map(i=>i.talent_profile_id))]):{data:[]};
  const map=new Map((profiles.data||[]).map(p=>[p.id,p]));
  return NextResponse.json({opportunities:listings.data||[],interests:(interests.data||[]).map(i=>({...i,talent:map.get(i.talent_profile_id)||null}))},{headers:{'Cache-Control':'no-store'}});
}

export async function POST(req:NextRequest){
  if(!authorized(req))return NextResponse.json({error:'Unauthorized'},{status:401});
  let body:Record<string,unknown>;
  try{body=await req.json()}catch{return NextResponse.json({error:'Invalid request'},{status:400})}
  if(body.action==='moderate'){
    const id=text(body.id,40),status=text(body.status,20);
    if(!validUuid(id)||!['draft','open','closed','cancelled'].includes(status)||typeof body.approved!=='boolean')return NextResponse.json({error:'Invalid review action'},{status:400});
    const {error}=await getSupabaseAdmin().from('talent_opportunities').update({status,talent_board_approved:body.approved,updated_at:new Date().toISOString()}).eq('id',id);
    return error?NextResponse.json({error:'Unable to update listing'},{status:500}):NextResponse.json({ok:true});
  }
  if(body.action==='review'){
    const id=text(body.id,40),status=text(body.status,20);
    if(!validUuid(id)||!['reviewed','shortlisted','declined'].includes(status))return NextResponse.json({error:'Invalid interest status'},{status:400});
    const {error}=await getSupabaseAdmin().from('talent_board_interests').update({status,updated_at:new Date().toISOString()}).eq('id',id).eq('status','interested');
    return error?NextResponse.json({error:'Unable to update applicant'},{status:500}):NextResponse.json({ok:true});
  }
  if(body.action!=='create')return NextResponse.json({error:'Unknown action'},{status:400});
  const role=text(body.role,100),type=text(body.opportunity_type,60),company=text(body.company_name,140),
    city=text(body.city,100),state=text(body.state,2).toUpperCase(),description=text(body.description,2000),
    contactName=text(body.contact_name,100),contactEmail=text(body.contact_email,180);
  if(!role||!type||!company||!city||!/^[A-Z]{2}$/.test(state)||description.length<30||!contactName||!/^\S+@\S+\.\S+$/.test(contactEmail))return NextResponse.json({error:'Fill in role, type, organization, location, description, and internal contact.'},{status:400});
  const amount=(v:unknown)=>v==null||v===''?null:Number.isFinite(Number(v))&&Number(v)>=0&&Number(v)<=100000?Number(v):null;
  const date=(v:unknown)=>typeof v==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(v)?v:null;
  const {data,error}=await getSupabaseAdmin().from('talent_opportunities').insert({
    role,opportunity_type:type,company_name:company,city,state,description,contact_name:contactName,contact_email:contactEmail,
    contact_phone:null,work_date:date(body.work_date),pay_type:text(body.pay_type,40)||null,pay_min:amount(body.pay_min),pay_max:amount(body.pay_max),
    requirements:text(body.requirements,900)||null,employment_type:text(body.employment_type,70)||null,
    workers_needed:amount(body.workers_needed),status:'draft',talent_board_approved:false,
    expires_at:typeof body.expires_at==='string'&&Number.isFinite(Date.parse(body.expires_at))?new Date(body.expires_at).toISOString():null,
    poster_terms_accepted:true
  }).select('id').single();
  if(error){console.error('Talent opportunity admin create',error);return NextResponse.json({error:'Could not save opportunity'},{status:500})}
  return NextResponse.json({ok:true,id:data.id,status:'draft',approved:false},{status:201});
}
