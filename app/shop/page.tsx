// app/shop/page.tsx

import Link from "next/link";

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-xs uppercase tracking-wide text-emerald-300">
          Lane · Shop
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Shop Chef Tools &amp; FLAVR Picks
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          This lane will feature curated chef tools, FLAVR products, Walmart
          and Amazon affiliate picks, and gear we actually use in the field.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-slate-300">
          <li>• Starter kits for private chefs and caterers</li>
          <li>• FLAVR sauces, rubs, and seasonal drops (when live)</li>
          <li>• Links to trusted partners and brands</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/#quick-lead"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300"
          >
            Need Something Specific?
            <span className="text-xs">⚡ Ask in your request</span>
          </Link>
          <p className="text-xs text-slate-400">
            For now, use the quick form and tell us what gear you&apos;re
            looking for.
          </p>
        </div>
      </div>
    </main>
  );
}
