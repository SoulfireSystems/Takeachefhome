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
              A chef for the way you eat, host and travel.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              Breakfast, brunch, dinner parties, vacation meals, retreats and celebrations. Tell a chef what you have in mind and discuss the menu, timing and service directly.
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
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">YOUR TABLE. YOUR PLANS.</p>
              <div>
                <h2 className="text-3xl font-black leading-tight">Good food, from the first meal to the last.</h2>
                <p className="mt-4 text-sm leading-6 text-white/85">Menu direction, timing, guest count, dietary notes, budget, and service style all belong in one clean request.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">YOUR OCCASION</p>
          <h3 className="mt-2 text-xl font-black">Enjoy the occasion.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Great for homes, rentals, small celebrations, couples, family trips, retreats, and curated dinner moments.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">YOUR MENU</p>
          <h3 className="mt-2 text-xl font-black">Make it personal.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Share your food preferences, dietary needs and budget. Ask the chef what is included before you confirm.</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#0b4fb3]">YOUR SCHEDULE</p>
          <h3 className="mt-2 text-xl font-black">Menu. Timing. Flow.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">Plan one meal, a full day or several days. Confirm arrival time, service and cleanup with your chef.</p>
        </div>
      </section>

      <section id="form" className="mx-auto max-w-4xl px-4 pb-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">YOUR PRIVATE CHEF REQUEST</p>
          <h2 className="mt-2 text-3xl font-black">Tell us what you have in mind</h2>
          <div className="mt-6 space-y-4">
            <p className="text-sm leading-6 text-slate-700">Add your plans and save your private link. Return there to read chef replies, compare quotes and ask questions.</p>
            <a href="https://prep-your-shift.ggg398.chatgpt.site/start?service=Private%20Chef" className="inline-flex min-h-12 items-center rounded-2xl bg-[#135DFF] px-6 py-4 text-sm font-black text-white">Start my request →</a>
          </div>
        </div>
      </section>
    </main>
  );
}

