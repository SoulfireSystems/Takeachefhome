'use client';

import { FormEvent, useState } from 'react';

const bookingEmail = 'honeypottev@gmail.com';
const phone = '4045166023';
const bookShop = 'https://rebel-pages-cookbooks.ggg398.chatgpt.site';

const doors = [
  ['Private Dining', 'Birthdays, anniversaries, dinner parties, vacation homes', 'Private Dining'],
  ['Event Catering', 'Buffet, plated, family-style, passed bites, celebrations', 'Event Catering'],
  ['Brunch & Breakfast', 'Brunch parties, breakfast service, showers, mornings after', 'Brunch & Breakfast'],
  ['Weddings', 'Micro weddings, receptions, chef-led tables, wedding weekends', 'Wedding Catering'],
  ['Corporate & Executive', 'Executive meals, meetings, retreats, client entertainment', 'Corporate & Executive'],
  ['Drop-Off Catering', 'Clean delivery for lunches, dinners, meetings and gatherings', 'Drop-Off Catering'],
  ['Destination & Multi-Day', 'Airbnbs, villas, retreats, golf trips, full weekend food', 'Destination & Multi-Day'],
  ['Large Scale', 'High-volume food service, major events, multi-day operations', 'Large Scale'],
  ['Government & Institutional', 'Agency, military, municipal, university and institutional work', 'Government & Institutional'],
  ['Traveling Chef Circuit™', 'Bring HoneyPott to your city while the circuit is moving', 'Traveling Chef Circuit'],
  ['Rebel Pages Press', 'Cookbooks, business guides and digital tools', 'BOOKS'],
  ['I Just Need It Handled', 'Not sure what lane? Tell us what you need and we will route it', 'Fast Quote'],
];

const cookbooks = [
  ['OUT THE BAG', '$22', 'Recipes, flavor and the kind of food that gets remembered.'],
  ['THE ISLAND BLUSH', '$22', 'Aruba-inspired color, island flavor and vacation-table energy.'],
  ['THE SUMMER COOKOUT QUICK HIT', '$7', 'A fast digital cookout guide built for real weekends.'],
  ['SNACKENS — THE FIRST 50', '$19', 'Fifty snack ideas built for cravings, parties and quick wins.'],
];

function mailto(subject: string) {
  return `mailto:${bookingEmail}?subject=${encodeURIComponent(`HoneyPott Inquiry — ${subject}`)}`;
}

