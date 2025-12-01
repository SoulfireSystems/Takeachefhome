// app/jobs/page.tsx

import Link from "next/link";

export default function JobsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-emerald-300">
          Lane · Hire Staff
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Hire Chefs, Bartenders &amp; Event Staff
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          This lane is for venues, planners, and operators who need people:
          chefs, line cooks, dish, servers, bartenders, and event support.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-slate-300">
          <li>• One-off events, short-term gigs, or recurring shifts</li>
          <li>• Future: full job board and chef profiles</li>
          <li>• Powered by HoneyPott Labs &amp; TakeaChefHome network</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#quick-lead"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
          >
            Request Staff
            <span className="text-xs">⚡ Tell us what you need</span>
          </Link>
          <p className="text-xs text-slate-400">
            Use the quick form on the homepage and select “Chef / Staff Hire”.
          </p>
        </div>
      </div>
    </main>
  );
}
