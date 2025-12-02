// app/kitchens/page.tsx

export default function KitchensPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-300 mb-3">
          Lane: Kitchen Rentals
        </p>
        <h1 className="text-3xl font-semibold mb-3">
          Verified kitchen rentals —{" "}
          <span className="text-emerald-300">coming soon.</span>
        </h1>
        <p className="text-sm text-slate-300 mb-6">
          Commissary, prep kitchens, ghost kitchens, and pop-up friendly spaces
          you can actually trust. We&apos;re building the HoneyPott Labs /
          TakeaChefHome shared kitchen network.
        </p>
        <p className="text-xs text-slate-400">
          Want first access? Use any form on the site and mention
          &quot;kitchen rentals&quot; in your details, and we&apos;ll tag you
          for early invites.
        </p>
      </div>
    </main>
  );
}
