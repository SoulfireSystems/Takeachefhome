import Link from 'next/link';

export default function TalentPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b border-white/10 bg-[#171310] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em]">
          <Link href="/" className="text-white/60 hover:text-white">← TakeAChefHome</Link>
          <span className="text-[#D4A64F]">Talent / Food Work</span>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">TakeAChefHome / Talent</p>
            <h1 className="text-4xl font-black tracking-[-0.055em]">Food work lives here.</h1>
          </div>
          <nav className="flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
            <Link href="/jobs" className="border-2 border-[#171310] bg-white px-4 py-3 hover:bg-[#E9F0FF]">Find Jobs</Link>
            <Link href="/jobs" className="border-2 border-[#171310] bg-white px-4 py-3 hover:bg-[#E9F0FF]">Find Shifts</Link>
            <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-white">Post Work</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto grid max-w-7xl gap-0 md:grid-cols-[1.2fr_.8fr]">
          <div className="px-4 py-10 md:border-r md:border-white/20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">The workforce side</p>
            <h2 className="mt-2 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl">
              Find a job. Find a shift. Get listed.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">
              Chefs, cooks, servers, bartenders, prep teams, kitchen managers and culinary operators all enter through one door.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1">
            <Link href="/jobs" className="border-b border-white/20 p-5 hover:bg-white/5 sm:border-r md:border-r-0">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">01</span>
              <strong className="mt-2 block text-2xl font-black">Find Jobs →</strong>
              <span className="mt-1 block text-sm text-white/50">Full-time and part-time culinary work</span>
            </Link>
            <Link href="/jobs" className="border-b border-white/20 p-5 hover:bg-white/5 sm:border-r md:border-r-0">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">02</span>
              <strong className="mt-2 block text-2xl font-black">ALL DAY / Shifts →</strong>
              <span className="mt-1 block text-sm text-white/50">Prep crews, event labor and short-notice shifts</span>
            </Link>
            <Link href="/talent/join" className="p-5 hover:bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">03</span>
              <strong className="mt-2 block text-2xl font-black">Get Listed →</strong>
              <span className="mt-1 block text-sm text-white/50">Create a professional profile clients can discover across the marketplace.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid border-l-2 border-t-2 border-[#171310] bg-white md:grid-cols-3">
          {[
            ['For Workers', 'Pick up shifts, find kitchen jobs and build a profile that can be discovered across the marketplace.'],
            ['For Operators', 'Post kitchen roles, event shifts and prep-team needs without digging through generic job boards.'],
            ['For The Exchange', 'One professional profile can eventually power jobs, shifts and client-facing service listings.'],
          ].map(([title, body]) => (
            <div key={title} className="border-b-2 border-r-2 border-[#171310] p-5">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-black/55">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6">
          <Link href="/" className="font-black text-[#135DFF]">TakeAChefHome.com</Link>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-black/40">Talent · Jobs · Shifts · Profiles</span>
        </div>
      </footer>
    </main>
  );
}
