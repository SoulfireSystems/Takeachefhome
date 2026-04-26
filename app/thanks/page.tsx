import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-950">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#0b4fb3]">
          Request received
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          We got it.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-700">
          Your TakeaChefHome request has been submitted. The next step is reviewing the details and matching the request to the right chef, caterer, kitchen, or crew.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-[#0b4fb3] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-900/20">
            Back to Marketplace
          </Link>
          <Link href="/#post" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-700">
            Submit Another Request
          </Link>
        </div>
      </section>
    </main>
  );
}
