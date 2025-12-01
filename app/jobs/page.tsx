// app/jobs/page.tsx
// Locked Hire Staff lane – sales page + dedicated lead form

import Link from "next/link";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs uppercase tracking-wide text-emerald-300">
            Lane · Hire Chefs &amp; Staff
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl">
            Need chefs, bartenders, or event staff?
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            This lane is for venues, planners, restaurants, caterers, and
            operators who need people. Chefs, cooks, dish, bartenders, servers,
            and event support—by the shift or for a full run of events.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#staff-form"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
            >
              Request Staff
              <span className="text-xs">⚡ Chef GoGee intake</span>
            </a>
            <p className="text-xs text-slate-400">
              Tell us what you need once. We&apos;ll match you with available
              talent in the network.
            </p>
          </div>
        </div>
      </section>

      {/* Use cases + sample roles */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Built for real service, not warm bodies
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              When you&apos;re feeding people or running a room, the crew
              matters. This lane is where we help you plug in chefs, cooks, and
              front-of-house staff who understand pace, professionalism, and
              guest experience.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• One-off events and pop-ups</li>
              <li>• Weekend runs and seasonal work</li>
              <li>• Backfill for staff outages and busy weeks</li>
              <li>• Long-term or temp-to-hire support (case by case)</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-slate-100">
              Roles we can help with
            </h3>
            <div className="mt-3 grid gap-3 text-xs text-slate-300 sm:grid-cols-2">
              <div>
                <p className="font-semibold text-emerald-300">
                  Back-of-House
                </p>
                <p>
                  Executive chefs, sous chefs, line cooks, prep cooks, dish,
                  porters, pitmasters, banquet cooks.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Front-of-House
                </p>
                <p>
                  Servers, banquet staff, bartenders, barbacks, captains, hosts,
                  event leads, runners.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Event Support
                </p>
                <p>
                  Setup / breakdown crew, buffet attendants, bussers, expo,
                  on-site coordinators.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Specialty Talent
                </p>
                <p>
                  Private chefs, grill masters, carving station leads, action
                  station cooks, retreat chefs.
                </p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-400">
              Availability and roles vary by city. The more detail you share,
              the better the match.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <h2 className="text-lg font-semibold text-slate-50">
            How the Hire Staff lane works
          </h2>
          <div className="mt-6 grid gap-6 text-sm text-slate-300 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 1
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Tell us about the event or shifts
              </p>
              <p className="mt-2 text-xs">
                Date(s), city, venue type, shift times, positions, pay range,
                and dress code. Chef GoGee tags your request in the lead pipe.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 2
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                We match you with available talent
              </p>
              <p className="mt-2 text-xs">
                We pull from the HoneyPott network and partner crews in your
                area, then confirm who&apos;s a fit based on the work.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 3
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Confirm and get to work
              </p>
              <p className="mt-2 text-xs">
                Once confirmed, we lock in arrival time, check-in details, and
                expectations so everyone shows up aligned.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            This lane can support caterers, hotels, venues, restaurants, and
            event planners. Larger staffing projects may be handled under
            HoneyPott Labs staffing programs.
          </p>
        </div>
      </section>

      {/* Dedicated Staff Request Form */}
      <section
        id="staff-form"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <h2 className="text-lg font-semibold text-slate-50">
            Request chefs, bartenders, or event staff
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            This form routes directly into our{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px]">
              /api/leads
            </code>{" "}
            pipeline and Supabase. Share as much detail as possible so we can
            quickly tell you what&apos;s realistic.
          </p>

          <form
            method="post"
            action="/api/leads"
            className="mt-6 grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-sm"
          >
            <div className="grid gap-4 sm:grid-cols-2">
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label htmlFor="phone" className="text-xs text-slate-300">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Best number to reach you"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="organization"
                  className="text-xs text-slate-300"
                >
                  Company / Organization (optional)
                </label>
                <input
                  id="organization"
                  name="organization"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Venue, restaurant, caterer, planner, etc."
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="eventDate"
                  className="text-xs text-slate-300"
                >
                  Date(s)
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: June 14 or June 14–16"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="city"
                  className="text-xs text-slate-300"
                >
                  City / Venue location
                </label>
                <input
                  id="city"
                  name="city"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="City + state (and venue if known)"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="shiftTimes"
                  className="text-xs text-slate-300"
                >
                  Shift times
                </label>
                <input
                  id="shiftTimes"
                  name="shiftTimes"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: 3pm–11pm, 6-hour minimum, etc."
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="positions"
                  className="text-xs text-slate-300"
                >
                  Positions needed
                </label>
                <textarea
                  id="positions"
                  name="positions"
                  rows={3}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: 2 line cooks, 1 sous, 4 servers, 2 bartenders, 1 captain…"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="payRange"
                  className="text-xs text-slate-300"
                >
                  Pay range / structure
                </label>
                <textarea
                  id="payRange"
                  name="payRange"
                  rows={3}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Hourly rate, flat rate, tip structure, overtime, etc."
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="details" className="text-xs text-slate-300">
                Anything else we should know?
              </label>
              <textarea
                id="details"
                name="details"
                required
                rows={4}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                placeholder="Event type, dress code (black tie, branded, casual), service style, special requirements, parking/access notes, etc."
              />
            </div>

            {/* Hidden: lock lane + track source */}
            <input type="hidden" name="serviceType" value="staff" />
            <input type="hidden" name="source" value="staff-lane" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit Staff Request
                <span className="text-xs">⚡ Send to Chef GoGee</span>
              </button>
              <p className="text-[11px] text-slate-400">
                We&apos;ll follow up after reviewing your needs, city, and
                timeline so we can confirm what&apos;s possible.
              </p>
            </div>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            For ongoing staffing programs or multi-month support, mention it in
            the details and we&apos;ll route you into a separate conversation.
          </p>
        </div>
      </section>

      {/* Back link */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-200">
            ← Back to marketplace
          </Link>
          <span>Lane · Hire Chefs &amp; Staff · TakeaChefHome.com</span>
        </div>
      </footer>
    </main>
  );
}
