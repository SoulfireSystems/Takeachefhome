import Link from 'next/link';

export default async function PostShiftPage({searchParams}:{searchParams:Promise<{submitted?:string}>}){
  const params=await searchParams;
  const submitted=params.submitted==='1';

  return (
    <main className="min-h-screen bg-[#171310] text-white">
      <header className="border-b border-white/20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/talent/all-day" className="text-2xl font-black">TakeAChefHome / Talent / <span className="text-[#D4A64F]">ALL DAY</span></Link>
          <Link href="/talent" className="text-xs font-black uppercase text-white/45">Talent home →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        {submitted ? (
          <div className="border-2 border-white bg-white p-7 text-[#171310]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Call Sheet posted</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">Your shift is on ALL DAY.</h1>
            <p className="mt-3 text-sm leading-6 text-black/55">It remains visible only while the work is relevant. Filled and closed shifts disappear immediately, and past-date shifts are removed from the open board.</p>
            <Link href="/talent/all-day" className="mt-5 inline-block border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-sm font-black text-white">Open ALL DAY →</Link>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">ALL DAY / New Call Sheet</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.055em]">Staff the shift.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">Built for urgent crew needs. Date, call time, rate and requirements first — no long employment application.</p>

            <form action="/api/talent/shifts" method="post" className="mt-7 grid gap-5 border-2 border-white bg-[#F8F4EA] p-6 text-[#171310]">
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Role needed<input name="role" required className="border-2 border-[#171310] p-3 font-normal" placeholder="Banquet Prep Cook"/></label>
                <label className="grid gap-1 text-sm font-black">Company / operator<input name="company_name" required className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <label className="grid gap-1 text-sm font-black">Work date<input name="work_date" type="date" required className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Call time<input name="start_time" type="time" required className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">End time<input name="end_time" type="time" required className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Workers needed<input name="workers_needed" type="number" min="1" required className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">City<input name="city" required className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">State<input name="state" className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Venue / area<input name="venue_area" className="border-2 border-[#171310] p-3 font-normal" placeholder="Downtown hotel"/></label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">Pay type
                  <select name="pay_type" className="border-2 border-[#171310] bg-white p-3 font-normal">
                    <option value="hourly">Hourly</option><option value="daily">Daily</option><option value="flat">Flat</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-black">Rate minimum<input name="pay_min" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Rate maximum<input name="pay_max" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <label className="grid gap-1 text-sm font-black">Key duties<textarea name="description" required rows={5} className="border-2 border-[#171310] p-3 font-normal" placeholder="Prep, plating, station support, breakdown..."/></label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Uniform<textarea name="uniform" rows={4} className="border-2 border-[#171310] p-3 font-normal" placeholder="Black pants, nonslip shoes, chef coat provided..."/></label>
                <label className="grid gap-1 text-sm font-black">Requirements<textarea name="requirements" rows={4} className="border-2 border-[#171310] p-3 font-normal" placeholder="Experience, certifications, tools..."/></label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Arrival instructions<textarea name="arrival_instructions" rows={4} className="border-2 border-[#171310] p-3 font-normal" placeholder="Employee entrance, loading dock, check-in contact..."/></label>
                <label className="grid gap-1 text-sm font-black">Parking / access notes<textarea name="parking_notes" rows={4} className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <div className="border-t-2 border-[#171310] pt-5">
                <h2 className="text-xl font-black">Private operator contact</h2>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <input name="contact_name" required className="border-2 border-[#171310] p-3" placeholder="Contact name"/>
                  <input name="contact_email" type="email" required className="border-2 border-[#171310] p-3" placeholder="Email"/>
                </div>
                <input name="contact_phone" className="mt-4 w-full border-2 border-[#171310] p-3" placeholder="Phone"/>
              </div>

              <button className="border-2 border-[#171310] bg-[#D4A64F] p-4 text-sm font-black uppercase shadow-[4px_4px_0_#135DFF]">Publish Call Sheet →</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
