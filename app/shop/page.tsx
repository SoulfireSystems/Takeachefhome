// app/shop/page.tsx

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">
          TAKEACHEFHOME SHOP
        </p>
        <h1 className="text-3xl font-semibold mb-3">
          Kitchen tools, useful gear and culinary finds —{" "}
          <span className="text-emerald-300">coming soon.</span>
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          The shop is not open for browsing or purchases yet. Come back for kitchen tools, food-service gear and culinary products.
        </p>
        <p className="text-xs text-slate-400">
          <a href="/" className="underline underline-offset-4">Explore chefs, catering and culinary services →</a>
        </p>
      </div>
    </main>
  );
}

