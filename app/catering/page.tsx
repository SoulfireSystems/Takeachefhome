// app/catering/page.tsx

import Link from "next/link";

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-emerald-300">
          Lane · Catering
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Catering for Events &amp; Organizations
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          From corporate lunches and conferences to weddings and banquets, this
          lane is for full-service or drop-off catering. HoneyPott Events and
          partner chefs plug in here.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-slate-300">
          <li>• Buffets, plated dinners, stations, and grab-and-go</li>
          <li>• Corporate, gov, schools, churches, and social events</li>
          <li>• Menu tiers from simple to black-tie</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#quick-lead"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
          >
            Start a Catering Request
            <span className="text-xs">⚡ Chef GoGee intake</span>
          </Link>
          <p className="text-xs text-slate-400">
            Use the quick form on the homepage and choose “Catering / Event”.
          </p>
        </div>
      </div>
    </main>
  );
}
