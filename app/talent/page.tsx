import Link from 'next/link';

const regions = [
  { name: 'Southeast', places: 'Atlanta · Raleigh · Charlotte · Charleston' },
  { name: 'Texas', places: 'Dallas · Fort Worth · Houston · Austin' },
  { name: 'Southwest', places: 'Phoenix · Scottsdale · Las Vegas · Palm Springs' },
  { name: 'Coastal + Destination', places: 'Naples · Miami · San Diego · Aspen / Vail' },
];

export default function TalentHome() {
  return <main className="min-h-screen bg-[#F5F7FB] text-[#101D31]">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <Link href="/talent" className="text-lg font-black tracking-tight text-[#112C4E] sm:text-xl">TakeAChefHome<span className="text-[#2467D5]"> / Talent</span></Link>
        <div className="flex items-center gap-4"><Link href="/talent/home" className="hidden text-xs font-black text-[#112C4E] sm:inline">MY TALENT HOME</Link><Link href="/talent/passport" className="rounded-full bg-[#2467D5] px-5 py-3 text-xs font-extrabold text-white">CREATE MY PASSPORT</Link></div>
      </div>
    </header>
    <section className="relative overflow-hidden bg-[#101D31] text-white">
      <div className="pointer-events-none absolute -right-32 -top-36 h-[30rem] w-[30rem] rounded-full border border-white/15" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-[24rem] w-[24rem] rounded-full border border-white/10" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:py-28">
        <div className="relative">
          <p className="text-xs font-extrabold uppercase tracking-[.25em] text-[#98BCFF]">A nationwide culinary + hospitality talent network</p>
          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[.99] tracking-tight sm:text-7xl">THE KITCHEN IS BIGGER THAN THE KITCHEN.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200">Exceptional work deserves a network that sees the person, the craft, and the business behind it.</p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Whether you work independently or operate a team, introduce yourself once through your Talent Passport. Let us know where you serve and the opportunities that fit you.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/talent/passport" className="rounded-full bg-[#81ADFF] px-7 py-4 text-sm font-black text-[#101D31] shadow-lg shadow-black/20">CREATE YOUR TALENT PASSPORT</Link>
            <a href="#how-it-works" className="text-sm font-bold text-white underline decoration-white/50 underline-offset-4">How it works</a>
          </div>
          <p className="mt-6 text-xs text-slate-400">Open to qualified culinary, hospitality, event and food-service talent across the United States.</p>
        </div>
        <div className="relative rounded-[2rem] border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur sm:p-9">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#ADC9FF]">TAKEACHEFHOME / TALENT PASSPORT</p>
          <div className="my-8 h-px bg-white/15" />
          <p className="text-4xl font-black leading-tight">Your experience. <span className="text-[#A5C6FF]">Your next chapter.</span></p>
          <p className="mt-5 leading-7 text-slate-200">One introduction for solo professionals, independent operators, and established food-service businesses.</p>
          <div className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">Solo talent</div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">Businesses + teams</div>
          </div>
        </div>
      </div>
    </section>
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-20">
      <p className="text-xs font-black uppercase tracking-[.2em] text-[#2467D5]">The process</p>
      <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">One passport. A world of possibilities.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          ['01','Introduce yourself','Tell us whether you operate solo or as a business, and share how to reach you.'],
          ['02','Show your craft','Add your roles, skills, experience, credentials, and preferred type of work.'],
          ['03','Define your reach','Choose your home market, service area, travel preferences, and availability.']
        ].map(([num,title,body])=><article key={num} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-sm font-black text-[#2467D5]">{num}</p><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{body}</p></article>)}
      </div>
    </section>
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#2467D5]">Where the network grows</p><h2 className="mt-4 text-4xl font-black tracking-tight">Nationwide by design.<br/>Rooted in real markets.</h2></div><p className="max-w-sm text-sm leading-7 text-slate-600">We are building relationships with skilled professionals in high-demand culinary and destination markets. You can join from any U.S. state.</p></div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">{regions.map(r=><div key={r.name} className="rounded-3xl border border-slate-200 bg-[#F5F7FB] p-6"><h3 className="text-xl font-black">{r.name}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{r.places}</p></div>)}</div>
        <p className="mt-6 text-xs text-slate-500">Featured markets indicate recruiting interests, not guaranteed available positions or active bookings.</p>
      </div>
    </section>
    <section className="mx-auto max-w-4xl px-5 py-20 text-center"><p className="text-xs font-black uppercase tracking-[.2em] text-[#2467D5]">You belong in the conversation</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Let your work speak for itself.</h2><p className="mx-auto mt-5 max-w-xl leading-8 text-slate-600">Create your Talent Passport to be considered for relevant opportunities as the network develops.</p><Link href="/talent/passport" className="mt-8 inline-flex rounded-full bg-[#2467D5] px-8 py-4 text-sm font-black text-white">JOIN THE TALENT NETWORK</Link></section>
    <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 px-5 py-8 text-xs text-slate-500"><span>© TakeAChefHome · Talent Network</span><span>Registration does not guarantee employment, assignments, or bookings. Credentials may be reviewed.</span></div></footer>
  </main>;
}
