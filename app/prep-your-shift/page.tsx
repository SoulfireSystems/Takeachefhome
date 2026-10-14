import Link from "next/link";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PublicShift = {
  id: string;
  city: string;
  state: string;
  role_type: string;
  shift_date: string;
  start_time: string;
  end_time: string;
  crew_needed: number;
  pay_rate: number | string;
  pay_type: string;
  duties: string;
  urgency: string;
  tier: string;
  dress_code: string | null;
};

async function getOpenShifts(): Promise<{ shifts: PublicShift[]; available: boolean }> {
  try {
    const supabase = getSupabaseAdmin();
    const today = new Date().toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from("prep_shifts")
      .select(
        "id, city, state, role_type, shift_date, start_time, end_time, crew_needed, pay_rate, pay_type, duties, urgency, tier, dress_code",
      )
      .eq("status", "open")
      .gte("shift_date", today)
      .order("shift_date", { ascending: true })
      .order("start_time", { ascending: true })
      .limit(30);

    if (error) throw error;
    return { shifts: (data ?? []) as PublicShift[], available: true };
  } catch (error) {
    console.error("PREP YOUR SHIFT BOARD ERROR", error);
    return { shifts: [], available: false };
  }
}

function displayDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function displayTime(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  const date = new Date(2026, 0, 1, hours || 0, minutes || 0);
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function badgeLabel(urgency: string) {
  if (urgency === "today") return "TODAY";
  if (urgency === "tonight") return "TONIGHT";
  if (urgency === "urgent") return "URGENT";
  return "OPEN";
}

export default async function PrepYourShiftPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const { shifts, available } = await getOpenShifts();
  const params = searchParams ? await searchParams : {};

  return (
    <main className="min-h-screen bg-[#eef5ff] text-[#101828]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-5">
            <Link href="/" className="text-lg font-black tracking-tight text-[#0b4fb3] sm:text-xl">
              TakeaChefHome<span className="text-slate-950">.com</span>
            </Link>
            <span className="hidden border-l border-slate-200 pl-5 text-xs font-black uppercase tracking-[0.18em] text-slate-500 md:block">
              Talent / Prep Your Shift
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a href="#board" className="hidden rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-black sm:inline-flex">
              Find Prep Work
            </a>
            <a href="#post" className="rounded-full bg-[#0b4fb3] px-4 py-2 text-sm font-black text-white shadow-lg shadow-blue-900/15">
              Post a Shift
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-[#08182d] text-white">
        <div className="absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#0b4fb3]/45 blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[linear-gradient(135deg,transparent,#0b4fb3_180%)] opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.25fr,.75fr] lg:py-24">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#84bfff]">PREP YOUR SHIFT™</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              YOUR EVENT IS BOOKED.<br />
              <span className="text-[#84bfff]">YOUR PREP LIST ISN&apos;T.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Find experienced culinary help for the work that happens before service. Prep cooks, pastry hands, protein prep, utility, catering assistants, banquet cooks, and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#post" className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#08182d] shadow-xl">
                I NEED PREP HELP
              </a>
              <a href="#board" className="rounded-2xl border border-white/25 bg-white/10 px-6 py-4 text-sm font-black text-white">
                I WANT PREP SHIFTS
              </a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
              <span>Workers apply free</span>
              <span>Pay shown up front</span>
              <span>Professional culinary work</span>
              <span>City-level location until confirmed</span>
            </div>
          </div>

          <aside className="self-end rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#84bfff]">This is not a generic job board.</p>
            <p className="mt-4 text-2xl font-black leading-tight">You don&apos;t always need another employee.</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Sometimes you need three people who can cut, portion, pan, wrap, label, organize, and get the kitchen service-ready by 4 PM. That is what this lane is for.
            </p>
          </aside>
        </div>
      </section>

      {params.error ? (
        <div className="mx-auto max-w-7xl px-4 pt-6">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-bold text-red-900">
            We couldn&apos;t complete that request. Check the required information and try again. If the shift has already closed, choose another open shift.
          </div>
        </div>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["01", "POST THE WORK", "Date, time, city, crew count, role, duties, and hourly pay. No vague mystery shifts."],
            ["02", "MATCH THE CREW", "Qualified culinary workers apply free. The poster chooses and confirms the people they want."],
            ["03", "GET PREP DONE", "The confirmed crew gets the prep list handled before service starts. Simple, focused, useful."],
          ].map(([number, title, body]) => (
            <div key={number} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-black tracking-[0.2em] text-[#0b4fb3]">{number}</div>
              <h2 className="mt-4 text-xl font-black">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="board" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">LIVE PREP BOARD</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Work that needs hands.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Applying does not automatically book the shift. The poster confirms the crew. Exact worksite details stay private until confirmation.
            </p>
          </div>

          {!available ? (
            <div className="mt-7 rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-black text-amber-950">The live board is reconnecting.</p>
              <p className="mt-1 text-sm text-amber-900">Shift posting remains available. Approved listings will appear here when the board connection is active.</p>
            </div>
          ) : shifts.length === 0 ? (
            <div className="mt-7 rounded-3xl border border-dashed border-slate-300 bg-[#f8fbff] p-8 text-center">
              <p className="text-xl font-black">No approved prep shifts are live yet.</p>
              <p className="mt-2 text-sm text-slate-600">That&apos;s not filler. We don&apos;t publish fake openings. Post the first real one.</p>
              <a href="#post" className="mt-5 inline-flex rounded-full bg-[#0b4fb3] px-5 py-3 text-sm font-black text-white">Post a Prep Shift</a>
            </div>
          ) : (
            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {shifts.map((shift) => (
                <article key={shift.id} className="group rounded-[1.75rem] border border-slate-200 bg-[#f8fbff] p-5 transition hover:border-[#0b4fb3]/40 hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#0b4fb3] px-3 py-1 text-[11px] font-black tracking-wide text-white">{badgeLabel(shift.urgency)}</span>
                        {shift.tier === "priority" ? <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-black text-slate-700">PRIORITY</span> : null}
                      </div>
                      <h3 className="mt-4 text-2xl font-black leading-tight">{shift.role_type}</h3>
                      <p className="mt-1 text-sm font-bold text-[#0b4fb3]">{shift.city}, {shift.state}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black">${Number(shift.pay_rate).toFixed(0)}<span className="text-sm text-slate-500">/hr</span></div>
                      <div className="mt-1 text-xs font-bold text-slate-500">{shift.crew_needed} {shift.crew_needed === 1 ? "spot" : "spots"}</div>
                    </div>
                  </div>
                  <div className="mt-5 grid gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm sm:grid-cols-2">
                    <div><span className="font-black">When:</span> {displayDate(shift.shift_date)}</div>
                    <div><span className="font-black">Time:</span> {displayTime(shift.start_time)}–{displayTime(shift.end_time)}</div>
                  </div>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{shift.duties}</p>
                  {shift.dress_code ? <p className="mt-3 text-xs font-bold text-slate-500">Dress: {shift.dress_code}</p> : null}
                  <Link href={`/prep-your-shift/apply?shift=${shift.id}`} className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#08182d] px-5 py-3 text-sm font-black text-white group-hover:bg-[#0b4fb3]">
                    Apply for this shift
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="post" className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[.72fr,1.28fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">FOR CHEFS + OPERATORS</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Post the prep. Build the crew.</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Your listing goes into review first. We verify the basics, keep private contact information off the public board, and publish approved shifts.
          </p>

          <div className="mt-7 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5"><strong>Quick · $2</strong><p className="mt-1 text-sm text-slate-600">Basic board post for straightforward prep help.</p></div>
            <div className="rounded-2xl border border-[#0b4fb3]/25 bg-blue-50 p-5"><strong>Standard · $7</strong><p className="mt-1 text-sm text-slate-600">Stronger placement for scheduled prep needs.</p></div>
            <div className="rounded-2xl border border-slate-800 bg-[#08182d] p-5 text-white"><strong>Priority · $12</strong><p className="mt-1 text-sm text-slate-300">Priority treatment for urgent or harder-to-fill prep calls.</p></div>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Launch workflow: submissions are reviewed before publication. Activation/payment instructions follow approval. Workers never pay to apply.</p>
        </div>

        <form method="post" action="/api/prep-shifts" className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-blue-950/5 md:p-8">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold">Your name<input name="employerName" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Business / kitchen name<input name="businessName" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Phone<input name="phone" type="tel" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">City<input name="city" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">State<input name="state" required maxLength={2} placeholder="NC" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal uppercase outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Shift date<input name="shiftDate" type="date" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Crew needed<input name="crewNeeded" type="number" min="1" max="100" defaultValue="1" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Start time<input name="startTime" type="time" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">End time<input name="endTime" type="time" required className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Role needed
              <select name="roleType" required defaultValue="Prep Cook" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]">
                <option>Prep Cook</option><option>Sous Chef</option><option>Catering Assistant</option><option>Banquet Cook</option><option>Cold Prep / Garde Manger</option><option>Pastry Prep</option><option>Bakery Prep</option><option>Protein / Butcher Prep</option><option>Dish / Utility</option><option>Pack + Label Crew</option><option>Loading / Kitchen Support</option>
              </select>
            </label>
            <label className="text-sm font-bold">Hourly pay<input name="payRate" type="number" min="0.01" step="0.01" required placeholder="25.00" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Urgency
              <select name="urgency" defaultValue="standard" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]"><option value="standard">Standard</option><option value="urgent">Urgent</option><option value="today">Today</option><option value="tonight">Tonight</option></select>
            </label>
            <label className="text-sm font-bold">Posting level
              <select name="tier" defaultValue="standard" className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]"><option value="quick">Quick · $2</option><option value="standard">Standard · $7</option><option value="priority">Priority · $12</option></select>
            </label>
          </div>

          <label className="mt-4 block text-sm font-bold">What needs to get done?
            <textarea name="duties" required rows={5} placeholder="Example: vegetable prep, chicken portioning, two sauces, 150 hors d'oeuvre assemblies, pan/label finished prep." className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal leading-6 outline-none focus:border-[#0b4fb3]" />
          </label>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold">Dress / uniform<input name="dressCode" placeholder="Black chef pants, nonslip shoes" className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
            <label className="text-sm font-bold">Private notes for review<input name="notes" placeholder="Parking, loading, certifications, etc." className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal outline-none focus:border-[#0b4fb3]" /></label>
          </div>

          <label className="mt-5 flex items-start gap-3 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <input name="termsAccepted" type="checkbox" required className="mt-1 h-4 w-4" />
            <span>I am posting real paid work, the stated pay and scope are accurate, and I agree to the <Link href="/prep-your-shift/rules" className="font-black text-[#0b4fb3] underline">Prep Your Shift rules</Link>.</span>
          </label>
          <button className="mt-5 w-full rounded-2xl bg-[#0b4fb3] px-6 py-4 text-sm font-black text-white shadow-lg shadow-blue-900/15 hover:bg-[#083f8e]">Submit Shift for Review</button>
        </form>
      </section>

      <section className="border-y border-slate-200 bg-[#08182d] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:grid-cols-4">
          {["Vegetable + cold prep", "Protein portioning", "Pastry + bakery prep", "Pack, label + load", "Hors d'oeuvre assembly", "Sauce + batch production", "Dish + utility", "Banquet + catering prep"].map((item) => <div key={item} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-sm font-black">{item}</div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-8 lg:grid-cols-[1.25fr,.75fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">THE HOUSE RULE</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">No nonsense on the prep board.</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Real paid culinary work only", "No unpaid trial shifts", "No worker application fees", "No bait-and-switch pay", "No fake credentials", "No harassment or discrimination", "No deposits requested from workers", "No public posting of exact job addresses"].map((rule) => <div key={rule} className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-bold">✓ {rule}</div>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-black">Read the full rules</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Posting standards, worker conduct, cancellations, no-shows, pay expectations, safety, privacy, moderation, and disputes.</p>
            <Link href="/prep-your-shift/rules" className="mt-6 inline-flex rounded-full bg-[#08182d] px-5 py-3 text-sm font-black text-white">Prep Your Shift Rules →</Link>
            <Link href="/jobs" className="mt-3 block text-sm font-black text-[#0b4fb3]">Need full event staffing instead? Go to Find Crew →</Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-4 py-7 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>Prep Your Shift™ · A TakeaChefHome.com Talent lane</span>
          <div className="flex gap-4"><Link href="/">Board Home</Link><Link href="/jobs">Find Crew</Link><Link href="/prep-your-shift/rules">Rules</Link></div>
        </div>
      </footer>
    </main>
  );
}
