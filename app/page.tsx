// app/page.tsx
// TakeaChefHome.com — Private Chef + Catering first marketplace board

import Link from "next/link";

const primaryServices = [
  {
    href: "/private-chef",
    title: "Private Chef",
    detail: "In-home dinners, Airbnb meals, retreats, birthdays, date nights, chef-table experiences.",
    cta: "Book a Private Chef",
    style: "from-[#061b3a] via-[#135DFF] to-[#33b8ff]",
  },
  {
    href: "/catering",
    title: "Catering",
    detail: "Events, business meals, parties, weddings, brunches, drop-offs, buffets, and full-service food.",
    cta: "Request Catering",
    style: "from-[#111827] via-[#135DFF] to-[#D4A64F]",
  },
];

const supportCategories = [
  { href: "/jobs", title: "Find Crew", detail: "Chefs, cooks, servers, bartenders, event teams", status: "Support" },
  { href: "/kitchens", title: "Find Space", detail: "Prep kitchens, commissary, cold storage, pop-up space", status: "Support" },
  { href: "/shop", title: "Get Gear", detail: "Tools, catering gear, kitchen setup, chef picks", status: "Support" },
];

const boardSections = [
  {
    title: "Private Chef",
    links: ["Dinner party chef", "Vacation rental chef", "Date night dinner", "Retreat chef", "Birthday dinner", "Chef tasting menu"],
  },
  {
    title: "Catering",
    links: ["Wedding catering", "Corporate lunch", "Brunch catering", "Drop-off catering", "Buffet service", "Small bites & hors d'oeuvres"],
  },
  {
    title: "Support Services",
    links: ["Event servers", "Bartenders", "Prep kitchen", "Cold storage", "Food truck support", "Catering equipment"],
  },
];

const freshPosts = [
  { tag: "Private Chef", title: "Dinner for 8 at an Airbnb", city: "Phoenix", detail: "Need chef, menu ideas, and light reset after service.", style: "from-[#061b3a] to-[#135DFF]" },
  { tag: "Catering", title: "Brunch table for 24", city: "Atlanta", detail: "Pretty food, clean setup, bright daytime service.", style: "from-[#135DFF] to-[#D4A64F]" },
  { tag: "Private Chef", title: "Birthday dinner for 12", city: "Miami", detail: "Seafood-forward menu, upscale rental, relaxed service.", style: "from-[#0F172A] to-[#135DFF]" },
  { tag: "Catering", title: "Office lunch for 40", city: "Dallas", detail: "Drop-off or buffet-style setup for a weekday team meal.", style: "from-[#111827] to-[#D4A64F]" },
];

