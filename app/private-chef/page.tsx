// app/private-chef/page.tsx

export default function PrivateChefPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">
          Lane: Private Chef
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
          Book a private chef for{" "}
          <span className="text-emerald-300">real dinners, not stress.</span>
        </h1>
        <p className="text-slate-300 max-w-2xl text-sm md:text-base">
          In-home dining, retreats, birthdays, anniversaries, chef&apos;s table
          tastings, and Airbnb experiences. You tell Chef GoGee the vibe, the
          city, and the budget — we handle the menus and the chef match.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.3fr,1fr]">
          {/* Left: Details & bullets */}
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Perfect when you want:
              </h2>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• A chef to come to your home, rental, or Airbnb</li>
                <li>• A set menu or tasting menu built around your vibe</li>
                <li>• Light cleanup handled so you can actually enjoy the night</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                Example experiences:
              </h3>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Gullah Coastal Night (seafood-forward, soulful coastal menu)</li>
                <li>• Afro-Latin Love Feast (shared plates, bold flavors)</li>
                <li>• Luxe Steakhouse At Home (multi-course steakhouse moment)</li>
              </ul>
            </div>

            <p className="text-xs text-slate-400">
              After you submit, you&apos;ll get a follow-up with menu ideas,
              pricing tiers, and chef options that match your event.
            </p>
          </div>

          {/* Right: Lane-specific lead form */}
          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
            <h2 className="text-base font-semibold mb-2">
              Tell Chef GoGee about your dinner
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              This form goes straight into our Private Chef pipeline.
            </p>

            <form method="post" action="/api/leads" className="space-y-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs text-slate-300">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Your name"
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
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="city" className="text-xs text-slate-300">
                  City + state
                </label>
                <input
                  id="city"
                  name="city"
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Atlanta, GA"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="date" className="text-xs text-slate-300">
                    Target date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="guests" className="text-xs text-slate-300">
                    Guest count
                  </label>
                  <input
                    id="guests"
                    name="guests"
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                    placeholder="ex: 8–12"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="details" className="text-xs text-slate-300">
                  Vibe & details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Occasion, vibe (romantic, birthday, chef's table), any dietary notes, rough budget…"
                />
              </div>

              {/* Hidden tags to mark this lane */}
              <input type="hidden" name="serviceType" value="private-chef" />
              <input type="hidden" name="source" value="private-chef-page" />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit Private Chef request
              </button>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
