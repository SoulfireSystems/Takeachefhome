import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

const categories = [
  {
    number: '01',
    label: 'Private Chef',
    value: 'private-chef',
    href: '/private-chef',
    note: 'Dinner parties · Airbnb · retreats · date nights',
  },
  {
    number: '02',
    label: 'Catering',
    value: 'catering',
    href: '/catering',
    note: 'Corporate · weddings · brunch · drop-off',
  },
  {
    number: '03',
    label: 'Meal Prep',
    value: 'meal-prep',
    href: '/board?category=meal-prep',
    note: 'Weekly meals · families · athletes · seniors',
  },
  {
    number: '04',
    label: 'Food Trucks',
    value: 'food-truck',
    href: '/board?category=food-truck',
    note: 'Events · offices · neighborhoods · festivals',
  },
  {
    number: '05',
    label: 'Experiences',
    value: 'experience',
    href: '/board?category=experience',
    note: 'Chef tables · tastings · culinary events',
  },
  {
    number: '06',
    label: 'Cooking Classes',
    value: 'class',
    href: '/board?category=class',
    note: 'Private · group · team-building · virtual',
  },
];

const markets = [
  'Atlanta',
  'Raleigh',
  'Charlotte',
  'Miami',
  'Dallas',
  'Phoenix',
  'Chicago',
  'Kansas City',
  'Las Vegas',
  'San Juan',
  'Seattle',
  'Denver',
];

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
      .limit(6);

    if (error) {
      console.error('HOME BOARD LOAD FAILED', error);
      return [];
    }

    return data ?? [];
  } catch (error) {
    console.error('HOME BOARD NOT CONFIGURED', error);
    return [];
  }
}

