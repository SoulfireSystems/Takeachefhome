"use client";
import Link from "next/link";
import { useState } from "react";
type Profile = {
  id: string;
  talent_id?: string;
  first_name?: string;
  last_name?: string;
  professional_name?: string;
  display_name?: string;
  card_name?: string;
  card_number?: number;
  primary_role?: string;
  application_status?: string;
  owner_paused?: boolean;
  status?: string;

  city: string;
  state: string;
  bio: string;
  available_now?: boolean;
  travel_radius?: string;
};
export default function AccountProfiles({
  initial,
}: {
  initial: { talents: Profile[]; providers: Profile[] };
}) {
  const [profiles, setProfiles] = useState(initial),
    [notice, setNotice] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function save(kind: string, p: Profile) {
    setBusy(true);
    setNotice("");
    setError("");
    try {
      const r = await fetch("/api/account/profiles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...p, kind }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      setNotice("Your changes are saved.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  function change(
    group: "talents" | "providers",
    id: string,
    key: string,
    value: unknown,
  ) {
    setProfiles((prev) => ({
      ...prev,
      [group]: prev[group].map((p) =>
        p.id === id ? { ...p, [key]: value } : p,
      ),
    }));
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <p className="font-mono text-xs font-bold text-[#135DFF]">
            TAKEACHEFHOME / YOUR ACCOUNT
          </p>
          <h1 className="mt-3 text-4xl font-black">One home for your work.</h1>
        </div>
        <button
          className="min-h-11 border-2 border-[#101D31] px-4 font-bold"
          onClick={async () => {
            try {
              const r = await fetch("/api/account/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "signout" }),
              });
              if (!r.ok) throw Error();
              window.location.assign("/sign-in");
            } catch {
              setError("Could not sign out. Please try again.");
            }
          }}
        >
          Sign out
        </button>
      </div>
      <p className="mt-5 text-sm">
        Used another email for a listing?{" "}
        <Link
          href="/sign-in?link=1"
          className="font-bold text-[#135DFF] underline"
        >
          Connect another email to this account →
        </Link>
      </p>
      <div className="mt-7 border-2 border-[#101D31] bg-[#135DFF] p-6 text-white">
        <h2 className="text-2xl font-black">Your private inbox</h2>
        <p className="mt-2">
          Read inquiries and keep the details in one conversation.
        </p>
        <Link
          href="/inbox"
          className="mt-5 inline-block border-2 border-white px-5 py-3 font-black"
        >
          OPEN INBOX →
        </Link>
      </div>
      {notice && (
        <p role="status" className="mt-5 font-bold text-green-800">
          {notice}
        </p>
      )}
      {error && (
        <p role="alert" className="mt-5 font-bold text-red-700">
          {error}
        </p>
      )}
      {(["talents", "providers"] as const).map((group) => (
        <section key={group} className="mt-9">
          <h2 className="text-2xl font-black">
            {group === "talents"
              ? "My Talent Passport"
              : "My public service listings"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {group === "talents"
              ? "Your Passport stays private. Availability does not mean you are publicly listed."
              : "Only active service listings appear in the provider directory."}
          </p>
          {!profiles[group].length ? (
            <div className="mt-4 border-2 border-slate-300 bg-white p-5">
              <p>
                {group === "talents"
                  ? "No Passport is connected to this verified email yet."
                  : "No service listing is connected to this verified email yet."}
              </p>
              {group === "talents" && (
                <Link
                  href="/talent/passport"
                  className="mt-3 inline-block font-bold text-[#135DFF]"
                >
                  Create a Passport →
                </Link>
              )}
            </div>
          ) : (
            profiles[group].map((p) => (
              <form
                key={p.id}
                onSubmit={(e) => {
                  e.preventDefault();
                  save(group === "talents" ? "talent" : "provider", p);
                }}
                className="mt-4 border-2 border-[#101D31] bg-white p-5"
              >
                <div className="flex flex-wrap justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs">
                      {p.talent_id ||
                        (p.card_number
                          ? `CARD #${String(p.card_number).padStart(3, "0")}`
                          : "SERVICE LISTING")}
                    </p>
                    <h3 className="mt-2 text-2xl font-black">
                      {p.card_name ||
                        p.display_name ||
                        p.professional_name ||
                        `${p.first_name} ${p.last_name}`}
                    </h3>
                  </div>
                  <span className="text-xs font-bold">
                    {p.status || p.application_status}
                  </span>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {(["city", "state"] as const).map((key) => (
                    <label key={key} className="font-bold capitalize">
                      {key}
                      <input
                        required
                        maxLength={key === "state" ? 2 : 100}
                        value={p[key]}
                        onChange={(e) =>
                          change(
                            group,
                            p.id,
                            key,
                            key === "state"
                              ? e.target.value.toUpperCase()
                              : e.target.value,
                          )
                        }
                        className="mt-2 block min-h-12 w-full border-2 border-slate-300 p-3"
                      />
                    </label>
                  ))}
                </div>
                <label className="mt-5 block font-bold">
                  About your work
                  <textarea
                    maxLength={1200}
                    rows={5}
                    value={p.bio || ""}
                    onChange={(e) => change(group, p.id, "bio", e.target.value)}
                    className="mt-2 block w-full border-2 border-slate-300 p-3"
                  />
                </label>
                {group === "talents" ? (
                  <label className="mt-5 flex min-h-12 items-center gap-3 font-bold">
                    <input
                      type="checkbox"
                      checked={p.available_now === true}
                      onChange={(e) =>
                        change(group, p.id, "available_now", e.target.checked)
                      }
                    />
                    Available now
                  </label>
                ) : (
                  p.status === "active" && (
                    <label className="mt-5 block font-bold">
                      Listing visibility
                      <select
                        value={p.owner_paused ? "paused" : "active"}
                        onChange={(e) =>
                          change(
                            group,
                            p.id,
                            "owner_paused",
                            e.target.value === "paused",
                          )
                        }
                        className="ml-4 min-h-12 border-2 border-slate-300 p-2"
                      >
                        <option value="active">Public</option>
                        <option value="paused">Paused</option>
                      </select>
                    </label>
                  )
                )}
                <div className="mt-5 flex flex-wrap items-center gap-5">
                  <button
                    disabled={busy}
                    className="min-h-12 bg-[#135DFF] px-5 py-3 font-black text-white disabled:opacity-50"
                  >
                    {busy ? "SAVING…" : "SAVE CHANGES"}
                  </button>
                  {group === "providers" &&
                    p.status === "active" &&
                    !p.owner_paused && (
                      <Link
                        href={"/providers/" + p.id}
                        className="font-bold underline"
                      >
                        View public listing →
                      </Link>
                    )}
                </div>
              </form>
            ))
          )}
        </section>
      ))}
    </>
  );
}
