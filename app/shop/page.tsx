// app/shop/page.tsx

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">
          Lane: Shop
        </p>
        <h1 className="text-3xl font-semibold mb-3">
          Chef tools, FLAVR picks, and gear —{" "}
          <span className="text-emerald-300">coming soon.</span>
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          A curated shop for knives, pans, chafers, cooler bags, FLAVR sauce
          sets, and chef-approved picks — plus affiliate drops from Walmart and
          Amazon that actually make sense for working kitchens.
        </p>
        <p className="text-xs text-slate-400">
          For now, you can still ask for product recommendations in your event
          request — we&apos;ll keep building the shop in the background.
        </p>
      </div>
    </main>
  );
}
