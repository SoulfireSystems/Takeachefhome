import Link from "next/link";

const sections = [
  {
    title: "1. What belongs on Prep Your Shift",
    body: [
      "Prep Your Shift is for legitimate, paid culinary prep and kitchen-support work connected to food businesses, caterers, chefs, events, production kitchens, pop-ups, meal-prep operations, commissaries, and similar professional food operations.",
      "Examples include prep cook work, cold prep, protein portioning, pastry prep, banquet prep, dish and utility support, pack-and-label work, kitchen loading, and catering-prep assistance.",
      "General household chores, unpaid internships, vague 'come help out' requests, personal errands, and non-culinary gigs do not belong on this board.",
    ],
  },
  {
    title: "2. Who may use the board",
    body: [
      "V1 is for adults age 18 or older. Posters must have authority to request labor for the business, chef, event, or kitchen named in the listing. Workers must provide truthful contact information, experience, availability, and credentials.",
      "TakeaChefHome may request additional verification before publishing a shift or allowing continued use of the marketplace.",
    ],
  },
  {
    title: "3. Every shift must show real pay",
    body: [
      "A listing must state the hourly rate, role, date, expected start and end time, city and state, number of workers needed, and a useful description of the work.",
      "Posters may not advertise one rate and attempt to lower it after a worker applies or is confirmed. Tips, parking reimbursement, meals, travel, bonuses, or other extras should be described separately from base pay.",
      "Posters are responsible for complying with applicable minimum-wage, overtime, break, payroll, tax, worker-classification, licensing, and employment laws. The platform does not determine a worker's legal classification for the parties.",
    ],
  },
  {
    title: "4. No unpaid trials or worker fees",
    body: [
      "If a person is asked to perform productive prep work, that work must be paid as agreed and as required by law. 'Trial shifts' may not be used to obtain free labor.",
      "Workers do not pay to apply for Prep Your Shift listings. Posters may never ask an applicant to send a deposit, gift card, application fee, background-check payment, equipment payment, or similar money in order to be considered for a shift.",
    ],
  },
  {
    title: "5. Posting levels",
    body: [
      "Launch posting levels are Quick ($2), Standard ($7), and Priority ($12). A submitted shift is not automatically public. It enters review first and is published only after approval and any required activation step is completed.",
      "Priority improves placement and review urgency; it does not guarantee that workers will apply or that a shift will be filled.",
    ],
  },
  {
    title: "6. Applying is not the same as being booked",
    body: [
      "A worker application is a request to be considered. The shift poster must confirm the worker before the assignment is treated as booked.",
      "Until a worker is confirmed, neither side should assume the shift is theirs. Exact worksite details may be held until confirmation for safety and privacy.",
    ],
  },
  {
    title: "7. Worker conduct",
    body: [
      "Workers must accurately represent their experience and certifications, arrive ready for the role they accepted, follow lawful food-safety and workplace instructions, respect the kitchen, and communicate immediately if an emergency affects attendance.",
      "False credentials, theft, threats, harassment, deliberate food-safety violations, working while impaired, or repeated no-shows can result in removal or suspension from the marketplace.",
    ],
  },
  {
    title: "8. Poster conduct",
    body: [
      "Posters must provide a reasonably safe workplace, the tools or equipment they promised, clear supervision expectations, accurate shift information, and the agreed compensation.",
      "A poster may not discriminate or harass, request illegal activity, conceal material hazards, move a worker into substantially different work without agreement, or use the marketplace to recruit for deceptive or fraudulent schemes.",
    ],
  },
  {
    title: "9. Cancellations and no-shows",
    body: [
      "If plans change, both sides should cancel as early as possible. Same-day cancellations and confirmed no-shows may be recorded on the account and reviewed before future marketplace access is allowed.",
      "Repeated no-shows, repeated last-minute cancellations, or a pattern of posting shifts that are later abandoned may lead to reduced visibility, temporary restriction, or suspension.",
      "Any cancellation pay owed to a worker is governed by the parties' agreement and applicable law unless an on-platform payment policy specifically states otherwise.",
    ],
  },
  {
    title: "10. Payments during V1",
    body: [
      "Prep Your Shift V1 does not hold or run payroll for worker wages. Unless a listing expressly says otherwise, the poster and confirmed worker arrange lawful payment directly and should agree on method and timing before work begins.",
      "Future on-platform payment, completion-fee, escrow, payroll, or payout features may add separate terms that are shown before a user accepts them.",
    ],
  },
  {
    title: "11. Safety and privacy",
    body: [
      "Public listings show city/state-level location rather than the exact kitchen or residence address. Users should not post Social Security numbers, banking credentials, passwords, government IDs, or other sensitive information in public listing text.",
      "If a situation feels unsafe, leave the situation when reasonably possible, contact emergency services when appropriate, and report the account or listing to TakeaChefHome.",
    ],
  },
  {
    title: "12. Moderation, disputes, and removal",
    body: [
      "TakeaChefHome may review, edit, pause, decline, expire, or remove listings that violate these rules or create safety, fraud, legal, or quality concerns. Accounts may be restricted while a report is reviewed.",
      "Users should preserve relevant messages, shift details, receipts, time records, and payment records when reporting a dispute. TakeaChefHome may help document or route a dispute but does not guarantee recovery of wages, damages, or losses between users.",
    ],
  },
];

export default function PrepYourShiftRulesPage() {
  return (
    <main className="min-h-screen bg-[#f4f8ff] text-[#101828]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link href="/prep-your-shift" className="text-xl font-black text-[#0b4fb3]">Prep Your Shift™</Link>
          <Link href="/prep-your-shift" className="rounded-full bg-[#08182d] px-4 py-2 text-sm font-black text-white">Back to Board</Link>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-[#08182d] text-white">
        <div className="mx-auto max-w-5xl px-4 py-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#84bfff]">Marketplace Rules · V1</p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Real work. Clear pay. Professional behavior.</h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            These rules govern the Prep Your Shift marketplace lane. They are designed to keep a fast-moving culinary work board useful, safe, and honest while the platform grows.
          </p>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Last updated October 13, 2026</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
          <h2 className="text-lg font-black text-[#0b4fb3]">The short version</h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">Post real paid culinary work. Tell people what it pays. Do not change the deal after they accept. Workers apply free. Be truthful, be safe, show up, communicate, and handle people professionally.</p>
        </div>

        <div className="mt-8 space-y-4">
          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-7">
              <h2 className="text-xl font-black">{section.title}</h2>
              <div className="mt-4 space-y-3">
                {section.body.map((paragraph) => <p key={paragraph} className="text-sm leading-7 text-slate-600">{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-300 bg-white p-6 text-sm leading-7 text-slate-600">
          <p><strong className="text-slate-900">Marketplace relationship:</strong> TakeaChefHome provides technology and marketplace tools that help users find and communicate about culinary work. A listing or application does not by itself make TakeaChefHome the employer, joint employer, payroll provider, staffing agency, agent, or guarantor of either user. The legal relationship between a poster and worker depends on the facts and applicable law.</p>
          <p className="mt-3">These marketplace rules are operating standards, not a substitute for legal, tax, insurance, licensing, food-safety, or employment advice.</p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 text-xs text-slate-500">
          <span>Prep Your Shift™ · TakeaChefHome.com</span>
          <Link href="/prep-your-shift" className="font-black text-[#0b4fb3]">Return to Prep Board →</Link>
        </div>
      </footer>
    </main>
  );
}
