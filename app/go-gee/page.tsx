// app/go-gee/page.tsx
// Internal Chef GoGee dashboard – view latest leads by lane

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import Link from "next/link";

type Lead = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  city?: string | null;
  serviceType?: string | null;
  source?: string | null;
  details?: string | null;
  guestCount?: number | null;
  budgetRange?: string | null;
};

function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function laneLabel(serviceType?: string | null) {
  switch (serviceType) {
    case "private-chef":
      return "Private Chef";
    case "catering":
      return "Catering";
    case "staff":
      return "Hire Staff";
    case "kitchen":
      return "Kitchens";
    case "shop":
      return "Shop";
    default:
      return "Unlabeled";
  }
}

export default async function GoGeeDashboardPage() {
  const { data, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const leads = (data as Lead[] | null) ?? [];

  // Simple lane counts
  const laneCounts = leads.reduce(
    (acc, lead) => {
      const key = lead.serviceType || "unknown";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  if (error) {
    console.error("Error loading leads:", error);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-emerald-300">
              Internal
            </p>
            <h1 className="text-xl font-semibold">
              Chef GoGee Lead Dashboard
            </h1>
            <p className="text-xs text-slate-400">
              Latest requests coming in from TakeaChefHome.com
            </p>
          </div>
          <Link
            href="/"
            className="text-xs text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <section className="border-b border-slate-800 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">
                Showing the last {leads.length} leads
              </p>
              {error && (
                <p className="mt-1 text-xs text-red-400">
                  Error loading leads. Check console & Supabase.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-[11px]">
              {Object.entries(laneCounts).map(([key, count]) => (
                <span
                  key={key}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-slate-200"
                >
                  {laneLabel(key)}:{" "}
                  <span className="font-semibold text-emerald-300">
                    {count}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="min-w-full text-left text-xs">
              <thead className="bg-slate-900/80 text-[11px] uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-3 py-2">When</th>
                  <th className="px-3 py-2">Lane</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">City</th>
                  <th className="px-3 py-2">Guests/Budget</th>
                  <th className="px-3 py-2">Source</th>
                  <th className="px-3 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-t border-slate-800/80 hover:bg-slate-900"
                  >
                    <td className="px-3 py-2 align-top text-[11px] text-slate-400">
                      {lead.created_at ? formatDate(lead.created_at) : "—"}
                    </td>
                    <td className="px-3 py-2 align-top text-[11px]">
                      <span className="rounded-full border border-slate-700 bg-slate-950 px-2 py-0.5 text-[10px]">
                        {laneLabel(lead.serviceType)}
                      </span>
                    </td>
                    <td className="px-3 py-2 align-top text-[11px]">
                      <div className="font-semibold text-slate-100">
                        {lead.name || "—"}
                      </div>
                    </td>
                    <td className="px-3 py-2 align-top text-[11px] text-slate-300">
                      <div>{lead.email}</div>
                      {lead.phone && (
                        <div className="text-slate-500">{lead.phone}</div>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top text-[11px] text-slate-300">
                      {lead.city || "—"}
                    </td>
                    <td className="px-3 py-2 align-top text-[11px] text-slate-300">
                      {lead.guestCount && (
                        <div>Guests: {lead.guestCount}</div>
                      )}
                      {lead.budgetRange && (
                        <div>Budget: {lead.budgetRange}</div>
                      )}
                    </td>
                    <td className="px-3 py-2 align-top text-[11px] text-slate-400">
                      {lead.source || "—"}
                    </td>
                    <td className="px-3 py-2 align-top text-[11px] text-slate-200 max-w-xs">
                      <div className="line-clamp-4 whitespace-pre-wrap">
                        {lead.details || "—"}
                      </div>
                    </td>
                  </tr>
                ))}

                {leads.length === 0 && !error && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-3 py-6 text-center text-[11px] text-slate-500"
                    >
                      No leads yet. Submit a test form on the homepage or the
                      Private Chef / Catering lanes to see data here.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[10px] text-slate-500">
            Internal only. Don&apos;t link this in public navigation. For deeper
            filtering/export later, we can add date filters, lane toggles, and CSV
            export.
          </p>
        </div>
      </section>
    </main>
  );
}
