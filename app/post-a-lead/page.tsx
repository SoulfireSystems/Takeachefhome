import Link from 'next/link';

const allowedCategories=new Set(['private-chef','catering','meal-prep','food-truck','experience','class','kitchen-space','cold-storage']);

function single(value:string|string[]|undefined){
  return Array.isArray(value)?value[0]:value||'';
}

export default async function PostALeadPage({searchParams}:{searchParams:Promise<{category?:string|string[]}>}){
  const params=await searchParams;
  const requestedCategory=single(params.category);
  const defaultCategory=allowedCategories.has(requestedCategory)?requestedCategory:'private-chef';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
          <div className="flex gap-4 text-sm font-black">
            <Link href="/providers">Find a Pro</Link>
            <Link href="/board" className="text-[#135DFF]">The Board →</Link>
          </div>
        </div>
      </header>

      <section className="border-b-2 border-[#171310] bg-[#135DFF] text-white">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#F3D37C]">Post a real opportunity</p>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">Tell the market what you need.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">Service. Place. Date. Budget. Details. Your contact information stays private while professionals respond.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-4 py-8 lg:grid-cols-[1fr_250px]">
        <form method="post" action="/api/leads" className="grid gap-5 border-2 border-[#171310] bg-white p-5 sm:p-6">
          <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">What do you need?
              <select name="category" required defaultValue={defaultCategory} className="border-2 border-[#171310] bg-white px-3 py-3 text-sm font-bold normal-case tracking-normal">
                <option value="private-chef">Private Chef</option>
                <option value="catering">Catering</option>
                <option value="meal-prep">Meal Prep</option>
                <option value="food-truck">Food Truck</option>
                <option value="experience">Food Experience</option>
                <option value="class">Cooking Class</option>
                <option value="kitchen-space">Kitchen Space</option>
                <option value="cold-storage">Cold Storage</option>
              </select>
            </label>

            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Request title
              <input name="title" required maxLength={140} placeholder="Birthday dinner for 12" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
          </div>

          <label className="grid gap-1 text-xs font-black uppercase tracking-wide">The details
            <textarea name="description" required maxLength={5000} rows={7} placeholder="Menu direction, service style, timing, allergies, venue, kitchen setup, storage needs or anything the professional should know." className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
          </label>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">City
              <input name="city" required maxLength={100} placeholder="Raleigh" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">State
              <input name="state" maxLength={50} placeholder="NC" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Date
              <input name="event_date" type="date" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Guest count
              <input name="guest_count" type="number" min="1" max="100000" placeholder="12" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Budget minimum
              <input name="budget_min" type="number" min="0" placeholder="900" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
            <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Budget maximum
              <input name="budget_max" type="number" min="0" placeholder="1500" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
          </div>

          <div className="border-t-2 border-[#171310] pt-5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Private contact information</p>
            <h2 className="mt-1 text-xl font-black">Where should responses go?</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Name
                <input name="name" required maxLength={120} className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
              </label>
              <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Email
                <input name="email" type="email" required maxLength={254} className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
              </label>
            </div>
            <label className="mt-4 grid gap-1 text-xs font-black uppercase tracking-wide">Phone
              <input name="phone" maxLength={50} className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/>
            </label>
          </div>

          <button className="border-2 border-[#171310] bg-[#135DFF] px-5 py-4 text-sm font-black uppercase text-white shadow-[4px_4px_0_#171310]">Put It On The Board →</button>
        </form>

        <aside className="h-fit border-2 border-[#171310] bg-[#171310] p-5 text-white">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">What happens next</p>
          <div className="mt-5 space-y-5">
            <div><span className="text-xs font-black text-[#D4A64F]">01</span><h3 className="mt-1 font-black">Request posts</h3><p className="mt-1 text-xs leading-5 text-white/50">Only the opportunity details appear publicly.</p></div>
            <div><span className="text-xs font-black text-[#D4A64F]">02</span><h3 className="mt-1 font-black">Pros respond</h3><p className="mt-1 text-xs leading-5 text-white/50">Responses and contact details stay private.</p></div>
            <div><span className="text-xs font-black text-[#D4A64F]">03</span><h3 className="mt-1 font-black">You choose</h3><p className="mt-1 text-xs leading-5 text-white/50">Compare fit, scope and pricing before moving forward.</p></div>
          </div>
        </aside>
      </section>
    </main>
  );
}
