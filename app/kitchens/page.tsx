import Link from "next/link";

export default function KitchensPage() {
  return (
    <main className="min-h-screen bg-[#F4F9FF] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-black text-[#135DFF]">
            TakeaChefHome<span className="text-slate-950">.com</span>
          </Link>

          <Link
            href="#space-form"
            className="rounded-full bg-[#135DFF] px-4 py-2 text-sm font-black text-white shadow-lg shadow-blue-900/20"
          >
            Post to the Board
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_#cfe2ff,_transparent_30%),linear-gradient(180deg,_#ffffff,_#F4F9FF)]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[1.05fr,0.95fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">
              Find Space
            </p>

            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
              Kitchens are infrastructure.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
              Commissary kitchens, prep space, ghost kitchens, cold storage,
              production space, and pop-up ready facilities for chefs,
              caterers, food trucks, bakers, and growing food brands.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#space-form"
                className="rounded-full bg-[#135DFF] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20"
              >
                Request Space
              </a>

              <Link
                href="/jobs"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700"
              >
                Need Crew?
              </Link>
            </div>
          </div>

          <aside className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-[#0F172A] via-[#135DFF] to-[#1f6f8b] p-6 text-white shadow-2xl shadow-blue-900/20">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/15 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-white/80">
                Built for food operators
              </p>

              <div>
                <h2 className="text-3xl font-black leading-tight">
                  The prep starts long before service.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/85">
                  Shared kitchens, refrigeration, prep access, and production
                  support are the backbone of modern food businesses. This board
                  is being built to help operators find real workable space.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#135DFF]">
            Commissary kitchens
          </p>

          <h3 className="mt-2 text-xl font-black">
            Shared prep environments.
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Flexible prep space for caterers, food trucks, bakers, and growing
            culinary brands.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#135DFF]">
            Cold storage
          </p>

          <h3 className="mt-2 text-xl font-black">
            Cooler and freezer support.
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Shared refrigeration, overflow storage, prep holding, and event
            staging support.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black text-[#135DFF]">
            Production space
          </p>

          <h3 className="mt-2 text-xl font-black">
            Space for serious volume.
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Meal prep operations, ghost kitchens, packaged food production, and
            scalable culinary projects.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">
            On the Board Now
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#135DFF]">
                Atlanta
              </p>

              <h3 className="mt-3 text-lg font-black">
                Commissary kitchen with overnight access
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Prep-friendly setup with freezer space and shared dry storage.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#135DFF]">
                Dallas
              </p>

              <h3 className="mt-3 text-lg font-black">
                Ghost kitchen stations available
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Delivery-focused setup with prep counters and shared receiving.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#135DFF]">
                Phoenix
              </p>

              <h3 className="mt-3 text-lg font-black">
                Shared cold storage access
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Cooler support for caterers, events, and mobile operators.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="space-form" className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">
            Space Request
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Tell us what kind of kitchen support you need
          </h2>

          <form method="post" action="/api/leads" className="mt-6 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="name"
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]"
                placeholder="Name"
              />

              <input
                name="email"
                type="email"
                required
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]"
                placeholder="Email"
              />

              <input
                name="phone"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]"
                placeholder="Phone"
              />

              <input
                name="city"
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]"
                placeholder="City + state"
              />
            </div>

            <textarea
              name="details"
              required
              rows={5}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-[#135DFF]"
              placeholder="Prep kitchen, commissary, cold storage, overnight access, delivery setup, ghost kitchen, event prep, or anything important."
            />

            <input type="hidden" name="serviceType" value="kitchen-space" />
            <input type="hidden" name="source" value="find-space-page" />

            <button className="rounded-2xl bg-[#135DFF] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-800/20 hover:bg-[#104de0]">
              Submit Space Request
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            ← Back to the Board
          </Link>

          <span>Find Space · TakeaChefHome.com</span>
        </div>
      </footer>
    </main>
  );
}
