// app/page.tsx
// TakeaChefHome.com — no-image lux street tech culinary board

import Link from "next/link";

const mainCategories = [
  { href: "/private-chef", title: "Private Chef", detail: "Chef-led dinners, rentals, retreats, date nights", status: "Open", style: "from-[#061b3a] via-[#0b4fb3] to-[#33b8ff]" },
  { href: "/catering", title: "Catering", detail: "Events, business meals, parties, celebrations", status: "Open", style: "from-[#121826] via-[#243b6b] to-[#9b6b2f]" },
  { href: "/jobs", title: "Find Crew", detail: "Chefs, cooks, servers, bartenders, event team", status: "Intake", style: "from-[#151515] via-[#263238] to-[#0b4fb3]" },
  { href: "/kitchens", title: "Find Space", detail: "Prep kitchens, commissary, cold storage, pop-up space", status: "Early", style: "from-[#0d1b2a] via-[#1f6f8b] to-[#0b4fb3]" },
  { href: "/shop", title: "Get Gear", detail: "Tools, catering gear, kitchen setup, FLAVR picks", status: "Soon", style: "from-[#111827] via-[#3f2f1f] to-[#d39b2a]" },
];

const boardSections = [
  {
    title: "Find Food",
    links: ["Private chef dinner", "Catering request", "Meal prep chef", "Vacation rental chef", "Corporate lunch", "Drop-off catering", "Pop-up food vendor", "Food truck booking"],
  },
  {
    title: "Find Crew",
    links: ["Event servers", "Line cooks", "Bartenders", "Prep cooks", "Dish / porter", "Banquet team", "Chef for hire", "Event captain"],
  },
  {
    title: "Find Space",
    links: ["Prep kitchen", "Commissary kitchen", "Ghost kitchen", "Shared cooler space", "Pop-up venue", "Production kitchen", "Storage support", "Local sourcing"],
  },
  {
    title: "Get Gear",
    links: ["Chef knives", "Chafing dishes", "Cooler bags", "Smallwares", "FLAVR picks", "Catering setup", "Cookbooks", "Starter kits"],
  },
];

const freshPosts = [
  { tag: "Private Chef", title: "Dinner for 8 at an Airbnb", city: "Phoenix", detail: "Need chef, menu ideas, and light reset after service.", style: "from-[#061b3a] to-[#0b4fb3]" },
  { tag: "Catering", title: "Brunch table for 24", city: "Atlanta", detail: "Pretty food, clean setup, bright daytime service.", style: "from-[#243b6b] to-[#d39b2a]" },
  { tag: "Crew", title: "Servers for weekend event", city: "Las Vegas", detail: "Event team, polished look, evening shift.", style: "from-[#151515] to-[#0b4fb3]" },
  { tag: "Pop-up", title: "BBQ station support", city: "Kansas City", detail: "Slicing, plating, and service flow for a high-volume day.", style: "from-[#3f2f1f] to-[#d39b2a]" },
];

