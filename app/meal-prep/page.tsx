import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

async function loadPlans(){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,card_name,display_name,professional_title,cuisine_style,city,state,starting_price,profile_image_url,verified')
      .eq('status','active')
      .contains('services',['meal-prep'])
      .order('card_number',{ascending:true})
      .limit(12);
    if(error) throw error;
    return {items:data??[],available:true};
  }catch{
    return {items:[],available:false};
  }
}

function money(value:number|null){
  return value?'$'+Number(value).toLocaleString():'Ask';
}

export default async function MealPrepPage(){
  const {items,available}=await loadPlans();
  const days=['MON','TUE','WED','THU','FRI'];

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-white/45">TakeAChefHome / The Weekly</span>
          <Link href="/" className="text-[#D4A64F]">← Culinary Exchange</Link>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link>
          <nav className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/providers?service=meal-prep">Meal Prep Pros</Link>
            <Link href="/board">The Board</Link>
            <Link href="/post-a-lead?category=meal-prep" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310]">Request Meal Prep</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#FFF7DC]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="border-b-2 border-[#171310] px-4 py-10 sm:px-6 lg:border-b-0 lg:border-r-2 lg:py-14">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Meal Prep / The Weekly</p>
            <h1 className="mt-2 max-w-4xl text-6xl font-black leading-[0.86] tracking-[-0.065em] sm:text-7xl">YOUR WEEK.<br/><span className="exchange-serif font-normal italic text-[#135DFF]">Already handled.</span></h1>
            <p className="mt-5 max-w-2xl text-base font-bold leading-7 text-black/60">Weekly meals should shop like a plan, not like hiring a restaurant. Compare cooks by market, style, minimum and delivery rhythm.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/providers?service=meal-prep" className="border-2 border-[#171310] bg-[#171310] px-5 py-3 text-sm font-black text-white">Browse Meal Prep Pros →</Link>
              <Link href="/post-a-lead?category=meal-prep" className="border-2 border-[#171310] bg-[#D4A64F] px-5 py-3 text-sm font-black shadow-[3px_3px_0_#171310]">Post My Weekly Need →</Link>
            </div>
          </div>

          <aside className="bg-white p-5">
            <div className="border-2 border-[#171310] bg-[#F8F4EA] shadow-[5px_5px_0_#171310]">
              <div className="flex items-center justify-between border-b-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-white">
                <div><p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60">Sample format</p><strong className="text-xl font-black">THE WEEKLY</strong></div>
                <span className="text-xs font-black">5-DAY</span>
              </div>
              <div className="grid grid-cols-5 border-b-2 border-[#171310]">
                {days.map(day=><div key={day} className="border-r border-[#171310] p-2 text-center last:border-r-0"><span className="text-[8px] font-black">{day}</span><div className="mt-2 h-10 bg-[#E9F0FF]"/></div>)}
              </div>
              <div className="grid grid-cols-3 text-center">
                <div className="border-r border-[#171310] p-3"><strong className="block text-lg">5</strong><span className="text-[7px] font-black uppercase text-black/45">Meals</span></div>
                <div className="border-r border-[#171310] p-3"><strong className="block text-lg">2</strong><span className="text-[7px] font-black uppercase text-black/45">Servings</span></div>
                <div className="p-3"><strong className="block text-lg">WEEKLY</strong><span className="text-[7px] font-black uppercase text-black/45">Rhythm</span></div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-9 sm:px-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Available planners</p><h2 className="text-3xl font-black tracking-[-0.045em]">Weekly meal professionals.</h2></div>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-black/40">Real profiles only</span>
        </div>

        {!available?(
          <div className="border-2 border-[#171310] bg-white p-6 font-black">Meal Prep connection pending.</div>
        ):items.length===0?(
          <div className="grid gap-4 border-2 border-[#171310] bg-white p-6 md:grid-cols-[1fr_auto] md:items-center"><div><h3 className="text-2xl font-black">No active weekly plans yet.</h3><p className="mt-2 text-sm text-black/55">When a real Meal Prep provider goes active, their plan will appear here. No filler inventory.</p></div><Link href="/post-a-lead?category=meal-prep" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-sm font-black text-white">Post What You Need →</Link></div>
        ):(
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item:any)=><Link key={item.id} href={'/providers/'+item.id} className="group border-2 border-[#171310] bg-white shadow-[4px_4px_0_#171310] hover:-translate-y-1">
              <div className="grid grid-cols-[120px_1fr] border-b-2 border-[#171310]">
                <div className="overflow-hidden border-r-2 border-[#171310] bg-[#171310]">{item.profile_image_url?<img src={item.profile_image_url} alt={item.card_name||item.display_name} className="h-full min-h-32 w-full object-cover"/>:<div className="flex h-full min-h-32 items-end bg-[#135DFF] p-3 text-3xl font-black text-white/30">MEAL</div>}</div>
                <div className="p-4"><p className="text-[8px] font-black uppercase tracking-[0.18em] text-[#135DFF]">Weekly Meal Plan</p><h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">{item.card_name||item.display_name}</h3><p className="mt-1 text-xs font-bold text-black/50">{item.cuisine_style||item.professional_title||'Meal Prep'}</p><p className="mt-4 text-sm font-black">{item.city}{item.state?', '+item.state:''}</p></div>
              </div>
              <div className="flex items-center justify-between p-4"><span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Starting minimum</span><strong className="text-xl text-[#135DFF]">{money(item.starting_price)}</strong></div>
            </Link>)}
          </div>
        )}
      </section>
    </main>
  );
}
