import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const services = [
  { number:'01', label:'Private Chef', value:'private-chef', note:'Dinner parties · Airbnb · retreats · date nights' },
  { number:'02', label:'Catering', value:'catering', note:'Corporate · weddings · brunch · drop-off' },
  { number:'03', label:'Meal Prep', value:'meal-prep', note:'Weekly meals · families · athletes · seniors' },
  { number:'04', label:'Food Trucks', value:'food-truck', note:'Events · offices · neighborhoods · festivals' },
  { number:'05', label:'Experiences', value:'experience', note:'Chef tables · tastings · culinary events' },
  { number:'06', label:'Cooking Classes', value:'class', note:'Private · group · team-building · virtual' },
];

const markets = [
  'Atlanta','Raleigh','Charlotte','Miami','Dallas','Phoenix',
  'Chicago','Kansas City','Las Vegas','San Juan','Seattle','Denver',
];

const categoryLabel:Record<string,string>={
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
  return new Intl.NumberFormat('en-US',{
    style:'currency',
    currency:'USD',
    maximumFractionDigits:0,
  }).format(value);
}

async function getExchangeData(){
  try{
    const supabase=getSupabaseServer();

    const [board,providers,jobs,shifts]=await Promise.all([
      supabase
        .from('opportunities')
        .select('id,category,title,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
        .in('status',['open','responses-received'])
        .order('created_at',{ascending:false})
        .limit(5),
      supabase
        .from('provider_profiles')
        .select('id',{count:'exact',head:true})
        .eq('status','active'),
      supabase
        .from('talent_opportunities')
        .select('id',{count:'exact',head:true})
        .eq('opportunity_type','job')
        .eq('status','open'),
      supabase
        .from('talent_opportunities')
        .select('id',{count:'exact',head:true})
        .eq('opportunity_type','shift')
        .eq('status','open'),
    ]);

    return {
      opportunities: board.error ? [] : board.data ?? [],
      stats:{
        providers:providers.error ? null : providers.count ?? 0,
        jobs:jobs.error ? null : jobs.count ?? 0,
        shifts:shifts.error ? null : shifts.count ?? 0,
        requests:board.error ? null : board.data?.length ?? 0,
      },
    };
  }catch(error){
    console.error('HOME EXCHANGE LOAD FAILED',error);
    return {
      opportunities:[],
      stats:{providers:null,jobs:null,shifts:null,requests:null},
    };
  }
}

function Stat({value,label}:{value:number|null;label:string}){
  return (
    <div className="border-b border-r border-white/20 p-4">
      <strong className="block text-3xl font-black tracking-[-0.05em]">{value===null?'—':value}</strong>
      <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.18em] text-white/45">{label}</span>
    </div>
  );
}

