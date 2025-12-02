// app/jobs/page.tsx

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-4 pt-16 pb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">
          Lane: Hire a Chef / Staff
        </p>
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-4">
          Hire chefs, cooks, and event staff{" "}
          <span className="text-emerald-300">without scrolling all day.</span>
        </h1>
        <p className="text-slate-300 max-w-2xl text-sm md:text-base">
          One request gets routed to our staffing lane. Perfect for restaurants,
          hotels, caterers, venues, and private clients who need kitchen or
          event help — from one night to full-time.
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.3fr,1fr]">
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold mb-2">
                Hire for roles like:
              </h2>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Private chefs & sous chefs</li>
                <li>• Line cooks & prep cooks</li>
                <li>• Dishwashers & porters</li>
                <li>• Servers, bartenders, and event captains</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">
                For chefs & workers (coming soon):
              </h3>
              <p className="text-sm text-slate-300">
                A full job board and staffing portal for HoneyPott Labs and
                TakeaChefHome is coming. For now, workers can use this form to
                introduce themselves and we&apos;ll keep your info on file.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm">
            <h2 className="text-base font-semibold mb-2">
              Share what you need (or what you can do)
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              This goes straight into the staffing queue.
            </p>

            <form method="post" action="/api/leads" className="space-y-3">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-xs text-slate-300">
                  Name / Business
                </label>
                <input
                  id="name"
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
                  placeholder="you@example.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="roleType" className="text-xs text-slate-300">
                  Are you hiring or looking for work?
                </label>
                <select
                  id="roleType"
                  name="roleType"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                >
                  <option value="hiring">I&apos;m hiring</option>
                  <option value="worker">
                    I&apos;m a chef/worker looking for gigs
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="details" className="text-xs text-slate-300">
                  Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  required
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Location, role, pay range, schedule, and anything important."
                />
              </div>

              <input type="hidden" name="serviceType" value="staff" />
              <input type="hidden" name="source" value="jobs-page" />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit staffing request
              </button>
            </form>
          </aside>
        </div>
      </section>
    </main>
  );
}
