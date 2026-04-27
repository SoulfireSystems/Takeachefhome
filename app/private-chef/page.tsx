import Link from "next/link";

export default function PrivateChefPage() {
  return (
    <main className="min-h-screen bg-[#f4f9ff] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-black text-[#0b4fb3]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>
          <Link href="/#post" className="rounded-full bg-[#0b4fb3] px-4 py-2 text-sm font-black text-white">
            Post to the Board
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#cfe8ff,_transparent_30%),linear-gradient(180deg,_#ffffff,_#f4f9ff)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">
              Private Chef
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Chef-led dinners without the group chat chaos.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              In-home dinners, vacation rental meals, retreats, tastings, birthdays, anniversaries, and chef-table moments. Post the request once and let the details get organized cleanly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#form" className="rounded-full bg-[#0b4fb3] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20">
                Start Private Chef Request
              </a>
              <Link href="/catering" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700">
                Need Catering?
              </Link>
            </div>
          </div>

          <aside className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#061b3a] via-[#0b4fb3] to-[#33b8ff] p-6 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">Dinner with intention</p>
              <div>
                <h2 className="text-3xl font-black leading-tight">The table should feel handled before the first plate lands.</h2>
                <p className="mt-4 text-sm leading-6 text-white/85">Menu direction, timing, guest count, dietary notes, budget, and service style all belong in one clean request.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">For hosts</p>
          <h3 className="mt-2 text-xl font-black">Dinner without doing everything.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Great for homes, rentals, small celebrations, couples, family trips, retreats, and curated dinner moments.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">For chefs</p>
          <h3 className="mt-2 text-xl font-black">Requests with context.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">The board is built to make serious requests easier to price, qualify, and respond to.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">For the night</p>
          <h3 className="mt-2 text-xl font-black">Menu. Timing. Flow.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">The best dinner starts with clear expectations before anyone walks through the door.</p>
        </div>
      </section>

      <section id="form" className="mx-auto max-w-4xl px-4 pb-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">Private Chef Intake</p>
          <h2 className="mt-2 text-3xl font-black">Tell us about the dinner</h2>
          <form method="post" action="/api/leads" className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Name" />
              <input name="email" type="email" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Email" />
              <input name="phone" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Phone" />
              <input name="city" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="City + state" />
              <input name="eventDate" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Target date" />
              <input name="guests" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Guest count" />
            </div>
            <textarea name="details" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Occasion, menu vibe, budget, dietary needs, kitchen setup, timing, and anything important." />
            <input type="hidden" name="serviceType" value="private-chef" />
            <input type="hidden" name="source" value="private-chef-page" />
            <button className="rounded-2xl bg-[#0b4fb3] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#083f8e]">
              Submit Private Chef Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
