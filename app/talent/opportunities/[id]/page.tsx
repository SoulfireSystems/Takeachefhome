import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function load(id:string){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('talent_opportunities')
      .select('id,opportunity_type,role,company_name,city,state,employment_type,work_date,start_time,end_time,workers_needed,venue_area,uniform,requirements,arrival_instructions,parking_notes,pay_type,pay_min,pay_max,description,status,expires_at')
      .eq('id',id)
      .eq('status','open')
      .single();

    if(error||!data) return null;

    if(data.opportunity_type==='job'){
      if(!data.expires_at||new Date(data.expires_at)<=new Date()) return null;
    }else{
      const today=new Date().toISOString().slice(0,10);
      if(!data.work_date||data.work_date<today) return null;
    }

    return data;
  }catch{
    return null;
  }
}

function payLabel(item:any){
  const suffix=item.pay_type==='hourly'?'/hr':item.pay_type==='daily'?'/day':'';
  if(item.pay_min&&item.pay_max) return '$'+item.pay_min+'–$'+item.pay_max+suffix;
  if(item.pay_min) return '$'+item.pay_min+suffix;
  if(item.pay_max) return 'Up to $'+item.pay_max+suffix;
  return 'Pay listed with operator';
}

export default async function TalentOpportunityPage({
  params,searchParams
}:{params:Promise<{id:string}>;searchParams:Promise<{applied?:string}>}){
  const {id}=await params;
  const query=await searchParams;
  const item:any=await load(id);
  if(!item) notFound();

  const applied=query.applied==='1';
  const isShift=item.opportunity_type==='shift';

  return (
    <main className={'min-h-screen '+(isShift?'bg-[#171310] text-white':'bg-[#F3EEE2] text-[#171310]')}>
      <header className={'border-b-2 '+(isShift?'border-white/20 bg-[#171310]':'border-[#171310] bg-[#F8F4EA]')}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href={isShift?'/talent/all-day':'/talent/jobs'} className="text-2xl font-black">
            TakeAChefHome / Talent / <span className={isShift?'text-[#D4A64F]':'text-[#135DFF]'}>{isShift?'ALL DAY':'JOBS'}</span>
          </Link>
          <Link href="/talent" className="text-xs font-black uppercase opacity-60">Talent Home →</Link>
        </div>
      </header>

      {isShift?(
        <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1fr_360px]">
          <article className="border-2 border-white/50">
            <div className="border-b border-white/30 bg-[#D4A64F] p-4 text-[#171310]">
              <p className="text-[9px] font-black uppercase tracking-[0.22em]">ALL DAY / Call Sheet</p>
              <h1 className="mt-1 text-4xl font-black tracking-[-0.05em]">{item.role}</h1>
            </div>

            <div className="grid grid-cols-2 border-b border-white/30 md:grid-cols-4">
              <div className="border-r border-white/20 p-4"><span className="block text-[8px] font-black uppercase text-white/35">Date</span><strong>{item.work_date}</strong></div>
              <div className="border-r border-white/20 p-4"><span className="block text-[8px] font-black uppercase text-white/35">Call</span><strong>{String(item.start_time).slice(0,5)}</strong></div>
              <div className="border-r border-white/20 p-4"><span className="block text-[8px] font-black uppercase text-white/35">Out</span><strong>{String(item.end_time).slice(0,5)}</strong></div>
              <div className="p-4"><span className="block text-[8px] font-black uppercase text-white/35">Crew</span><strong>{item.workers_needed} needed</strong></div>
            </div>

            <div className="p-5">
              <p className="text-xl font-black">{item.company_name}</p>
              <p className="mt-1 text-sm text-white/55">{item.city}{item.state?', '+item.state:''}{item.venue_area?' · '+item.venue_area:''}</p>
              <p className="mt-4 text-2xl font-black text-[#D4A64F]">{payLabel(item)}</p>

              <div className="mt-6 grid gap-5">
                <div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">Duties</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">{item.description}</p></div>
                {item.uniform&&<div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">Uniform</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">{item.uniform}</p></div>}
                {item.requirements&&<div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">Requirements</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">{item.requirements}</p></div>}
                {item.arrival_instructions&&<div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">Arrival</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">{item.arrival_instructions}</p></div>}
                {item.parking_notes&&<div><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/35">Parking / Access</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/70">{item.parking_notes}</p></div>}
              </div>
            </div>
          </article>

          <ApplicationForm item={item} applied={applied} shift/>
        </section>
      ):(
        <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1fr_360px]">
          <article>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">{item.employment_type?.replaceAll('-',' ')||'Job'}</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.05em]">{item.role}</h1>
            <p className="mt-2 text-xl font-black">{item.company_name}</p>
            <p className="mt-3 font-bold">{item.city}{item.state?', '+item.state:''}</p>
            <p className="mt-4 text-2xl font-black text-[#135DFF]">{payLabel(item)}</p>

            <div className="mt-6 border-2 border-[#171310] bg-white p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-black/65">{item.description}</p>
              {item.requirements&&<div className="mt-6 border-t-2 border-[#171310] pt-5"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-black/40">Requirements</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/65">{item.requirements}</p></div>}
            </div>

            <p className="mt-4 text-xs font-bold text-black/40">This job expires automatically after 30 days unless the employer renews it.</p>
          </article>

          <ApplicationForm item={item} applied={applied}/>
        </section>
      )}
    </main>
  );
}

function ApplicationForm({item,applied,shift=false}:{item:any;applied:boolean;shift?:boolean}){
  if(applied){
    return <aside className={'h-fit border-2 p-5 '+(shift?'border-white bg-white text-[#171310]':'border-[#171310] bg-white')}>
      <h2 className="text-2xl font-black">{shift?'Shift interest sent.':'Application sent.'}</h2>
      <p className="mt-2 text-sm opacity-55">Your contact information stays private from the public listing.</p>
    </aside>;
  }

  return (
    <aside className="h-fit">
      <form action="/api/talent/apply" method="post" className={'grid gap-3 border-2 p-5 '+(shift?'border-white bg-[#F8F4EA] text-[#171310]':'border-[#171310] bg-white')}>
        <h2 className="text-2xl font-black">{shift?'I can work this shift':'Apply for this job'}</h2>
        <input type="hidden" name="opportunity_id" value={item.id}/>
        <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>
        <input name="applicant_name" required className="border-2 border-[#171310] p-3" placeholder="Name"/>
        <input name="applicant_email" type="email" required className="border-2 border-[#171310] p-3" placeholder="Email"/>
        <input name="applicant_phone" className="border-2 border-[#171310] p-3" placeholder="Phone"/>
        <input name="profile_url" className="border-2 border-[#171310] p-3" placeholder="Crew Pass / portfolio URL"/>
        <textarea name="message" required rows={5} className="border-2 border-[#171310] p-3" placeholder={shift?'Confirm your experience and availability.':'Why are you a fit?'}/>
        <button className={'border-2 border-[#171310] p-3 font-black uppercase '+(shift?'bg-[#D4A64F] text-[#171310]':'bg-[#135DFF] text-white')}>
          {shift?'Send Shift Interest →':'Send Application →'}
        </button>
      </form>
    </aside>
  );
}
