// app/page.tsx
// TakeaChefHome.com — launch MVP homepage

import Link from "next/link";

const marketplaceSections = [
  {
    href: "/private-chef",
    title: "Private Chef",
    subtitle: "Dinners, retreats, tastings, Airbnb meals",
    status: "Open now",
    featured: true,
  },
  {
    href: "/catering",
    title: "Catering",
    subtitle: "Events, weddings, corporate meals, celebrations",
    status: "Open now",
    featured: true,
  },
  {
    href: "/jobs",
    title: "Kitchen Talent",
    subtitle: "Chefs, cooks, servers, bartenders, event staff",
    status: "Intake open",
    featured: false,
  },
  {
    href: "/kitchens",
    title: "Kitchen Rentals",
    subtitle: "Commissary, prep, ghost kitchens, pop-up space",
    status: "Early access",
    featured: false,
  },
  {
    href: "/shop",
    title: "Chef Gear",
    subtitle: "Tools, FLAVR picks, catering gear, kitchen finds",
    status: "Coming soon",
    featured: false,
  },
];

const cityLinks = ["Atlanta", "Phoenix", "Las Vegas", "Los Angeles", "Kansas City", "Seattle", "Charlotte", "Savannah"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-950">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#0b4fb3]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-slate-700">
            <a href="#marketplace" className="hover:text-[#0b4fb3]">Browse</a>
            <a href="#post" className="hover:text-[#0b4fb3]">Post a Request</a>
            <Link href="/jobs" className="hover:text-[#0b4fb3]">Kitchen Talent</Link>
            <Link href="/shop" className="hover:text-[#0b4fb3]">Chef Gear</Link>
            <Link href="/auth" className="rounded-full border border-[#0b4fb3]/25 px-4 py-2 text-[#0b4fb3] hover:bg-[#eaf3ff]">Sign In</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_35%),linear-gradient(180deg,_#ffffff,_#f7fbff)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr,0.9fr] lg:py-14">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-[#0b4fb3]/20 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0b4fb3] shadow-sm">
              Craigslist simple. Chef culture sharper.
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Find the chef, the caterer, the kitchen, or the crew — fast.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                TakeaChefHome.com is a nationwide culinary marketplace built for real food work: private chef dinners, catering, kitchen rentals, staffing support, and chef-approved gear.
              </p>
            </div>

            <form method="get" action="#marketplace" className="grid gap-3 rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-blue-900/5 md:grid-cols-[1fr,1fr,auto]">
              <input name="need" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="What do you need? Private chef, catering, staff..." />
              <input name="where" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="City or state" />
              <button className="rounded-2xl bg-[#0b4fb3] px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#083f8e]">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
              {cityLinks.map((city) => (
                <a key={city} href="#post" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:border-[#0b4fb3]/40 hover:text-[#0b4fb3]">
                  {city}
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-blue-900/10">
            <div className="rounded-3xl bg-[#0b4fb3] p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-100">Launch Focus</p>
              <h2 className="mt-2 text-2xl font-black">Private Chef + Catering first.</h2>
              <p className="mt-3 text-sm leading-6 text-blue-50">
                The site opens with the two money-ready categories. Kitchen Talent, Kitchen Rentals, and Chef Gear stay visible so the marketplace feels bigger from day one.
              </p>
            </div>
            <div className="mt-4 grid gap-3 text-sm">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-black text-slate-950">For clients</p>
                <p className="mt-1 text-slate-600">Post what you need once and get routed to the right culinary solution.</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-black text-slate-950">For chefs & caterers</p>
                <p className="mt-1 text-slate-600">Get discovered, receive serious requests, and plug into a marketplace built by food people.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="marketplace" className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">Marketplace Board</p>
            <h2 className="mt-1 text-3xl font-black tracking-tight">Choose a category</h2>
          </div>
          <a href="#post" className="text-sm font-black text-[#0b4fb3] hover:underline">Post a new request →</a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {marketplaceSections.map((item) => (
            <Link key={item.href} href={item.href} className={`group rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${item.featured ? "border-[#0b4fb3]/30 ring-2 ring-[#0b4fb3]/10" : "border-slate-200"}`}>
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wide ${item.featured ? "bg-[#0b4fb3] text-white" : "bg-slate-100 text-slate-600"}`}>
                  {item.status}
                </span>
                <span className="text-[#0b4fb3] transition group-hover:translate-x-1">→</span>
              </div>
              <h3 className="mt-5 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
          <div className="rounded-3xl bg-[#f7fbff] p-6">
            <p className="text-sm font-black text-[#0b4fb3]">1. Post</p>
            <h3 className="mt-2 text-xl font-black">Tell us the need.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Dinner, catering, staff, kitchen space, city, date, guest count, budget, and vibe.</p>
          </div>
          <div className="rounded-3xl bg-[#f7fbff] p-6">
            <p className="text-sm font-black text-[#0b4fb3]">2. Match</p>
            <h3 className="mt-2 text-xl font-black">We route it clean.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">The request gets sorted so the right chef, caterer, kitchen, or crew can respond.</p>
          </div>
          <div className="rounded-3xl bg-[#f7fbff] p-6">
            <p className="text-sm font-black text-[#0b4fb3]">3. Confirm</p>
            <h3 className="mt-2 text-xl font-black">Lock the details.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Confirm scope, deposit, service details, and expectations before the job happens.</p>
          </div>
        </div>
      </section>

      <section id="post" className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">Chef GoGee Intake</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">Post what you need</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">This MVP form captures the lead now. We can wire deeper automation, Supabase, payments, and dashboards after the public launch shell is clean.</p>

          <form method="post" action="/api/leads" className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Name" />
              <input name="email" type="email" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Email" />
              <input name="phone" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Phone" />
              <input name="city" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="City + state" />
            </div>
            <select name="serviceType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]">
              <option value="private-chef">Private Chef</option>
              <option value="catering">Catering</option>
              <option value="staff">Kitchen Talent / Staff</option>
              <option value="kitchen">Kitchen Rental</option>
              <option value="gear">Chef Gear</option>
              <option value="other">Not sure yet</option>
            </select>
            <textarea name="details" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Date, guest count, budget, menu style, staffing needs, kitchen needs, or anything important..." />
            <input type="hidden" name="source" value="homepage" />
            <button className="rounded-2xl bg-[#0b4fb3] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#083f8e]">Submit Request</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} TakeaChefHome.com</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/private-chef">Private Chef</Link>
            <Link href="/catering">Catering</Link>
            <Link href="/kitchens">Kitchens</Link>
            <Link href="/jobs">Talent</Link>
            <Link href="/shop">Chef Gear</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
