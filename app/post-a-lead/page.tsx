import Link from 'next/link';

const categories={
  'private-chef':{label:'Private Chef',code:'DINNER BRIEF',headline:'Tell us about the table.',title:'Birthday dinner for 12',details:'Occasion, menu direction, service style, allergies, kitchen setup, timing and what you want the night to feel like.',accent:'bg-[#135DFF] text-white'},
  catering:{label:'Catering',code:'EVENT BRIEF',headline:'Tell us about the room.',title:'Corporate dinner for 150',details:'Event type, service style, guest count, menu direction, venue setup, staffing expectations, timing and anything the catering team needs to plan around.',accent:'bg-[#171310] text-white'},
  'meal-prep':{label:'Meal Prep',code:'WEEKLY BRIEF',headline:'Tell us about the week.',title:'Weekly meals for a family of 4',details:'How many meals, portions, dietary needs, cuisine preferences, delivery or pickup rhythm, kitchen access and what a successful week looks like.',accent:'bg-[#FFF7DC] text-[#171310]'},
  'food-truck':{label:'Food Truck',code:'TRUCK BRIEF',headline:'Tell us about the crowd.',title:'Food truck for office event',details:'Event type, expected attendance, service window, cuisine direction, parking/setup, power access, venue rules and desired spend.',accent:'bg-[#D4A64F] text-[#171310]'},
  experience:{label:'Experience',code:'EXPERIENCE BRIEF',headline:'Tell us about the moment.',title:'Private tasting experience',details:'Occasion, guest count, city, format, desired interaction, food direction, duration and what should make the experience memorable.',accent:'bg-[#D4A64F] text-[#171310]'},
  class:{label:'Cooking Class',code:'CLASS BRIEF',headline:'Tell us what you want to learn.',title:'Private pasta class for 8',details:'Skill level, class size, what you want to make or learn, available kitchen setup, preferred duration and any dietary needs.',accent:'bg-[#E9F0FF] text-[#171310]'},
  'kitchen-space':{label:'Kitchen Space',code:'SPACE BRIEF',headline:'Tell us what the operation needs.',title:'Prep kitchen for weekend production',details:'Production type, dates, hours, equipment needs, hood requirements, prep area, loading access, storage and any licensing requirements.',accent:'bg-[#171310] text-white'},
  'cold-storage':{label:'Cold Storage',code:'STORAGE BRIEF',headline:'Tell us what needs to stay cold.',title:'Weekend cooler storage for event',details:'Cooler or freezer, approximate volume, dates, access frequency, delivery/loading needs, temperature requirements and event or production context.',accent:'bg-[#171310] text-white'},
} as const;

type Category=keyof typeof categories;

function single(value:string|string[]|undefined){return Array.isArray(value)?value[0]:value||'';}

