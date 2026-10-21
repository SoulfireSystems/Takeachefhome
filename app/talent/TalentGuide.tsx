'use client';

import { usePathname } from 'next/navigation';

export default function TalentGuide() {
  const pathname = usePathname();

  if (pathname.startsWith('/talent/admin')) return null;

  return (
    <div className="border-b border-blue-100 bg-[#EEF5FF] text-slate-700">
      <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <p>
          <span className="font-black text-[#135DFF]">Joining the Talent Pool?</span>{' '}
          Choose what you do, complete each step, and use the buttons inside the application.
        </p>
        <p className="shrink-0 text-xs font-bold text-slate-500">
          Don&apos;t use your browser Back button while applying.
        </p>
      </div>
    </div>
  );
}
