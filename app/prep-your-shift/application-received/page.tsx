import Link from "next/link";

export default async function ApplicationReceivedPage({
  searchParams,
}: {
  searchParams?: Promise<{ duplicate?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const duplicate = params.duplicate === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#eef5ff] px-4 text-[#101828]">
      <div className="w-full max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl shadow-blue-950/10 md:p-10">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#0b4fb3]">APPLICATION RECEIVED</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight">{duplicate ? "You already put your name on this shift." : "You’re on the list."}</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          {duplicate
            ? "We already have an application from this email for that shift, so we did not create another one."
            : "Your application was saved. The shift poster reviews applicants and confirms the crew. Applying does not automatically book the assignment."}
        </p>
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-sm leading-6 text-slate-700">
          <strong>Remember:</strong> workers never pay to apply. Do not send deposits, gift cards, application fees, or equipment money to someone claiming it is required to get the shift.
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/prep-your-shift#board" className="rounded-full bg-[#0b4fb3] px-5 py-3 text-sm font-black text-white">See More Prep Shifts</Link>
          <Link href="/prep-your-shift/rules" className="rounded-full border border-slate-300 px-5 py-3 text-sm font-black text-slate-700">Read the Rules</Link>
        </div>
      </div>
    </main>
  );
}
