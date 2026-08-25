import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const categories = [
  { label: 'Private Chef', value: 'private-chef', href: '/private-chef', note: 'Dinners · Airbnb · retreats · date nights' },
  { label: 'Catering', value: 'catering', href: '/catering', note: 'Corporate · weddings · brunch · drop-off' },
  { label: 'Meal Prep', value: 'meal-prep', href: '/board?category=meal-prep', note: 'Weekly meals · families · athletes · seniors' },
  { label: 'Food Trucks', value: 'food-truck', href: '/board?category=food-truck', note: 'Events · offices · neighborhoods · festivals' },
  { label: 'Experiences', value: 'experience', href: '/board?category=experience', note: 'Chef tables · tastings · culinary events' },
  { label: 'Cooking Classes', value: 'class', href: '/board?category=class', note: 'Private · group · team-building · virtual' },
];

const markets = ['Atlanta', 'Raleigh', 'Charlotte', 'Miami', 'Dallas', 'Phoenix', 'Chicago', 'Kansas City', 'Las Vegas', 'San Juan', 'Seattle', 'Denver'];

const categoryLabel: Record<string, string> = {
  'private-chef': 'Private Chef',
  catering: 'Catering',
  'meal-prep': 'Meal Prep',
  'food-truck': 'Food Truck',
  experience: 'Experience',
  class: 'Class',
};

