// app/page.tsx
// TakeaChefHome.com – Phase 1 MVP Homepage

import React from "react";
import Link from "next/link";

type TileStatus = "live" | "soon";

type Tile = {
  href: string;
  title: string;
  description: string;
  status: TileStatus;
};

const tiles: Tile[] = [
  {
    href: "/private-chef",
    title: "Book a Private Chef",
    description: "In-home dining, retreats, and Airbnb dinner experiences.",
    status: "live",
  },
  {
    href: "/catering",
    title: "Catering",
    description: "Weddings, corporate events, parties, and celebrations.",
    status: "live",
  },
  {
    href: "/jobs",
    title: "Hire a Chef / Staff",
    description: "Chefs, bartenders, and event crew for real events.",
    status: "live",
  },
  {
    href: "/kitchens",
    title: "Find a Kitchen",
    description: "HoneyPott Labs commissary, prep, and ghost kitchens.",
    status: "soon",
  },
  {
    href: "/shop",
    title: "Shop Chef Tools",
    description: "Curated tools, FLAVR picks, and chef-approved gear.",
    status: "soon",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Top Nav */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Logo / Wordmark */}
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
              TakeaChefHome
            </span>
          </Link>

          {/* Main Nav */}
          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <Link href="#how-it-works" className="hover:text-white">
              How it works
            </Link>
            <Link href="#for-hosts" className="hover:text-white">
              For Hosts
            </Link>
            <Link href="#for-chefs" className="hover:text-white">
              For Chefs
            </Link>
            <Link href="/auth" className="hover:text-white">
              Sign In
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero + Quick Lead Form */}
     <section className="border-b border-slate-800 bg-slate-950 relative overflow-hidden">
  {/* soft emerald glow at the top */}
  <div className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(circle_at_top,_rgba(45,212,191,0.25),_transparent_60%)]" />

  <div className="relative mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[3fr,2fr] md:py-16">
          {/* Left: Hero Copy */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              The culinary exchange for{" "}
              <span className="text-emerald-300">real food people.</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              TakeaChefHome.com is your marketplace for private chefs, catering,
              kitchen rentals, chef jobs, and chef tools. Built by a working
              chef for hosts, planners, and culinary pros who need a system —
              not chaos.
            </p>

            {/* Chef GoGee CTA */}
            <div className="space-y-3">
              <a
                href="#quick-lead"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Tell Chef GoGee What You Need
                <span className="text-xs">⚡ Start a request</span>
              </a>
              <p className="text-xs text-slate-400">
                One form. We route your request into our live lead pipe and
                match you with the right lane: private chef, catering, staff, or
                kitchen.
              </p>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="rounded-full border border-slate-700 px-3 py-1">
                Private dinners · Retreats · Events
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">
                Chef &amp; staff jobs
              </span>
              <span className="rounded-full border border-slate-700 px-3 py-1">
                Kitchen rentals &amp; tools
              </span>
            </div>
          </div>

          {/* Right: Featured Experience */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-black/40">
              <h2 className="text-sm font-semibold text-slate-100">
                Featured Experience
              </h2>
              <p className="mt-1 text-xs text-emerald-300 uppercase tracking-wide">
                Gullah Coastal Night
              </p>
              <p className="mt-3 text-sm text-slate-300">
                A soulful coastal dinner: lowcountry shrimp &amp; grits, crab
                cucumber bites, charred okra &amp; tomato salad, and warm peach
                cobbler to close the night.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-200">
                  Seafood-forward
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-200">
                  In-home dining
                </span>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-slate-200">
                  Perfect for 6–12 guests
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-50 sm:text-xl">
                Choose your lane
              </h2>
              <p className="text-sm text-slate-400">
                Start with what you need today. You can always add more lanes
                later.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tiles.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition hover:border-emerald-400/60 hover:bg-slate-900"
              >
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-50">
                      {tile.title}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        tile.status === "live"
                          ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {tile.status === "live" ? "Live" : "Coming Soon"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {tile.description}
                  </p>
                </div>
                <span className="mt-4 text-xs text-emerald-300 opacity-80 group-hover:opacity-100">
                  {tile.status === "live" ? "Open lane →" : "Preview lane →"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + For Hosts / For Chefs */}
      <section
        id="how-it-works"
        className="border-b border-slate-800 bg-slate-950"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
          <div id="for-hosts">
            <h2 className="text-lg font-semibold text-slate-50">
              For Hosts &amp; Planners
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Answer a few questions once. We route your request into our lead
              pipe, tag it by vibe and budget, and match you with chefs, menus,
              and kitchens without the usual back-and-forth chaos.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Private dinners, retreats, weddings, and events</li>
              <li>• Clear pricing tiers and menu concepts up front</li>
              <li>• One concierge intake instead of 20 DMs and emails</li>
            </ul>
          </div>

          <div id="for-chefs">
            <h2 className="text-lg font-semibold text-slate-50">
              For Chefs, Bakers &amp; Creators
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Get in front of serious clients, rent kitchen space, and plug into
              a system built by a chef — not a tech bro. Your menu, your rates,
              our pipeline.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• List services, tasting menus, and experiences</li>
              <li>• Access commissary and ghost kitchen rentals</li>
              <li>• Future: jobs, gigs, and placements via HoneyPott Labs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Lead Form (hits /api/leads) */}
      <section
        id="quick-lead"
        className="border-b border-slate-800 bg-slate-950/60"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="max-w-xl">
            <h2 className="text-lg font-semibold text-slate-50">
              Start a request with Chef GoGee
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              This is your working MVP lead form. Submissions are sent to the{" "}
              <code className="rounded bg-slate-900 px-1.5 py-0.5 text-[11px]">
                /api/leads
              </code>{" "}
              endpoint and stored in Supabase.
            </p>
          </div>

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
                  htmlFor="serviceType"
                  className="text-xs text-slate-300"
                >
                  What do you need?
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                >
                  <option value="private-chef">Private Chef</option>
                  <option value="catering">Catering / Event</option>
                  <option value="staff">Chef / Staff Hire</option>
                  <option value="kitchen">Kitchen Rental</option>
                  <option value="other">Other / Not sure</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="details" className="text-xs text-slate-300">
                Event details or request
              </label>
              <textarea
                id="details"
                name="details"
                required
                rows={4}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-400"
                placeholder="Date, city, guest count, budget, and vibe (ex: elegant dinner, backyard party, corporate lunch)…"
              />
            </div>

            {/* hidden tags so backend knows this came from homepage */}
            <input type="hidden" name="source" value="homepage-quick-lead" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
              >
                Submit Request
                <span className="text-xs">⚡ Send to lead pipe</span>
              </button>
              <p className="text-[11px] text-slate-400">
                You&apos;ll get a follow-up by email or phone once Chef GoGee
                reviews your request.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} TakeaChefHome.com</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
            <Link href="/partners">For Partners</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
