import Link from 'next/link';

export default async function PostJobPage({searchParams}:{searchParams:Promise<{submitted?:string}>}){
  const params=await searchParams;
  const submitted=params.submitted==='1';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
          <Link href="/talent/jobs" className="text-xs font-black uppercase text-white/55">Find Jobs →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        {submitted ? (
          <div className="border-2 border-[#171310] bg-white p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Job posted</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">Your listing is live for 30 days.</h1>
            <p className="mt-3 text-sm leading-6 text-black/55">Filled or closed roles come off the open board immediately. Expired jobs must be renewed rather than living forever.</p>
            <Link href="/talent/jobs" className="mt-5 inline-block border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-sm font-black text-white">Open Jobs Board →</Link>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Talent / Post a Job</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.055em]">Hire for the kitchen.</h1>
            <p className="mt-3 text-sm leading-6 text-black/55">This is for regular culinary employment. Need someone for one shift? Use ALL DAY instead.</p>

            <form action="/api/talent/jobs" method="post" className="mt-7 grid gap-5 border-2 border-[#171310] bg-white p-6">
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Role<input name="role" required className="border-2 border-[#171310] p-3 font-normal" placeholder="Sous Chef"/></label>
                <label className="grid gap-1 text-sm font-black">Company / operator<input name="company_name" required className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">City<input name="city" required className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">State<input name="state" className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Employment type
                  <select name="employment_type" className="border-2 border-[#171310] bg-white p-3 font-normal">
                    <option value="full-time">Full-time</option><option value="part-time">Part-time</option><option value="seasonal">Seasonal</option><option value="temporary">Temporary</option><option value="contract">Contract</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">Pay type
                  <select name="pay_type" className="border-2 border-[#171310] bg-white p-3 font-normal">
                    <option value="hourly">Hourly</option><option value="salary">Salary</option><option value="daily">Daily</option><option value="flat">Flat</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-black">Pay minimum<input name="pay_min" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Pay maximum<input name="pay_max" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <label className="grid gap-1 text-sm font-black">Job description<textarea name="description" required rows={7} className="border-2 border-[#171310] p-3 font-normal"/></label>
              <label className="grid gap-1 text-sm font-black">Requirements<textarea name="requirements" rows={5} className="border-2 border-[#171310] p-3 font-normal" placeholder="Experience, certifications, schedule, physical requirements, etc."/></label>

              <div className="border-t-2 border-[#171310] pt-5">
                <h2 className="text-xl font-black">Private hiring contact</h2>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <input name="contact_name" required className="border-2 border-[#171310] p-3" placeholder="Contact name"/>
                  <input name="contact_email" type="email" required className="border-2 border-[#171310] p-3" placeholder="Email"/>
                </div>
                <input name="contact_phone" className="mt-4 w-full border-2 border-[#171310] p-3" placeholder="Phone"/>
              </div>

              <div className="border-2 border-[#D4A64F] bg-[#FFF7DC] p-4 text-xs font-bold leading-5">
                Job listings expire after 30 days. This keeps Find Jobs current and prevents dead roles from staying open forever.
              </div>

              <button className="border-2 border-[#171310] bg-[#135DFF] p-4 text-sm font-black uppercase text-white shadow-[4px_4px_0_#171310]">Post 30-Day Job →</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
