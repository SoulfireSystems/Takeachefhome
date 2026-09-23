import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

async function load(city: string) {
  try {
    const supabase = getSupabaseServer();
    let query = supabase
      .from('talent_opportunities')
      .select('id,role,company_name,city,state,pay_type,pay_min,pay_max,description,created_at')
      .eq('opportunity_type', 'job')
      .eq('status', 'open');

    if (city) query = query.ilike('city', '%' + city.slice(0, 80) + '%');

    const { data, error } = await query.order('created_at', { ascending: false }).limit(100);
    if (error) throw error;
    return { items: data ?? [], available: true };
  } catch {
    return { items: [], available: false };
  }
}

export default async function JobsPage({ searchParams }: { searchParams: Promise<{ city?: string }> }) {
  const params = await searchParams;
  const city = (params.city || '').trim();
  const { items, available } = await load(city);

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
          <Link href="/talent/post" className="border-2 border-white bg-[#135DFF] px-4 py-2 text-sm font-black">Post Work</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Find Jobs</p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <h1 className="text-5xl font-black tracking-[-0.05em]">Culinary jobs.</h1>
          <Link href="/talent/all-day" className="text-sm font-black text-[#135DFF]">Need a shift instead? ALL DAY →</Link>
        </div>

        <form className="mt-5 flex gap-2">
          <input name="city" defaultValue={city} placeholder="CITY" className="min-h-12 flex-1 border-2 border-[#171310] bg-white px-4 font-bold" />
          <button className="border-2 border-[#171310] bg-[#171310] px-5 font-black text-white">FILTER</button>
        </form>

        <div className="mt-6 border-2 border-[#171310] bg-white">
          {!available ? (
            <div className="p-6 font-black">Jobs connection pending.</div>
          ) : items.length === 0 ? (
            <div className="p-6">
              <h2 className="text-xl font-black">No open jobs here yet.</h2>
              <p className="mt-1 text-sm text-black/55">Real jobs will appear as employers post them.</p>
            </div>
          ) : (
            items.map((item: any, index: number) => (
              <Link
                key={item.id}
                href={'/talent/opportunities/' + item.id}
                className={'grid gap-2 p-4 hover:bg-[#E9F0FF] md:grid-cols-[1fr_180px_150px] ' + (index ? 'border-t border-black/15' : '')}
              >
                <div>
                  <p className="text-lg font-black">{item.role}</p>
                  <p className="text-sm text-black/55">{item.company_name}</p>
                </div>
                <span className="font-bold">{item.city}{item.state ? ', ' + item.state : ''}</span>
                <span className="font-black">{item.pay_min ? '$' + item.pay_min + (item.pay_type === 'hourly' ? '/hr' : '') : 'Pay listed inside'}</span>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