function money(value: number | null) {
  if (!value) return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

async function getLiveOpportunities() {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('opportunities')
      .select('id,category,title,city,state,event_date,guest_count,budget_min,budget_max,status,created_at')
      .in('status', ['open', 'responses-received'])
      .order('created_at', { ascending: false })
      .limit(8);

    if (error) {
      console.error('HOME BOARD LOAD FAILED', error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    // Keep the front page useful even before deployment secrets are configured.
    console.error('HOME BOARD NOT CONFIGURED', error);
    return [];
  }
}

export default async function Home() {
  const liveOpportunities = await getLiveOpportunities();

  return (
    <main className="min-h-screen bg-[#F5F2EA] text-[#171310]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-2xl font-black tracking-[-0.04em] text-[#135DFF] sm:text-3xl">
            TakeAChefHome<span className="text-[#171310]">.com</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold">
            <Link href="/board" className="hover:text-[#135DFF]">The Board</Link>
            <Link href="/private-chef" className="hover:text-[#135DFF]">Private Chef</Link>
            <Link href="/catering" className="hover:text-[#135DFF]">Catering</Link>
            <Link href="/kitchens" className="hover:text-[#135DFF]">Find Space</Link>
            <Link href="/post-a-lead" className="rounded-lg bg-[#135DFF] px-4 py-2 text-white hover:bg-[#0f4bd1]">Post Request</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-black/10 bg-[#135DFF] text-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-white/70">The Culinary Exchange</p>
              <h1 className="mt-2 max-w-4xl text-4xl font-black leading-[0.95] tracking-[-0.045em] sm:text-6xl">
                Find the food service. Find the people. Get it done.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
                Book chefs and caterers, post real food-service opportunities, find kitchen space, and connect with the people who move food work.
              </p>
            </div>
            <Link href="/post-a-lead" className="inline-flex h-fit items-center justify-center rounded-xl bg-[#171310] px-6 py-4 font-black text-white shadow-lg hover:bg-black">
              POST WHAT YOU NEED →
            </Link>
          </div>

          <form action="/board" method="get" className="mt-7 grid gap-2 rounded-xl bg-white p-2 text-[#171310] shadow-xl md:grid-cols-[1fr_1fr_auto]">
            <label className="sr-only" htmlFor="category">What do you need?</label>
            <select id="category" name="category" defaultValue="" className="min-h-12 rounded-lg border border-black/10 bg-[#F8F7F3] px-4 font-semibold outline-none focus:border-[#135DFF]">
              <option value="">What do you need?</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="city">Where?</label>
            <input id="city" name="city" placeholder="City — Raleigh, Atlanta, Miami..." className="min-h-12 rounded-lg border border-black/10 bg-[#F8F7F3] px-4 outline-none focus:border-[#135DFF]" />
            <button className="min-h-12 rounded-lg bg-[#171310] px-7 font-black text-white hover:bg-black">SEARCH THE BOARD</button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="flex items-end justify-between gap-4 border-b-2 border-[#171310] pb-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Start here</p>
                <h2 className="text-2xl font-black tracking-tight">Book Food</h2>
              </div>
              <Link href="/board" className="text-sm font-black text-[#135DFF] hover:underline">Browse all →</Link>
            </div>

            <div className="grid border-x border-b border-black/10 bg-white sm:grid-cols-2">
              {categories.map((category, index) => (
                <Link
                  key={category.value}
                  href={category.href}
                  className={`group p-5 hover:bg-[#EEF4FF] ${index % 2 === 0 ? 'sm:border-r sm:border-black/10' : ''} ${index > 1 ? 'border-t border-black/10' : index === 1 ? 'border-t border-black/10 sm:border-t-0' : ''}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black group-hover:text-[#135DFF]">{category.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-black/60">{category.note}</p>
                    </div>
                    <span className="font-black text-[#135DFF]">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside>
            <div className="border-b-2 border-[#171310] pb-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#D09B2C]">Food business infrastructure</p>
              <h2 className="text-2xl font-black tracking-tight">More than the meal</h2>
            </div>

            <div className="divide-y divide-black/10 border-x border-b border-black/10 bg-[#171310] text-white">
              <Link href="/kitchens" className="flex items-center justify-between gap-4 p-5 hover:bg-black">
                <div>
                  <h3 className="text-lg font-black">Kitchen Exchange</h3>
                  <p className="mt-1 text-sm text-white/60">Prep kitchens · commissary · production space</p>
                </div>
                <span className="text-[#D4A64F]">→</span>
              </Link>
              <Link href="/kitchens" className="flex items-center justify-between gap-4 p-5 hover:bg-black">
                <div>
                  <h3 className="text-lg font-black">Cold Grid</h3>
                  <p className="mt-1 text-sm text-white/60">Cooler · freezer · temporary cold storage</p>
                </div>
                <span className="text-[#D4A64F]">→</span>
              </Link>
              <Link href="/shop" className="flex items-center justify-between gap-4 p-5 hover:bg-black">
                <div>
                  <h3 className="text-lg font-black">Chef Gear</h3>
                  <p className="mt-1 text-sm text-white/60">Tools · catering equipment · kitchen setup</p>
                </div>
                <span className="text-[#D4A64F]">→</span>
              </Link>
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#D4A64F]">Food professionals</p>
                <h3 className="mt-1 text-xl font-black">BRIGADE° is the work side.</h3>
                <p className="mt-2 text-sm leading-6 text-white/65">Jobs, shifts, prep teams and professional listings are the next live system connecting into this exchange.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Live marketplace</p>
              <h2 className="text-3xl font-black tracking-[-0.03em]">On The Board Now</h2>
              <p className="mt-1 text-sm text-black/55">Only real client-posted opportunities appear here.</p>
            </div>
            <div className="flex gap-3">
              <Link href="/board" className="text-sm font-black text-[#135DFF] hover:underline">OPEN THE BOARD →</Link>
            </div>
          </div>

          <div className="mt-5 border-t-2 border-[#171310]">
            {liveOpportunities.length === 0 ? (
              <div className="grid gap-4 border-x border-b border-black/10 bg-[#FAF9F6] p-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <h3 className="font-black">The live board is open.</h3>
                  <p className="mt-1 text-sm text-black/55">We do not manufacture listings or fake activity. The first public requests will appear here when they are posted.</p>
                </div>
                <Link href="/post-a-lead" className="rounded-lg bg-[#135DFF] px-4 py-3 text-center text-sm font-black text-white">Post the first request</Link>
              </div>
            ) : (
              <div className="border-x border-black/10">
                {liveOpportunities.map((item, index) => {
                  const budget = item.budget_min && item.budget_max
                    ? `${money(item.budget_min)}–${money(item.budget_max)}`
                    : money(item.budget_max) || money(item.budget_min) || 'Budget open';

                  return (
                    <Link
                      key={item.id}
                      href={`/board/${item.id}`}
                      className={`grid gap-2 border-b border-black/10 px-3 py-4 hover:bg-[#EEF4FF] md:grid-cols-[130px_1fr_150px_150px] md:items-center ${index === 0 ? 'bg-[#FBFCFF]' : ''}`}
                    >
                      <span className="text-xs font-black uppercase tracking-wide text-[#135DFF]">{categoryLabel[item.category] || item.category}</span>
                      <div>
                        <h3 className="font-black">{item.title}</h3>
                        <p className="mt-1 text-xs text-black/45">{item.event_date ? `Date: ${item.event_date}` : 'Date flexible'}{item.guest_count ? ` · ${item.guest_count} guests` : ''}</p>
                      </div>
                      <span className="text-sm font-bold">{item.city}{item.state ? `, ${item.state}` : ''}</span>
                      <span className="text-sm font-black">{budget}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <div className="border-b-2 border-[#171310] pb-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Browse by market</p>
              <h2 className="text-2xl font-black">Popular cities</h2>
            </div>
            <div className="grid grid-cols-2 border-x border-b border-black/10 bg-white sm:grid-cols-3">
              {markets.map((city, index) => (
                <Link
                  key={city}
                  href={`/board?city=${encodeURIComponent(city)}`}
                  className={`px-4 py-3 text-sm font-bold hover:bg-[#EEF4FF] hover:text-[#135DFF] ${index % 3 !== 2 ? 'sm:border-r sm:border-black/10' : ''} ${index > 2 ? 'border-t border-black/10' : index > 1 ? 'border-t border-black/10 sm:border-t-0' : ''}`}
                >
                  {city} →
                </Link>
              ))}
            </div>
          </div>

          <div className="border-2 border-[#135DFF] bg-[#EEF4FF] p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Need something specific?</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">Put the opportunity on the board.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-black/65">Tell us what you need, where, when, guest count and budget. Professionals respond to the opportunity while your contact information stays private.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/post-a-lead" className="rounded-lg bg-[#135DFF] px-5 py-3 text-sm font-black text-white">POST A REQUEST</Link>
              <Link href="/board" className="rounded-lg border border-[#135DFF] bg-white px-5 py-3 text-sm font-black text-[#135DFF]">BROWSE THE BOARD</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-[#171310] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="text-2xl font-black tracking-[-0.04em]">TakeAChefHome.com</div>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">The culinary exchange for food service, food work and the infrastructure behind both.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-bold text-white/70">
            <Link href="/board" className="hover:text-white">The Board</Link>
            <Link href="/post-a-lead" className="hover:text-white">Post Request</Link>
            <Link href="/kitchens" className="hover:text-white">Kitchen Space</Link>
            <Link href="/shop" className="hover:text-white">Chef Gear</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
