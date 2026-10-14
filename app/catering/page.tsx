import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function loadTeams(){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,professional_type,cuisine_style,city,state,years_experience,starting_price,profile_image_url,verified,services,max_guests')
      .eq('status','active')
      .contains('services',['catering'])
      .order('card_number',{ascending:true})
      .limit(12);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch{return {items:[],available:false};}
}

function cardNo(v:number|null|undefined){return String(v??0).padStart(3,'0');}
function money(v:number|null){return v?'$'+Number(v).toLocaleString():'Ask';}

export default async function CateringPage(){
  const {items,available}=await loadTeams();
  const eventTypes=['Corporate','Weddings','Brunch','Drop-off','Private parties','Large-scale'];

  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / Catering Teams</span><Link href="/" className="text-[#D4A64F]">← Culinary Exchange</Link></div></div>

    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/providers?service=catering">Team Cards</Link><Link href="/board">The Board</Link><Link href="/post-a-lead?category=catering" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Post Catering Request</Link></nav></div></header>

    <section className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_410px]"><div className="border-b border-white/20 px-4 py-10 sm:px-6 lg:border-b-0 lg:border-r lg:py-14"><p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Catering / Team Cards</p><h1 className="mt-2 max-w-4xl text-6xl font-black leading-[0.84] tracking-[-0.07em] sm:text-7xl lg:text-8xl">FEED<br/><span className="text-[#D4A64F]">THE ROOM.</span></h1><p className="mt-5 max-w-2xl text-base font-bold leading-7 text-white/60">Catering is bigger than a menu. Compare the team, service range, scale, home market and minimum before you move.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/providers?service=catering" className="border-2 border-white bg-[#D4A64F] px-5 py-3 text-sm font-black text-[#171310]">Browse Team Cards →</Link><Link href="/post-a-lead?category=catering" className="border-2 border-white px-5 py-3 text-sm font-black">Post My Event →</Link></div></div><aside className="bg-[#D4A64F] p-5 text-[#171310]"><p className="text-[9px] font-black uppercase tracking-[0.22em]">Event type</p><div className="mt-4 grid grid-cols-2 border-l-2 border-t-2 border-[#171310] bg-[#F8F4EA]">{eventTypes.map((item,i)=><div key={item} className="border-b-2 border-r-2 border-[#171310] p-4"><span className="text-[8px] font-black text-black/35">0{i+1}</span><p className="mt-2 text-sm font-black">{item}</p></div>)}</div></aside></div></section>

    <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6"><div className="mb-6 flex flex-wrap items-end justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Active Team Cards</p><h2 className="text-3xl font-black tracking-[-0.045em]">Catering roster.</h2></div><Link href="/providers?service=catering" className="border-b-2 border-[#171310] pb-1 text-xs font-black uppercase">View all →</Link></div>

      {!available?<div className="border-2 border-[#171310] bg-white p-6 font-black">Catering roster connection pending.</div>:items.length===0?<div className="border-2 border-[#171310] bg-white p-6"><h3 className="text-2xl font-black">No active catering teams yet.</h3><p className="mt-2 text-sm text-black/55">Real Team Cards appear here as providers activate.</p></div>:<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{items.map((team:any)=><Link key={team.id} href={'/providers/'+team.id} className="group border-2 border-[#171310] bg-[#F8F4EA] shadow-[5px_5px_0_#171310] hover:-translate-y-1"><div className="grid grid-cols-[145px_1fr] border-b-2 border-[#171310]"><div className="relative overflow-hidden border-r-2 border-[#171310] bg-[#171310]">{team.profile_image_url?<img src={team.profile_image_url} alt={team.card_name||team.display_name} className="h-full min-h-48 w-full object-cover"/>:<div className="flex h-full min-h-48 items-end bg-[#135DFF] p-4 text-4xl font-black text-white/20">TEAM</div>}<div className="absolute left-2 top-2 border-2 border-[#171310] bg-[#F8F4EA] px-2 py-1 text-xs font-black">#{cardNo(team.card_number)}</div></div><div className="p-4"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Team Card</p><h3 className="mt-1 text-2xl font-black leading-none tracking-[-0.04em]">{team.card_name||team.display_name}</h3><p className="mt-2 text-xs font-bold text-black/50">{team.cuisine_style||team.professional_title||'Catering'}</p><div className="mt-5 grid grid-cols-2 border-l border-t border-[#171310] text-center"><div className="border-b border-r border-[#171310] p-2"><strong className="block text-lg">{team.max_guests?Number(team.max_guests).toLocaleString():'—'}</strong><span className="text-[7px] font-black uppercase text-black/40">Scale</span></div><div className="border-b border-r border-[#171310] p-2"><strong className="block text-lg">{money(team.starting_price)}</strong><span className="text-[7px] font-black uppercase text-black/40">Starts</span></div></div></div></div><div className="flex items-center justify-between p-4"><span className="text-xs font-black">{team.city}{team.state?', '+team.state:''}</span><span className="text-xs font-black text-[#135DFF]">View team →</span></div></Link>)}</div>}
    </section>

    <section className="border-y-2 border-[#171310] bg-[#135DFF] text-white"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_350px]"><div className="border-b border-white/25 px-4 py-8 sm:px-6 lg:border-b-0 lg:border-r"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#F3D37C]">The fast lane</p><h2 className="mt-2 text-4xl font-black tracking-[-0.05em]">THE EVENT IS THE BRIEF.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">City. Date. Guest count. Service style. Budget. Put it on The Board and let the right catering teams respond.</p></div><div className="flex items-center p-6"><Link href="/post-a-lead?category=catering" className="w-full border-2 border-white bg-[#F3D37C] px-5 py-4 text-center text-sm font-black uppercase text-[#171310]">Post Catering Request →</Link></div></div></section>
  </main>;
}
