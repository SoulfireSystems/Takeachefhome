// app/page.tsx
// TakeaChefHome.com – Phase 1 MVP Homepage
// Clean shell + quick lead form wired to /api/leads

import React from "react";
import Link from "next/link";

const tiles = [
  {
    href: "/private-chef",
    title: "Book a Private Chef",
    description: "In-home dining, retreats, and Airbnb dinner experiences.",
  },
  {
    href: "/catering",
    title: "Catering",
    description: "Weddings, corporate events, parties, and celebrations.",
  },
  {
    href: "/jobs",
    title: "Hire a Chef / Staff",
    description: "Temporary, part-time, and full-time kitchen + event staff.",
  },
  {
    href: "/kitchens",
    title: "Find a Kitchen",
    description: "Rent commissary, prep kitchens, and ghost kitchens by the hour.",
  },
  {
    href: "/shop",
    title: "Shop Chef Tools",
    description: "Curated tools, FLAVR picks, and affiliate chef gear.",
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
      <section className="border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[3fr,2fr] md:py-16">
          {/* Left: Hero Copy */}
          <div className="space-y-6">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
              The culinary exchange for{" "}
              <span className="text-emerald-300">real food people.</span>
            </h1>
            <p className="max-w-xl text-sm text-slate-300 sm:text-base">
              TakeachefHome.com is your marketplace for private chefs, catering,
              kitchen rentals, chef jobs, and chef tools. Built by a working
              chef for hosts, planners, and culinary pros who need a system—
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

          {/* Right: Featured Experience + vibe */}
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

            {/* You can swap or expand this card later for promos, FLAVR boxes, etc. */}
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
                className="group flex h-ful
