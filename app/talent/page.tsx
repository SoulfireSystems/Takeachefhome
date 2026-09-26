import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic = 'force-dynamic';

async function getTalentCounts(){
  try{
    const supabase=getSupabaseServer();
    const [jobs,shifts,profiles]=await Promise.all([
      supabase.from('talent_opportunities').select('id',{count:'exact',head:true}).eq('opportunity_type','job').eq('status','open'),
      supabase.from('talent_opportunities').select('id',{count:'exact',head:true}).eq('opportunity_type','shift').eq('status','open'),
      supabase.from('provider_profiles').select('id',{count:'exact',head:true}).eq('status','active'),
    ]);
    return {
      jobs:jobs.count??0,
      shifts:shifts.count??0,
      profiles:profiles.count??0,
      available:!jobs.error&&!shifts.error&&!profiles.error,
    };
  }catch{
    return {jobs:0,shifts:0,profiles:0,available:false};
  }
}

export default async function TalentPage(){
  const counts=await getTalentCounts();

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b border-white/10 bg-[#171310] text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em]">
          <Link href="/" className="text-white/60 hover:text-white">← Client Marketplace</Link>
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
            <Link href="/talent/jobs" className="border-2 border-[#171310] bg-white px-4 py-3 hover:bg-[#E9F0FF]">Find Jobs</Link>
            <Link href="/talent/all-day" className="border-2 border-[#171310] bg-white px-4 py-3 hover:bg-[#E9F0FF]">ALL DAY</Link>
            <Link href="/talent/post" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-white">Post Work</Link>
            <Link href="/talent/join" className="border-2 border-[#171310] bg-[#D4A64F] px-4 py-3">Get Listed</Link>
          </nav>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto grid max-w-7xl md:grid-cols-[1.2fr_.8fr]">
          <div className="px-4 py-10 md:border-r md:border-white/20">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">The workforce side</p>
            <h2 className="mt-2 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-6xl">Find a job. Find a shift. Get listed.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/60">Chefs, cooks, servers, bartenders, prep teams, kitchen managers and culinary operators all enter through one door.</p>

            <div className="mt-7 grid max-w-xl grid-cols-3 border-l border-t border-white/25">
              <div className="border-b border-r border-white/25 p-3"><strong className="block text-2xl">{counts.available?counts.jobs:'—'}</strong><span className="text-[9px] font-black uppercase tracking-wide text-white/45">Open jobs</span></div>
              <div className="border-b border-r border-white/25 p-3"><strong className="block text-2xl">{counts.available?counts.shifts:'—'}</strong><span className="text-[9px] font-black uppercase tracking-wide text-white/45">Open shifts</span></div>
              <div className="border-b border-r border-white/25 p-3"><strong className="block text-2xl">{counts.available?counts.profiles:'—'}</strong><span className="text-[9px] font-black uppercase tracking-wide text-white/45">Active pros</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1">
            <Link href="/talent/jobs" className="border-b border-white/20 p-5 hover:bg-white/5 sm:border-r md:border-r-0">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">01</span>
              <strong className="mt-2 block text-2xl font-black">Find Jobs →</strong>
              <span className="mt-1 block text-sm text-white/50">Full-time and part-time culinary work</span>
            </Link>
            <Link href="/talent/all-day" className="border-b border-white/20 p-5 hover:bg-white/5 sm:border-r md:border-r-0">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">02</span>
              <strong className="mt-2 block text-2xl font-black">ALL DAY / Shifts →</strong>
              <span className="mt-1 block text-sm text-white/50">Prep crews, event labor and short-notice shifts</span>
            </Link>
            <Link href="/talent/join" className="p-5 hover:bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">03</span>
              <strong className="mt-2 block text-2xl font-black">Get Listed →</strong>
              <span className="mt-1 block text-sm text-white/50">Create one professional profile clients can discover.</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid border-l-2 border-t-2 border-[#171310] bg-white md:grid-cols-3">
          <div className="border-b-2 border-r-2 border-[#171310] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Workers</p>
            <h3 className="mt-2 text-xl font-black">Work without digging through generic job boards.</h3>
            <p className="mt-2 text-sm leading-6 text-black/55">Kitchen jobs, event shifts and short-notice food-service work in one place.</p>
          </div>
          <div className="border-b-2 border-r-2 border-[#171310] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Operators</p>
            <h3 className="mt-2 text-xl font-black">Post the role or fill the shift.</h3>
            <p className="mt-2 text-sm leading-6 text-black/55">Use Jobs for ongoing work and ALL DAY when the need is immediate.</p>
          </div>
          <div className="border-b-2 border-r-2 border-[#171310] p-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Profiles</p>
            <h3 className="mt-2 text-xl font-black">One identity across the exchange.</h3>
            <p className="mt-2 text-sm leading-6 text-black/55">Your professional profile is the bridge between client services, jobs and shifts.</p>
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-6">
          <Link href="/" className="font-black text-[#135DFF]">TakeAChefHome.com</Link>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-black/40">Talent · Jobs · ALL DAY · Profiles</span>
        </div>
      </footer>
    </main>
  );
}
