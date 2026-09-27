import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

const allowedServices=new Set(['private-chef','catering','meal-prep','food-truck','experience','class']);

function single(value:string|string[]|undefined){
  return Array.isArray(value)?value[0]:value||'';
}

function money(value:number|null){
  if(!value) return 'OPEN';
  return '$'+Number(value).toLocaleString();
}

function cardNo(value:number|null|undefined){
  return String(value??0).padStart(3,'0');
}

async function loadProviders(service:string,city:string){
  try{
    const supabase=getSupabaseServer();
    let query=supabase
      .from('provider_profiles')
      .select('id,card_number,display_name,professional_type,services,city,state,bio,years_experience,starting_price,profile_image_url,verified,created_at')
      .eq('status','active');

    if(service&&allowedServices.has(service)) query=query.contains('services',[service]);
    if(city) query=query.ilike('city','%'+city.slice(0,80)+'%');

    const {data,error}=await query.order('card_number',{ascending:true}).limit(100);
    if(error) throw error;
    return {providers:data??[],available:true};
  }catch(error){
    console.error('PROVIDER DIRECTORY LOAD FAILED',error);
    return {providers:[],available:false};
  }
}

export default async function ProvidersPage({searchParams}:{searchParams:Promise<{service?:string|string[];city?:string|string[]}>}){
  const params=await searchParams;
  const requestedService=single(params.service);
  const service=allowedServices.has(requestedService)?requestedService:'';
  const city=single(params.city).trim();
  const {providers,available}=await loadProviders(service,city);

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-white/45">TakeAChefHome / Pro Cards</span>
          <Link href="/providers/join" className="text-[#D4A64F]">Get your card →</Link>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link>
          <nav className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/providers" className="text-[#135DFF]">The Roster</Link>
            <Link href="/board">The Board</Link>
            <Link href="/kitchens">Find Space</Link>
            <Link href="/talent">Talent</Link>
            <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Post Request</Link>
          </nav>
        </div>
      </header>

      <section className="exchange-paper border-b-2 border-[#171310]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_340px]">
          <div className="border-b-2 border-[#171310] px-4 py-9 sm:px-6 lg:border-b-0 lg:border-r-2">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Find a Pro / Series 01</p>
            <h1 className="mt-2 text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl">THE<br/><span className="text-[#135DFF]">ROSTER.</span></h1>
            <p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-black/55">Real culinary professionals presented like a roster, searched like a marketplace. Every card is a real person or business.</p>

            <form action="/providers" method="get" className="mt-7 grid border-2 border-[#171310] bg-white shadow-[5px_5px_0_#171310] md:grid-cols-[1fr_1fr_auto]">
              <select name="service" defaultValue={service} className="min-h-14 border-b-2 border-[#171310] bg-white px-4 text-sm font-black md:border-b-0 md:border-r-2">
                <option value="">ALL POSITIONS</option>
                <option value="private-chef">Private Chef</option>
                <option value="catering">Catering</option>
                <option value="meal-prep">Meal Prep</option>
                <option value="food-truck">Food Truck</option>
                <option value="experience">Experience</option>
                <option value="class">Cooking Class</option>
              </select>
              <input name="city" defaultValue={city} placeholder="CITY / MARKET" className="min-h-14 border-b-2 border-[#171310] px-4 text-sm font-bold md:border-b-0 md:border-r-2"/>
              <button className="min-h-14 bg-[#171310] px-6 text-xs font-black uppercase tracking-[0.14em] text-white hover:bg-[#135DFF]">Search Roster →</button>
            </form>
          </div>

          <aside className="bg-[#D4A64F] p-6">
            <span className="inline-block border-2 border-[#171310] bg-[#F8F4EA] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] exchange-stamp">Inaugural set</span>
            <h2 className="mt-5 text-4xl font-black leading-[0.9] tracking-[-0.055em]">EVERY PRO GETS A CARD.</h2>
            <p className="mt-4 text-sm font-bold leading-6 text-black/60">Portrait. Position. Home market. Services. Experience. Starting minimum. Verification. No invented ratings.</p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Active cards</p>
            <h2 className="text-3xl font-black tracking-[-0.045em]">{available?providers.length+' on the roster':'Roster connection pending'}</h2>
          </div>
          <Link href="/providers/join" className="border-b-2 border-[#171310] pb-1 text-xs font-black uppercase tracking-[0.12em]">Food professional? Get listed →</Link>
        </div>

        {!available?(
          <div className="border-2 border-[#171310] bg-white p-7"><h3 className="text-xl font-black">The roster is waiting on the production connection.</h3></div>
        ):providers.length===0?(
          <div className="grid gap-5 border-2 border-[#171310] bg-white p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-black">The inaugural set is empty.</h3>
              <p className="mt-2 text-sm text-black/55">Your first five professionals become cards #001–#005. No placeholders.</p>
            </div>
            <Link href="/providers/join" className="border-2 border-[#171310] bg-[#D4A64F] px-5 py-3 text-sm font-black uppercase shadow-[3px_3px_0_#171310]">Create First Card →</Link>
          </div>
        ):(
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {providers.map((provider:any)=>(
              <Link key={provider.id} href={'/providers/'+provider.id} className="pro-card group">
                <div className="relative aspect-[5/6] overflow-hidden border-b-2 border-[#171310] bg-[#171310]">
                  {provider.profile_image_url?(
                    <img src={provider.profile_image_url} alt={provider.display_name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"/>
                  ):(
                    <div className="flex h-full items-end bg-[linear-gradient(145deg,#135DFF,#171310)] p-5 text-7xl font-black tracking-[-0.07em] text-white/20">{provider.display_name.slice(0,2).toUpperCase()}</div>
                  )}

                  <div className="absolute left-3 top-3 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1">
                    <span className="block text-[8px] font-black uppercase tracking-[0.18em]">Card</span>
                    <strong className="pro-card-number block text-xl leading-none">#{cardNo(provider.card_number)}</strong>
                  </div>

                  {provider.verified&&(
                    <div className="pro-card-foil absolute right-3 top-3 border-2 border-[#171310] px-2 py-1 text-[8px] font-black uppercase tracking-[0.14em]">Verified</div>
                  )}

                  <div className="absolute inset-x-3 bottom-3 border-2 border-[#171310] bg-[#135DFF] px-3 py-2 text-white">
                    <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/65">{provider.professional_type?.replaceAll('-',' ')}</p>
                    <h3 className="mt-0.5 text-2xl font-black leading-none tracking-[-0.05em]">{provider.display_name}</h3>
                  </div>
                </div>

                <div className="bg-[#F8F4EA] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-black/40">Home market</p>
                      <p className="mt-1 text-sm font-black">{provider.city}{provider.state?', '+provider.state:''}</p>
                    </div>
                    <span className="text-lg font-black text-[#135DFF]">TACH</span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 border-l border-t border-[#171310] text-center">
                    <div className="border-b border-r border-[#171310] p-2">
                      <strong className="pro-card-stat block text-lg">{provider.years_experience??'—'}</strong>
                      <span className="text-[7px] font-black uppercase tracking-wide text-black/45">Years</span>
                    </div>
                    <div className="border-b border-r border-[#171310] p-2">
                      <strong className="pro-card-stat block text-lg">{provider.services?.length??0}</strong>
                      <span className="text-[7px] font-black uppercase tracking-wide text-black/45">Services</span>
                    </div>
                    <div className="border-b border-r border-[#171310] p-2">
                      <strong className="pro-card-stat block text-sm">{money(provider.starting_price)}</strong>
                      <span className="text-[7px] font-black uppercase tracking-wide text-black/45">Starts</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {(provider.services||[]).slice(0,3).map((item:string)=>(
                      <span key={item} className="border border-[#171310] bg-white px-2 py-1 text-[8px] font-black uppercase tracking-wide">{item.replaceAll('-',' ')}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-black/20 pt-3">
                    <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Culinary Exchange Series 01</span>
                    <span className="text-xs font-black text-[#135DFF]">Flip card →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
