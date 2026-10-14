import Link from 'next/link';

export const metadata={robots:{index:false,follow:false}};

export default function ProCardPreview(){
  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">Design preview / not live inventory</p>
            <h1 className="mt-1 text-3xl font-black tracking-[-0.05em]">Culinary Pro Card</h1>
          </div>
          <Link href="/providers" className="text-xs font-black uppercase text-white/60">The Roster →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-[390px_1fr]">
          <div className="pro-card">
            <div className="relative aspect-[5/6] overflow-hidden border-b-2 border-[#171310] bg-[linear-gradient(145deg,#135DFF,#171310)]">
              <div className="absolute inset-0 flex items-end p-6 text-8xl font-black tracking-[-0.07em] text-white/15">FP</div>

              <div className="absolute left-4 top-4 border-2 border-[#171310] bg-[#F8F4EA] px-3 py-2">
                <span className="block text-[8px] font-black uppercase tracking-[0.2em]">Card</span>
                <strong className="pro-card-number block text-2xl leading-none">#001</strong>
              </div>

              <div className="pro-card-foil absolute right-4 top-4 border-2 border-[#171310] px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em]">Verified</div>

              <div className="absolute inset-x-4 bottom-4 border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-white">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/65">Private Chef · Caterer</p>
                <h2 className="mt-1 text-3xl font-black leading-none tracking-[-0.055em]">FOUNDING PRO</h2>
              </div>
            </div>

            <div className="bg-[#F8F4EA] p-5">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Home market</p>
              <p className="mt-1 text-lg font-black">Raleigh, NC</p>

              <div className="mt-4 grid grid-cols-3 border-l border-t border-[#171310] text-center">
                <div className="border-b border-r border-[#171310] p-3"><strong className="block text-xl">12</strong><span className="text-[7px] font-black uppercase tracking-wide text-black/45">Years</span></div>
                <div className="border-b border-r border-[#171310] p-3"><strong className="block text-xl">3</strong><span className="text-[7px] font-black uppercase tracking-wide text-black/45">Services</span></div>
                <div className="border-b border-r border-[#171310] p-3"><strong className="block text-base">$750</strong><span className="text-[7px] font-black uppercase tracking-wide text-black/45">Starts</span></div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1">
                {['Private Chef','Catering','Experience'].map(x=><span key={x} className="border border-[#171310] bg-white px-2 py-1 text-[8px] font-black uppercase tracking-wide">{x}</span>)}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black/20 pt-3">
                <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Culinary Exchange Series 01</span>
                <strong className="text-lg text-[#135DFF]">TACH</strong>
              </div>
            </div>
          </div>

          <div>
            <div className="border-2 border-[#171310] bg-[#171310] p-6 text-white">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Card back / Profile record</p>
                  <h2 className="mt-2 text-5xl font-black leading-[0.9] tracking-[-0.06em]">FOUNDING PRO</h2>
                </div>
                <span className="text-5xl font-black tracking-[-0.06em] text-white/15">#001</span>
              </div>
              <p className="mt-5 max-w-3xl text-base leading-7 text-white/65">This is a design-only sample showing how the back of each real professional card will carry the biography and factual marketplace record.</p>
            </div>

            <div className="grid border-x-2 border-b-2 border-[#171310] bg-white sm:grid-cols-3">
              <div className="border-b-2 border-[#171310] p-4 sm:border-b-0 sm:border-r-2"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Position</p><p className="mt-1 text-lg font-black">Private Chef</p></div>
              <div className="border-b-2 border-[#171310] p-4 sm:border-b-0 sm:border-r-2"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Experience</p><p className="mt-1 text-lg font-black">12 years</p></div>
              <div className="p-4"><p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Starting minimum</p><p className="mt-1 text-lg font-black">$750</p></div>
            </div>

            <div className="mt-7 border-2 border-[#171310] bg-white p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">What the real card holds</p>
              <div className="mt-4 grid gap-0 sm:grid-cols-2">
                {['Portrait + card number','Role + home market','Years of experience','Service categories','Starting minimum','Verified status','Bio + story','Website + social','Post request action','No fake ratings'].map((x,i)=><div key={x} className="border-b border-r border-[#171310] p-3 text-sm font-black"><span className="mr-2 text-[#135DFF]">{String(i+1).padStart(2,'0')}</span>{x}</div>)}
              </div>
            </div>

            <div className="mt-7 border-2 border-[#135DFF] bg-[#E9F0FF] p-5">
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Not a live provider</p>
              <p className="mt-2 text-sm font-bold leading-6 text-black/60">This page exists only so we can art-direct the trading-card system before your five real people are loaded as cards #001–#005.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
