import Link from 'next/link';

export default async function PostWorkPage({ searchParams }: { searchParams: Promise<{ type?: string; submitted?: string }> }) {
  const params = await searchParams;
  const type = params.type === 'shift' ? 'shift' : 'job';
  const submitted = params.submitted === '1';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        {submitted ? (
          <div className="border-2 border-[#171310] bg-white p-7">
            <h1 className="text-4xl font-black">Work posted.</h1>
            <p className="mt-2 text-sm text-black/55">The opportunity is now in the Talent marketplace.</p>
            <Link href="/talent" className="mt-5 inline-block font-black text-[#135DFF]">Back to Talent →</Link>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Post work</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.05em]">Who do you need?</h1>

            <form action="/api/talent" method="post" className="mt-6 grid gap-4 border-2 border-[#171310] bg-white p-6">
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off" /></div>

              <label className="grid gap-1 text-sm font-black">Type
                <select name="opportunity_type" defaultValue={type} className="border-2 border-[#171310] p-3 font-normal">
                  <option value="job">Job</option>
                  <option value="shift">Shift / ALL DAY</option>
                </select>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Role
                  <input name="role" required className="border-2 border-[#171310] p-3 font-normal" placeholder="Prep Cook" />
                </label>
                <label className="grid gap-1 text-sm font-black">Company / operator
                  <input name="company_name" required className="border-2 border-[#171310] p-3 font-normal" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">City
                  <input name="city" required className="border-2 border-[#171310] p-3 font-normal" />
                </label>
                <label className="grid gap-1 text-sm font-black">State
                  <input name="state" className="border-2 border-[#171310] p-3 font-normal" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">Date
                  <input name="work_date" type="date" className="border-2 border-[#171310] p-3 font-normal" />
                </label>
                <label className="grid gap-1 text-sm font-black">Start
                  <input name="start_time" type="time" className="border-2 border-[#171310] p-3 font-normal" />
                </label>
                <label className="grid gap-1 text-sm font-black">End
                  <input name="end_time" type="time" className="border-2 border-[#171310] p-3 font-normal" />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">Pay type
                  <select name="pay_type" className="border-2 border-[#171310] p-3 font-normal">
                    <option value="hourly">Hourly</option><option value="flat">Flat</option><option value="daily">Daily</option><option value="salary">Salary</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-black">Pay minimum
                  <input name="pay_min" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal" />
                </label>
                <label className="grid gap-1 text-sm font-black">Pay maximum
                  <input name="pay_max" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal" />
                </label>
              </div>

              <label className="grid gap-1 text-sm font-black">Details
                <textarea name="description" required rows={6} className="border-2 border-[#171310] p-3 font-normal" />
              </label>

              <div className="border-t-2 border-[#171310] pt-4">
                <h2 className="text-lg font-black">Private contact info</h2>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <input name="contact_name" required className="border-2 border-[#171310] p-3" placeholder="Contact name" />
                  <input name="contact_email" type="email" required className="border-2 border-[#171310] p-3" placeholder="Email" />
                </div>
                <input name="contact_phone" className="mt-4 w-full border-2 border-[#171310] p-3" placeholder="Phone" />
              </div>

              <button className="border-2 border-[#171310] bg-[#135DFF] p-4 font-black uppercase text-white">Post Work →</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
