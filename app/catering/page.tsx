import Link from 'next/link';

const needs = ['Corporate meals','Weddings','Brunch','Drop-off catering','Private parties','Full-service events'];

export default function CateringPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <nav className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/providers?service=catering" className="text-[#135DFF]">Browse Caterers</Link>
            <Link href="/board">The Board</Link>
            <Link href="/post-a-lead?category=catering" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white">Post Request</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.3fr_.7fr]">
          <div className="px-4 py-10 lg:border-r lg:border-white/20">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Catering</p>
            <h1 className="mt-2 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl">Find the caterer. Feed the room.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">Search catering professionals or post the event once with the city, date, guest count, service style and budget.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/providers?service=catering" className="border-2 border-white bg-[#D4A64F] px-5 py-3 text-sm font-black text-[#171310]">Find Catering →</Link>
              <Link href="/post-a-lead?category=catering" className="border-2 border-white px-5 py-3 text-sm font-black">Post Event →</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-white/20 lg:border-t-0">
            {needs.map((item,i)=><div key={item} className="border-b border-r border-white/20 p-4"><span className="text-[10px] font-black text-[#D4A64F]">0{i+1}</span><p className="mt-2 text-sm font-black">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="border-2 border-[#171310] bg-white p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Two ways to move</p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div><h2 className="text-2xl font-black">Browse professionals.</h2><p className="mt-2 text-sm leading-6 text-black/55">Compare real caterer profiles by market and service.</p><Link href="/providers?service=catering" className="mt-4 inline-block text-sm font-black text-[#135DFF]">Browse Catering →</Link></div>
            <div><h2 className="text-2xl font-black">Post the opportunity.</h2><p className="mt-2 text-sm leading-6 text-black/55">When the details matter more than browsing, put the event on The Board and let professionals respond.</p><Link href="/post-a-lead?category=catering" className="mt-4 inline-block text-sm font-black text-[#135DFF]">Post Catering Request →</Link></div>
          </div>
        </div>
      </section>
    </main>
  );
}
