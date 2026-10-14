import Link from "next/link";

export default function ShiftReceivedPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#08182d] px-4 text-white">
      <div className="w-full max-w-2xl rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#84bfff]">SHIFT RECEIVED</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">The prep call is in.</h1>
        <p className="mt-4 text-base leading-7 text-slate-300">We saved your shift for review. It is not public yet. We check the pay, scope, location, date, and basic posting details before an approved shift is activated on the board.</p>
        <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5 text-sm leading-6 text-slate-300">
          <strong className="text-white">What happens next:</strong> approved listings receive activation/payment instructions based on the posting level you selected. Exact contact details remain private from the public board.
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/prep-your-shift" className="rounded-full bg-white px-5 py-3 text-sm font-black text-[#08182d]">Back to Prep Board</Link>
          <Link href="/prep-your-shift/rules" className="rounded-full border border-white/20 px-5 py-3 text-sm font-black text-white">Read the Rules</Link>
        </div>
      </div>
    </main>
  );
}
