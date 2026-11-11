import Link from "next/link";
export default function AccountShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F8F4EA] pb-24 text-[#101D31]">
      <header className="border-b-2 border-[#101D31] bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5">
          <Link href="/" className="text-xl font-black text-[#135DFF]">
            TakeAChefHome
          </Link>
          <nav className="flex gap-5 text-sm font-bold">
            <Link href="/providers">Find food service</Link>
            <Link href="/account">My account</Link>
            <Link href="/inbox">Inbox</Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-8">{children}</div>
      <nav
        aria-label="Account navigation"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t-2 border-[#101D31] bg-white pb-[env(safe-area-inset-bottom)] text-center text-xs font-black md:hidden"
      >
        {[
          ["/", "HOME"],
          ["/providers", "BROWSE"],
          ["/inbox", "INBOX"],
          ["/account", "ACCOUNT"],
        ].map(([href, label]) => (
          <Link key={href} href={href} className="px-2 py-5">
            {label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
