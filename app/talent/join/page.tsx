import Link from 'next/link';

const roles=[
  ['prep','PREP'],['line','LINE'],['banquet','BANQUET'],['server','SERVER'],['bar','BAR'],
  ['dish','DISH'],['lead','LEAD'],['runner','RUNNER'],['setup','SETUP'],['breakdown','BREAKDOWN']
];

export default async function CrewJoinPage({searchParams}:{searchParams:Promise<{submitted?:string}>}){
  const params=await searchParams;
  const submitted=params.submitted==='1';

  return (
    <main className="min-h-screen bg-[#171310] text-white">
      <header className="border-b border-white/20">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
          <Link href="/" className="text-xs font-black uppercase text-white/45">Client Marketplace →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        {submitted?(
          <div className="border-2 border-white bg-white p-7 text-[#171310]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Crew Pass received</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">You’re in the crew review queue.</h1>
            <p className="mt-3 text-sm leading-6 text-black/55">Crew Passes are separate from customer-facing Pro Cards. Workforce information stays in Talent.</p>
            <Link href="/talent" className="mt-5 inline-block border-2 border-[#171310] bg-[#171310] px-4 py-3 text-sm font-black text-white">Back to Talent →</Link>
          </div>
        ):(
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#D4A64F]">Crew Pass</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.055em]">Build your work identity.</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55">This profile is for jobs and ALL DAY shifts only. It does not become a customer-facing chef or catering card.</p>

            <form action="/api/talent/crew" method="post" encType="multipart/form-data" className="mt-7 grid gap-5 border-2 border-white bg-[#F8F4EA] p-6 text-[#171310]">
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Work name<input name="display_name" required maxLength={120} className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Years experience<input name="years_experience" type="number" min="0" max="80" className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <fieldset>
                <legend className="text-sm font-black">Roles you actually work</legend>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
                  {roles.map(([value,label])=><label key={value} className="flex items-center gap-2 border border-[#171310] bg-white p-3 text-xs font-black"><input type="checkbox" name="roles" value={value}/>{label}</label>)}
                </div>
              </fieldset>

              <div className="border-2 border-dashed border-[#171310] bg-white p-4">
                <label className="grid gap-2 text-sm font-black">Crew Pass photo
                  <input name="profile_image" type="file" accept="image/jpeg,image/png,image/webp" className="block w-full text-sm font-normal file:mr-4 file:border-2 file:border-[#171310] file:bg-[#F8F4EA] file:px-4 file:py-2 file:font-black"/>
                </label>
                <p className="mt-2 text-xs text-black/50">JPG, PNG or WebP up to 5 MB.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <label className="grid gap-1 text-sm font-black">City<input name="city" required className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">State<input name="state" className="border-2 border-[#171310] p-3 font-normal"/></label>
                <label className="grid gap-1 text-sm font-black">Travel radius (miles)<input name="travel_radius_miles" type="number" min="0" className="border-2 border-[#171310] p-3 font-normal"/></label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Availability
                  <select name="availability_status" className="border-2 border-[#171310] bg-white p-3 font-normal">
                    <option value="available">Available</option><option value="limited">Limited</option><option value="unavailable">Unavailable</option>
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-black">Transportation
                  <select name="transportation_status" className="border-2 border-[#171310] bg-white p-3 font-normal">
                    <option value="">Prefer not to list</option><option value="own">Own transportation</option><option value="rideshare">Rideshare</option><option value="public-transit">Public transit</option><option value="other">Other</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-1 text-sm font-black">Certifications
                <input name="certifications" placeholder="ServSafe, alcohol service, food handler..." className="border-2 border-[#171310] p-3 font-normal"/>
              </label>

              <div className="border-t-2 border-[#171310] pt-5">
                <h2 className="text-xl font-black">Private contact information</h2>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <input name="contact_name" required className="border-2 border-[#171310] p-3" placeholder="Legal / contact name"/>
                  <input name="contact_email" type="email" required className="border-2 border-[#171310] p-3" placeholder="Email"/>
                </div>
                <input name="contact_phone" className="mt-4 w-full border-2 border-[#171310] p-3" placeholder="Phone"/>
              </div>

              <button className="border-2 border-[#171310] bg-[#D4A64F] p-4 text-sm font-black uppercase shadow-[4px_4px_0_#135DFF]">Create Crew Pass →</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
