import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

async function loadProvider(id:string) {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('provider_profiles')
      .select('id,display_name,professional_type,services,city,state,bio,years_experience,starting_price,website_url,instagram_url,verified,status')
      .eq('id', id)
      .eq('status','active')
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export default async function ProviderPage({ params }: { params: Promise<{ id:string }> }) {
  const { id } = await params;
  const provider:any = await loadProvider(id);
  if (!provider) notFound();

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-black tracking-[-0.045em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <Link href="/providers" className="text-sm font-black text-[#135DFF]">← Find a Pro</Link>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_320px]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">{provider.professional_type?.replaceAll('-',' ')}</span>
              {provider.verified && <span className="bg-[#D4A64F] px-2 py-1 text-[9px] font-black uppercase">Verified</span>}
            </div>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.055em]">{provider.display_name}</h1>
            <p className="mt-2 text-lg font-black">{provider.city}{provider.state ? `, ${provider.state}` : ''}</p>
            <p className="mt-6 max-w-3xl text-base leading-7 text-black/65">{provider.bio}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(provider.services || []).map((item:string) => <span key={item} className="border-2 border-[#171310] bg-[#F8F4EA] px-3 py-2 text-xs font-black uppercase">{item.replaceAll('-',' ')}</span>)}
            </div>
          </div>

          <aside className="border-2 border-[#171310] bg-[#171310] p-5 text-white">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">At a glance</p>
            {provider.years_experience ? <p className="mt-4 border-b border-white/20 pb-3 text-sm"><strong>{provider.years_experience}</strong> years experience</p> : null}
            {provider.starting_price ? <p className="border-b border-white/20 py-3 text-sm">Starting around <strong>${Number(provider.starting_price).toLocaleString()}</strong></p> : null}
            <Link href="/post-a-lead" className="mt-5 block border-2 border-white bg-[#135DFF] px-4 py-3 text-center text-sm font-black uppercase">Post a Request →</Link>
            <p className="mt-3 text-xs leading-5 text-white/45">Direct booking and profile messaging are coming in the next marketplace layer.</p>
          </aside>
        </div>
      </section>
    </main>
  );
}
