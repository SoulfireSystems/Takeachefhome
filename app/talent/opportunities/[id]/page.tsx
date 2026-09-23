import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

async function load(id: string) {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('talent_opportunities')
      .select('id,opportunity_type,role,company_name,city,state,work_date,start_time,end_time,pay_type,pay_min,pay_max,description,status')
      .eq('id', id)
      .eq('status', 'open')
      .single();

    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function TalentOpportunityPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ applied?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;
  const opportunity: any = await load(id);
  if (!opportunity) notFound();

  const applied = query.applied === '1';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 md:grid-cols-[1fr_360px]">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">{opportunity.opportunity_type}</p>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.05em]">{opportunity.role}</h1>
          <p className="mt-2 text-xl font-black">{opportunity.company_name}</p>
          <p className="mt-4 font-bold">
            {opportunity.city}{opportunity.state ? ', ' + opportunity.state : ''}
            {opportunity.work_date ? ' · ' + opportunity.work_date : ''}
          </p>
          <p className="mt-6 whitespace-pre-wrap text-sm leading-7 text-black/65">{opportunity.description}</p>
        </div>

        <aside>
          {applied ? (
            <div className="border-2 border-[#171310] bg-white p-5">
              <h2 className="text-2xl font-black">Application sent.</h2>
              <p className="mt-2 text-sm text-black/55">Your contact information stays private from the public listing.</p>
            </div>
          ) : (
            <form action="/api/talent/apply" method="post" className="grid gap-3 border-2 border-[#171310] bg-white p-5">
              <h2 className="text-2xl font-black">Apply</h2>
              <input type="hidden" name="opportunity_id" value={opportunity.id} />
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off" /></div>
              <input name="applicant_name" required className="border-2 border-[#171310] p-3" placeholder="Name" />
              <input name="applicant_email" type="email" required className="border-2 border-[#171310] p-3" placeholder="Email" />
              <input name="applicant_phone" className="border-2 border-[#171310] p-3" placeholder="Phone" />
              <input name="profile_url" className="border-2 border-[#171310] p-3" placeholder="Profile / portfolio URL" />
              <textarea name="message" required rows={5} className="border-2 border-[#171310] p-3" placeholder="Why are you a fit?" />
              <button className="border-2 border-[#171310] bg-[#135DFF] p-3 font-black uppercase text-white">Send Application →</button>
            </form>
          )}
        </aside>
      </section>
    </main>
  );
}
