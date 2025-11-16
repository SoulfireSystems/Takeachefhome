"use client";

const COLORS = {
  neutralBg: "#FFFDF7",
  text: "#2A2A2A",
  textMuted: "#4F4F4F",
  card: "#FFFFFF",
  border: "#E0DED8",
  citrus: "#FF7A00",
  red: "#E63946",
  green: "#00A86B",
  blue: "#1976D2",
  plum: "#673AB7",
  lemon: "#FFD54F",
  papaya: "#FFE5B4",
  cocoa: "#3E2723",
};

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: COLORS.neutralBg, color: COLORS.text }}
    >
      <div
        className="w-full max-w-3xl rounded-2xl shadow-xl border px-6 py-8 md:px-10 md:py-10 space-y-6"
        style={{ background: COLORS.card, borderColor: COLORS.border }}
      >
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: COLORS.citrus }}>
            TakeaChefHome · HoneyPott Events
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
            The Culinary Exchange for **real** food people.
          </h1>
          <p className="text-sm md:text-base" style={{ color: COLORS.textMuted }}>
            This is your working MVP. Leads are saved through the{" "}
            <code className="px-1.5 py-0.5 rounded-md text-xs" style={{ background: "#F3F3ED" }}>
              /api/leads
            </code>{" "}
            endpoint into Supabase. Use the buttons below to test the flow.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="/post-a-lead"
            className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition"
            style={{ background: COLORS.citrus, color: "#FFFFFF" }}
          >
            Post a Lead (Test Form)
          </a>

          <a
            href="#coming-soon"
            className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold border transition hover:bg-black/5"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            Future: Browse Marketplace
          </a>
        </div>

        <div className="grid gap-3 md:grid-cols-3 text-xs md:text-sm" id="coming-soon">
          <div className="space-y-1">
            <p className="font-semibold">Private Chef</p>
            <p style={{ color: COLORS.textMuted }}>
              Chef Savoir Faire dinners, retreats, and in-home tasting menus. ChefScope.AI will live here.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Corporate · Gov · Tours</p>
            <p style={{ color: COLORS.textMuted }}>
              HoneyPott Events quotes, RFP intake, and government contracts powered by ChefGoGee.AI.
            </p>
          </div>
          <div className="space-y-1">
            <p className="font-semibold">Marketplace</p>
            <p style={{ color: COLORS.textMuted }}>
              A Craigslist-simple, chef-first marketplace for gigs, pop-ups, rentals, and more.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t text-[11px] md:text-xs flex flex-col md:flex-row gap-2 md:items-center md:justify-between"
             style={{ borderColor: COLORS.border }}>
          <p style={{ color: COLORS.textMuted }}>
            Next steps: build out the marketplace grid, auth, and chef portal. But today — the lead pipe is live.
          </p>
          <p className="font-medium" style={{ color: COLORS.cocoa }}>
            Built for Empire G · TakeaChefHome.com
          </p>
        </div>
      </div>
    </main>
  );
}
