import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getSupabaseServer } from '@/lib/supabaseServer';

export const dynamic='force-dynamic';

function cardNo(value:number|null|undefined){
  return String(value??0).padStart(3,'0');
}

function money(value:number|null){
  return value ? '$'+Number(value).toLocaleString() : 'Open';
}

async function loadProvider(id:string){
  try{
    const supabase=getSupabaseServer();
    const {data,error}=await supabase
      .from('provider_profiles')
      .select('id,card_number,display_name,professional_title,professional_type,services,city,state,bio,years_experience,starting_price,profile_image_url,website_url,instagram_url,verified,status')
      .eq('id',id)
      .eq('status','active')
      .single();
    if(error||!data) return null;
    return data;
  }catch{
    return null;
  }
}

export default async function ProviderPage({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const provider:any=await loadProvider(id);
  if(!provider) notFound();

  const requestCategory=(provider.services||[])[0]||'private-chef';

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <div className="border-b-2 border-[#171310] bg-[#171310] text-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-white/45">Pro Card #{cardNo(provider.card_number)}</span>
          <Link href="/providers" className="text-[#D4A64F]">← Back to The Roster</Link>
        </div>
      </div>

      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-4">
          <Link href="/" className="text-3xl font-black tracking-[-0.06em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link>
          <Link href="/post-a-lead" className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0_#171310]">Post Request</Link>
        </div>
      </header>

      <section className="exchange-paper border-b-2 border-[#171310]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 lg:grid-cols-[390px_1fr] lg:px-6 lg:py-12">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="pro-card">
              <div className="relative aspect-[5/6] overflow-hidden border-b-2 border-[#171310] bg-[#171310]">
                {provider.profile_image_url?(
                  <img src={provider.profile_image_url} alt={provider.display_name} className="h-full w-full object-cover"/>
                ):(
                  <div className="flex h-full items-end bg-[linear-gradient(145deg,#135DFF,#171310)] p-6 text-8xl font-black tracking-[-0.07em] text-white/20">{provider.display_name.slice(0,2).toUpperCase()}</div>
                )}

                <div className="absolute left-4 top-4 border-2 border-[#171310] bg-[#F8F4EA] px-3 py-2">
                  <span className="block text-[8px] font-black uppercase tracking-[0.2em]">Card</span>
                  <strong className="pro-card-number block text-2xl leading-none">#{cardNo(provider.card_number)}</strong>
                </div>

                {provider.verified&&(
                  <div className="pro-card-foil absolute right-4 top-4 border-2 border-[#171310] px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em]">Verified</div>
                )}

                <div className="absolute inset-x-4 bottom-4 border-2 border-[#171310] bg-[#135DFF] px-4 py-3 text-white">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/65">{provider.professional_title||provider.professional_type?.replaceAll('-',' ')}</p>
                  <h1 className="mt-1 text-3xl font-black leading-none tracking-[-0.055em]">{provider.display_name}</h1>
                </div>
              </div>

              <div className="bg-[#F8F4EA] p-5">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Home market</p>
                <p className="mt-1 text-lg font-black">{provider.city}{provider.state?', '+provider.state:''}</p>

                <div className="mt-4 grid grid-cols-3 border-l border-t border-[#171310] text-center">
                  <div className="border-b border-r border-[#171310] p-3">
                    <strong className="block text-xl">{provider.years_experience??'—'}</strong>
                    <span className="text-[7px] font-black uppercase tracking-wide text-black/45">Years</span>
                  </div>
                  <div className="border-b border-r border-[#171310] p-3">
                    <strong className="block text-xl">{provider.services?.length??0}</strong>
                    <span className="text-[7px] font-black uppercase tracking-wide text-black/45">Services</span>
                  </div>
                  <div className="border-b border-r border-[#171310] p-3">
                    <strong className="block text-base">{money(provider.starting_price)}</strong>
                    <span className="text-[7px] font-black uppercase tracking-wide text-black/45">Starts</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-black/20 pt-3">
                  <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Culinary Exchange</span>
                  <strong className="text-lg text-[#135DFF]">TACH</strong>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="border-2 border-[#171310] bg-[#171310] p-6 text-white">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Card back / Profile record</p>
                  <h2 className="mt-2 text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">{provider.display_name}</h2>
                </div>
                <span className="text-5xl font-black tracking-[-0.06em] text-white/15">#{cardNo(provider.card_number)}</span>
              </div>

              <p className="mt-5 max-w-3xl text-base leading-7 text-white/65">{provider.bio}</p>
            </div>

            <div className="grid border-x-2 border-b-2 border-[#171310] bg-white sm:grid-cols-3">
              <div className="border-b-2 border-[#171310] p-4 sm:border-b-0 sm:border-r-2">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Position</p>
                <p className="mt-1 text-lg font-black capitalize">{provider.professional_title||provider.professional_type?.replaceAll('-',' ')}</p>
              </div>
              <div className="border-b-2 border-[#171310] p-4 sm:border-b-0 sm:border-r-2">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Experience</p>
                <p className="mt-1 text-lg font-black">{provider.years_experience?provider.years_experience+' years':'Not listed'}</p>
              </div>
              <div className="p-4">
                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Starting minimum</p>
                <p className="mt-1 text-lg font-black">{money(provider.starting_price)}</p>
              </div>
            </div>

            <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_280px]">
              <section>
                <div className="border-b-2 border-[#171310] pb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Service positions</p>
                  <h3 className="text-3xl font-black tracking-[-0.045em]">What they handle.</h3>
                </div>
                <div className="mt-4 grid sm:grid-cols-2">
                  {(provider.services||[]).map((item:string,index:number)=>(
                    <div key={item} className="border-b-2 border-r-2 border-[#171310] bg-white p-4 first:border-l-2 odd:border-l-2 sm:odd:border-l-2 sm:even:border-l-0">
                      <span className="text-[9px] font-black text-[#135DFF]">0{index+1}</span>
                      <p className="mt-1 text-lg font-black capitalize">{item.replaceAll('-',' ')}</p>
                    </div>
                  ))}
                </div>

                {(provider.website_url||provider.instagram_url)&&(
                  <div className="mt-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Links</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {provider.website_url&&<a href={provider.website_url} target="_blank" rel="noreferrer" className="border-2 border-[#171310] bg-white px-4 py-3 text-xs font-black uppercase">Website ↗</a>}
                      {provider.instagram_url&&<a href={provider.instagram_url} target="_blank" rel="noreferrer" className="border-2 border-[#171310] bg-white px-4 py-3 text-xs font-black uppercase">Social ↗</a>}
                    </div>
                  </div>
                )}
              </section>

              <aside className="h-fit border-2 border-[#171310] bg-[#D4A64F] p-5 shadow-[5px_5px_0_#171310]">
                <p className="text-[9px] font-black uppercase tracking-[0.22em]">Want this pro?</p>
                <h3 className="mt-2 text-3xl font-black leading-[0.92] tracking-[-0.05em]">Put the work on the board.</h3>
                <p className="mt-3 text-sm font-bold leading-6 text-black/60">Post the date, city, scope and budget. The request stays private where it should.</p>
                <Link href={'/post-a-lead?category='+encodeURIComponent(requestCategory)} className="mt-5 block border-2 border-[#171310] bg-[#135DFF] px-4 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-white">Post Request →</Link>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
