import Link from "next/link";

const eventTypes = [
  "Business meals",
  "Family celebrations",
  "Private parties",
  "Group dinners",
  "Drop-off meals",
  "Full-service events",
];

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-black text-[#0b4fb3]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>
          <Link href="/#post" className="rounded-full bg-[#0b4fb3] px-4 py-2 text-sm font-black text-white">
            Post Request
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">
              Catering
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Catering requests made simple.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              Tell us the city, date, guest count, menu direction, and service needs. TakeaChefHome helps organize the request so the right food professional can respond clearly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#form" className="rounded-full bg-[#0b4fb3] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20">
                Start Catering Request
              </a>
              <Link href="/private-chef" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700">
                Private Chef
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-[#f7fbff] p-6 shadow-xl shadow-blue-900/5">
            <p className="text-sm font-black text-[#0b4fb3]">Request types</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {eventTypes.map((item) => (
                <div key={item} className="rounded-2xl bg-white p-3 text-sm font-semibold text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-black text-[#0b4fb3]">1. Share the basics</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Date, location, headcount, budget, timing, and service style.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-black text-[#0b4fb3]">2. Describe the food</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">Comfort food, global flavors, brunch, dinner, passed bites, buffet, or custom menu.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-black text-[#0b4fb3]">3. Confirm the fit</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">The request gets reviewed and moved toward a clear quote or next conversation.</p>
          </div>
        </div>
      </section>

      <section id="form" className="mx-auto max-w-4xl px-4 pb-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">Catering Intake</p>
          <h2 className="mt-2 text-3xl font-black">Tell us what you need</h2>
          <form method="post" action="/api/leads" className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input name="name" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Name" />
              <input name="email" type="email" required className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Email" />
              <input name="phone" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Phone" />
              <input name="city" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="City and state" />
              <input name="eventDate" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Event date" />
              <input name="guests" className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Guest count" />
            </div>
            <textarea name="details" required rows={5} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#0b4fb3]" placeholder="Menu ideas, timing, service style, budget, and anything important." />
            <input type="hidden" name="serviceType" value="catering" />
            <input type="hidden" name="source" value="catering-page" />
            <button className="rounded-2xl bg-[#0b4fb3] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#083f8e]">
              Submit Catering Request
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