export default async function Home(){
  const {opportunities,stats}=await getExchangeData();

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-white/55">TakeAChefHome / The Culinary Exchange</span>
          <div className="flex items-center gap-5">
            <span className="hidden text-white/35 sm:inline">Food service · Food work · Food space</span>
            <Link href="/talent" className="text-[#D4A64F] hover:text-white">Work in food? Enter Talent →</Link>
          </div>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.065em] sm:text-[42px]">
            <span className="text-[#135DFF]">TakeAChefHome</span><span className="text-[#171310]">.com</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-black">
            <Link href="/providers" className="hover:text-[#135DFF]">Find a Pro</Link>
            <Link href="/board" className="hover:text-[#135DFF]">The Board</Link>
            <Link href="/kitchens" className="hover:text-[#135DFF]">Find Space</Link>
            <Link href="/shop" className="hover:text-[#135DFF]">Chef Gear</Link>
            <Link href="/talent" className="hover:text-[#135DFF]">Talent</Link>
            <Link href="/post-a-lead" className="exchange-lift border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">
              Post Request
            </Link>
          </nav>
        </div>
      </header>

      <section className="exchange-paper border-b-2 border-[#171310]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_370px]">
          <div className="relative overflow-hidden border-b-2 border-[#171310] px-4 py-9 sm:px-6 sm:py-12 lg:border-b-0 lg:border-r-2 lg:py-14">
            <div className="absolute right-[-34px] top-8 hidden border-2 border-[#171310] bg-[#D4A64F] px-7 py-2 text-[10px] font-black uppercase tracking-[0.2em] lg:block exchange-stamp-right">
              Market open
            </div>

            <p className="text-[10px] font-black uppercase tracking-[0.26em] text-[#135DFF]">The place food people find each other</p>

            <h1 className="mt-4 max-w-5xl text-[52px] font-black leading-[0.83] tracking-[-0.07em] sm:text-[74px] lg:text-[94px]">
              FOOD PEOPLE.
              <span className="block text-[#135DFF]">FOOD WORK.</span>
              <span className="block exchange-serif font-normal italic tracking-[-0.055em]">FOOD SPACE.</span>
            </h1>

            <div className="mt-7 grid max-w-4xl gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-2xl text-base font-bold leading-7 text-black/65">
                Hire a chef. Find a caterer. Pick up a shift. Post a kitchen job. Find prep space. Move equipment.
                One exchange built around how food work actually happens.
              </p>
              <Link href="/post-a-lead" className="exchange-stamp exchange-lift border-2 border-[#171310] bg-[#F3D37C] px-5 py-4 text-center text-xs font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#171310]">
                I know what I need →
              </Link>
            </div>

            <form action="/providers" method="get" className="mt-8 grid max-w-5xl border-2 border-[#171310] bg-white shadow-[7px_7px_0_#171310] md:grid-cols-[1fr_1fr_auto]">
              <label className="border-b-2 border-[#171310] md:border-b-0 md:border-r-2">
                <span className="block px-4 pt-3 text-[9px] font-black uppercase tracking-[0.2em] text-black/40">I need</span>
                <select name="service" defaultValue="" className="min-h-14 w-full bg-white px-4 pb-3 text-lg font-black outline-none">
                  <option value="">ANY FOOD SERVICE</option>
                  {services.map(service=><option key={service.value} value={service.value}>{service.label}</option>)}
                </select>
              </label>

              <label className="border-b-2 border-[#171310] md:border-b-0 md:border-r-2">
                <span className="block px-4 pt-3 text-[9px] font-black uppercase tracking-[0.2em] text-black/40">In / near</span>
                <input name="city" placeholder="CITY OR MARKET" className="min-h-14 w-full bg-white px-4 pb-3 text-lg font-black outline-none placeholder:text-black/30"/>
              </label>

              <button className="min-h-20 bg-[#135DFF] px-7 text-sm font-black uppercase tracking-[0.12em] text-white hover:bg-[#171310]">
                Search →
              </button>
            </form>
          </div>

          <aside className="bg-[#171310] text-white">
            <div className="border-b border-white/20 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">Live exchange</p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">Right now.</h2>
                </div>
                <span className="h-3 w-3 rounded-full bg-[#D4A64F] shadow-[0_0_0_5px_rgba(212,166,79,.14)]" />
              </div>
            </div>

            <div className="grid grid-cols-2 border-l border-white/20">
              <Stat value={stats.providers} label="Active pros"/>
              <Stat value={stats.requests} label="Recent requests"/>
              <Stat value={stats.jobs} label="Open jobs"/>
              <Stat value={stats.shifts} label="Open shifts"/>
            </div>

            <div className="grid">
              <Link href="/providers" className="group border-b border-white/20 p-5 hover:bg-white/5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">Client side</span>
                <strong className="mt-1 flex items-end justify-between text-2xl font-black"><span>Find a Pro</span><span className="text-[#D4A64F] group-hover:translate-x-1">→</span></strong>
              </Link>
              <Link href="/board" className="group border-b border-white/20 p-5 hover:bg-white/5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">Demand</span>
                <strong className="mt-1 flex items-end justify-between text-2xl font-black"><span>Open The Board</span><span className="text-[#D4A64F] group-hover:translate-x-1">→</span></strong>
              </Link>
              <Link href="/talent" className="group p-5 hover:bg-white/5">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/35">Work side</span>
                <strong className="mt-1 flex items-end justify-between text-2xl font-black"><span>Enter Talent</span><span className="text-[#D4A64F] group-hover:translate-x-1">→</span></strong>
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid lg:grid-cols-[280px_1fr]">
            <div className="border-b-2 border-[#171310] p-5 lg:border-b-0 lg:border-r-2">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">The directory</p>
              <h2 className="mt-2 text-4xl font-black leading-[0.92] tracking-[-0.055em]">Start with what you need.</h2>
              <p className="mt-4 text-sm leading-6 text-black/55">No giant menu maze. Pick the lane and go.</p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3">
              {services.map((service,index)=>(
                <Link
                  key={service.value}
                  href={'/providers?service='+service.value}
                  className={'group min-h-44 border-[#171310] p-5 hover:bg-[#E9F0FF] '+(index<3?'border-b-2 ':'')+(index%3!==2?'xl:border-r-2 ':'')+(index%2===0?'sm:border-r-2 xl:border-r-2 ':'')}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-4xl font-black tracking-[-0.06em] text-black/12">{service.number}</span>
                    <span className="text-lg font-black text-[#135DFF] transition group-hover:translate-x-1">→</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] group-hover:text-[#135DFF]">{service.label}</h3>
                  <p className="mt-2 text-xs font-bold leading-5 text-black/45">{service.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#171310] bg-[#135DFF] text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_330px]">
          <div className="border-b-2 border-white/30 px-4 py-8 sm:px-6 lg:border-b-0 lg:border-r-2 lg:py-10">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#F3D37C]">Live demand</p>
                <h2 className="mt-1 text-4xl font-black tracking-[-0.055em] sm:text-5xl">THE BOARD</h2>
              </div>
              <Link href="/board" className="border-b-2 border-white pb-1 text-xs font-black uppercase tracking-[0.12em]">See everything →</Link>
            </div>

            <div className="mt-6 border-2 border-white/70">
              <div className="hidden grid-cols-[115px_1fr_145px_125px] border-b border-white/40 bg-black/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.17em] text-white/65 md:grid">
                <span>Type</span><span>Request</span><span>Market</span><span>Budget</span>
              </div>

              {opportunities.length===0 ? (
                <div className="grid gap-4 bg-white p-5 text-[#171310] sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="text-xl font-black">The Board is open.</h3>
                    <p className="mt-1 text-sm text-black/55">No fake activity. Real requests appear here when people post them.</p>
                  </div>
                  <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#F3D37C] px-4 py-3 text-center text-xs font-black uppercase shadow-[3px_3px_0_#171310]">Post first request →</Link>
                </div>
              ) : opportunities.map((item:any,index:number)=>{
                const budget=item.budget_min&&item.budget_max
                  ? money(item.budget_min)+'–'+money(item.budget_max)
                  : money(item.budget_max)||money(item.budget_min)||'Budget open';

                return (
                  <Link
                    key={item.id}
                    href={'/board/'+item.id}
                    className={'grid gap-2 px-3 py-4 hover:bg-white/10 md:grid-cols-[115px_1fr_145px_125px] md:items-center '+(index?'border-t border-white/30':'')}
                  >
                    <span className="text-[9px] font-black uppercase tracking-wide text-[#F3D37C]">{categoryLabel[item.category]||item.category}</span>
                    <div>
                      <h3 className="text-sm font-black">{item.title}</h3>
                      <p className="mt-1 text-[10px] text-white/50">{item.event_date||'Date flexible'}{item.guest_count?' · '+item.guest_count+' guests':''}</p>
                    </div>
                    <span className="text-sm font-bold">{item.city}{item.state?', '+item.state:''}</span>
                    <span className="text-sm font-black">{budget}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <aside className="bg-[#F3D37C] p-6 text-[#171310]">
            <p className="text-[10px] font-black uppercase tracking-[0.24em]">Fast lane</p>
            <h3 className="mt-2 text-4xl font-black leading-[0.9] tracking-[-0.055em]">DON'T SEARCH.<br/>POST IT.</h3>
            <p className="mt-4 text-sm font-bold leading-6 text-black/60">Tell the exchange the date, city, budget and what needs to happen. Let the right food professional come to the work.</p>
            <Link href="/post-a-lead" className="exchange-lift mt-6 block border-2 border-[#171310] bg-white px-5 py-4 text-center text-xs font-black uppercase tracking-[0.12em] shadow-[4px_4px_0_#171310]">Post a Request →</Link>
          </aside>
        </div>
      </section>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid lg:grid-cols-[280px_1fr]">
            <div className="border-b border-white/20 p-5 lg:border-b-0 lg:border-r lg:border-white/20">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Back of house</p>
              <h2 className="mt-2 text-4xl font-black leading-[0.92] tracking-[-0.055em]">The stuff behind the service.</h2>
              <p className="mt-4 text-sm leading-6 text-white/45">The marketplace does not stop at chefs and caterers.</p>
            </div>

            <div className="grid md:grid-cols-3">
              <Link href="/kitchens" className="group border-b border-white/20 p-6 hover:bg-white/5 md:border-b-0 md:border-r">
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">01 / Space</span>
                <h3 className="mt-12 text-3xl font-black tracking-[-0.05em]">Kitchen Exchange</h3>
                <p className="mt-2 text-sm leading-6 text-white/45">Commissary · prep · production · ghost kitchen access</p>
                <span className="mt-6 block text-sm font-black text-[#D4A64F] group-hover:text-white">Find space →</span>
              </Link>

              <Link href="/kitchens" className="group border-b border-white/20 p-6 hover:bg-white/5 md:border-b-0 md:border-r">
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">02 / Storage</span>
                <h3 className="mt-12 text-3xl font-black tracking-[-0.05em]">Cold Grid</h3>
                <p className="mt-2 text-sm leading-6 text-white/45">Cooler · freezer · overflow · event staging</p>
                <span className="mt-6 block text-sm font-black text-[#D4A64F] group-hover:text-white">Find cold storage →</span>
              </Link>

              <Link href="/shop" className="group p-6 hover:bg-white/5">
                <span className="text-[9px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">03 / Equipment</span>
                <h3 className="mt-12 text-3xl font-black tracking-[-0.05em]">Chef Gear</h3>
                <p className="mt-2 text-sm leading-6 text-white/45">Buy · sell · rent what kitchens actually use</p>
                <span className="mt-6 block text-sm font-black text-[#D4A64F] group-hover:text-white">Open gear →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="exchange-paper border-b-2 border-[#171310]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_420px]">
          <div className="border-b-2 border-[#171310] px-4 py-9 sm:px-6 lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Browse by market</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.055em]">Your city is the category.</h2>
            <div className="mt-6 grid grid-cols-2 border-l-2 border-t-2 border-[#171310] bg-white sm:grid-cols-3">
              {markets.map(city=>(
                <Link key={city} href={'/providers?city='+encodeURIComponent(city)} className="border-b-2 border-r-2 border-[#171310] px-4 py-4 text-sm font-black hover:bg-[#E9F0FF] hover:text-[#135DFF]">
                  {city} <span className="float-right">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#D4A64F] p-7">
            <span className="inline-block border-2 border-[#171310] bg-[#F8F4EA] px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] exchange-stamp">The other front door</span>
            <h2 className="mt-5 text-5xl font-black leading-[0.88] tracking-[-0.06em]">WORK<br/>IN FOOD?</h2>
            <p className="mt-4 text-sm font-bold leading-6 text-black/65">Jobs. ALL DAY shifts. Prep crews. Professional profiles. The people side of the exchange has its own front door.</p>
            <Link href="/talent" className="exchange-lift mt-6 inline-block border-2 border-[#171310] bg-[#171310] px-5 py-4 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[4px_4px_0_#135DFF]">Enter Talent →</Link>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-4 py-7 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">The promise</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">REAL PEOPLE. REAL WORK. REAL INVENTORY.</h2>
          </div>
          <p className="max-w-xl text-sm font-bold leading-6 text-black/55">
            If the exchange has zero listings, it says zero. We build trust by showing what is actually here — then growing it.
          </p>
        </div>
      </section>

      <footer className="bg-[#171310] text-white">
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <div className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</div>
            <p className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/35">The Culinary Exchange</p>
          </div>
          <div className="flex flex-wrap gap-5 text-xs font-black uppercase tracking-wide text-white/70">
            <Link href="/providers" className="hover:text-white">Find a Pro</Link>
            <Link href="/board" className="hover:text-white">The Board</Link>
            <Link href="/kitchens" className="hover:text-white">Find Space</Link>
            <Link href="/shop" className="hover:text-white">Chef Gear</Link>
            <Link href="/talent" className="hover:text-white">Talent</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
