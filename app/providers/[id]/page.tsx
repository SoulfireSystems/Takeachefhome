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
      .select('id,card_number,card_name,display_name,professional_title,professional_type,cuisine_style,services,city,state,bio,years_experience,starting_price,profile_image_url,website_url,instagram_url,verified,status,career_highlights,specialties,credentials,markets_worked,max_guests,training_institution,graduation_year')
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
  const publicName=provider.card_name||provider.display_name;
  const story=String(provider.bio||'').split(/\n\s*\n/).filter(Boolean);

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
          <Link href={'/post-a-lead?category='+encodeURIComponent(requestCategory)} className="border-2 border-[#171310] bg-[#135DFF] px-4 py-2 text-sm font-black text-white shadow-[3px_3px_0_#171310]">Post Request</Link>
        </div>
      </header>

      <section className="exchange-paper border-b-2 border-[#171310]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 lg:grid-cols-[390px_1fr] lg:px-6 lg:py-12">
          <div className="lg:sticky lg:top-6 lg:self-start">
            <div className="pro-card">
              <div className="relative aspect-[5/6] overflow-hidden border-b-2 border-[#171310] bg-[#171310]">
                {provider.profile_image_url?(
                  <img src={provider.profile_image_url} alt={publicName} className="h-full w-full object-cover"/>
                ):(
                  <div className="flex h-full items-end bg-[linear-gradient(145deg,#135DFF,#171310)] p-6 text-8xl font-black tracking-[-0.07em] text-white/20">{publicName.slice(0,2).toUpperCase()}</div>
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
                  <h1 className="mt-1 text-3xl font-black leading-none tracking-[-0.055em]">{publicName}</h1>
                  {provider.cuisine_style&&<p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-[#F3D37C]">{provider.cuisine_style}</p>}
                </div>
              </div>

              <div className="bg-[#F8F4EA] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] text-black/40">Home market</p>
                    <p className="mt-1 text-lg font-black">{provider.city}{provider.state?', '+provider.state:''}</p>
                  </div>
                  <strong className="text-lg text-[#135DFF]">TACH</strong>
                </div>

                <div className="mt-4 grid grid-cols-3 border-l border-t border-[#171310] text-center">
                  <div className="border-b border-r border-[#171310] p-3">
                    <strong className="block text-xl">{provider.years_experience?provider.years_experience+'+':'—'}</strong>
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

                <div className="mt-4 flex flex-wrap gap-1">
                  {(provider.services||[]).slice(0,4).map((item:string)=>(
                    <span key={item} className="border border-[#171310] bg-white px-2 py-1 text-[8px] font-black uppercase tracking-wide">{item.replaceAll('-',' ')}</span>
                  ))}
                </div>

                <div className="mt-4 border-t border-black/20 pt-3 text-[8px] font-black uppercase tracking-[0.16em] text-black/40">
                  Culinary Exchange · Series 01
                </div>
              </div>
            </div>
          </div>

          <div>
            <section className="border-2 border-[#171310] bg-[#171310] p-6 text-white">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#D4A64F]">Card Back / Official Record</p>
                  <h2 className="mt-2 text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl">{provider.display_name}</h2>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.16em] text-white/45">
                    {provider.professional_title||provider.professional_type?.replaceAll('-',' ')}
                    {provider.cuisine_style?' · '+provider.cuisine_style:''}
                  </p>
                </div>
                <span className="text-5xl font-black tracking-[-0.06em] text-white/15">#{cardNo(provider.card_number)}</span>
              </div>
            </section>

            <section className="border-x-2 border-b-2 border-[#171310] bg-white p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">The Story</p>
              <div className="mt-4 space-y-4">
                {story.map((paragraph:string,index:number)=>(
                  <p key={index} className="text-[15px] leading-7 text-black/68">{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="mt-7">
              <div className="border-b-2 border-[#171310] pb-2">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">The Numbers</p>
                <h3 className="text-3xl font-black tracking-[-0.045em]">Career at a glance.</h3>
              </div>

              <div className="mt-4 grid border-l-2 border-t-2 border-[#171310] bg-white grid-cols-2 lg:grid-cols-4">
                <div className="border-b-2 border-r-2 border-[#171310] p-4">
                  <strong className="block text-3xl font-black tracking-[-0.05em]">{provider.years_experience?provider.years_experience+'+':'—'}</strong>
                  <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Years in the game</span>
                </div>
                <div className="border-b-2 border-r-2 border-[#171310] p-4">
                  <strong className="block text-3xl font-black tracking-[-0.05em]">{provider.max_guests?Number(provider.max_guests).toLocaleString():'—'}</strong>
                  <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Largest event</span>
                </div>
                <div className="border-b-2 border-r-2 border-[#171310] p-4">
                  <strong className="block text-3xl font-black tracking-[-0.05em]">{provider.graduation_year||'—'}</strong>
                  <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Johnson & Wales</span>
                </div>
                <div className="border-b-2 border-r-2 border-[#171310] p-4">
                  <strong className="block text-3xl font-black tracking-[-0.05em]">{provider.services?.length??0}</strong>
                  <span className="text-[8px] font-black uppercase tracking-[0.16em] text-black/40">Bookable lanes</span>
                </div>
              </div>
            </section>

            {(provider.career_highlights||[]).length>0&&(
              <section className="mt-8">
                <div className="border-b-2 border-[#171310] pb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Career Tape</p>
                  <h3 className="text-3xl font-black tracking-[-0.045em]">The receipts.</h3>
                </div>
                <div className="mt-4 border-2 border-[#171310] bg-[#171310] text-white">
                  {(provider.career_highlights||[]).map((item:string,index:number)=>(
                    <div key={item} className={'grid grid-cols-[58px_1fr] '+(index?'border-t border-white/20':'')}>
                      <div className="flex items-center justify-center border-r border-white/20 bg-[#D4A64F] p-3 text-lg font-black text-[#171310]">{String(index+1).padStart(2,'0')}</div>
                      <div className="p-4 text-sm font-bold leading-6">{item}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {(provider.specialties||[]).length>0&&(
              <section className="mt-8">
                <div className="border-b-2 border-[#171310] pb-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">The Range</p>
                  <h3 className="text-3xl font-black tracking-[-0.045em]">What the career covers.</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(provider.specialties||[]).map((item:string)=>(
                    <span key={item} className="border-2 border-[#171310] bg-white px-3 py-2 text-xs font-black uppercase tracking-wide">{item}</span>
                  ))}
                </div>
              </section>
            )}

            {(provider.credentials||[]).length>0&&(
              <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
                <div>
                  <div className="border-b-2 border-[#171310] pb-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#135DFF]">Credentials</p>
                    <h3 className="text-3xl font-black tracking-[-0.045em]">Training & qualification.</h3>
                  </div>
                  <div className="mt-4 border-2 border-[#171310] bg-white">
                    {(provider.credentials||[]).map((item:string,index:number)=>(
                      <div key={item} className={'p-4 text-sm font-black '+(index?'border-t border-[#171310]':'')}>{item}</div>
                    ))}
                  </div>
                </div>

                <aside className="h-fit border-2 border-[#171310] bg-[#D4A64F] p-5 shadow-[5px_5px_0_#171310]">
                  <p className="text-[9px] font-black uppercase tracking-[0.22em]">Starting minimum</p>
                  <p className="mt-1 text-4xl font-black tracking-[-0.055em]">{money(provider.starting_price)}</p>
                  <p className="mt-3 text-sm font-bold leading-6 text-black/60">Private dining, catering, culinary experiences and select travel work.</p>
                  <Link href={'/post-a-lead?category='+encodeURIComponent(requestCategory)} className="mt-5 block border-2 border-[#171310] bg-[#135DFF] px-4 py-4 text-center text-xs font-black uppercase tracking-[0.12em] text-white">Request This Pro →</Link>
                </aside>
              </section>
            )}

            {(provider.markets_worked||[]).length>0&&(
              <section className="mt-8 border-2 border-[#171310] bg-[#F8F4EA] p-5">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40">Markets worked</p>
                <p className="mt-2 text-sm font-black leading-6">{(provider.markets_worked||[]).join(' · ')}</p>
              </section>
            )}

            {(provider.website_url||provider.instagram_url)&&(
              <div className="mt-8 flex flex-wrap gap-2">
                {provider.website_url&&<a href={provider.website_url} target="_blank" rel="noreferrer" className="border-2 border-[#171310] bg-white px-4 py-3 text-xs font-black uppercase">Website ↗</a>}
                {provider.instagram_url&&<a href={provider.instagram_url} target="_blank" rel="noreferrer" className="border-2 border-[#171310] bg-white px-4 py-3 text-xs font-black uppercase">Social ↗</a>}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
