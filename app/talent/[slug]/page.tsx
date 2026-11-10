import Link from 'next/link';
import { notFound } from 'next/navigation';

const pages: Record<string, { eyebrow:string; title:string; body:string; bullets:string[]; cta:string }> = {
  nationwide:{eyebrow:'Nationwide Talent Network',title:'YOUR CITY. YOUR SKILL. YOUR LANE.',body:'TakeAChefHome is building a nationwide network of culinary, hospitality, event and food-service professionals. Create one profile, tell us what you do, where you work, how far you travel, and what kinds of opportunities you want to hear about.',bullets:['Chefs + cooks','Servers + bartenders','Prep + production','Caterers + food businesses'],cta:'JOIN THE NATIONWIDE TALENT POOL'},
  raleigh:{eyebrow:'Raleigh Culinary Talent',title:"WE'RE BUILDING THE BENCH.",body:'TakeAChefHome is building its Raleigh-area talent network. Tell us what you do, when you are available, and what kind of opportunities you want.',bullets:['Chefs + cooks','Prep professionals','Servers + bartenders','Caterers + event crews'],cta:'JOIN THE RALEIGH TALENT POOL'},
  durham:{eyebrow:'Durham Culinary Talent',title:'YOUR LANE BELONGS IN THE NETWORK.',body:'TakeAChefHome is onboarding founding culinary, hospitality, event and food-service talent across the Durham area.',bullets:['Kitchen talent','Private + personal chefs','Event professionals','Independent food businesses'],cta:'JOIN THE DURHAM TALENT POOL'},
  'chapel-hill':{eyebrow:'Chapel Hill Culinary Talent',title:'GET DISCOVERED FOR WHAT YOU DO BEST.',body:'Join the growing TakeAChefHome talent network serving Chapel Hill and surrounding North Carolina markets.',bullets:['Chefs + cooks','Hospitality talent','Prep + production','Travel-ready professionals'],cta:'JOIN THE CHAPEL HILL TALENT POOL'},
  cary:{eyebrow:'Cary Culinary Talent',title:'FOUNDING TALENT ONBOARDING NOW.',body:'TakeAChefHome is building a deeper local bench for culinary, hospitality, events and independent food businesses.',bullets:['Kitchen professionals','Private chefs','Servers + bartenders','Culinary businesses'],cta:'JOIN THE CARY TALENT POOL'},
  chefs:{eyebrow:'Chefs',title:'MORE THAN ONE KIND OF CHEF WORK.',body:'Private clients. Events. Travel. Full-time roles. Production. Residencies. Build one profile that can grow with your career.',bullets:['Private + personal chefs','Executive + sous chefs','Travel + villa chefs','Specialty chefs'],cta:'JOIN THE CHEF NETWORK'},
  cooks:{eyebrow:'Cooks',title:'YOUR SKILL SHOULD TRAVEL FURTHER.',body:'Line cooks, prep cooks, banquet cooks, production cooks and specialists can join one network built around real food work.',bullets:['Pick-up work','Events','Part-time + full-time','Prep + production'],cta:'JOIN THE COOK NETWORK'},
  servers:{eyebrow:'Service Talent',title:'THE ROOM NEEDS PEOPLE WHO KNOW SERVICE.',body:'Join the TakeAChefHome network for event, banquet, hospitality and guest-experience opportunities as markets develop.',bullets:['Servers','Event captains','Banquet staff','Guest experience'],cta:'JOIN THE SERVICE NETWORK'},
  bartenders:{eyebrow:'Bartenders',title:'BUILD YOUR BAR LANE.',body:'Bartenders, mixologists, bar leads and barbacks can create a profile for event, hospitality and travel opportunities.',bullets:['Bartenders','Mixologists','Bar leads','Barbacks'],cta:'JOIN THE BARTENDER NETWORK'},
  catering:{eyebrow:'Catering + Events',title:'CREWS. OPERATORS. EVENT PROS.',body:'Catering chefs, assistants, event leads, banquet staff and independent caterers can all enter through the same network.',bullets:['Catering chefs','Event crews','Caterers','Operations talent'],cta:'JOIN THE CATERING NETWORK'},
  'prep-partners':{eyebrow:'Prep Your Shift™',title:'PREP IS PRODUCTION — NOT GENERIC STAFFING.',body:'Prep Partners take outsourced culinary prep and production to specification: cuts, portions, batches, sauces, pastry, packaging and more.',bullets:['Produce + protein prep','Batch + sauce production','Butchery + seafood','Packaging + labeling'],cta:'BECOME A PREP PARTNER'},
  'food-trucks':{eyebrow:'Food Businesses',title:'YOUR BUSINESS CAN BE PART OF THE NETWORK.',body:'Food trucks and mobile food operators can join TakeAChefHome as independent culinary businesses and grow toward marketplace visibility.',bullets:['Food trucks','Mobile vendors','Pop-ups','Specialty producers'],cta:'JOIN THE FOOD BUSINESS NETWORK'},
  travel:{eyebrow:'Travel Talent',title:'YOUR NEXT MARKET MAY NOT BE HOME.',body:'Tell TakeAChefHome you are open to destination events, villas, resorts, residencies, yachts and overnight travel opportunities.',bullets:['Destination events','Villa + vacation work','Chef residencies','Regional + international travel'],cta:'JOIN THE TRAVEL TALENT POOL'},
};


export function generateStaticParams(){ return Object.keys(pages).map(slug=>({slug})); }

export default async function RecruitingPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const page=pages[slug];
  if(!page) notFound();
  return <main className="min-h-screen bg-[#F5F7FB] text-[#101D31]">
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
        <Link href="/talent" className="text-lg font-black tracking-tight text-[#112C4E] sm:text-xl">TakeAChefHome<span className="text-[#2467D5]"> / Talent</span></Link>
        <Link href="/talent/passport" className="rounded-full bg-[#2467D5] px-5 py-3 text-xs font-extrabold text-white">CREATE MY PASSPORT</Link>
      </div>
    </header>
    <section className="bg-[#101D31] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1.3fr_.7fr] lg:items-center lg:py-28">
        <div>
          <p className="text-xs font-black uppercase tracking-[.22em] text-[#A5C6FF]">TakeAChefHome Talent · {page.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl">{page.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{page.body}</p>
          <Link href="/talent/passport" className="mt-9 inline-flex rounded-full bg-[#81ADFF] px-7 py-4 text-sm font-black text-[#101D31]">{page.cta}</Link>
        </div>
        <aside className="rounded-[2rem] border border-white/15 bg-white/10 p-8">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#A5C6FF]">Your Talent Passport</p>
          <h2 className="mt-5 text-3xl font-black">One introduction. More ways to connect.</h2>
          <p className="mt-5 text-sm leading-7 text-slate-200">Solo professional or established business, show your experience, service area and availability in one place.</p>
        </aside>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div><p className="text-xs font-black uppercase tracking-[.2em] text-[#2467D5]">A nationwide talent network</p><h2 className="mt-3 text-3xl font-black">Let your work speak for itself.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">We welcome professionals from every U.S. state. Your Talent Passport captures the detailed skills and qualifications; this page is simply your introduction.</p></div>
        <Link href="/talent/passport" className="inline-flex justify-center rounded-full bg-[#2467D5] px-7 py-4 text-sm font-black text-white">START MY PASSPORT</Link>
      </div>
    </section>
    <footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-6xl px-5 py-7 text-xs leading-6 text-slate-500">Creating a Talent Passport does not guarantee employment, assignments, or bookings. Certain credentials may require review.</div></footer>
  </main>;
}
