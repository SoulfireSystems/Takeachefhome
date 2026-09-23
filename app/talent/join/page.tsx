import Link from 'next/link';

export default async function JoinTalentPage({ searchParams }:{ searchParams:Promise<{submitted?:string}> }) {
  const params = await searchParams;
  const submitted = params.submitted === '1';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/talent" className="text-2xl font-black tracking-[-0.045em]">TakeAChefHome / <span className="text-[#D4A64F]">Talent</span></Link>
          <Link href="/" className="text-xs font-black uppercase text-white/60">Client marketplace →</Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-10">
        {submitted ? (
          <div className="border-2 border-[#171310] bg-white p-7">
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Profile received</p>
            <h1 className="mt-2 text-4xl font-black tracking-[-0.04em]">You’re in the review queue.</h1>
            <p className="mt-3 text-sm leading-6 text-black/60">We review new listings before they appear publicly. No fake profiles, no instant spam directory.</p>
            <div className="mt-5 flex gap-3">
              <Link href="/talent" className="border-2 border-[#171310] bg-[#171310] px-4 py-3 text-sm font-black text-white">Back to Talent</Link>
              <Link href="/providers" className="border-2 border-[#171310] bg-white px-4 py-3 text-sm font-black">Browse Directory</Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Get listed</p>
            <h1 className="mt-2 text-5xl font-black tracking-[-0.055em]">Build your marketplace profile.</h1>
            <p className="mt-3 text-sm leading-6 text-black/60">One professional profile is the beginning of how clients discover you across TakeAChefHome.</p>

            <form method="post" action="/api/providers" encType="multipart/form-data" className="mt-7 grid gap-5 border-2 border-[#171310] bg-white p-6">
              <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off" /></div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Business / display name<input name="display_name" required maxLength={120} className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-black">Professional type
                  <select name="professional_type" className="border-2 border-[#171310] bg-white px-3 py-3 font-normal">
                    <option value="chef">Chef</option><option value="caterer">Caterer</option><option value="meal-prep">Meal Prep</option><option value="food-truck">Food Truck</option><option value="instructor">Instructor</option><option value="culinary-business">Culinary Business</option>
                  </select>
                </label>
              </div>

              <fieldset>
                <legend className="text-sm font-black">Services</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {[
                    ['private-chef','Private Chef'],['catering','Catering'],['meal-prep','Meal Prep'],['food-truck','Food Truck'],['experience','Experiences'],['class','Cooking Classes']
                  ].map(([value,label]) => <label key={value} className="flex items-center gap-2 border border-black/20 p-3 text-sm font-bold"><input type="checkbox" name="services" value={value}/>{label}</label>)}
                </div>
              </fieldset>

              <div className="border-2 border-dashed border-[#171310] bg-[#F8F4EA] p-4">
                <label className="grid gap-2 text-sm font-black">Profile photo
                  <input name="profile_image" type="file" accept="image/jpeg,image/png,image/webp" className="block w-full text-sm font-normal file:mr-4 file:border-2 file:border-[#171310] file:bg-white file:px-4 file:py-2 file:font-black" />
                </label>
                <p className="mt-2 text-xs leading-5 text-black/50">Upload a JPG, PNG or WebP up to 5 MB. No pasted image URL required.</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">City<input name="city" required className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-black">State<input name="state" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
              </div>

              <label className="grid gap-1 text-sm font-black">About your work<textarea name="bio" required rows={6} maxLength={3000} className="border-2 border-[#171310] px-3 py-3 font-normal" placeholder="What do you do, who do you serve, and what makes your work distinct?" /></label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Years experience<input name="years_experience" type="number" min="0" max="80" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-black">Starting price / minimum<input name="starting_price" type="number" min="0" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-1 text-sm font-black">Website<input name="website_url" type="url" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
                <label className="grid gap-1 text-sm font-black">Instagram / social URL<input name="instagram_url" type="url" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
              </div>

              <div className="border-t-2 border-[#171310] pt-5">
                <h2 className="text-xl font-black">Private contact info</h2>
                <p className="mt-1 text-xs text-black/50">Used for account and listing communication. Not displayed in the public directory.</p>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  <label className="grid gap-1 text-sm font-black">Contact name<input name="contact_name" required className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
                  <label className="grid gap-1 text-sm font-black">Email<input name="contact_email" required type="email" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
                </div>
                <label className="mt-4 grid gap-1 text-sm font-black">Phone<input name="contact_phone" className="border-2 border-[#171310] px-3 py-3 font-normal" /></label>
              </div>

              <button className="border-2 border-[#171310] bg-[#135DFF] px-5 py-4 text-sm font-black uppercase text-white shadow-[4px_4px_0_#171310]">Submit Profile →</button>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
