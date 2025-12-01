// app/catering/page.tsx
// Locked Catering lane – sales page + dedicated lead form

import Link from "next/link";

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs uppercase tracking-wide text-emerald-300">
            Lane · Catering
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl">
            Catering that actually shows up right.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Corporate lunches, conferences, weddings, banquets, and community
            events. HoneyPott Events and our partner chefs handle menus,
            staffing, setup, and breakdown—so you can focus on the room, not
            the food problems.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#catering-form"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
            >
              Start a Catering Request
              <span className="text-xs">⚡ Chef GoGee intake</span>
            </a>
            <p className="text-xs text-slate-400">
              Tell us about your event once. We&apos;ll match you with menus,
              service levels, and a quote path.
            </p>
          </div>
        </div>
      </section>

      {/* Use cases + sample ideas */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Built for real-world events
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Whether you&apos;re feeding 25 staff or 250 guests, this lane is
              where we design a menu and service plan that fits your budget,
              venue, and timeline—without confusing packages or hidden add-ons.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Corporate lunches and all-hands meetings</li>
              <li>• Conferences, trainings, and team retreats</li>
              <li>• Weddings, receptions, and rehearsal dinners</li>
              <li>• Galas, banquets, and fundraisers</li>
              <li>• Church events, schools, and community gatherings</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-slate-100">
              Sample Catering Concepts
            </h3>
            <div className="mt-3 space-y-3 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-emerald-300">
                  Soulful Buffet Line
                </p>
                <p>
                  Herb-roasted chicken, seasonal fish, mac &amp; cheese, greens,
                  salad, and rolls—perfect for 50–150 guests.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Executive Lunch Drop-Off
                </p>
                <p>
                  Individually boxed hot lunches or composed salads with
                  vegetarian and gluten-free options for the team.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Wedding Reception Stations
                </p>
                <p>
                  Carving stations, pasta bar, sliders, and late-night bites so
                  the dance floor never empties.
                </p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-400">
              All menus can be customized around your dietary needs, theme, and
              venue rules.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <h2 className="text-lg font-semibold text-slate-50">
            How the Catering lane works
          </h2>
          <div className="mt-6 grid gap-6 text-sm text-slate-300 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 1
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Share the event details
              </p>
              <p className="mt-2 text-xs">
                Date, city, venue type, guest count, and whether you need
                drop-off, buffet, or full service. Chef GoGee tags your lead in
                the pipe.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 2
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Get menu + service options
              </p>
              <p className="mt-2 text-xs">
                We respond with sample menus, service levels, and a price
                range—so you can quickly see what fits your budget and vibe.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 3
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Lock in and execute
              </p>
              <p className="mt-2 text-xs">
                Once the plan is set, we confirm staff, timeline, and service
                details—then show up on time, hot, and organized.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Government, military, and enterprise contracts can be scoped under
            HoneyPott Events with formal proposals on request.
          </p>
        </div>
      </section>

      {/* Dedicated Catering Form */}
      <section
        id="catering-form"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <h2 className="text-lg font-semibold text-slate-50">
            Start your Catering request
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            This form routes directly into our{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px]">
              /api/leads
            </code>{" "}
            pipeline and Supabase. Share as much detail as you can so we can
            respond with real options, not guesswork.
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
                <label htmlFor="organization" className="text-xs text-slate-300">
                  Company / Organization (optional)
                </label>
                <input
                  id="organization"
                  name="organization"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Company, church, school, or leave blank"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="eventDate"
                  className="text-xs text-slate-300"
                >
                  Event date
                </label>
                <input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
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
                  htmlFor="guestCount"
                  className="text-xs text-slate-300"
                >
                  Guest count
                </label>
                <input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min={1}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: 75"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="serviceLevel"
                  className="text-xs text-slate-300"
                >
                  Service level
                </label>
                <select
                  id="serviceLevel"
                  name="serviceLevel"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                >
                  <option value="">Select one</option>
                  <option value="drop-off">
                    Drop-off only (we deliver, you serve)
                  </option>
                  <option value="buffet">
                    Buffet / family-style with staff
                  </option>
                  <option value="plated">
                    Plated dinner with full service
                  </option>
                  <option value="mixed">
                    Mix of stations / buffet / late-night bites
                  </option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="budgetRange"
                  className="text-xs text-slate-300"
                >
                  Budget range (total, if known)
                </label>
                <input
                  id="budgetRange"
                  name="budgetRange"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: $1,500–$3,000 or $20–$40 per person"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="details" className="text-xs text-slate-300">
                Tell us about the event
              </label>
              <textarea
                id="details"
                name="details"
                required
                rows={4}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                placeholder="What type of event is this (wedding, training day, church banquet, etc.)? Any themes, cuisines you like, dietary needs, or non-negotiables?"
              />
            </div>

            {/* Hidden: lock lane + track source */}
            <input type="hidden" name="serviceType" value="catering" />
            <input type="hidden" name="source" value="catering-lane" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit Catering Request
                <span className="text-xs">⚡ Send to Chef GoGee</span>
              </button>
              <p className="text-[11px] text-slate-400">
                You&apos;ll hear back after we review your details, check
                availability, and map the right menu tier.
              </p>
            </div>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            If you already submitted the homepage form, you can reference that
            here or just add extra detail—no need to duplicate everything.
          </p>
        </div>
      </section>

      {/* Back link */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-200">
            ← Back to marketplace
          </Link>
          <span>Lane · Catering · TakeaChefHome.com</span>
        </div>
      </footer>
    </main>
  );
}
