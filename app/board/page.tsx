import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const allowedCategories = new Set(['private-chef', 'catering', 'meal-prep', 'food-truck', 'experience', 'class']);

function money(value: number | null) {
  if (!value) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function single(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value || '';
}

async function loadBoard(category: string, city: string) {
  try {
    const supabase = getSupabaseServer();
    let query = supabase
      .from('opportunities')
      .select('id,category,title,description,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
      .in('status', ['open', 'responses-received']);

    if (category && allowedCategories.has(category)) {
      query = query.eq('category', category);
    }

    if (city) {
      query = query.ilike('city', `%${city.slice(0, 80)}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(100);

    if (error) {
      console.error('BOARD LOAD FAILED', error);
      return { opportunities: [], available: false };
    }

    return { opportunities: data ?? [], available: true };
  } catch (error) {
    console.error('BOARD NOT CONFIGURED', error);
    return { opportunities: [], available: false };
  }
}

export default async function BoardPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; city?: string | string[] }>;
}) {
  const params = await searchParams;
  const requestedCategory = single(params.category);
  const category = allowedCategories.has(requestedCategory) ? requestedCategory : '';
  const city = single(params.city).trim();
  const { opportunities, available } = await loadBoard(category, city);

  return (
    <main className="min-h-screen bg-[#F5F2EA] text-[#171310]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-black tracking-[-0.04em] text-[#135DFF]">
            TakeAChefHome<span className="text-[#171310]">.com</span>
          </Link>
          <div className="flex items-center gap-4 text-sm font-bold">
            <Link href="/" className="hover:text-[#135DFF]">Home</Link>
            <Link href="/post-a-lead" className="rounded-lg bg-[#135DFF] px-4 py-2 text-white">Post a Request</Link>
          </div>
        </div>
      </header>

      <section className="border-b border-black/10 bg-[#171310] text-white">
        <div className="mx-auto max-w-7xl px-4 py-7">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#6EA1FF]">Live Marketplace</p>
          <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.04em]">The Board</h1>
              <p className="mt-2 text-sm text-white/60">Real food-service opportunities. No manufactured activity.</p>
            </div>
            <div className="text-sm font-black text-white/70">{available ? `${opportunities.length} matching opportunities` : 'Connection pending'}</div>
          </div>

          <form action="/board" method="get" className="mt-5 grid gap-2 md:grid-cols-[1fr_1fr_auto]">
            <select name="category" defaultValue={category} className="min-h-12 rounded-lg border border-white/15 bg-white px-4 font-semibold text-[#171310]">
              <option value="">All categories</option>
              <option value="private-chef">Private Chef</option>
              <option value="catering">Catering</option>
              <option value="meal-prep">Meal Prep</option>
              <option value="food-truck">Food Truck</option>
              <option value="experience">Experience</option>
              <option value="class">Cooking Class</option>
            </select>
            <input name="city" defaultValue={city} placeholder="City" className="min-h-12 rounded-lg border border-white/15 bg-white px-4 text-[#171310]" />
            <button className="min-h-12 rounded-lg bg-[#135DFF] px-6 font-black text-white">FILTER BOARD</button>
          </form>

          {(category || city) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-bold text-white/65">
              <span>Filtering:</span>
              {category && <span className="rounded-full bg-white/10 px-3 py-1">{category.replaceAll('-', ' ')}</span>}
              {city && <span className="rounded-full bg-white/10 px-3 py-1">{city}</span>}
              <Link href="/board" className="ml-1 text-[#6EA1FF] hover:underline">Clear filters</Link>
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        {!available ? (
          <div className="border border-[#D8CFBF] bg-white p-8">
            <h2 className="text-xl font-black">The Board is built and waiting on production connection.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">The database engine is ready. Once the deployment environment is connected, live opportunities will appear here automatically.</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="grid gap-5 border border-[#D8CFBF] bg-white p-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <h2 className="text-xl font-black">No matching opportunities yet.</h2>
              <p className="mt-2 text-sm text-black/55">We would rather show an empty board than fake a marketplace.</p>
            </div>
            <Link href="/post-a-lead" className="rounded-lg bg-[#135DFF] px-5 py-3 text-center text-sm font-black text-white">Post a Request</Link>
          </div>
        ) : (
          <div className="overflow-hidden border-2 border-[#171310] bg-white">
            <div className="hidden grid-cols-[140px_1fr_180px_150px] bg-[#171310] px-4 py-2 text-xs font-black uppercase tracking-wide text-white/70 md:grid">
              <span>Category</span>
              <span>Opportunity</span>
              <span>Location</span>
              <span>Budget</span>
            </div>

            {opportunities.map((item, index) => {
              const budget = item.budget_min && item.budget_max
                ? `${money(item.budget_min)}–${money(item.budget_max)}`
                : money(item.budget_max) || money(item.budget_min);

              return (
                <Link
                  key={item.id}
                  href={`/board/${item.id}`}
                  className={`grid gap-2 px-4 py-4 transition hover:bg-[#EEF4FF] md:grid-cols-[140px_1fr_180px_150px] md:items-center ${index ? 'border-t border-black/10' : ''}`}
                >
                  <div>
                    <span className="text-xs font-black uppercase tracking-wide text-[#135DFF]">{item.category.replaceAll('-', ' ')}</span>
                  </div>
                  <div>
                    <h2 className="font-black">{item.title}</h2>
                    <p className="mt-1 line-clamp-1 text-sm text-black/55">{item.description}</p>
                    <p className="mt-1 text-xs text-black/40">{item.event_date ? `Date: ${item.event_date}` : 'Date flexible'}{item.guest_count ? ` · ${item.guest_count} guests` : ''}</p>
                  </div>
                  <div className="text-sm font-bold">{item.city}{item.state ? `, ${item.state}` : ''}</div>
                  <div className="text-sm font-black">{budget || 'Budget open'}</div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
