// app/catering/page.tsx

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">
          Lane: Catering
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
          Catering for{" "}
          <span className="text-emerald-300">events that actually matter.</span>
        </h1>
        <p className="text-slate-300 max-w-2xl text-sm md:text-base">
          Weddings, corporate lunches, galas, banquets, family reunions, and
          anything in between. You give us the headcount, vibe, and budget —
          Chef GoGee routes it into the HoneyPott Events catering system.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.3fr,1fr]">
          {/* Left: Use cases */}
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                We&apos;re a fit when you need:
              </h2>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Plated dinners, buffets, or family-style service</li>
                <li>• Clear menu packages with per-person pricing</li>
                <li>• A partner who understands timelines, run-of-show, and VIP service</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                Common catering lanes:
              </h3>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Corporate lunches & all-hands meetings</li>
                <li>• Weddings, rehearsal dinners, & welcome parties</li>
                <li>• Award banquets, graduations, sports banquets</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400">
              After you submit, we&apos;ll respond with menu options,
              recommended service style, and a rough quote range.
            </p>
          </div>

          {/* Right: Lane-specific lead form */}
          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
            <h2 className="text-base font-semibold mb-2">
              Share your event with Chef GoGee
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              This form goes straight into the Catering pipeline.
            </p>

            <form method="post" action="/api/leads" className="space-y-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="org" className="text-xs text-slate-300">
                  Name / Organization
                </label>
                <input
                  id="org"
                  name="name"
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Your name or company"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs text-slate-300">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="you@company.com"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="city" className="text-xs text-slate-300">
                    City + venue (if known)
                  </label>
                  <input
                    id="city"
                    name="city"
                    required
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                    placeholder="Las Vegas, hotel ballroom…"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="guests" className="text-xs text-slate-300">
                    Est. guest count
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    required
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                    placeholder="ex: 50, 120, 250"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="date" className="text-xs text-slate-300">
                    Event date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="budget" className="text-xs text-slate-300">
                    Rough budget (optional)
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                    placeholder="ex: $35–$55 per person"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="details" className="text-xs text-slate-300">
                  Event details & vibe
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Type of event, service style (buffet/plated), dietary needs, timing, anything important…"
                />
              </div>

              <input type="hidden" name="serviceType" value="catering" />
              <input type="hidden" name="source" value="catering-page" />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit Catering request
              </button>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
