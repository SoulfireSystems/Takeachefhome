import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

function money(value:number|null){
  if(!value) return null;
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
}

export default async function OpportunityPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;

  let item:any=null;
  try{
    const supabase=getSupabaseServer();
    const {data}=await supabase
      .from('opportunities')
      .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
      .eq('id',id)
      .single();
    item=data;
  }catch(error){
    console.error('OPPORTUNITY LOAD FAILED',error);
  }

  if(!item) notFound();

  const acceptingResponses=['open','responses-received'].includes(item.status);
  const budget=item.budget_min&&item.budget_max
    ? money(item.budget_min)+'–'+money(item.budget_max)
    : money(item.budget_max)||money(item.budget_min)||'Budget open';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <div className="flex gap-4 text-sm font-black">
            <Link href="/board" className="text-[#135DFF]">← The Board</Link>
            <Link href="/providers">Find a Pro</Link>
          </div>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto max-w-6xl px-4 py-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">{item.category.replaceAll('-',' ')}</span>
            <span className="border border-white/20 px-2 py-1 text-[9px] font-black uppercase text-white/55">{item.status.replaceAll('-',' ')}</span>
          </div>
          <h1 className="mt-2 max-w-4xl text-4xl font-black tracking-[-0.05em] sm:text-5xl">{item.title}</h1>
          <p className="mt-3 text-lg font-black">{item.city}{item.state?', '+item.state:''}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_380px]">
        <article>
          <div className="grid border-l-2 border-t-2 border-[#171310] bg-white sm:grid-cols-3">
            <div className="border-b-2 border-r-2 border-[#171310] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">Date</p>
              <p className="mt-1 font-black">{item.event_date||'Flexible'}</p>
            </div>
            <div className="border-b-2 border-r-2 border-[#171310] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">Guests</p>
              <p className="mt-1 font-black">{item.guest_count||'Open'}</p>
            </div>
            <div className="border-b-2 border-r-2 border-[#171310] p-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">Budget</p>
              <p className="mt-1 font-black">{budget}</p>
            </div>
          </div>

          <div className="mt-6 border-2 border-[#171310] bg-white p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">The request</p>
            <div className="mt-3 whitespace-pre-wrap text-base leading-7 text-black/68">{item.description}</div>
          </div>

          <div className="mt-6 border-2 border-[#135DFF] bg-[#E9F0FF] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Privacy</p>
            <p className="mt-2 text-sm leading-6 text-black/60">Client contact information is not published on The Board. Responses are stored privately and delivered to the client.</p>
          </div>
        </article>

        <aside>
          {acceptingResponses ? (
            <form action="/api/responses" method="post" className="grid gap-3 border-2 border-[#171310] bg-white p-5 shadow-[5px_5px_0_#171310]">
              <input type="hidden" name="opportunity_id" value={item.id}/>
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Professional response</p>
                <h2 className="mt-1 text-2xl font-black tracking-[-0.035em]">Can you handle it?</h2>
                <p className="mt-1 text-xs leading-5 text-black/50">Send a private response to the client.</p>
              </div>
              <input name="provider_name" required maxLength={120} placeholder="YOUR NAME OR BUSINESS" className="border-2 border-[#171310] px-3 py-3 text-sm"/>
              <input name="provider_email" type="email" required maxLength={254} placeholder="EMAIL" className="border-2 border-[#171310] px-3 py-3 text-sm"/>
              <input name="provider_phone" maxLength={50} placeholder="PHONE" className="border-2 border-[#171310] px-3 py-3 text-sm"/>
              <input name="profile_url" type="url" maxLength={500} placeholder="PROFILE / WEBSITE URL" className="border-2 border-[#171310] px-3 py-3 text-sm"/>
              <input name="quote_amount" type="number" min="0" max="10000000" placeholder="QUOTE AMOUNT" className="border-2 border-[#171310] px-3 py-3 text-sm"/>
              <textarea name="message" required maxLength={5000} rows={6} placeholder="WHY YOU'RE A FIT + WHAT YOU CAN PROVIDE" className="border-2 border-[#171310] px-3 py-3 text-sm"/>
              <button className="border-2 border-[#171310] bg-[#135DFF] px-4 py-4 text-sm font-black uppercase text-white">Send Response →</button>
            </form>
          ) : (
            <div className="border-2 border-[#171310] bg-white p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-black/40">Closed</p>
              <h2 className="mt-2 text-2xl font-black">This request is no longer accepting responses.</h2>
              <Link href="/board" className="mt-5 inline-block border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-sm font-black text-white">Browse Open Work →</Link>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