export default async function Home() {
  const liveOpportunities = await getLiveOpportunities();

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b border-white/10 bg-[#171310] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em]">
          <span className="text-white/55">The Culinary Exchange</span>
          <Link href="/talent" className="text-[#D4A64F] hover:text-white">
            Work in food? Enter Talent →
          </Link>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.055em] text-[#135DFF] sm:text-4xl">
            TakeAChefHome<span className="text-[#171310]">.com</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-black">
            <Link href="#book-food" className="hover:text-[#135DFF]">Book Food</Link>
            <Link href="/kitchens" className="hover:text-[#135DFF]">Find Space</Link>
            <Link href="/board" className="hover:text-[#135DFF]">The Board</Link>
            <Link href="/talent" className="hover:text-[#135DFF]">Talent</Link>
            <Link
              href="/post-a-lead"
              className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white shadow-[3px_3px_0_#171310] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_#171310]"
            >
              Post Request
            </Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#135DFF] text-white">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[1.45fr_.55fr]">
          <div className="px-4 py-7 sm:py-9 lg:border-r lg:border-white/25 lg:pr-9">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-white/65">Client marketplace / food service</p>
            <h1 className="mt-2 max-w-4xl text-4xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              What do you need?
              <span className="block text-[#F3D37C]">Where do you need it?</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-6 text-white/80 sm:text-base">
              Find private chefs, caterers, meal prep, food trucks, experiences and the infrastructure behind food service.
            </p>
          </div>

          <div className="grid grid-cols-2 border-t border-white/25 lg:border-t-0">
            <Link href="/private-chef" className="border-b border-r border-white/25 p-4 hover:bg-white/10 sm:p-5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">Need a chef?</span>
              <strong className="mt-1 block text-lg font-black">Find a Private Chef →</strong>
            </Link>
            <Link href="/catering" className="border-b border-white/25 p-4 hover:bg-white/10 sm:p-5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">Need food service?</span>
              <strong className="mt-1 block text-lg font-black">Find Catering →</strong>
            </Link>
            <Link href="/post-a-lead" className="border-r border-white/25 p-4 hover:bg-white/10 sm:p-5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">Know what you need?</span>
              <strong className="mt-1 block text-lg font-black">Post a Request →</strong>
            </Link>
            <Link href="/board" className="p-4 hover:bg-white/10 sm:p-5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/55">See demand now</span>
              <strong className="mt-1 block text-lg font-black">Open The Board →</strong>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <form action="/board" method="get" className="grid gap-2 md:grid-cols-[1fr_1fr_auto]">
            <label className="sr-only" htmlFor="category">What do you need?</label>
            <select
              id="category"
              name="category"
              defaultValue=""
              className="min-h-14 border-2 border-[#171310] bg-white px-4 text-sm font-black outline-none focus:border-[#135DFF]"
            >
              <option value="">WHAT DO YOU NEED?</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>

            <label className="sr-only" htmlFor="city">Where?</label>
            <input
              id="city"
              name="city"
              placeholder="CITY OR MARKET — ATLANTA, RALEIGH, MIAMI..."
              className="min-h-14 border-2 border-[#171310] bg-white px-4 text-sm font-bold outline-none placeholder:text-black/35 focus:border-[#135DFF]"
            />

            <button className="min-h-14 border-2 border-[#171310] bg-[#171310] px-7 text-sm font-black uppercase tracking-wide text-white hover:bg-[#135DFF]">
              Find It →
            </button>
          </form>
        </div>
      </section>

      <section id="book-food" className="mx-auto max-w-7xl px-4 py-7 sm:py-9">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Start here</p>
            <h2 className="text-3xl font-black tracking-[-0.045em]">Book Food Service</h2>
          </div>
          <p className="max-w-lg text-right text-xs font-semibold leading-5 text-black/50">
            Browse a category or post exactly what you need. No giant menu maze.
          </p>
        </div>

        <div className="grid border-l-2 border-t-2 border-[#171310] bg-white sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.value}
              href={category.href}
              className="group min-h-36 border-b-2 border-r-2 border-[#171310] p-4 transition hover:bg-[#E9F0FF] sm:p-5"
            >
              <div className="flex items-start justify-between gap-5">
                <span className="text-xs font-black text-[#135DFF]">{category.number}</span>
                <span className="text-lg font-black text-[#135DFF] transition group-hover:translate-x-1">→</span>
              </div>
              <h3 className="mt-5 text-2xl font-black tracking-[-0.035em] group-hover:text-[#135DFF]">{category.label}</h3>
              <p className="mt-1 text-sm font-medium leading-5 text-black/52">{category.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-[#171310] bg-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_300px]">
          <div className="px-4 py-7 lg:border-r-2 lg:border-[#171310]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Live demand</p>
                <h2 className="text-3xl font-black tracking-[-0.045em]">On The Board Now</h2>
              </div>
              <Link href="/board" className="text-xs font-black uppercase tracking-wide text-[#135DFF] hover:underline">
                View full board →
              </Link>
            </div>

            <div className="mt-5 border-2 border-[#171310]">
              <div className="hidden grid-cols-[120px_1fr_150px_130px] border-b-2 border-[#171310] bg-[#171310] px-3 py-2 text-[10px] font-black uppercase tracking-[0.14em] text-white md:grid">
                <span>Type</span>
                <span>Request</span>
                <span>Market</span>
                <span>Budget</span>
              </div>

              {liveOpportunities.length === 0 ? (
                <div className="grid gap-4 bg-[#F8F4EA] p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <h3 className="font-black">The live board is open.</h3>
                    <p className="mt-1 max-w-xl text-sm leading-5 text-black/55">
                      No manufactured activity. Real client requests appear here as they are posted.
                    </p>
                  </div>
                  <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-center text-xs font-black uppercase text-white">
                    Post a Request
                  </Link>
                </div>
              ) : (
                liveOpportunities.map((item, index) => {
                  const budget = item.budget_min && item.budget_max
                    ? `${money(item.budget_min)}–${money(item.budget_max)}`
                    : money(item.budget_max) || money(item.budget_min) || 'Budget open';

                  return (
                    <Link
                      key={item.id}
                      href={`/board/${item.id}`}
                      className={`grid gap-2 px-3 py-4 hover:bg-[#E9F0FF] md:grid-cols-[120px_1fr_150px_130px] md:items-center ${index !== liveOpportunities.length - 1 ? 'border-b border-black/15' : ''}`}
                    >
                      <span className="text-[10px] font-black uppercase tracking-wide text-[#135DFF]">
                        {categoryLabel[item.category] || item.category}
                      </span>
                      <div>
                        <h3 className="text-sm font-black">{item.title}</h3>
                        <p className="mt-1 text-[11px] text-black/45">
                          {item.event_date ? item.event_date : 'Date flexible'}
                          {item.guest_count ? ` · ${item.guest_count} guests` : ''}
                        </p>
                      </div>
                      <span className="text-sm font-bold">{item.city}{item.state ? `, ${item.state}` : ''}</span>
                      <span className="text-sm font-black">{budget}</span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <aside className="grid border-t-2 border-[#171310] bg-[#F3EEE2] lg:border-t-0">
            <div className="border-b-2 border-[#171310] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Fast path</p>
              <h3 className="mt-1 text-2xl font-black tracking-[-0.04em]">Don’t browse. Post it.</h3>
              <p className="mt-2 text-sm leading-5 text-black/58">Date, location, guest count, budget and the details. Put the opportunity in front of professionals.</p>
              <Link href="/post-a-lead" className="mt-4 inline-block border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-xs font-black uppercase text-white shadow-[3px_3px_0_#171310]">
                Post What You Need →
              </Link>
            </div>
            <div className="p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D09B2C]">How it moves</p>
              <div className="mt-4 space-y-3 text-sm font-bold">
                <p><span className="mr-2 text-[#135DFF]">01</span>Post the request</p>
                <p><span className="mr-2 text-[#135DFF]">02</span>Professionals respond</p>
                <p><span className="mr-2 text-[#135DFF]">03</span>Choose and book</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="mb-3">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D09B2C]">Food business infrastructure</p>
          <h2 className="text-3xl font-black tracking-[-0.045em]">The stuff behind the service.</h2>
        </div>

        <div className="grid border-l-2 border-t-2 border-[#171310] bg-[#171310] text-white md:grid-cols-3">
          <Link href="/kitchens" className="group border-b-2 border-r-2 border-white/25 p-5 hover:bg-black md:min-h-48">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Space</span>
            <h3 className="mt-5 text-2xl font-black">Kitchen Exchange</h3>
            <p className="mt-2 text-sm leading-5 text-white/55">Commissary · prep · production · ghost kitchen space</p>
            <span className="mt-5 block text-sm font-black text-[#D4A64F] group-hover:text-white">Find kitchen space →</span>
          </Link>

          <Link href="/kitchens" className="group border-b-2 border-r-2 border-white/25 p-5 hover:bg-black md:min-h-48">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Storage</span>
            <h3 className="mt-5 text-2xl font-black">Cold Grid</h3>
            <p className="mt-2 text-sm leading-5 text-white/55">Cooler · freezer · event staging · temporary cold storage</p>
            <span className="mt-5 block text-sm font-black text-[#D4A64F] group-hover:text-white">Find cold storage →</span>
          </Link>

          <Link href="/shop" className="group border-b-2 border-r-2 border-white/25 p-5 hover:bg-black md:min-h-48">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#D4A64F]">Equipment</span>
            <h3 className="mt-5 text-2xl font-black">Chef Gear</h3>
            <p className="mt-2 text-sm leading-5 text-white/55">Buy · sell · rent kitchen and catering equipment</p>
            <span className="mt-5 block text-sm font-black text-[#D4A64F] group-hover:text-white">Open Chef Gear →</span>
          </Link>
        </div>
      </section>

      <section className="border-y-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">The other front door</p>
            <h2 className="mt-1 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Work in food?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              Jobs, shifts, prep crews and professional profiles live on the Talent side of TakeAChefHome.
            </p>
          </div>
          <Link
            href="/talent"
            className="border-2 border-white bg-[#D4A64F] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-[#171310] shadow-[4px_4px_0_#fff] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_#fff]"
          >
            Enter Talent →
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:py-10 lg:grid-cols-[1fr_.8fr]">
        <div>
          <div className="border-b-2 border-[#171310] pb-2">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">Browse by market</p>
            <h2 className="text-2xl font-black tracking-[-0.035em]">Popular cities</h2>
          </div>

          <div className="grid grid-cols-2 border-l-2 border-[#171310] bg-white sm:grid-cols-3">
            {markets.map((city) => (
              <Link
                key={city}
                href={`/board?city=${encodeURIComponent(city)}`}
                className="border-b-2 border-r-2 border-[#171310] px-4 py-3 text-sm font-black hover:bg-[#E9F0FF] hover:text-[#135DFF]"
              >
                {city} →
              </Link>
            ))}
          </div>
        </div>

        <div className="border-2 border-[#135DFF] bg-[#E9F0FF] p-5 sm:p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Take it back to one</p>
          <h2 className="mt-2 text-3xl font-black leading-none tracking-[-0.045em]">One place. Food people. Food work.</h2>
          <p className="mt-3 text-sm leading-6 text-black/60">
            The goal is simple: when somebody needs food service, a kitchen, equipment or culinary talent, this is the first place they think to look.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-xs font-black uppercase text-white">Post Request</Link>
            <Link href="/board" className="border-2 border-[#171310] bg-white px-4 py-3 text-xs font-black uppercase">Open The Board</Link>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="text-2xl font-black tracking-[-0.045em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></div>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-black/45">The Culinary Exchange</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-wide">
            <Link href="#book-food" className="hover:text-[#135DFF]">Book Food</Link>
            <Link href="/board" className="hover:text-[#135DFF]">The Board</Link>
            <Link href="/kitchens" className="hover:text-[#135DFF]">Find Space</Link>
            <Link href="/shop" className="hover:text-[#135DFF]">Chef Gear</Link>
            <Link href="/talent" className="hover:text-[#135DFF]">Talent</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
