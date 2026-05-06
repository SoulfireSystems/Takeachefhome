import Link from "next/link";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-[#f4f9ff] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-black text-[#0b4fb3]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>
          <Link href="#staff-form" className="rounded-full bg-[#0b4fb3] px-4 py-2 text-sm font-black text-white">
            Post to the Board
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#cfe8ff,_transparent_30%),linear-gradient(180deg,_#ffffff,_#f4f9ff)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">
              Find Crew
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Staff the room right the first time.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              Chefs, cooks, bartenders, servers, banquet teams, and event support for catering runs, private events, restaurants, hotels, and production kitchens.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#staff-form" className="rounded-full bg-[#0b4fb3] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20">
                Request Crew
              </a>
              <Link href="/private-chef" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700">
                Need a Private Chef?
              </Link>
            </div>
          </div>

          <aside className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#151515] via-[#263238] to-[#0b4fb3] p-6 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">Built for real service</p>
              <div>
                <h2 className="text-3xl font-black leading-tight">Good events fall apart fast when the crew is wrong.</h2>
                <p className="mt-4 text-sm leading-6 text-white/85">The board is built to connect operators with people who understand pace, prep, timing, setup, cleanup, and guest flow.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">Back of house</p>
          <h3 className="mt-2 text-xl font-black">Prep to execution.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Executive chefs, sous chefs, line cooks, prep cooks, dish, banquet cooks, and grill support.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">Front of house</p>
          <h3 className="mt-2 text-xl font-black">People who can move a room.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Servers, bartenders, captains, runners, hosts, banquet staff, and event support teams.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">Flexible staffing</p>
          <h3 className="mt-2 text-xl font-black">One shift or full weekends.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Pop-ups, festivals, weddings, corporate events, restaurant support, and seasonal runs.</p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">On the Board Now</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#0b4fb3]">Atlanta</p>
              <h3 className="mt-3 text-lg font-black">Servers needed for wedding weekend</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Black attire, banquet experience, two-day event schedule.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#0b4fb3]">Dallas</p>
              <h3 className="mt-3 text-lg font-black">Line cooks for pop-up kitchen</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Fast-paced service, prep-heavy menu, weekend run.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#0b4fb3]">Miami</p>
              <h3 className="mt-3 text-lg font-black">Bartenders for rooftop event</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Luxury vibe, cocktail experience preferred, evening shift.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="staff-form" className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">Crew Request</p>
          <h2 className="mt-2 text-3xl font-black">Tell us what kind of team you need</h2>

          <form method="post" action="/api/leads" className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Name" />
              <input name="email" type="email" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Email" />
              <input name="phone" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Phone" />
              <input name="city" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="City + state" />
            </div>

            <textarea name="positions" rows={4} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="How many people do you need? Servers, bartenders, cooks, prep, captains, setup crew, etc." />

            <textarea name="details" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Event type, dates, shift times, dress code, pay structure, kitchen setup, and anything important." />

            <input type="hidden" name="serviceType" value="staff" />
            <input type="hidden" name="source" value="find-crew-page" />

            <button className="rounded-2xl bg-[#0b4fb3] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#083f8e]">
              Submit Crew Request
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            ← Back to the Board
          </Link>
          <span>Find Crew · TakeaChefHome.com</span>
        </div>
      </footer>
    </main>
  );
}
