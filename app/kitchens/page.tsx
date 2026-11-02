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
            KITCHENS · COMING SOON
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
              Room for your next big batch.
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
                ABOUT KITCHEN SPACE
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
                FOR CHEFS + FOOD BUSINESSES
              </p>

              <div>
                <h2 className="text-3xl font-black leading-tight">
                  The prep starts long before service.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/85">
                  From a prep counter to extra refrigeration, the right space depends on what you produce. Kitchen listings and space requests are not available yet.
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
            WHAT TO CONSIDER WHEN CHOOSING A SPACE
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#135DFF]">
                KITCHEN ACCESS
              </p>

              <h3 className="mt-3 text-lg font-black">
                Hours that fit your production
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Ask about access hours, prep surfaces, equipment, dry storage and cleaning responsibilities.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#135DFF]">
                PRODUCTION SETUP
              </p>

              <h3 className="mt-3 text-lg font-black">
                Equipment for the work you do
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Check cooking equipment, power, ventilation, receiving access and any restrictions on your products.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-[#f7fbff] p-5">
              <p className="text-xs font-black uppercase tracking-wide text-[#135DFF]">
                COLD STORAGE
              </p>

              <h3 className="mt-3 text-lg font-black">
                The right space and temperature
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Confirm cooler or freezer temperatures, capacity, access and labeling requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="space-form" className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-900/10 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#135DFF]">
            KITCHENS · COMING SOON
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Kitchen listings are not available yet.
          </h2>

          <div className="mt-6 space-y-4">
            <p className="text-sm leading-6 text-slate-700">You cannot post, request or book kitchen space here yet. You can still browse chefs, caterers and other culinary services.</p>
            <a href="https://www.takeachefhome.com/#marketplace" className="inline-flex min-h-12 items-center rounded-2xl bg-[#135DFF] px-6 py-4 text-sm font-black text-white">Return to the marketplace</a>
          </div>
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

