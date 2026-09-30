import Link from 'next/link';

export default function KitchensPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <nav className="flex flex-wrap gap-4 text-sm font-black"><Link href="/board">The Board</Link><Link href="/talent">Talent</Link></nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto grid max-w-7xl gap-0 lg:grid-cols-2">
          <div className="px-4 py-10 lg:border-r lg:border-white/20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">Kitchen Exchange</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">Find workable food space.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">Commissary kitchens, prep space, production kitchens and ghost-kitchen access for working food businesses.</p>
            <Link href="/post-a-lead?category=kitchen-space" className="mt-6 inline-block border-2 border-white bg-[#135DFF] px-5 py-3 text-sm font-black">Request Kitchen Space →</Link>
          </div>
          <div className="px-4 py-10">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">Cold Grid</p>
            <h2 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">Cold space when you need it.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">Cooler, freezer, overflow storage, event staging and temporary refrigerated holding.</p>
            <Link href="/post-a-lead?category=cold-storage" className="mt-6 inline-block border-2 border-white bg-[#D4A64F] px-5 py-3 text-sm font-black text-[#171310]">Request Cold Storage →</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid border-l-2 border-t-2 border-[#171310] bg-white md:grid-cols-3">
          {[
            ['Commissary','Shared prep environments for caterers, trucks, bakers and operators.'],
            ['Production','Volume prep, packaged food, meal prep and scalable culinary projects.'],
            ['Cold Storage','Refrigerated and frozen support without renting a whole kitchen.'],
          ].map(([t,b])=><div key={t} className="border-b-2 border-r-2 border-[#171310] p-5"><h2 className="text-xl font-black">{t}</h2><p className="mt-2 text-sm leading-6 text-black/55">{b}</p></div>)}
        </div>

        <div className="mt-8 border-2 border-[#135DFF] bg-[#E9F0FF] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Inventory, not theater</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">No fake kitchens on this page.</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-black/60">Until real space owners are listed, we show requests and build real supply instead of presenting examples as available inventory.</p>
        </div>
      </section>
    </main>
  );
}
