import Link from "next/link";

export default async function PrepShiftApplyPage({
  searchParams,
}: {
  searchParams?: Promise<{ shift?: string; error?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const shiftId = params.shift || "";

  return (
    <main className="min-h-screen bg-[#eef5ff] text-[#101828]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/prep-your-shift" className="text-xl font-black text-[#0b4fb3]">Prep Your Shift™</Link>
          <Link href="/prep-your-shift#board" className="text-sm font-black text-slate-700">← Back to live board</Link>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[.75fr,1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">WORKER APPLICATION</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">Put your name on the shift.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-600">Applying is free. It does not mean you are booked yet. The poster reviews applicants and confirms the crew.</p>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-600">
              <strong className="text-slate-900">Never pay to apply.</strong> A legitimate Prep Your Shift poster should not ask you for a deposit, gift card, application fee, equipment payment, or background-check money to be considered.
            </div>
          </div>

          <form method="post" action="/api/prep-shifts/apply" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5 md:p-8">
            {params.error ? <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">Check the required information and try again.</div> : null}
            {!shiftId ? <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold text-amber-950">Choose an open shift from the live board before applying.</div> : null}
            <input type="hidden" name="shiftId" value={shiftId} />
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm font-bold">Full name<input name="fullName" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
              <label className="text-sm font-bold">Phone<input name="phone" type="tel" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
              <label className="text-sm font-bold">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
              <label className="text-sm font-bold">Primary kitchen role<input name="primaryRole" required placeholder="Prep Cook" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
              <label className="text-sm font-bold">Years of experience<input name="yearsExperience" type="number" min="0" max="60" defaultValue="1" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold md:mt-7"><input name="foodSafetyCert" type="checkbox" className="h-4 w-4" />Current food-safety certification</label>
            </div>
            <label className="mt-4 block text-sm font-bold">Anything the poster should know?<textarea name="availabilityNote" rows={4} placeholder="Relevant prep experience, transportation, availability, knife kit, etc." className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6 outline-none focus:border-[#0b4fb3]" /></label>
            <label className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
              <input name="termsAccepted" type="checkbox" required className="mt-1 h-4 w-4" />
              <span>I am 18 or older, the information I provided is truthful, and I agree to the <Link href="/prep-your-shift/rules" className="font-black text-[#0b4fb3] underline">Prep Your Shift rules</Link>.</span>
            </label>
            <button disabled={!shiftId} className="mt-5 w-full rounded-2xl bg-[#0b4fb3] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-900/15 disabled:cursor-not-allowed disabled:bg-slate-300">Submit Free Application</button>
          </form>
        </div>
      </section>
    </main>
  );
}
