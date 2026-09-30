import Link from 'next/link';

export default async function ThanksPage({searchParams}:{searchParams:Promise<{response?:string}>}){
  const params=await searchParams;
  const responseSent=Boolean(params.response);

  return (
    <main className="min-h-screen bg-[#F3EEE2] text-[#171310]">
      <header className="border-b-2 border-[#171310] bg-[#F8F4EA]">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <Link href="/" className="text-3xl font-black tracking-[-0.05em] text-[#135DFF]">TakeAChefHome<span className="text-[#171310]">.com</span></Link>
        </div>
      </header>

      <section className="mx-auto flex min-h-[72vh] max-w-4xl items-center px-4 py-10">
        <div className="w-full border-2 border-[#171310] bg-white p-7 shadow-[7px_7px_0_#171310] sm:p-10">
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#135DFF]">
            {responseSent?'Response delivered':'Request received'}
          </p>
          <h1 className="mt-2 text-5xl font-black tracking-[-0.055em] sm:text-6xl">
            {responseSent?'You answered the Board.':'It’s on the Board.'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-black/60">
            {responseSent
              ? 'Your response is stored privately for the client. Your contact information is not published on the public listing.'
              : 'Your opportunity has been submitted to TakeAChefHome. The public listing shows the work — not your private contact information.'}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/board" className="border-2 border-[#171310] bg-[#135DFF] px-5 py-3 text-sm font-black uppercase text-white">Open The Board →</Link>
            {responseSent ? (
              <Link href="/talent" className="border-2 border-[#171310] bg-white px-5 py-3 text-sm font-black uppercase">Go To Talent</Link>
            ) : (
              <Link href="/post-a-lead" className="border-2 border-[#171310] bg-white px-5 py-3 text-sm font-black uppercase">Post Another</Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
