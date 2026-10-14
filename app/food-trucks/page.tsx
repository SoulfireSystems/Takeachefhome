import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function loadTrucks(){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,cuisine_style,city,state,starting_price,profile_image_url,verified')
      .eq('status','active')
      .contains('services',['food-truck'])
      .order('card_number',{ascending:true})
      .limit(12);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch{return {items:[],available:false};}
}

function cardNo(v:number|null|undefined){return String(v??0).padStart(3,'0');}
function money(v:number|null){return v?'$'+Number(v).toLocaleString():'Ask';}

export default async function FoodTrucksPage(){
  const {items,available}=await loadTrucks();
  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / Truck Cards</span><Link href="/" className="text-[#D4A64F]">← Culinary Exchange</Link></div></div>
    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/providers?service=food-truck">Browse Trucks</Link><Link href="/board">The Board</Link><Link href="/post-a-lead?category=food-truck" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Request a Truck</Link></nav></div></header>

    <section className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_380px]"><div className="border-b border-white/20 px-4 py-11 sm:px-6 lg:border-b-0 lg:border-r lg:py-14"><p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Food Trucks / The Lot</p><h1 className="mt-2 text-6xl font-black leading-[0.86] tracking-[-0.065em] sm:text-7xl">FIND THE TRUCK.<br/><span className="text-[#135DFF]">FEED THE CROWD.</span></h1><p className="mt-5 max-w-2xl text-base font-bold leading-7 text-white/60">Book by cuisine, market, event fit and minimum. Trucks stay visual because the truck itself is part of the product.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/providers?service=food-truck" className="border-2 border-white bg-[#D4A64F] px-5 py-3 text-sm font-black text-[#171310]">Open The Lot →</Link><Link href="/post-a-lead?category=food-truck" className="border-2 border-white px-5 py-3 text-sm font-black">Post an Event →</Link></div></div><aside className="p-5"><div className="border-2 border-white/60 bg-[#135DFF] p-5 shadow-[6px_6px_0_#D4A64F]"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">Truck Card anatomy</p><div className="mt-8 border-2 border-[#171310] bg-[#F8F4EA] p-4 text-[#171310]"><strong className="text-3xl font-black">TRUCK #---</strong><p className="mt-2 text-sm font-black">Cuisine · Market · Event Fit</p><div className="mt-5 grid grid-cols-2 border-l border-t border-[#171310] text-center text-xs font-black"><div className="border-b border-r border-[#171310] p-3">CAPACITY</div><div className="border-b border-r border-[#171310] p-3">MINIMUM</div></div></div></div></aside></div></section>

    <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6"><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Active Truck Cards</p><h2 className="text-3xl font-black tracking-[-0.045em]">The Lot.</h2></div>{!available?<div className="border-2 border-[#171310] bg-white p-6 font-black">Truck connection pending.</div>:items.length===0?<div className="border-2 border-[#171310] bg-white p-6"><h3 className="text-2xl font-black">No active trucks yet.</h3><p className="mt-2 text-sm text-black/55">Real trucks will appear here as they join. No fake inventory.</p></div>:<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((item:any)=><Link key={item.id} href={'/providers/'+item.id} className="pro-card group"><div className="relative aspect-[5/4] overflow-hidden border-b-2 border-[#171310] bg-[#171310]">{item.profile_image_url?<img src={item.profile_image_url} alt={item.card_name||item.display_name} className="h-full w-full object-cover"/>:<div className="flex h-full items-end bg-[#135DFF] p-5 text-5xl font-black text-white/20">TRUCK</div>}<div className="absolute left-3 top-3 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1 text-xs font-black">#{cardNo(item.card_number)}</div></div><div className="bg-[#F8F4EA] p-4"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Truck Card</p><h3 className="mt-1 text-2xl font-black">{item.card_name||item.display_name}</h3><p className="mt-1 text-xs font-bold text-black/50">{item.cuisine_style||item.professional_title||'Food Truck'}</p><div className="mt-4 flex items-center justify-between border-t border-black/20 pt-3"><span className="text-xs font-black">{item.city}{item.state?', '+item.state:''}</span><strong className="text-[#135DFF]">{money(item.starting_price)}</strong></div></div></Link>)}</div>}</section>
  </main>;
}
