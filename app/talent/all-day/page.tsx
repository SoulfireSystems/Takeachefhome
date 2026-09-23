import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

async function load(city: string) {
  try {
    const supabase = getSupabaseServer();
    let query = supabase
      .from('talent_opportunities')
      .select('id,role,company_name,city,state,work_date,start_time,end_time,pay_type,pay_min,pay_max,created_at')
      .eq('opportunity_type', 'shift')
      .eq('status', 'open');

    if (city) query = query.ilike('city', '%' + city.slice(0, 80) + '%');

    const { data, error } = await query.order('work_date', { ascending: true }).limit(100);
    if (error) throw error;
    return { items: data ?? [], available: true };
  } catch {
    return { items: [], available: false };
  }
}

export default async function AllDayPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const params = await searchParams;
  const city = (params.city || '').trim();
  const { items, available } = await load(city);

  return (
    <main className="min-h-screen bg-[#171310] text-white">
      <header className="border-b border-white/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
          <Link href="/talent/post?type=shift" className="border-2 border-white bg-[#135DFF] px-4 py-2 text-sm font-black">Post Shift</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">ALL DAY</p>
        <h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">Today. Tomorrow. This weekend.</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">Prep cooks, servers, bartenders, dish, banquet teams and short-notice food-service shifts.</p>

        <form className="mt-5 flex gap-2">
          <input name="city" defaultValue={city} placeholder="CITY" className="min-h-12 flex-1 border-2 border-white bg-white px-4 font-bold text-[#171310]" />
          <button className="border-2 border-white bg-[#D4A64F] px-5 font-black text-[#171310]">FILTER</button>
        </form>

        <div className="mt-6 border-2 border-white/40">
          {!available ? (
            <div className="p-6 font-black">Shift connection pending.</div>
          ) : items.length === 0 ? (
            <div className="p-6">
              <h2 className="text-xl font-black">No open shifts here yet.</h2>
              <p className="mt-1 text-sm text-white/50">When operators need people now, those shifts land here.</p>
            </div>
          ) : (
            items.map((item: any, index: number) => (
              <Link
                key={item.id}
                href={'/talent/opportunities/' + item.id}
                className={'grid gap-2 p-4 hover:bg-white/5 md:grid-cols-[1fr_160px_180px_120px] ' + (index ? 'border-t border-white/15' : '')}
              >
                <div>
                  <p className="text-lg font-black">{item.role}</p>
                  <p className="text-sm text-white/50">{item.company_name}</p>
                </div>
                <span className="font-bold">{item.city}{item.state ? ', ' + item.state : ''}</span>
                <span className="font-bold">{item.work_date || 'Date TBA'}{item.start_time ? ' · ' + String(item.start_time).slice(0,5) : ''}</span>
                <span className="font-black text-[#D4A64F]">{item.pay_min ? '$' + item.pay_min + (item.pay_type === 'hourly' ? '/hr' : '') : 'Pay inside'}</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
