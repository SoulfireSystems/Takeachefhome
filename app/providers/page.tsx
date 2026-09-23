import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const allowedServices = new Set(['private-chef','catering','meal-prep','food-truck','experience','class']);

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value || '';
}

async function loadProviders(service: string, city: string) {
  try {
    const supabase = getSupabaseServer();
    let query = supabase
      .from('provider_profiles')
      .select('id,display_name,professional_type,services,city,state,bio,years_experience,starting_price,profile_image_url,verified,created_at')
      .eq('status','active');

    if (service && allowedServices.has(service)) query = query.contains('services',[service]);
    if (city) query = query.ilike('city', `%${city.slice(0,80)}%`);

    const { data, error } = await query.order('verified',{ascending:false}).order('created_at',{ascending:false}).limit(100);
    if (error) {
      console.error('PROVIDER DIRECTORY LOAD FAILED', error);
      return { providers: [], available: false };
    }
    return { providers: data ?? [], available: true };
  } catch (error) {
    console.error('PROVIDER DIRECTORY NOT CONFIGURED', error);
    return { providers: [], available: false };
  }
}

export default async function ProvidersPage({ searchParams }: { searchParams: Promise<{ service?: string | string[]; city?: string | string[] }> }) {
  const params = await searchParams;
  const requestedService = single(params.service);
  const service = allowedServices.has(requestedService) ? requestedService : '';
  const city = single(params.city).trim();
  const { providers, available } = await loadProviders(service, city);

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <nav className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/providers" className="text-[#135DFF]">Find a Pro</Link>
            <Link href="/board">The Board</Link>
            <Link href="/talent">Talent</Link>
            <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white">Post Request</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Client marketplace</p>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">Find a food professional.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Private chefs, caterers, meal-prep professionals, food trucks, culinary experiences and instructors — searchable by service and market.</p>

          <form action="/providers" method="get" className="mt-6 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
            <select name="service" defaultValue={service} className="min-h-14 border-2 border-white bg-white px-4 text-sm font-black text-[#171310]">
              <option value="">ALL SERVICES</option>
              <option value="private-chef">Private Chef</option>
              <option value="catering">Catering</option>
              <option value="meal-prep">Meal Prep</option>
              <option value="food-truck">Food Truck</option>
              <option value="experience">Experience</option>
              <option value="class">Cooking Class</option>
            </select>
            <input name="city" defaultValue={city} placeholder="CITY OR MARKET" className="min-h-14 border-2 border-white bg-white px-4 text-sm font-bold text-[#171310]" />
            <button className="min-h-14 border-2 border-white bg-[#135DFF] px-6 text-sm font-black uppercase">Search →</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Directory</p>
            <h2 className="text-3xl font-black tracking-[-0.04em]">{available ? `${providers.length} professionals` : 'Directory connection pending'}</h2>
          </div>
          <Link href="/talent/join" className="text-xs font-black uppercase text-[#135DFF]">Are you a food professional? Get listed →</Link>
        </div>

        {!available ? (
          <div className="border-2 border-[#171310] bg-white p-7">
            <h3 className="text-xl font-black">The provider directory is built and waiting on the production connection.</h3>
            <p className="mt-2 text-sm text-black/55">We are not filling this page with fake chefs or placeholder businesses.</p>
          </div>
        ) : providers.length === 0 ? (
          <div className="grid gap-5 border-2 border-[#171310] bg-white p-7 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h3 className="text-xl font-black">No matching professionals listed yet.</h3>
              <p className="mt-2 text-sm text-black/55">That is real marketplace data, not manufactured inventory.</p>
            </div>
            <Link href="/talent/join" className="border-2 border-[#171310] bg-[#D4A64F] px-5 py-3 text-sm font-black">Get Listed</Link>
          </div>
        ) : (
          <div className="grid border-l-2 border-t-2 border-[#171310] bg-white sm:grid-cols-2 lg:grid-cols-3">
            {providers.map((provider:any) => (
              <Link key={provider.id} href={`/providers/${provider.id}`} className="group border-b-2 border-r-2 border-[#171310] p-5 hover:bg-[#E9F0FF]">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#135DFF]">{provider.professional_type?.replaceAll('-',' ')}</p>
                    <h3 className="mt-1 text-2xl font-black tracking-[-0.035em]">{provider.display_name}</h3>
                  </div>
                  {provider.verified && <span className="border border-[#171310] bg-[#D4A64F] px-2 py-1 text-[9px] font-black uppercase">Verified</span>}
                </div>
                <p className="mt-2 text-sm font-bold">{provider.city}{provider.state ? `, ${provider.state}` : ''}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-5 text-black/55">{provider.bio || 'Professional profile'}</p>
                <div className="mt-5 flex flex-wrap gap-1">
                  {(provider.services || []).slice(0,4).map((item:string) => <span key={item} className="bg-[#F3EEE2] px-2 py-1 text-[10px] font-black uppercase">{item.replaceAll('-',' ')}</span>)}
                </div>
                <span className="mt-5 block text-sm font-black text-[#135DFF]">View profile →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
