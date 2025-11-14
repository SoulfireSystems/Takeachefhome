// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400/80">
            TakeaChefHome.com
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            Find a private chef in your city.{" "}
            <span className="text-amber-400">Post your event. Get quotes fast.</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300">
            One form. One marketplace. Real chefs, real menus, real flavor.
            Post your event details once — let chefs come to you.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/post-a-lead"
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-amber-400 text-slate-950 hover:bg-amber-300 transition"
          >
            Post an Event Lead
          </Link>
          <button
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm border border-slate-700 text-slate-200 hover:bg-slate-900/60 transition"
            type="button"
          >
            I’m a Chef – Coming Soon
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm text-slate-300">
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <p className="font-semibold mb-1 text-amber-300">For Hosts</p>
            <p>Private dinners, holidays, retreats, supper clubs & more.</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <p className="font-semibold mb-1 text-amber-300">For Chefs</p>
            <p>Verified leads, no games, paid per booking or per lead.</p>
          </div>
          <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800">
            <p className="font-semibold mb-1 text-amber-300">Built by a Chef</p>
            <p>Designed for real kitchens, real service, and real money.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
