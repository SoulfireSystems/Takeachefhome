import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function loadInstructors(){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,cuisine_style,city,state,starting_price,profile_image_url')
      .eq('status','active')
      .contains('services',['class'])
      .order('card_number',{ascending:true})
      .limit(12);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch{return {items:[],available:false};}
}

function money(v:number|null){return v?'From $'+Number(v).toLocaleString():'Ask instructor';}

export default async function ClassesPage(){
  const {items,available}=await loadInstructors();
  const courseExamples=[
    ['TACH 101','Knife Skills','Beginner · 90 min'],
    ['TACH 214','Pasta From Scratch','Hands-on · 2 hr'],
    ['TACH 330','Global Soul Dinner Lab','Intermediate · Group'],
    ['TACH 408','Private Chef Workshop','Custom · Private'],
  ];

  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / Class Catalog</span><Link href="/" className="text-[#D4A64F]">← Culinary Exchange</Link></div></div>
    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between"><Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/providers?service=class">Instructors</Link><Link href="/board">The Board</Link><Link href="/post-a-lead?category=class" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Request a Class</Link></nav></div></header>

    <section className="border-b-2 border-[#171310] bg-[#E9F0FF]"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_440px]"><div className="border-b-2 border-[#171310] px-4 py-11 sm:px-6 lg:border-b-0 lg:border-r-2 lg:py-14"><p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Cooking Classes / Class Catalog</p><h1 className="mt-2 text-6xl font-black leading-[0.86] tracking-[-0.065em] sm:text-7xl">LEARN IT.<br/><span className="exchange-serif font-normal italic text-[#135DFF]">Then cook it.</span></h1><p className="mt-5 max-w-2xl text-base font-bold leading-7 text-black/60">Browse culinary instruction like a course catalog: level, format, duration, what you’ll make and who’s teaching it.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/providers?service=class" className="border-2 border-[#171310] bg-[#171310] px-5 py-3 text-sm font-black text-white">Browse Instructors →</Link><Link href="/post-a-lead?category=class" className="border-2 border-[#171310] bg-[#D4A64F] px-5 py-3 text-sm font-black shadow-[3px_3px_0_#171310]">Request a Private Class →</Link></div></div><aside className="bg-[#F8F4EA] p-5"><div className="border-2 border-[#171310] bg-white shadow-[6px_6px_0_#171310]"><div className="border-b-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-white"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60">Sample curriculum</p><strong className="text-xl font-black">CLASS CATALOG</strong></div>{courseExamples.map(([code,title,note],i)=><div key={code} className={'grid grid-cols-[90px_1fr] '+(i?'border-t border-[#171310]':'')}><div className="border-r border-[#171310] bg-[#FFF7DC] p-3 text-xs font-black">{code}</div><div className="p-3"><strong className="block text-sm">{title}</strong><span className="text-[10px] text-black/45">{note}</span></div></div>)}</div></aside></div></section>

    <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6"><div className="mb-6"><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Teaching roster</p><h2 className="text-3xl font-black tracking-[-0.045em]">Instructors.</h2></div>{!available?<div className="border-2 border-[#171310] bg-white p-6 font-black">Class connection pending.</div>:items.length===0?<div className="border-2 border-[#171310] bg-white p-6"><h3 className="text-2xl font-black">No active instructors yet.</h3><p className="mt-2 text-sm text-black/55">As instructors activate their profiles, the catalog fills with real people instead of placeholder classes.</p></div>:<div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((item:any)=><Link key={item.id} href={'/providers/'+item.id} className="group border-2 border-[#171310] bg-white shadow-[4px_4px_0_#171310] hover:-translate-y-1"><div className="grid grid-cols-[100px_1fr]"><div className="border-r-2 border-[#171310] bg-[#FFF7DC] p-3"><span className="text-[8px] font-black uppercase tracking-[0.14em] text-black/45">Instructor</span><strong className="mt-3 block text-3xl">#{String(item.card_number??0).padStart(3,'0')}</strong></div><div className="p-4"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Course Leader</p><h3 className="mt-1 text-2xl font-black">{item.card_name||item.display_name}</h3><p className="mt-1 text-xs font-bold text-black/45">{item.cuisine_style||item.professional_title||'Culinary Instructor'}</p><div className="mt-4 flex items-center justify-between border-t border-black/20 pt-3"><span className="text-xs font-black">{item.city}{item.state?', '+item.state:''}</span><strong className="text-[#135DFF]">{money(item.starting_price)}</strong></div></div></div></Link>)}</div>}</section>
  </main>;
}
