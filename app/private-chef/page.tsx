// app/private-chef/page.tsx
// Locked Private Chef lane – sales page + dedicated lead form

import Link from "next/link";

export default function PrivateChefPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
          <p className="text-xs uppercase tracking-wide text-emerald-300">
            Lane · Private Chef
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl md:text-5xl">
            Bring a private chef home.
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Intimate dinners, birthdays, date nights, retreats, and villa
            takeovers. A chef comes to you, cooks on-site, cleans down, and
            leaves you with nothing but compliments and leftovers.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="#private-chef-form"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
            >
              Tell Chef GoGee About Your Dinner
              <span className="text-xs">⚡ Start a request</span>
            </a>
            <p className="text-xs text-slate-400">
              Answer a few questions and we&apos;ll match you with menus,
              chefs, and a quote path.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits + Vibes */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Perfect for nights that actually matter
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              When you don&apos;t want restaurant noise, long waits, or
              strangers walking past your table — a private chef flips the
              script. You pick the vibe; we handle the food and flow.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Date nights, proposals, and anniversaries</li>
              <li>• Birthday dinners and milestone celebrations</li>
              <li>• Girls&apos; trips, guys&apos; trips, and Airbnb kitchen takeovers</li>
              <li>• Retreat dinners and tasting menus for small groups</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
            <h3 className="text-sm font-semibold text-slate-100">
              Sample Experiences
            </h3>
            <div className="mt-3 space-y-3 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-emerald-300">
                  Gullah Coastal Night
                </p>
                <p>
                  Lowcountry shrimp &amp; grits, crab cucumber bites, charred
                  okra salad, peach cobbler.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Afro-Latin Fire Feast
                </p>
                <p>
                  Mojo-roasted chicken, smoky black beans, plantains, citrus
                  salad, and rum-glazed pineapple.
                </p>
              </div>
              <div>
                <p className="font-semibold text-emerald-300">
                  Steakhouse at Home
                </p>
                <p>
                  Seared steak, loaded sides, compound butters, and chef-crafted
                  sauces — all in your kitchen.
                </p>
              </div>
            </div>
            <p className="mt-4 text-[11px] text-slate-400">
              Menus are customized to your city, budget, and dietary needs.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-slate-800 bg-slate-950/70">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <h2 className="text-lg font-semibold text-slate-50">
            How the Private Chef lane works
          </h2>
          <div className="mt-6 grid gap-6 text-sm text-slate-300 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 1
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Tell us about your night
              </p>
              <p className="mt-2 text-xs">
                Date, city, guest count, budget, and the vibe you&apos;re going
                for. Chef GoGee tags your request and routes it into the lead
                pipe.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 2
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Get matched with menus &amp; chefs
              </p>
              <p className="mt-2 text-xs">
                We match you with available chefs and sample menus that fit your
                budget and style — no endless scrolling or cold DMs.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
                Step 3
              </p>
              <p className="mt-2 font-semibold text-slate-50">
                Lock in the booking
              </p>
              <p className="mt-2 text-xs">
                Once you approve the direction, your chef confirms the date,
                secures deposit, and shows up ready to cook.
              </p>
            </div>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            TakeaChefHome.com is the marketplace; HoneyPott Events and partner
            chefs operate the experiences.
          </p>
        </div>
      </section>

      {/* Dedicated Private Chef Form */}
      <section
        id="private-chef-form"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-12">
          <h2 className="text-lg font-semibold text-slate-50">
            Start your Private Chef request
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            This form goes straight into our live lead pipe via{" "}
            <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px]">
              /api/leads
            </code>{" "}
            and Supabase. You&apos;ll get a follow-up from our team (or your
            matched chef) after review.
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
                  htmlFor="city"
                  className="text-xs text-slate-300"
                >
                  City / Area
                </label>
                <input
                  id="city"
                  name="city"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: Atlanta, GA · Las Vegas, NV"
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
                  placeholder="Ex: 8"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="budgetRange"
                  className="text-xs text-slate-300"
                >
                  Budget range (total)
                </label>
                <input
                  id="budgetRange"
                  name="budgetRange"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                  placeholder="Ex: $600–$1,200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="details" className="text-xs text-slate-300">
                What kind of night are you planning?
              </label>
              <textarea
                id="details"
                name="details"
                required
                rows={4}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                placeholder="Tell us the occasion, vibe (ex: soulful coastal, steakhouse, brunch), dietary needs, and anything non-negotiable for you…"
              />
            </div>

            {/* Hidden: lock lane + track source */}
            <input
              type="hidden"
              name="serviceType"
              value="private-chef"
            />
            <input
              type="hidden"
              name="source"
              value="private-chef-lane"
            />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit Private Chef Request
                <span className="text-xs">⚡ Send to Chef GoGee</span>
              </button>
              <p className="text-[11px] text-slate-400">
                You&apos;ll hear back after we review availability and menu fit
                for your city.
              </p>
            </div>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            Already filled out the homepage form? You don&apos;t have to do it
            twice — this lane is just for people who want to go deeper.
          </p>
        </div>
      </section>

      {/* Back link */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-200">
            ← Back to marketplace
          </Link>
          <span>Lane · Private Chef · TakeaChefHome.com</span>
        </div>
      </footer>
    </main>
  );
}
