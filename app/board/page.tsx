import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const allowedCategories = new Set([
  'private-chef','catering','meal-prep','food-truck','experience','class','kitchen-space','cold-storage'
]);

const categoryLabels: Record<string,string> = {
  'private-chef':'Private Chef',
  catering:'Catering',
  'meal-prep':'Meal Prep',
  'food-truck':'Food Truck',
  experience:'Experience',
  class:'Cooking Class',
  'kitchen-space':'Kitchen Space',
  'cold-storage':'Cold Storage',
};

function money(value:number|null){
  if(!value) return null;
  return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
}

function single(value:string|string[]|undefined){
  return Array.isArray(value) ? value[0] : value || '';
}

async function loadBoard(category:string,city:string){
  try{
    const supabase=getSupabaseServer();
    let query=supabase
      .from('opportunities')
      .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
      .in('status',['open','responses-received']);

    if(category && allowedCategories.has(category)) query=query.eq('category',category);
    if(city) query=query.ilike('city','%'+city.slice(0,80)+'%');

    const {data,error}=await query.order('created_at',{ascending:false}).limit(100);
    if(error) throw error;
    return {opportunities:data??[],available:true};
  }catch(error){
    console.error('BOARD LOAD FAILED',error);
    return {opportunities:[],available:false};
  }
}

export default async function BoardPage({searchParams}:{searchParams:Promise<{category?:string|string[];city?:string|string[]}>}){
  const params=await searchParams;
  const requestedCategory=single(params.category);
  const category=allowedCategories.has(requestedCategory)?requestedCategory:'';
  const city=single(params.city).trim();
  const {opportunities,available}=await loadBoard(category,city);

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b border-white/10 bg-[#171310] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em]">
          <span className="text-white/45">Live demand / Culinary Exchange</span>
          <Link href="/talent" className="text-[#D4A64F]">Work in food? Talent →</Link>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">
            TakeAChefHome<span className="text-[#171310]">.com</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm font-black">
            <Link href="/providers">Find a Pro</Link>
            <Link href="/kitchens">Find Space</Link>
            <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Post Request</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">The heartbeat</p>
              <h1 className="mt-1 text-5xl font-black tracking-[-0.055em] sm:text-6xl">The Board.</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">Real requests from people looking for food service, kitchen space and cold storage. No manufactured listings.</p>
            </div>
            <div className="border border-white/25 px-4 py-3 text-xs font-black uppercase tracking-wide text-white/65">
              {available ? opportunities.length + ' matching opportunities' : 'Connection pending'}
            </div>
          </div>

          <form action="/board" method="get" className="mt-6 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
            <select name="category" defaultValue={category} className="min-h-14 border-2 border-white bg-white px-4 text-sm font-black text-[#171310]">
              <option value="">ALL CATEGORIES</option>
              <option value="private-chef">Private Chef</option>
              <option value="catering">Catering</option>
              <option value="meal-prep">Meal Prep</option>
              <option value="food-truck">Food Truck</option>
              <option value="experience">Experience</option>
              <option value="class">Cooking Class</option>
              <option value="kitchen-space">Kitchen Space</option>
              <option value="cold-storage">Cold Storage</option>
            </select>
            <input name="city" defaultValue={city} placeholder="CITY OR MARKET" className="min-h-14 border-2 border-white bg-white px-4 text-sm font-bold text-[#171310]" />
            <button className="min-h-14 border-2 border-white bg-[#135DFF] px-6 text-sm font-black uppercase">Filter Board →</button>
          </form>

          {(category||city) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-black uppercase tracking-wide text-white/55">
              <span>Showing:</span>
              {category && <span className="border border-white/25 px-2 py-1">{categoryLabels[category]}</span>}
              {city && <span className="border border-white/25 px-2 py-1">{city}</span>}
              <Link href="/board" className="text-[#D4A64F]">Clear →</Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        {!available ? (
          <div className="border-2 border-[#171310] bg-white p-7">
            <h2 className="text-2xl font-black">The Board is built. The deployment connection is the missing piece.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/55">Once the server-side database key is available to this deployment, live requests populate here automatically.</p>
          </div>
        ) : opportunities.length===0 ? (
          <div className="grid gap-5 border-2 border-[#171310] bg-white p-7 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-2xl font-black">Nothing matching yet.</h2>
              <p className="mt-2 text-sm text-black/55">An empty real board beats a fake busy one.</p>
            </div>
            <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-5 py-3 text-center text-sm font-black uppercase text-white">Post Request →</Link>
          </div>
        ) : (
          <div className="border-2 border-[#171310] bg-white">
            <div className="hidden grid-cols-[135px_1fr_170px_140px_90px] bg-[#171310] px-4 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/65 md:grid">
              <span>Type</span><span>Opportunity</span><span>Market</span><span>Budget</span><span>Status</span>
            </div>

            {opportunities.map((item:any,index:number)=>{
              const budget=item.budget_min&&item.budget_max
                ? money(item.budget_min)+'–'+money(item.budget_max)
                : money(item.budget_max)||money(item.budget_min)||'Budget open';

              return (
                <Link key={item.id} href={'/board/'+item.id} className={'grid gap-2 px-4 py-4 hover:bg-[#E9F0FF] md:grid-cols-[135px_1fr_170px_140px_90px] md:items-center '+(index?'border-t border-black/15':'')}>
                  <span className="text-[10px] font-black uppercase tracking-wide text-[#135DFF]">{categoryLabels[item.category]||item.category}</span>
                  <div>
                    <h2 className="font-black">{item.title}</h2>
                    <p className="mt-1 line-clamp-1 text-sm text-black/50">{item.description}</p>
                    <p className="mt-1 text-[11px] text-black/40">{item.event_date||'Date flexible'}{item.guest_count?' · '+item.guest_count+' guests':''}</p>
                  </div>
                  <span className="text-sm font-bold">{item.city}{item.state?', '+item.state:''}</span>
                  <span className="text-sm font-black">{budget}</span>
                  <span className="text-[10px] font-black uppercase text-[#D09B2C]">{item.status.replaceAll('-',' ')}</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
