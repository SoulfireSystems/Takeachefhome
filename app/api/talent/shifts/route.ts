import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';

const payTypes=new Set(['hourly','flat','daily']);

function clean(v:FormDataEntryValue|null,max=5000){
  return typeof v==='string'?v.trim().slice(0,max):'';
}
function validEmail(v:string){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function toInt(v:string){
  if(!v) return null;
  const n=Number.parseInt(v,10);
  return Number.isFinite(n)?n:null;
}

export async function POST(req:Request){
  try{
    const fd=await req.formData();
    if(clean(fd.get('company_website'),500)) return NextResponse.json({ok:false},{status:400});

    const workDate=clean(fd.get('work_date'),20);
    const startTime=clean(fd.get('start_time'),20);
    const endTime=clean(fd.get('end_time'),20);
    const workersNeeded=toInt(clean(fd.get('workers_needed'),6));
    const requestedPay=clean(fd.get('pay_type'),20);

    const today=new Date().toISOString().slice(0,10);
    if(!workDate||workDate<today){
      return NextResponse.json({ok:false,error:'ALL DAY shifts must have a current or future work date.'},{status:400});
    }

    const item={
      opportunity_type:'shift',
      role:clean(fd.get('role'),140),
      company_name:clean(fd.get('company_name'),140),
      city:clean(fd.get('city'),100),
      state:clean(fd.get('state'),50)||null,
      work_date:workDate,
      start_time:startTime||null,
      end_time:endTime||null,
      workers_needed:workersNeeded,
      venue_area:clean(fd.get('venue_area'),200)||null,
      uniform:clean(fd.get('uniform'),1000)||null,
      requirements:clean(fd.get('requirements'),3000)||null,
      arrival_instructions:clean(fd.get('arrival_instructions'),3000)||null,
      parking_notes:clean(fd.get('parking_notes'),2000)||null,
      pay_type:payTypes.has(requestedPay)?requestedPay:'hourly',
      pay_min:toInt(clean(fd.get('pay_min'),12)),
      pay_max:toInt(clean(fd.get('pay_max'),12)),
      description:clean(fd.get('description'),5000),
      contact_name:clean(fd.get('contact_name'),120),
      contact_email:clean(fd.get('contact_email'),254).toLowerCase(),
      contact_phone:clean(fd.get('contact_phone'),50)||null,
    };

    if(!item.role||!item.company_name||!item.city||!startTime||!endTime||!workersNeeded||workersNeeded<1||!item.description||!item.contact_name||!validEmail(item.contact_email)){
      return NextResponse.json({ok:false,error:'Role, company, city, date, call time, end time, crew count, duties and valid operator contact are required.'},{status:400});
    }
    if(item.pay_min!==null&&item.pay_max!==null&&item.pay_max<item.pay_min){
      return NextResponse.json({ok:false,error:'Maximum pay must be greater than or equal to minimum pay.'},{status:400});
    }

    const supabase=getSupabaseServer();
    const {error}=await supabase.from('talent_opportunities').insert(item);
    if(error) throw error;

    return NextResponse.redirect(new URL('/talent/all-day/post?submitted=1',req.url),303);
  }catch(error){
    console.error('CREATE ALL DAY SHIFT FAILED',error);
    return NextResponse.json({ok:false,error:'We could not post this shift.'},{status:500});
  }
}
