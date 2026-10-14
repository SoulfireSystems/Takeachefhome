import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function loadChefs(){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,cuisine_style,city,state,years_experience,starting_price,profile_image_url,verified,services')
      .eq('status','active')
      .contains('services',['private-chef'])
      .order('card_number',{ascending:true})
      .limit(12);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch{return {items:[],available:false};}
}

function cardNo(v:number|null|undefined){return String(v??0).padStart(3,'0');}
function money(v:number|null){return v?'$'+Number(v).toLocaleString():'Ask';}

export default async function PrivateChefPage(){
  const {items,available}=await loadChefs();
  const occasions=['Dinner parties','Vacation homes','Birthdays','Retreats','Date nights','Chef tables'];

  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / Private Chef Roster</span><Link href="/" className="text-[#D4A64F]">← Culinary Exchange</Link></div></div>

    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/providers?service=private-chef">The Roster</Link><Link href="/board">The Board</Link><Link href="/post-a-lead?category=private-chef" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Request a Chef</Link></nav></div></header>

    <section className="exchange-paper border-b-2 border-[#171310]"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_390px]"><div className="border-b-2 border-[#171310] px-4 py-10 sm:px-6 lg:border-b-0 lg:border-r-2 lg:py-14"><p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Private Chef / Player Cards</p><h1 className="mt-2 max-w-4xl text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl lg:text-8xl">PICK<br/><span className="text-[#135DFF]">YOUR CHEF.</span></h1><p className="mt-5 max-w-2xl text-base font-bold leading-7 text-black/60">The chef is the product here. See the person, the career, the cuisine, the market and the starting minimum before you ever send a request.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/providers?service=private-chef" className="border-2 border-[#171310] bg-[#171310] px-5 py-3 text-sm font-black text-white">Open Full Roster →</Link><Link href="/post-a-lead?category=private-chef" className="border-2 border-[#171310] bg-[#D4A64F] px-5 py-3 text-sm font-black shadow-[3px_3px_0_#171310]">Post My Date →</Link></div></div><aside className="bg-[#135DFF] p-5 text-white"><p className="text-[9px] font-black uppercase tracking-[0.22em] text-[#F3D37C]">What are we doing?</p><div className="mt-4 grid grid-cols-2 border-l border-t border-white/35">{occasions.map((item,i)=><div key={item} className="border-b border-r border-white/35 p-4"><span className="text-[8px] font-black text-white/45">0{i+1}</span><p className="mt-2 text-sm font-black">{item}</p></div>)}</div></aside></div></section>

    <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Active Player Cards</p><h2 className="text-3xl font-black tracking-[-0.045em]">Private Chef Roster.</h2></div><Link href="/providers?service=private-chef" className="border-b-2 border-[#171310] pb-1 text-xs font-black uppercase">View all →</Link></div>

      {!available?<div className="border-2 border-[#171310] bg-white p-6 font-black">Chef roster connection pending.</div>:items.length===0?<div className="border-2 border-[#171310] bg-white p-6"><h3 className="text-2xl font-black">No active private chefs yet.</h3><p className="mt-2 text-sm text-black/55">The roster only shows real active cards.</p></div>:<div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{items.map((chef:any)=><Link key={chef.id} href={'/providers/'+chef.id} className="pro-card group"><div className="relative aspect-[5/6] overflow-hidden border-b-2 border-[#171310] bg-[#171310]">{chef.profile_image_url?<img src={chef.profile_image_url} alt={chef.card_name||chef.display_name} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.025]"/>:<div className="flex h-full items-end bg-[linear-gradient(145deg,#135DFF,#171310)] p-5 text-7xl font-black text-white/20">{(chef.card_name||chef.display_name).slice(0,2).toUpperCase()}</div>}<div className="absolute left-3 top-3 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1"><span className="block text-[7px] font-black uppercase tracking-[0.16em]">Player Card</span><strong className="block text-xl">#{cardNo(chef.card_number)}</strong></div>{chef.verified&&<div className="pro-card-foil absolute right-3 top-3 border-2 border-[#171310] px-2 py-1 text-[8px] font-black uppercase">Verified</div>}<div className="absolute inset-x-3 bottom-3 border-2 border-[#171310] bg-[#135DFF] px-3 py-2 text-white"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/60">{chef.professional_title||'Private Chef'}</p><h3 className="mt-0.5 text-2xl font-black leading-none tracking-[-0.05em]">{chef.card_name||chef.display_name}</h3>{chef.cuisine_style&&<p className="mt-1 text-[8px] font-black uppercase tracking-[0.14em] text-[#F3D37C]">{chef.cuisine_style}</p>}</div></div><div className="bg-[#F8F4EA] p-4"><div className="flex items-center justify-between"><div><p className="text-[7px] font-black uppercase tracking-[0.16em] text-black/40">Home market</p><p className="text-sm font-black">{chef.city}{chef.state?', '+chef.state:''}</p></div><strong className="text-[#135DFF]">TACH</strong></div><div className="mt-4 grid grid-cols-2 border-l border-t border-[#171310] text-center"><div className="border-b border-r border-[#171310] p-2"><strong className="block text-lg">{chef.years_experience?chef.years_experience+'+':'—'}</strong><span className="text-[7px] font-black uppercase text-black/40">Years</span></div><div className="border-b border-r border-[#171310] p-2"><strong className="block text-lg">{money(chef.starting_price)}</strong><span className="text-[7px] font-black uppercase text-black/40">Starts</span></div></div><div className="mt-3 text-right text-xs font-black text-[#135DFF]">Flip card →</div></div></Link>)}</div>}
    </section>

    <section className="border-y-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_340px]"><div className="border-b border-white/20 px-4 py-8 sm:px-6 lg:border-b-0 lg:border-r"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">Don't want to browse?</p><h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">PUT THE DINNER ON THE BOARD.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">Date, city, guest count, budget, occasion and what you want the night to feel like. Let the right chef come to you.</p></div><div className="flex items-center p-6"><Link href="/post-a-lead?category=private-chef" className="w-full border-2 border-white bg-[#D4A64F] px-5 py-4 text-center text-sm font-black uppercase text-[#171310]">Post Private Chef Request →</Link></div></div></section>
  </main>;
}