const cityLinks = ["Atlanta", "Phoenix", "Las Vegas", "Los Angeles", "Kansas City", "Seattle", "Charlotte", "Savannah", "Orlando", "Miami", "Dallas", "Chicago"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f4f9ff] text-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" className="text-2xl font-black tracking-tight text-[#0b4fb3]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>
          <nav className="flex flex-wrap items-center gap-2 text-sm font-bold text-slate-700">
            <a href="#board" className="rounded-full px-3 py-2 hover:bg-[#eaf3ff] hover:text-[#0b4fb3]">Explore the Board</a>
            <a href="#fresh" className="rounded-full px-3 py-2 hover:bg-[#eaf3ff] hover:text-[#0b4fb3]">On the Board Now</a>
            <a href="#post" className="rounded-full bg-[#0b4fb3] px-4 py-2 text-white hover:bg-[#083f8e]">Post to the Board</a>
          </nav>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#cfe8ff,_transparent_30%),linear-gradient(180deg,_#ffffff,_#f4f9ff)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[1.05fr,0.95fr] lg:py-14">
          <div className="space-y-6">
            <div className="inline-flex rounded-full border border-[#0b4fb3]/20 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#0b4fb3] shadow-sm">
              The food world finally has a board.
            </div>
            <div className="space-y-4">
              <h1 className="max-w-5xl text-4xl font-black leading-[0.96] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Post it. Find it. Feed people.
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-700 sm:text-lg">
                Private chefs. Catering. Kitchens. Crew. All in one place — built for how the food world actually moves.
              </p>
            </div>

            <form method="get" action="#board" className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-xl shadow-blue-900/5 md:grid-cols-[1fr,1fr,auto]">
              <input name="need" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Search: chef, catering, kitchen, server, food truck..." />
              <input name="where" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="City or state" />
              <button className="rounded-2xl bg-[#0b4fb3] px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#083f8e]">
                Search Board
              </button>
            </form>

            <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
              {cityLinks.map((city) => (
                <a key={city} href="#post" className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm hover:border-[#0b4fb3]/40 hover:text-[#0b4fb3]">
                  {city}
                </a>
              ))}
            </div>
          </div>

          <aside className="relative min-h-[430px] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-950 via-[#0b4fb3] to-[#d39b2a] p-6 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-black/30 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex justify-between gap-4 text-xs font-black uppercase tracking-[0.2em] text-white/80">
                <span>Featured request style</span>
                <span>Luxury / Street / Tech</span>
              </div>
              <div>
                <p className="mb-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black backdrop-blur">Built for real food work</p>
                <h2 className="text-4xl font-black leading-tight">Catering that looks like the invite mattered.</h2>
                <p className="mt-4 max-w-md text-sm leading-6 text-white/85">Polished food, real service, clean details, and a board that lets clients ask for it without chasing ten different people.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {mainCategories.map((item) => (
            <Link key={item.href} href={item.href} className={`group relative flex h-[210px] overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br ${item.style} p-5 text-white shadow-lg transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.28),_transparent_35%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-white/5" />
              <div className="relative z-10 mt-auto">
                <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-wide backdrop-blur">{item.status}</span>
                <h3 className="mt-4 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-5 text-white/85">{item.detail}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section id="board" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">The Board</p>
              <h2 className="mt-1 text-3xl font-black tracking-tight">Find what you need. Post what you have.</h2>
            </div>
            <a href="#post" className="text-sm font-black text-[#0b4fb3] hover:underline">Post your own request →</a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {boardSections.map((section) => (
              <div key={section.title} className="rounded-[1.75rem] border border-slate-200 bg-[#f7fbff] p-5 shadow-sm">
                <h3 className="text-lg font-black text-slate-950">{section.title}</h3>
                <div className="mt-4 grid gap-2">
                  {section.links.map((link) => (
                    <a key={link} href="#post" className="rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:translate-x-1 hover:text-[#0b4fb3]">
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
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">On the Board Now</p>
          <h2 className="mt-1 text-3xl font-black tracking-tight">The kind of work this board was built to move</h2>
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
                <p className="mt-4 text-sm font-black text-[#0b4fb3]">Respond / request →</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
          <div className="rounded-3xl bg-[#f7fbff] p-6">
            <p className="text-sm font-black text-[#0b4fb3]">For clients</p>
            <h3 className="mt-2 text-xl font-black">Stop hunting through DMs.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Post one clean request and let the right food professional understand the job.</p>
          </div>
          <div className="rounded-3xl bg-[#f7fbff] p-6">
            <p className="text-sm font-black text-[#0b4fb3]">For food pros</p>
            <h3 className="mt-2 text-xl font-black">Find work and visibility.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Chefs, caterers, cooks, servers, food trucks, bakers, and kitchen owners all get a place to plug in.</p>
          </div>
          <div className="rounded-3xl bg-[#f7fbff] p-6">
            <p className="text-sm font-black text-[#0b4fb3]">For the platform</p>
            <h3 className="mt-2 text-xl font-black">Built to grow city by city.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">Start with leads, then add listings, chef profiles, kitchen rentals, deposits, ratings, and paid placement.</p>
          </div>
        </div>
      </section>

      <section id="post" className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">Post to the Board</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">What do you need?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Tell us enough to route the request: city, date, category, headcount, budget, and the kind of help you need.</p>

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
              <option value="meal-prep">Meal Prep</option>
              <option value="food-truck">Food Truck / Pop-up Vendor</option>
              <option value="staff">Kitchen Talent / Event Staff</option>
              <option value="kitchen">Kitchen Rental</option>
              <option value="cold-storage">Cold Storage / Prep Support</option>
              <option value="gear">Chef Gear / Product Help</option>
              <option value="other">Something else</option>
            </select>
            <textarea name="details" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Date, guest count, budget, menu style, staffing needs, kitchen needs, equipment needs, or anything important..." />
            <input type="hidden" name="source" value="homepage-board" />
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
            <Link href="/jobs">Crew</Link>
            <Link href="/shop">Gear</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
