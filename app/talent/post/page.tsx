import Link from 'next/link';

export default function TalentPostRouter() {
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
          <Link href="/" className="text-xs font-black uppercase text-white/50">Client Marketplace →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Operator posting</p>
        <h1 className="mt-2 text-5xl font-black tracking-[-0.055em]">What kind of help do you need?</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-black/55">Regular hiring and urgent shift staffing are separate systems. Pick the lane that matches the work.</p>

        <div className="mt-8 grid border-l-2 border-t-2 border-[#171310] bg-white md:grid-cols-2">
          <Link href="/talent/post-job" className="border-b-2 border-r-2 border-[#171310] p-7 hover:bg-[#E9F0FF]">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Jobs</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">Post a regular job →</h2>
            <p className="mt-3 text-sm leading-6 text-black/55">Full-time, part-time, seasonal, temporary or contract culinary roles. Listings live for 30 days.</p>
          </Link>

          <Link href="/talent/all-day/post" className="border-b-2 border-r-2 border-[#171310] bg-[#171310] p-7 text-white hover:bg-[#25201c]">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">ALL DAY</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">Post a shift Call Sheet →</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">Date, call time, crew count, rate, uniform, requirements and arrival instructions.</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
