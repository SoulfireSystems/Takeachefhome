import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function loadExperiences(){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,cuisine_style,city,state,starting_price,profile_image_url')
      .eq('status','active')
      .contains('services',['experience'])
      .order('card_number',{ascending:true})
      .limit(12);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch{return {items:[],available:false};}
}

function money(v:number|null){return v?'From $'+Number(v).toLocaleString():'Price on request';}

export default async function ExperiencesPage(){
  const {items,available}=await loadExperiences();
  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / Experience Guide</span><Link href="/" className="text-[#D4A64F]">← Culinary Exchange</Link></div></div>
    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/providers?service=experience">Hosts</Link><Link href="/board">The Board</Link><Link href="/post-a-lead?category=experience" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Request an Experience</Link></nav></div></header>

    <section className="border-b-2 border-[#171310] bg-[#D4A64F]"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_430px]"><div className="border-b-2 border-[#171310] px-4 py-11 sm:px-6 lg:border-b-0 lg:border-r-2 lg:py-14"><p className="text-[10px] font-black uppercase tracking-[0.24em]">The Experience Guide</p><h1 className="mt-2 text-6xl font-black leading-[0.86] tracking-[-0.065em] sm:text-7xl">DON'T JUST EAT.<br/><span className="exchange-serif font-normal italic text-[#135DFF]">Go do something.</span></h1><p className="mt-5 max-w-2xl text-base font-bold leading-7 text-black/65">Chef tables, tastings, interactive dinners and culinary moments should feel like events. Browse the host, then book the experience.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/providers?service=experience" className="border-2 border-[#171310] bg-[#171310] px-5 py-3 text-sm font-black text-white">Browse Hosts →</Link><Link href="/post-a-lead?category=experience" className="border-2 border-[#171310] bg-[#F8F4EA] px-5 py-3 text-sm font-black shadow-[3px_3px_0_#171310]">Build My Experience →</Link></div></div><aside className="bg-[#F8F4EA] p-5"><div className="border-2 border-[#171310] bg-white shadow-[6px_6px_0_#135DFF]"><div className="border-b-2 border-[#171310] p-4"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Admit / Culinary Experience</p><h2 className="mt-1 text-3xl font-black tracking-[-0.05em]">ONE NIGHT ONLY</h2></div><div className="grid grid-cols-[1fr_90px]"><div className="p-4"><p className="text-sm font-black">HOST / CITY / DATE</p><p className="mt-4 text-xs leading-5 text-black/50">Private · Group · Tasting · Chef Table</p></div><div className="border-l-2 border-dashed border-[#171310] p-4 text-center"><span className="text-[8px] font-black uppercase">TICKET</span><strong className="mt-3 block text-3xl">001</strong></div></div></div></aside></div></section>

    <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6"><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Hosts on the guide</p><h2 className="text-3xl font-black tracking-[-0.045em]">Who can build the night.</h2></div>{!available?<div className="border-2 border-[#171310] bg-white p-6 font-black">Experience connection pending.</div>:items.length===0?<div className="border-2 border-[#171310] bg-white p-6"><h3 className="text-2xl font-black">No active experience hosts yet.</h3><p className="mt-2 text-sm text-black/55">Real experience inventory will appear here as hosts activate.</p></div>:<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((item:any)=><Link key={item.id} href={'/providers/'+item.id} className="grid grid-cols-[1fr_90px] border-2 border-[#171310] bg-white shadow-[4px_4px_0_#171310] hover:-translate-y-1"><div className="p-5"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Experience Host</p><h3 className="mt-1 text-2xl font-black">{item.card_name||item.display_name}</h3><p className="mt-1 text-xs font-bold text-black/45">{item.cuisine_style||item.professional_title}</p><p className="mt-5 text-sm font-black">{item.city}{item.state?', '+item.state:''}</p><p className="mt-1 text-xs font-black text-[#135DFF]">{money(item.starting_price)}</p></div><div className="flex flex-col items-center justify-between border-l-2 border-dashed border-[#171310] bg-[#FFF7DC] p-3"><span className="text-[7px] font-black uppercase tracking-[0.16em]">ADMIT</span><strong className="text-2xl">#{String(item.card_number??0).padStart(3,'0')}</strong><span className="rotate-90 text-lg font-black">TACH</span></div></Link>)}</div>}</section>
  </main>;
}