export default async function PostALeadPage({searchParams}:{searchParams:Promise<{category?:string|string[]}>}){
  const params=await searchParams;
  const requested=single(params.category) as Category;
  const category:Category=requested in categories?requested:'private-chef';
  const meta=categories[category];

  return <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
    <div className="border-b-2 border-[#171310] bg-[#171310] text-white"><div className="mx-auto flex max-w-[1180px] items-center justify-between px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em]"><span className="text-white/45">TakeAChefHome / Customer Request</span><Link href="/talent" className="text-white/30">Workforce posting lives in Talent →</Link></div></div>

    <header className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-4 py-4"><Link href="/" className="text-3xl font-black tracking-[-0.055em]"><span className="text-[#135DFF]">TakeAChefHome</span>.com</Link><div className="flex gap-4 text-sm font-black"><Link href="/providers">The Roster</Link><Link href="/board" className="text-[#135DFF]">The Board →</Link></div></div></header>

    <section className={'border-b-2 border-[#171310] '+meta.accent}><div className="mx-auto grid max-w-[1180px] lg:grid-cols-[1fr_310px]"><div className="border-b-2 border-[#171310] px-4 py-8 lg:border-b-0 lg:border-r-2"><p className="text-[10px] font-black uppercase tracking-[0.24em] opacity-60">Customer side / {meta.code}</p><h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">{meta.headline}</h1><p className="mt-3 max-w-2xl text-sm font-bold leading-6 opacity-65">Give the exchange enough information for the right professional to understand the work before they respond.</p></div><aside className="p-5"><p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-55">Current brief</p><strong className="mt-2 block text-3xl font-black tracking-[-0.045em]">{meta.label}</strong><p className="mt-4 text-xs font-bold leading-5 opacity-60">Your private contact information never appears on the public Board.</p></aside></div></section>

    <section className="border-b-2 border-[#171310] bg-[#F8F4EA]"><div className="mx-auto grid max-w-[1180px] grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">{Object.entries(categories).map(([key,item])=><Link key={key} href={'/post-a-lead?category='+key} className={'border-b-2 border-r-2 border-[#171310] p-3 text-center text-[9px] font-black uppercase tracking-[0.1em] hover:bg-[#E9F0FF] lg:border-b-0 '+(key===category?'bg-[#135DFF] text-white':'bg-white')}>{item.label}</Link>)}</div></section>

    <section className="mx-auto grid max-w-[1180px] gap-7 px-4 py-8 lg:grid-cols-[1fr_270px]">
      <form method="post" action="/api/leads" className="border-2 border-[#171310] bg-white shadow-[6px_6px_0_#171310]">
        <input type="hidden" name="category" value={category}/>
        <div className="hidden" aria-hidden="true"><input name="company_website" tabIndex={-1} autoComplete="off"/></div>

        <div className="flex items-center justify-between border-b-2 border-[#171310] bg-[#F8F4EA] px-5 py-4"><div><p className="text-[8px] font-black uppercase tracking-[0.2em] text-[#135DFF]">{meta.code}</p><h2 className="mt-1 text-2xl font-black">The assignment</h2></div><span className="border-2 border-[#171310] bg-[#D4A64F] px-3 py-1 text-[9px] font-black uppercase">Customer Request</span></div>

        <div className="grid gap-5 p-5 sm:p-6">
          <label className="grid gap-1 text-xs font-black uppercase tracking-wide">Request title<input name="title" required maxLength={140} placeholder={meta.title} className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label>

          <label className="grid gap-1 text-xs font-black uppercase tracking-wide">The brief<textarea name="description" required maxLength={5000} rows={7} placeholder={meta.details} className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label>

          <div className="grid gap-4 md:grid-cols-3"><label className="grid gap-1 text-xs font-black uppercase tracking-wide">City<input name="city" required maxLength={100} placeholder="Raleigh" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label><label className="grid gap-1 text-xs font-black uppercase tracking-wide">State<input name="state" maxLength={50} placeholder="NC" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label><label className="grid gap-1 text-xs font-black uppercase tracking-wide">Date<input name="event_date" type="date" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label></div>

          <div className="grid gap-4 md:grid-cols-3"><label className="grid gap-1 text-xs font-black uppercase tracking-wide">Guests / people<input name="guest_count" type="number" min="1" max="100000" placeholder="12" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label><label className="grid gap-1 text-xs font-black uppercase tracking-wide">Budget minimum<input name="budget_min" type="number" min="0" placeholder="900" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label><label className="grid gap-1 text-xs font-black uppercase tracking-wide">Budget maximum<input name="budget_max" type="number" min="0" placeholder="1500" className="border-2 border-[#171310] px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label></div>
        </div>

        <div className="border-t-2 border-[#171310] bg-[#FFF7DC] p-5 sm:p-6"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#135DFF]">Private contact</p><h2 className="mt-1 text-xl font-black">Where should responses go?</h2><p className="mt-1 text-xs font-bold text-black/45">This information is not placed on the public Board.</p><div className="mt-4 grid gap-4 md:grid-cols-2"><label className="grid gap-1 text-xs font-black uppercase tracking-wide">Name<input name="name" required maxLength={120} className="border-2 border-[#171310] bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label><label className="grid gap-1 text-xs font-black uppercase tracking-wide">Email<input name="email" type="email" required maxLength={254} className="border-2 border-[#171310] bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label></div><label className="mt-4 grid gap-1 text-xs font-black uppercase tracking-wide">Phone<input name="phone" maxLength={50} className="border-2 border-[#171310] bg-white px-3 py-3 text-sm font-normal normal-case tracking-normal"/></label></div>

        <div className="border-t-2 border-[#171310] p-5"><button className="w-full border-2 border-[#171310] bg-[#135DFF] px-5 py-4 text-sm font-black uppercase tracking-[0.1em] text-white shadow-[4px_4px_0_#171310]">Put This Brief On The Board →</button></div>
      </form>

      <aside className="h-fit border-2 border-[#171310] bg-[#171310] p-5 text-white lg:sticky lg:top-5"><p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D4A64F]">What happens next</p><div className="mt-5 space-y-6"><div><span className="text-xs font-black text-[#D4A64F]">01 / PUBLISH</span><h3 className="mt-1 font-black">The brief hits The Board.</h3><p className="mt-1 text-xs leading-5 text-white/45">Only the work details become public.</p></div><div><span className="text-xs font-black text-[#D4A64F]">02 / RESPOND</span><h3 className="mt-1 font-black">Qualified pros respond privately.</h3><p className="mt-1 text-xs leading-5 text-white/45">Contact details and responses stay off the public listing.</p></div><div><span className="text-xs font-black text-[#D4A64F]">03 / CHOOSE</span><h3 className="mt-1 font-black">You decide who fits.</h3><p className="mt-1 text-xs leading-5 text-white/45">Compare the professional, scope and quote before moving.</p></div></div><div className="mt-7 border-t border-white/20 pt-5"><p className="text-[9px] font-black uppercase tracking-[0.18em] text-white/30">Wrong side?</p><Link href="/talent" className="mt-2 block text-sm font-black text-[#D4A64F]">Hiring kitchen labor or posting a shift? Enter Talent →</Link></div></aside>
    </section>
  </main>;
}
