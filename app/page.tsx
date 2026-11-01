// app/page.tsx
// TakeaChefHome.com — Private Chef + Catering first marketplace board

import Link from "next/link";

const primaryServices = [
  {
    href: "https://prep-your-shift.ggg398.chatgpt.site/private-chefs",
    title: "Private Chef",
    detail: "In-home dinners, Airbnb meals, retreats, birthdays, date nights, chef-table experiences.",
    cta: "Book a Private Chef",
    style: "from-[#061b3a] via-[#135DFF] to-[#33b8ff]",
  },
  {
    href: "https://prep-your-shift.ggg398.chatgpt.site/catering",
    title: "Catering",
    detail: "Events, business meals, parties, weddings, brunches, drop-offs, buffets, and full-service food.",
    cta: "Request Catering",
    style: "from-[#111827] via-[#135DFF] to-[#D4A64F]",
  },
];

const supportCategories = [
  { href: "https://prep-your-shift.ggg398.chatgpt.site/find-crew", title: "Find Crew", detail: "Post paid work and review applicants for your own crew.", status: "Jobs & shifts" },
  { href: "/kitchens", title: "Find Space", detail: "Prep kitchens, commissary, cold storage, pop-up space", status: "Preview" },
  { href: "/shop", title: "Shop", detail: "The shop is coming soon. Product checkout is not open.", status: "Coming soon" },
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

const cityLinks = ["Atlanta", "Phoenix", "Las Vegas", "Los Angeles", "Kansas City", "Seattle", "Charlotte", "Savannah", "Orlando", "Miami", "Dallas", "Chicago"];

const marketplaceSections = [
  {
    "title": "Customer Intake",
    "label": "PLAN YOUR SERVICE",
    "href": "https://prep-your-shift.ggg398.chatgpt.site/start",
    "detail": "Describe the service, city, dates and headcount. Save your private request link to follow the next step.",
    "cta": "Start my request",
    "note": "No card needed to send a request."
  },
  {
    "title": "Talent Pool",
    "label": "FOR CULINARY PROFESSIONALS",
    "href": "/talent",
    "detail": "Choose your roles, service area, experience and availability in the existing seven-step talent application.",
    "cta": "Join the talent pool",
    "note": "A profile is not a job guarantee."
  },
  {
    "title": "Jobs & Shifts",
    "label": "FIND WORK / FIND CREW",
    "href": "https://prep-your-shift.ggg398.chatgpt.site/jobs",
    "detail": "Browse real posted opportunities or post paid work and review applicants for your own crew.",
    "cta": "Open jobs & shifts",
    "note": "New market: the board may have no open shifts."
  },
  {
    "title": "Prep Your Shift",
    "label": "OUTSOURCE PREPARATION",
    "href": "https://prep-your-shift.ggg398.chatgpt.site/prep-your-shift",
    "detail": "Hand off cutting, portioning, batch work and packing with your quantities, specifications and deadline.",
    "cta": "Explore prep services",
    "note": "Partner availability and scope must be agreed."
  },
  {
    "title": "Provider Listings",
    "label": "FOR INDEPENDENT BUSINESSES",
    "href": "https://prep-your-shift.ggg398.chatgpt.site/list-services",
    "detail": "Create a service listing with your specialties, service area, pricing, photos and availability.",
    "cta": "List my services",
    "note": "Sign in to save and manage your listing."
  },
  {
    "title": "Classes & Workshops",
    "label": "LEARN / TEACH",
    "href": "https://prep-your-shift.ggg398.chatgpt.site/classes",
    "detail": "Explore culinary skills and send a class inquiry, or list the subjects and formats you teach.",
    "cta": "Explore classes",
    "note": "Class inquiries are open; seat checkout is not active."
  }
];

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
            <a href="#marketplace" className="rounded-full px-3 py-2 hover:bg-[#eaf3ff] hover:text-[#135DFF]">Marketplace</a>
            <a href="https://prep-your-shift.ggg398.chatgpt.site/start" className="rounded-full bg-[#135DFF] px-4 py-2 text-white hover:bg-[#104de0]">Start Request</a>
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

            <div className="flex flex-wrap gap-3" aria-label="Explore TakeaChefHome">
              <a href="#marketplace" className="rounded-2xl bg-[#135DFF] px-6 py-3 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#104de0]">Explore the Marketplace →</a>
              <a href="https://prep-your-shift.ggg398.chatgpt.site/states" className="rounded-2xl border border-[#135DFF]/30 bg-white px-6 py-3 text-sm font-black text-[#135DFF]">Browse by location</a>
            </div>

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

      <section id="marketplace" aria-labelledby="marketplace-title" className="mx-auto max-w-7xl scroll-mt-36 px-4 py-10">
        <div className="mb-6 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">TakeaChefHome / The Culinary Exchange</p>
          <h2 id="marketplace-title" className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Your marketplace. Choose your next step.</h2>
          <p className="mt-3 text-base leading-7 text-slate-700">Find food service, join the talent pool, post paid work or hand off your prep. Independent people and businesses agree their own scope and service terms.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {marketplaceSections.map((item) => (
            <article key={item.title} className="flex flex-col rounded-3xl border border-blue-200 bg-white p-6 shadow-sm transition hover:border-[#135DFF]/60 hover:shadow-lg">
              <p className="text-[11px] font-black uppercase tracking-widest text-[#135DFF]">{item.label}</p>
              <h3 className="mt-3 text-2xl font-black">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-700">{item.detail}</p>
              <p className="mb-4 mt-3 text-xs leading-5 text-slate-600">{item.note}</p>
              <a href={item.href} className="inline-flex min-h-12 items-center justify-between gap-3 rounded-2xl bg-[#135DFF] px-4 py-3 text-sm font-black text-white hover:bg-[#104de0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#135DFF]">{item.cta}<span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#135DFF]">
          <a href="https://prep-your-shift.ggg398.chatgpt.site/directory" className="underline underline-offset-4">Browse the full service directory</a>
          <a href="https://prep-your-shift.ggg398.chatgpt.site/my-request" className="underline underline-offset-4">Return to my private request</a>
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

      <section id="post" className="mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">Post a food service request</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">What do you need?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">Start with Private Chef or Catering. Add support details if you also need crew, space, or gear.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://prep-your-shift.ggg398.chatgpt.site/start" className="rounded-2xl bg-[#135DFF] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#104de0]">Start my request →</a>
            <a href="https://prep-your-shift.ggg398.chatgpt.site/my-request" className="rounded-2xl border border-slate-300 bg-white px-6 py-4 text-sm font-bold text-slate-700">Return to my request</a>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">The request builder saves your details and gives you a private link. Sending a request does not reserve a provider or collect payment.</p>
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
