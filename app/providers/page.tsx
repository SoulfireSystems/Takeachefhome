import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

const cardServices=new Set(['private-chef','catering','food-truck']);
const laneRedirects:Record<string,string>={
  'meal-prep':'/meal-prep',
  experience:'/experiences',
  class:'/classes',
};

function single(value:string|string[]|undefined){
  return Array.isArray(value)?value[0]:value||'';
}
function money(value:number|null){
  return value?'$'+Number(value).toLocaleString():'OPEN';
}
function cardNo(value:number|null|undefined){
  return String(value??0).padStart(3,'0');
}
function cardType(type:string){
  if(type==='caterer') return 'Team Card';
  if(type==='food-truck') return 'Truck Card';
  return 'Player Card';
}

async function loadProviders(service:string,city:string){
  try{
    const supabase=getSupabaseServer();
    let query=supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,professional_type,cuisine_style,services,city,state,years_experience,starting_price,profile_image_url,verified,max_guests')
      .eq('status','active')
      .in('professional_type',['chef','caterer','food-truck']);

    if(service&&cardServices.has(service)) query=query.contains('services',[service]);
    if(city) query=query.ilike('city','%'+city.slice(0,80)+'%');

    const {data,error}=await query.order('card_number',{ascending:true}).limit(100);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch(error){
    console.error('ROSTER LOAD FAILED',error);
    return {items:[],available:false};
  }
}

function PlayerCard({provider}:{provider:any}){
  const name=provider.card_name||provider.display_name;
  return <Link href={'/providers/'+provider.id} className="pro-card group">
    <div className="relative aspect-[5/6] overflow-hidden border-b-2 border-[#171310] bg-[#171310]">
      {provider.profile_image_url?<img src={provider.profile_image_url} alt={name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"/>:<div className="flex h-full items-end bg-[linear-gradient(145deg,#135DFF,#171310)] p-5 text-7xl font-black text-white/20">{name.slice(0,2).toUpperCase()}</div>}
      <div className="absolute left-3 top-3 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1"><span className="block text-[7px] font-black uppercase tracking-[0.16em]">Player Card</span><strong className="block text-xl">#{cardNo(provider.card_number)}</strong></div>
      {provider.verified&&<div className="pro-card-foil absolute right-3 top-3 border-2 border-[#171310] px-2 py-1 text-[8px] font-black uppercase">Verified</div>}
      <div className="absolute inset-x-3 bottom-3 border-2 border-[#171310] bg-[#135DFF] px-3 py-2 text-white"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/60">{provider.professional_title||'Chef'}</p><h3 className="mt-0.5 text-2xl font-black leading-none tracking-[-0.05em]">{name}</h3>{provider.cuisine_style&&<p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#F3D37C]">{provider.cuisine_style}</p>}</div>
    </div>
    <div className="bg-[#F8F4EA] p-4"><div className="flex items-center justify-between"><div><p className="text-[7px] font-black uppercase tracking-[0.16em] text-black/40">Home market</p><p className="text-sm font-black">{provider.city}{provider.state?', '+provider.state:''}</p></div><strong className="text-[#135DFF]">TACH</strong></div><div className="mt-4 grid grid-cols-2 border-l border-t border-[#171310] text-center"><div className="border-b border-r border-[#171310] p-2"><strong className="block text-lg">{provider.years_experience?provider.years_experience+'+':'—'}</strong><span className="text-[7px] font-black uppercase text-black/40">Years</span></div><div className="border-b border-r border-[#171310] p-2"><strong className="block text-lg">{money(provider.starting_price)}</strong><span className="text-[7px] font-black uppercase text-black/40">Starts</span></div></div><div className="mt-3 text-right text-xs font-black text-[#135DFF]">Flip card →</div></div>
  </Link>;
}

function TeamCard({provider}:{provider:any}){
  const name=provider.card_name||provider.display_name;
  return <Link href={'/providers/'+provider.id} className="group border-2 border-[#171310] bg-[#F8F4EA] shadow-[5px_5px_0_#171310] hover:-translate-y-1 sm:col-span-2">
    <div className="grid min-h-64 sm:grid-cols-[260px_1fr]">
      <div className="relative overflow-hidden border-b-2 border-[#171310] bg-[#171310] sm:border-b-0 sm:border-r-2">{provider.profile_image_url?<img src={provider.profile_image_url} alt={name} className="h-full w-full object-cover"/>:<div className="flex h-full min-h-56 items-end bg-[#135DFF] p-5 text-5xl font-black text-white/20">TEAM</div>}<div className="absolute left-3 top-3 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1 text-xs font-black">#{cardNo(provider.card_number)}</div></div>
      <div className="p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Team Card</p><h3 className="mt-1 text-3xl font-black tracking-[-0.05em]">{name}</h3><p className="mt-1 text-xs font-bold text-black/50">{provider.cuisine_style||provider.professional_title||'Catering Team'}</p></div>{provider.verified&&<span className="border border-[#171310] bg-[#D4A64F] px-2 py-1 text-[8px] font-black uppercase">Verified</span>}</div><p className="mt-5 text-sm font-black">{provider.city}{provider.state?', '+provider.state:''}</p><div className="mt-5 grid grid-cols-3 border-l border-t border-[#171310] text-center"><div className="border-b border-r border-[#171310] p-3"><strong className="block text-lg">{provider.years_experience?provider.years_experience+'+':'—'}</strong><span className="text-[7px] font-black uppercase text-black/40">Years</span></div><div className="border-b border-r border-[#171310] p-3"><strong className="block text-lg">{provider.max_guests?Number(provider.max_guests).toLocaleString():'—'}</strong><span className="text-[7px] font-black uppercase text-black/40">Scale</span></div><div className="border-b border-r border-[#171310] p-3"><strong className="block text-lg">{money(provider.starting_price)}</strong><span className="text-[7px] font-black uppercase text-black/40">Starts</span></div></div><div className="mt-5 text-right text-xs font-black text-[#135DFF]">View team record →</div></div>
    </div>
  </Link>;
}

function TruckCard({provider}:{provider:any}){
  const name=provider.card_name||provider.display_name;
  return <Link href={'/providers/'+provider.id} className="group border-2 border-[#171310] bg-[#171310] text-white shadow-[5px_5px_0_#D4A64F] hover:-translate-y-1 sm:col-span-2">
    <div className="grid sm:grid-cols-[1.1fr_.9fr]">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-white/20 sm:aspect-auto sm:border-b-0 sm:border-r">{provider.profile_image_url?<img src={provider.profile_image_url} alt={name} className="h-full w-full object-cover"/>:<div className="flex h-full min-h-56 items-end bg-[#135DFF] p-5 text-5xl font-black text-white/20">TRUCK</div>}<div className="absolute left-3 top-3 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1 text-xs font-black text-[#171310]">#{cardNo(provider.card_number)}</div></div>
      <div className="p-5"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Truck Card</p><h3 className="mt-1 text-3xl font-black tracking-[-0.05em]">{name}</h3><p className="mt-1 text-xs font-bold text-white/45">{provider.cuisine_style||provider.professional_title||'Food Truck'}</p><p className="mt-6 text-sm font-black">{provider.city}{provider.state?', '+provider.state:''}</p><div className="mt-5 flex items-center justify-between border-t border-white/20 pt-4"><span className="text-[8px] font-black uppercase tracking-[0.16em] text-white/35">Event minimum</span><strong className="text-xl text-[#D4A64F]">{money(provider.starting_price)}</strong></div><div className="mt-5 text-right text-xs font-black text-[#D4A64F]">Open Truck Card →</div></div>
    </div>
  </Link>;
}

export default async function ProvidersPage({searchParams}:{searchParams:Promise<{service?:string|string[];city?:string|string[]}>}){
  const params=await searchParams;
  const requestedService=single(params.service);
  if(laneRedirects[requestedService]) redirect(laneRedirects[requestedService]);

  const service=cardServices.has(requestedService)?requestedService:'';
  const city=single(params.city).trim();
  const {items,available}=await loadProviders(service,city);

  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / The Roster</span><Link href="/providers/join" className="text-[#D4A64F]">Get your card →</Link></div></div>

    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/providers" className="text-[#135DFF]">The Roster</Link><Link href="/board">The Board</Link><Link href="/kitchens">Find Space</Link><Link href="/talent">Talent</Link><Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Post Request</Link></nav></div></header>

    <section className="exchange-paper border-b-2 border-[#171310]"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_390px]"><div className="border-b-2 border-[#171310] px-4 py-10 sm:px-6 lg:border-b-0 lg:border-r-2"><p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Find a Pro / Series 01</p><h1 className="mt-2 text-7xl font-black leading-[0.84] tracking-[-0.07em]">THE<br/><span className="text-[#135DFF]">ROSTER.</span></h1><p className="mt-5 max-w-2xl text-sm font-bold leading-6 text-black/55">The card world is reserved for people and businesses you hire by identity: chefs, catering teams and food trucks.</p><form action="/providers" method="get" className="mt-7 grid max-w-4xl border-2 border-[#171310] bg-white shadow-[5px_5px_0_#171310] md:grid-cols-[1fr_1fr_auto]"><select name="service" defaultValue={service} className="min-h-14 border-b-2 border-[#171310] bg-white px-4 text-sm font-black md:border-b-0 md:border-r-2"><option value="">ALL CARDS</option><option value="private-chef">Private Chefs</option><option value="catering">Catering</option><option value="food-truck">Food Trucks</option></select><input name="city" defaultValue={city} placeholder="CITY / MARKET" className="min-h-14 border-b-2 border-[#171310] px-4 text-sm font-bold md:border-b-0 md:border-r-2"/><button className="min-h-14 bg-[#171310] px-6 text-xs font-black uppercase text-white">Search Roster →</button></form></div><aside className="bg-[#D4A64F] p-6"><span className="inline-block border-2 border-[#171310] bg-[#F8F4EA] px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em]">Card-only identity</span><h2 className="mt-5 text-4xl font-black leading-[0.9] tracking-[-0.055em]">NOT EVERYTHING IS A CARD.</h2><p className="mt-4 text-sm font-bold leading-6 text-black/60">Meal Prep has The Weekly. Experiences have tickets. Classes have the Catalog. The Roster stays clean.</p></aside></div></section>

    <section className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto grid max-w-[1440px] sm:grid-cols-3"><Link href="/private-chef" className="border-b-2 border-[#171310] p-5 hover:bg-[#E9F0FF] sm:border-b-0 sm:border-r-2"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Player Cards</p><h2 className="mt-1 text-2xl font-black">Private Chef →</h2></Link><Link href="/catering" className="border-b-2 border-[#171310] p-5 hover:bg-[#FFF7DC] sm:border-b-0 sm:border-r-2"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Team Cards</p><h2 className="mt-1 text-2xl font-black">Catering →</h2></Link><Link href="/food-trucks" className="p-5 hover:bg-[#171310] hover:text-white"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Truck Cards</p><h2 className="mt-1 text-2xl font-black">Food Trucks →</h2></Link></div></section>

    <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Active cards</p><h2 className="text-3xl font-black tracking-[-0.045em]">{available?items.length+' on the roster':'Roster connection pending'}</h2></div><Link href="/providers/join" className="border-b-2 border-[#171310] pb-1 text-xs font-black uppercase">Food professional? Get listed →</Link></div>
      {!available?<div className="border-2 border-[#171310] bg-white p-7"><h3 className="text-xl font-black">The roster is waiting on the production connection.</h3></div>:items.length===0?<div className="border-2 border-[#171310] bg-white p-7"><h3 className="text-2xl font-black">No matching active cards.</h3><p className="mt-2 text-sm text-black/55">Change the market or card lane. No placeholders are inserted.</p></div>:<div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">{items.map((provider:any)=>provider.professional_type==='caterer'?<TeamCard key={provider.id} provider={provider}/>:provider.professional_type==='food-truck'?<TruckCard key={provider.id} provider={provider}/>:<PlayerCard key={provider.id} provider={provider}/>)}</div>}
    </section>

    <section className="border-t-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto grid max-w-[1440px] md:grid-cols-3"><Link href="/meal-prep" className="border-b border-white/20 p-5 hover:bg-white/5 md:border-b-0 md:border-r"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Not a card lane</p><h3 className="mt-1 text-2xl font-black">The Weekly →</h3><p className="mt-2 text-xs text-white/45">Meal Prep plans</p></Link><Link href="/experiences" className="border-b border-white/20 p-5 hover:bg-white/5 md:border-b-0 md:border-r"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Not a card lane</p><h3 className="mt-1 text-2xl font-black">Experience Guide →</h3><p className="mt-2 text-xs text-white/45">Tickets and culinary events</p></Link><Link href="/classes" className="p-5 hover:bg-white/5"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Not a card lane</p><h3 className="mt-1 text-2xl font-black">Class Catalog →</h3><p className="mt-2 text-xs text-white/45">Classes and workshops</p></Link></div></section>
  </main>;
}
