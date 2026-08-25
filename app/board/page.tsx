import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

function money(value: number | null) {
  if (!value) return null;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

export default async function BoardPage() {
  const supabase = getSupabaseServer();
  const { data: opportunities = [] } = await supabase
    .from('opportunities')
    .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
    .in('status', ['open', 'responses-received'])
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-black text-[#135DFF]">TakeaChefHome<span className="text-slate-950">.com</span></Link>
          <Link href="/post-a-lead" className="rounded-xl bg-[#135DFF] px-4 py-2 text-sm font-black text-white">Post a Request</Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#135DFF]">Live Marketplace</p>
            <h1 className="text-4xl font-black tracking-tight">The Board</h1>
            <p className="mt-2 text-slate-600">Real food-service opportunities posted by clients.</p>
          </div>
          <div className="text-sm font-bold text-slate-500">{opportunities.length} open opportunities</div>
        </div>

        {opportunities.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-black">The board is open.</h2>
            <p className="mt-2 text-slate-600">The first live requests will appear here as they are posted.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {opportunities.map((item, index) => {
              const budget = item.budget_min && item.budget_max
                ? `${money(item.budget_min)}–${money(item.budget_max)}`
                : money(item.budget_max) || money(item.budget_min);

              return (
                <Link
                  key={item.id}
                  href={`/board/${item.id}`}
                  className={`grid gap-2 px-4 py-4 transition hover:bg-blue-50 md:grid-cols-[150px_1fr_170px_130px] md:items-center ${index ? 'border-t border-slate-100' : ''}`}
                >
                  <div>
                    <span className="rounded-md bg-blue-100 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-[#135DFF]">
                      {item.category.replaceAll('-', ' ')}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-black">{item.title}</h2>
                    <p className="mt-1 line-clamp-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                  <div className="text-sm font-bold text-slate-700">{item.city}{item.state ? `, ${item.state}` : ''}</div>
                  <div className="text-sm font-black text-slate-950">{budget || 'Budget open'}</div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