const cityLinks = ["Atlanta", "Phoenix", "Las Vegas", "Los Angeles", "Kansas City", "Seattle", "Charlotte", "Savannah", "Orlando", "Miami", "Dallas", "Chicago"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F9FF] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#135DFF]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-700">
            <a href="#services" className="rounded-full px-3 py-2 hover:bg-[#eaf3ff] hover:text-[#135DFF]">Private Chef</a>
            <a href="#services" className="rounded-full px-3 py-2 hover:bg-[#eaf3ff] hover:text-[#135DFF]">Catering</a>
            <a href="#board" className="rounded-full px-3 py-2 hover:bg-[#eaf3ff] hover:text-[#135DFF]">The Board</a>
            <a href="#post" className="rounded-full bg-[#135DFF] px-4 py-2 text-white hover:bg-[#104de0]">Post Request</a>
          </nav>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#cfe2ff,_transparent_30%),linear-gradient(180deg,_#ffffff,_#F4F9FF)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.05fr,0.95fr] lg:py-14">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-[#135DFF]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#135DFF] shadow-sm">
              Private chef + catering board
            </div>

            <div className="space-y-4">
              <h1 className="max-w-5xl text-4xl font-black leading-[0.96] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Book the chef. Feed the room.
              </h1>

              <p className="max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
                Private chefs and catering first — with crew, kitchen space, and gear support underneath when the job needs more than food.
              </p>
            </div>

            <form method="get" action="#services" className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-xl shadow-blue-900/5 md:grid-cols-[1fr,1fr,auto]">
              <input name="need" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="Private chef, catering, brunch, dinner party..." />
              <input name="where" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="City or state" />
              <button className="rounded-2xl bg-[#135DFF] px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#104de0]">
                Search
              </button>
            </form>

            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              {cityLinks.map((city) => (
                <a key={city} href="#post" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm hover:border-[#135DFF]/40 hover:text-[#135DFF]">
                  {city}
                </a>
              ))}
            </div>
          </div>

          <aside className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#0F172A] via-[#135DFF] to-[#D4A64F] p-6 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-black/30 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex justify-between gap-4 text-xs font-black uppercase tracking-[0.2em] text-white/80">
                <span>Built for real food work</span>
                <span>Chef Board Blue</span>
              </div>

              <div>
                <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">
                  Private Chef + Catering
                </p>
                <h2 className="text-4xl font-black leading-tight">
                  The main door is food service. The support stack makes it stronger.
                </h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/85">
                  Start with the dinner, brunch, event, or celebration. Add crew, space, and gear only when the job calls for it.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Start here</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight">Private Chef or Catering?</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {primaryServices.map((item) => (
            <Link key={item.href} href={item.href} className={`group relative min-h-[300px] overflow-hidden rounded-[2rem] border border-white/30 bg-gradient-to-br ${item.style} p-7 text-white shadow-xl transition duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_35%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-white/5" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-wide backdrop-blur">Primary</span>
                  <span className="text-2xl transition group-hover:translate-x-1">→</span>
                </div>

                <div className="mt-16">
                  <h3 className="text-4xl font-black">{item.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/85">{item.detail}</p>
                  <p className="mt-6 text-sm font-black uppercase tracking-wide text-white">{item.cta}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="mb-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Support categories</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">When the job needs more support</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {supportCategories.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <span className="rounded-full bg-[#eaf3ff] px-3 py-1 text-[11px] font-black uppercase tracking-wide text-[#135DFF]">{item.status}</span>
              <h3 className="mt-4 text-xl font-black text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="board" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">The Board</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight">Food service first. Support when needed.</h2>
            </div>
            <a href="#post" className="text-sm font-black text-[#135DFF] hover:underline">Post your own request →</a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {boardSections.map((section) => (
              <div key={section.title} className="rounded-[1.75rem] border border-slate-200 bg-[#f7fbff] p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">{section.title}</h3>
                <div className="mt-4 grid gap-2">
                  {section.links.map((link) => (
                    <a key={link} href="#post" className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:translate-x-1 hover:text-[#135DFF]">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fresh" className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">On the Board Now</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight">Private chef and catering requests moving now</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {freshPosts.map((post) => (
            <a key={post.title} href="#post" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl">
              <div className={`h-32 bg-gradient-to-br ${post.style} p-4 text-white`}>
                <div className="flex h-full items-end justify-between text-xs font-black uppercase tracking-wide">
                  <span>{post.tag}</span>
                  <span>{post.city}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-black">{post.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{post.detail}</p>
                <p className="mt-4 text-sm font-black text-[#135DFF]">Respond / request →</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section id="post" className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Post a food service request</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">What do you need?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Start with Private Chef or Catering. Add support details if you also need crew, space, or gear.</p>

          <form method="post" action="/api/leads" className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="Name" />
              <input name="email" type="email" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="Email" />
              <input name="phone" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="Phone" />
              <input name="city" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="City + state" />
            </div>
            <select name="serviceType" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]">
              <option value="private-chef">Private Chef</option>
              <option value="catering">Catering</option>
              <option value="meal-prep">Meal Prep</option>
              <option value="food-truck">Food Truck / Pop-up Vendor</option>
              <option value="staff">Need Crew / Event Staff</option>
              <option value="kitchen">Need Kitchen Space</option>
              <option value="gear">Need Gear / Product Help</option>
              <option value="other">Something else</option>
            </select>
            <textarea name="details" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]" placeholder="Date, guest count, budget, menu style, staffing needs, kitchen needs, equipment needs, or anything important..." />
            <input type="hidden" name="source" value="homepage-primary" />
            <button className="rounded-2xl bg-[#135DFF] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#104de0]">Submit Request</button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} TakeaChefHome.com</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/private-chef">Private Chef</Link>
            <Link href="/catering">Catering</Link>
            <Link href="/jobs">Crew</Link>
            <Link href="/kitchens">Space</Link>
            <Link href="/shop">Gear</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
