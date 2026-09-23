import Link from 'next/link';

const useCases = ['Dinner parties','Airbnb + vacation homes','Birthdays + anniversaries','Retreats','Date nights','Tastings + chef tables'];

export default function PrivateChefPage() {
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <nav className="flex flex-wrap gap-4 text-sm font-black">
            <Link href="/providers?service=private-chef" className="text-[#135DFF]">Browse Chefs</Link>
            <Link href="/board">The Board</Link>
            <Link href="/post-a-lead?category=private-chef" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-white">Post Request</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#135DFF] text-white">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.3fr_.7fr]">
          <div className="px-4 py-10 lg:border-r lg:border-white/25">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#F3D37C]">Private Chef</p>
            <h1 className="mt-2 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl">Bring the restaurant home.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">Browse private chefs in your market or post exactly what you need and let qualified professionals respond.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/providers?service=private-chef" className="border-2 border-white bg-white px-5 py-3 text-sm font-black text-[#171310]">Find a Chef →</Link>
              <Link href="/post-a-lead?category=private-chef" className="border-2 border-white px-5 py-3 text-sm font-black">Post a Request →</Link>
            </div>
          </div>
          <div className="grid grid-cols-2 border-t border-white/25 lg:border-t-0">
            {useCases.map((item,i)=><div key={item} className="border-b border-r border-white/25 p-4"><span className="text-[10px] font-black text-white/45">0{i+1}</span><p className="mt-2 text-sm font-black">{item}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid border-l-2 border-t-2 border-[#171310] bg-white md:grid-cols-3">
          {[
            ['Browse first','Search real professional profiles by city and service.'],
            ['Post instead','Know the date, guest count and budget? Put the request on The Board.'],
            ['Keep it private','Client contact details stay off public listings while professionals respond through the platform.'],
          ].map(([t,b])=><div key={t} className="border-b-2 border-r-2 border-[#171310] p-5"><h2 className="text-xl font-black">{t}</h2><p className="mt-2 text-sm leading-6 text-black/55">{b}</p></div>)}
        </div>
      </section>
    </main>
  );
}
