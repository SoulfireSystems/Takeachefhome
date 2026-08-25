import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export default async function OpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseServer();
  const { data: item } = await supabase
    .from('opportunities')
    .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
    .eq('id', id)
    .single();

  if (!item) notFound();

  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-black text-[#135DFF]">TakeaChefHome<span className="text-slate-950">.com</span></Link>
          <Link href="/board" className="text-sm font-black text-[#135DFF]">← Back to Board</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1.3fr_.7fr]">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <span className="rounded-md bg-blue-100 px-2 py-1 text-[11px] font-black uppercase tracking-wide text-[#135DFF]">{item.category.replaceAll('-', ' ')}</span>
          <h1 className="mt-4 text-4xl font-black tracking-tight">{item.title}</h1>
          <p className="mt-3 text-lg font-bold text-slate-700">{item.city}{item.state ? `, ${item.state}` : ''}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-black uppercase text-slate-500">Date</div><div className="mt-1 font-bold">{item.event_date || 'Flexible'}</div></div>
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-black uppercase text-slate-500">Guests</div><div className="mt-1 font-bold">{item.guest_count || 'Open'}</div></div>
            <div className="rounded-xl bg-slate-50 p-4"><div className="text-xs font-black uppercase text-slate-500">Status</div><div className="mt-1 font-bold capitalize">{item.status.replaceAll('-', ' ')}</div></div>
          </div>
          <div className="mt-6 whitespace-pre-wrap leading-7 text-slate-700">{item.description}</div>
        </article>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#135DFF]">Respond to this opportunity</p>
          <form action="/api/responses" method="post" className="mt-4 grid gap-3">
            <input type="hidden" name="opportunity_id" value={item.id} />
            <input name="provider_name" required placeholder="Your name or business" className="rounded-xl border border-slate-200 px-3 py-3" />
            <input name="provider_email" type="email" required placeholder="Email" className="rounded-xl border border-slate-200 px-3 py-3" />
            <input name="provider_phone" placeholder="Phone" className="rounded-xl border border-slate-200 px-3 py-3" />
            <input name="profile_url" placeholder="Profile or website (optional)" className="rounded-xl border border-slate-200 px-3 py-3" />
            <input name="quote_amount" type="number" min="0" placeholder="Quote amount (optional)" className="rounded-xl border border-slate-200 px-3 py-3" />
            <textarea name="message" required placeholder="Tell the client why you're a fit and what you can provide." rows={6} className="rounded-xl border border-slate-200 px-3 py-3" />
            <button className="rounded-xl bg-[#135DFF] px-4 py-3 font-black text-white">Send Response</button>
          </form>
        </aside>
      </section>
    </main>
  );
}
