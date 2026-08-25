import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

export default async function OpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let item = null;
  try {
    const supabase = getSupabaseServer();
    const { data } = await supabase
      .from('opportunities')
      .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
      .eq('id', id)
      .single();
    item = data;
  } catch (error) {
    console.error('OPPORTUNITY LOAD FAILED', error);
  }

  if (!item) notFound();

  const acceptingResponses = ['open', 'responses-received'].includes(item.status);

  return (
    <main className="min-h-screen bg-[#F5F2EA] text-[#171310]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-black tracking-[-0.04em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <Link href="/board" className="text-sm font-black text-[#135DFF]">← Back to Board</Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1.3fr_.7fr]">
        <article className="border border-black/10 bg-white p-6 shadow-sm">
          <span className="text-xs font-black uppercase tracking-wide text-[#135DFF]">{item.category.replaceAll('-', ' ')}</span>
          <h1 className="mt-4 text-4xl font-black tracking-[-0.04em]">{item.title}</h1>
          <p className="mt-3 text-lg font-bold text-black/70">{item.city}{item.state ? `, ${item.state}` : ''}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="bg-[#F7F5EF] p-4"><div className="text-xs font-black uppercase text-black/45">Date</div><div className="mt-1 font-bold">{item.event_date || 'Flexible'}</div></div>
            <div className="bg-[#F7F5EF] p-4"><div className="text-xs font-black uppercase text-black/45">Guests</div><div className="mt-1 font-bold">{item.guest_count || 'Open'}</div></div>
            <div className="bg-[#F7F5EF] p-4"><div className="text-xs font-black uppercase text-black/45">Status</div><div className="mt-1 font-bold capitalize">{item.status.replaceAll('-', ' ')}</div></div>
          </div>
          <div className="mt-6 whitespace-pre-wrap leading-7 text-black/70">{item.description}</div>
        </article>

        <aside className="border border-black/10 bg-white p-6 shadow-sm">
          {acceptingResponses ? (
            <>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#135DFF]">Respond to this opportunity</p>
              <form action="/api/responses" method="post" className="mt-4 grid gap-3">
                <input type="hidden" name="opportunity_id" value={item.id} />
                <div className="hidden" aria-hidden="true">
                  <label>Company website
                    <input name="company_website" tabIndex={-1} autoComplete="off" />
                  </label>
                </div>
                <input name="provider_name" required maxLength={120} placeholder="Your name or business" className="rounded-lg border border-black/15 px-3 py-3" />
                <input name="provider_email" type="email" required maxLength={254} placeholder="Email" className="rounded-lg border border-black/15 px-3 py-3" />
                <input name="provider_phone" maxLength={50} placeholder="Phone" className="rounded-lg border border-black/15 px-3 py-3" />
                <input name="profile_url" type="url" maxLength={500} placeholder="Profile or website (optional)" className="rounded-lg border border-black/15 px-3 py-3" />
                <input name="quote_amount" type="number" min="0" max="10000000" placeholder="Quote amount (optional)" className="rounded-lg border border-black/15 px-3 py-3" />
                <textarea name="message" required maxLength={5000} placeholder="Tell the client why you're a fit and what you can provide." rows={6} className="rounded-lg border border-black/15 px-3 py-3" />
                <button className="rounded-lg bg-[#135DFF] px-4 py-3 font-black text-white">Send Response</button>
                <p className="text-xs leading-5 text-black/45">Your response is sent privately to the client. Provider contact information is not posted publicly.</p>
              </form>
            </>
          ) : (
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-black/45">Opportunity closed</p>
              <h2 className="mt-2 text-xl font-black">This request is no longer accepting responses.</h2>
              <Link href="/board" className="mt-5 inline-flex rounded-lg bg-[#135DFF] px-4 py-3 text-sm font-black text-white">Browse open opportunities</Link>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
