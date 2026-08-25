import Link from 'next/link';

export default function PostALeadPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EA] text-[#171310]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-2xl font-black tracking-[-0.04em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <Link href="/board" className="text-sm font-black text-[#135DFF]">View The Board →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#135DFF]">Post a real opportunity</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">What do you need?</h1>
          <p className="mt-3 text-black/60">Tell the marketplace what you need, where you need it, and when. Your request will appear on The Board.</p>
        </div>

        <form method="post" action="/api/leads" className="grid gap-5 border border-black/10 bg-white p-6 shadow-sm">
          <div className="hidden" aria-hidden="true">
            <label>Company website
              <input name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-bold">Category
              <select name="category" required className="rounded-lg border border-black/15 bg-white px-3 py-3 font-normal">
                <option value="private-chef">Private Chef</option>
                <option value="catering">Catering</option>
                <option value="meal-prep">Meal Prep</option>
                <option value="food-truck">Food Truck</option>
                <option value="experience">Food Experience</option>
                <option value="class">Cooking Class</option>
              </select>
            </label>
            <label className="grid gap-1 text-sm font-bold">Opportunity title
              <input name="title" required maxLength={140} placeholder="Birthday dinner for 12" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
          </div>

          <label className="grid gap-1 text-sm font-bold">Details
            <textarea name="description" required maxLength={5000} rows={6} placeholder="Describe the event, menu direction, service level, timing, allergies, venue, or anything the professional should know." className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-1 text-sm font-bold">City
              <input name="city" required maxLength={100} placeholder="Raleigh" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-bold">State
              <input name="state" maxLength={50} placeholder="NC" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-bold">Event date
              <input name="event_date" type="date" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-1 text-sm font-bold">Guest count
              <input name="guest_count" type="number" min="1" max="100000" placeholder="12" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-bold">Budget minimum
              <input name="budget_min" type="number" min="0" placeholder="900" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
            <label className="grid gap-1 text-sm font-bold">Budget maximum
              <input name="budget_max" type="number" min="0" placeholder="1500" className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
          </div>

          <div className="border-t border-black/10 pt-5">
            <h2 className="text-lg font-black">How should professionals reach you?</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-sm font-bold">Name
                <input name="name" required maxLength={120} className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
              </label>
              <label className="grid gap-1 text-sm font-bold">Email
                <input name="email" type="email" required maxLength={254} className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
              </label>
            </div>
            <label className="mt-4 grid gap-1 text-sm font-bold">Phone
              <input name="phone" maxLength={50} className="rounded-lg border border-black/15 px-3 py-3 font-normal" />
            </label>
          </div>

          <button className="rounded-lg bg-[#135DFF] px-5 py-4 text-base font-black text-white shadow-lg shadow-blue-900/10 hover:bg-[#104de0]">Post to The Board</button>
          <p className="text-xs leading-5 text-black/50">Only the opportunity details are public. Your contact information stays private and is used to deliver responses.</p>
        </form>
      </section>
    </main>
  );
}