export default function HoneyPottEmergencyHub() {
  const [sent, setSent] = useState(false);

  function submitInquiry(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Event date: ${data.get('date') || ''}`,
      `City / location: ${data.get('location') || ''}`,
      `Guest count: ${data.get('guests') || ''}`,
      `Service needed: ${data.get('service') || ''}`,
      '',
      `Event details: ${data.get('details') || ''}`,
    ].join('\n');
    setSent(true);
    window.location.href = `mailto:${bookingEmail}?subject=${encodeURIComponent('HoneyPott Fast Quote Request')}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="min-h-screen bg-[#080705] text-[#f8f1df]">
      <div className="border-b border-amber-300/20 bg-amber-400 px-4 py-2 text-center text-xs font-black uppercase tracking-[0.2em] text-black">
        HoneyPott is open for business — use this booking hub while HireHoneyPott.com is being restored
      </div>

      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
        <a href="#top" className="text-xl font-black tracking-tight text-amber-300">HONEYPOTT EVENTS</a>
        <div className="flex gap-2">
          <a href={`tel:${phone}`} className="rounded-full border border-amber-300/50 px-4 py-2 text-sm font-bold">Call</a>
          <a href="#quote" className="rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-black">Fast Quote</a>
        </div>
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-8 px-5 pb-14 pt-8 md:grid-cols-[1.15fr_.85fr] md:px-8 md:pb-20 md:pt-14">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-amber-300">Love. Respect. Great Food.</p>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">FOOD SERVICE.<br/><span className="text-amber-300">HANDLED.</span></h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">Private dining. Catering. Weddings. Corporate. Destination. Large-scale. Government. Books. If food, hospitality or a table is involved, HoneyPott has a door for it.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#doors" className="rounded-full bg-amber-300 px-6 py-3 font-black text-black">Choose Your Door</a>
            <a href={`tel:${phone}`} className="rounded-full border border-white/25 px-6 py-3 font-bold">404-516-6023</a>
            <a href={`mailto:${bookingEmail}`} className="rounded-full border border-white/25 px-6 py-3 font-bold">Email Booking</a>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-300/20 bg-gradient-to-br from-amber-300/10 to-white/[0.03] p-6 md:p-8">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-amber-300">Proof before promises</p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {[['25+','Years hospitality & culinary experience'],['2,000','Guests at largest single event'],['Masters','Executive hospitality experience'],['U.S. Open','Pinehurst hospitality experience']].map(([big,small]) => (
              <div key={big} className="rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="text-2xl font-black text-white">{big}</div>
                <div className="mt-1 text-sm leading-5 text-stone-400">{small}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-stone-400">Government vendor • ServSafe Manager • Johnson & Wales trained • Travel-ready across the U.S. and select international markets.</p>
        </div>
      </section>

      <section id="doors" className="border-y border-white/10 bg-[#0e0c08] py-16">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-300">12 ways in</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">DON’T HUNT THROUGH A WEBSITE.<br/>GO STRAIGHT TO WHAT YOU NEED.</h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {doors.map(([title,desc,subject], i) => {
              const isBooks = subject === 'BOOKS';
              const href = isBooks ? bookShop : mailto(subject);
              return (
                <a key={title} href={href} target={isBooks ? '_blank' : undefined} rel={isBooks ? 'noreferrer' : undefined} className="group rounded-3xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-amber-300/50 hover:bg-amber-300/[0.06]">
                  <div className="text-xs font-black tracking-[0.2em] text-amber-300">DOOR {String(i+1).padStart(2,'0')}</div>
                  <h3 className="mt-3 text-2xl font-black text-white">{title}</h3>
                  <p className="mt-3 leading-6 text-stone-400">{desc}</p>
                  <div className="mt-6 font-black text-amber-300">{isBooks ? 'SHOP BOOKS →' : 'START HERE →'}</div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-300">Rebel Pages Press</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">THE CHEF WRITES, TOO.</h2>
            <p className="mt-5 max-w-xl leading-7 text-stone-400">Digital cookbooks and practical guides built to be used, not admired on a shelf.</p>
            <a href={bookShop} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full bg-amber-300 px-6 py-3 font-black text-black">Shop the Cookbook Collection</a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {cookbooks.map(([title,price,desc]) => (
              <a key={title} href={bookShop} target="_blank" rel="noreferrer" className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-black text-white">{title}</h3>
                  <div className="rounded-full bg-amber-300 px-3 py-1 text-sm font-black text-black">{price}</div>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-400">{desc}</p>
                <div className="mt-4 font-black text-amber-300">BUY / VIEW →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="border-y border-white/10 bg-amber-300 py-16 text-black">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em]">Fast quote</p>
            <h2 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl">DATE. CITY. PEOPLE.<br/>START THERE.</h2>
            <p className="mt-4 max-w-lg leading-7">Give HoneyPott the basics. We can sort menu direction, staffing, service style and the rest after we know the event is real.</p>
            <div className="mt-6 space-y-2 font-bold">
              <div>Call: <a className="underline" href={`tel:${phone}`}>404-516-6023</a></div>
              <div>Temporary booking inbox: <a className="underline" href={`mailto:${bookingEmail}`}>{bookingEmail}</a></div>
            </div>
          </div>

          <form onSubmit={submitInquiry} className="grid gap-3 rounded-3xl bg-black p-5 text-white sm:grid-cols-2 md:p-7">
            <input required name="name" placeholder="Your name" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500" />
            <input required name="phone" placeholder="Phone" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500" />
            <input required type="email" name="email" placeholder="Email" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500" />
            <input name="date" placeholder="Event date" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500" />
            <input required name="location" placeholder="City / location" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500" />
            <input name="guests" placeholder="Guest count" className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500" />
            <select name="service" className="rounded-xl border border-white/15 bg-[#191713] px-4 py-3 text-stone-200 sm:col-span-2">
              <option>Private Dining</option><option>Event Catering</option><option>Brunch & Breakfast</option><option>Wedding</option><option>Corporate</option><option>Drop-Off</option><option>Destination / Multi-Day</option><option>Large Scale</option><option>Government / Institutional</option><option>Traveling Chef</option><option>Not Sure — Handle It</option>
            </select>
            <textarea name="details" rows={5} placeholder="Tell us what you are planning, dietary needs, service style, or anything we should know." className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 outline-none placeholder:text-stone-500 sm:col-span-2" />
            <button type="submit" className="rounded-xl bg-amber-300 px-5 py-4 font-black text-black sm:col-span-2">SEND MY HONEYPOTT REQUEST →</button>
            <p className="text-center text-xs text-stone-500 sm:col-span-2">{sent ? 'Your device will open a pre-filled email so you can send the request directly.' : 'This temporary form opens a pre-filled email to the HoneyPott booking inbox so no lead depends on the unpaid domain.'}</p>
          </form>
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-5 py-10 text-sm text-stone-500 md:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div><span className="font-black text-amber-300">HoneyPott Events</span> — Food Service. Handled.</div>
          <div>© 2026 HoneyPott Events • Love. Respect. Great Food.</div>
        </div>
      </footer>
    </main>
  );
}
