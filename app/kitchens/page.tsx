// app/kitchens/page.tsx

import Link from "next/link";

export default function KitchensPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-emerald-300">
          Lane · Kitchens
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Find a Kitchen to Cook In
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Commissary kitchens, ghost kitchens, prep space, and event kitchens.
          This lane will connect chefs and operators to HoneyPott Labs and
          partner facilities in your city.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-slate-300">
          <li>• Hourly or daily rental, depending on location</li>
          <li>• Shared cold storage via ColdGrid (where available)</li>
          <li>• Future: filter by equipment, licenses, and hours</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#quick-lead"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
          >
            Tell Us Where You Need a Kitchen
            <span className="text-xs">⚡ Start request</span>
          </Link>
          <p className="text-xs text-slate-400">
            Use the quick form on the homepage and select “Kitchen Rental”.
          </p>
        </div>
      </div>
    </main>
  );
}
