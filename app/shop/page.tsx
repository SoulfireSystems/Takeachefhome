import Link from 'next/link';

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <Link href="/talent" className="text-sm font-black">Talent</Link>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">Chef Gear</p>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">Buy. Sell. Rent. Keep kitchens moving.</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">A working-food classifieds market for equipment people actually use — from Cambros and hot boxes to mixers, induction, smallwares and larger kitchen equipment.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid border-l-2 border-t-2 border-[#171310] bg-white md:grid-cols-3">
          {[
            ['BUY','Find used and new working-kitchen equipment.'],
            ['SELL','Move equipment sitting idle in kitchens, storage and commissaries.'],
            ['RENT','Short-term gear for events, pop-ups and production runs.'],
          ].map(([t,b])=><div key={t} className="border-b-2 border-r-2 border-[#171310] p-6"><p className="text-[10px] font-black tracking-[0.2em] text-[#135DFF]">{t}</p><h2 className="mt-3 text-2xl font-black">{b}</h2></div>)}
        </div>
        <div className="mt-8 border-2 border-[#D4A64F] bg-[#FFF7DC] p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D09B2C]">Marketplace lane queued</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">No fake products. Inventory comes from real sellers.</h2>
          <p className="mt-2 text-sm leading-6 text-black/60">Chef Gear stays in the stack. The next build is the actual listing engine for equipment, photos, condition, price, location and buy/sell/rent status.</p>
        </div>
      </section>
    </main>
  );
}
