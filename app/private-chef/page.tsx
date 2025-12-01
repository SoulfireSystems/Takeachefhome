// app/private-chef/page.tsx

import Link from "next/link";

export default function PrivateChefPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-emerald-300">
          Lane · Private Chef
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Private Chef Experiences
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          In-home dinners, Airbnb takeovers, retreats, and tasting menus.
          TakeaChefHome connects you with chefs who cook on-site, clean down,
          and bring the restaurant to your table.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-slate-300">
          <li>• Perfect for 2–20 guests</li>
          <li>• Birthday dinners, anniversaries, date nights, or small groups</li>
          <li>• Custom menus, dietary notes, and FLAVR-level flavor</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#quick-lead"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
          >
            Tell Chef GoGee About Your Dinner
            <span className="text-xs">⚡ Start request</span>
          </Link>
          <p className="text-xs text-slate-400">
            Use the quick form on the homepage and choose “Private Chef” as your
            service type.
          </p>
        </div>
      </div>
    </main>
  );
}
