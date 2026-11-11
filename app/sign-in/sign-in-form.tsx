"use client";
import { FormEvent, useState } from "react";
export default function SignInForm({
  next,
  link,
}: {
  next: string;
  link: boolean;
}) {
  const [email, setEmail] = useState(""),
    [code, setCode] = useState(""),
    [sent, setSent] = useState(false),
    [busy, setBusy] = useState(false),
    [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/account/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: sent ? "verify" : "code",
          email,
          code,
          link,
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Unable to sign in.");
      if (sent) window.location.assign(next);
      else setSent(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mx-auto max-w-lg border-2 border-[#101D31] bg-white p-6 shadow-[6px_6px_0_#101D31] sm:p-9">
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#135DFF]">
        Your account. Your conversations.
      </p>
      <h1 className="mt-4 text-4xl font-black">
        Welcome back.
        <br />
        Or come on in.
      </h1>
      <p className="mt-5 leading-7 text-slate-600">
        Use the email on your Talent Passport or provider listing. After
        verification, your existing profiles connect to your account. No need to
        register again.
      </p>
      {link && (
        <p className="mt-5 border-2 border-blue-200 bg-blue-50 p-4 text-sm font-bold">
          Connect another email: verify the address on your other listing or
          Passport. This will keep you in the same account.
        </p>
      )}
      <form onSubmit={submit} className="mt-7 space-y-5">
        <label className="block font-bold">
          Email address
          <input
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={email}
            disabled={sent}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block min-h-12 w-full border-2 border-slate-300 p-3 disabled:bg-slate-100"
          />
        </label>
        {sent && (
          <>
            <p role="status" className="text-sm">
              Check your email for a code. It expires; use the latest one you
              requested.
            </p>
            <label className="block font-bold">
              Sign-in code
              <input
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]{6,10}"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-2 block min-h-12 w-full border-2 border-slate-300 p-3 font-mono"
              />
            </label>
          </>
        )}
        {error && (
          <p role="alert" className="text-sm font-bold text-red-700">
            {error}
          </p>
        )}
        <button
          disabled={busy}
          className="min-h-12 w-full bg-[#135DFF] px-5 py-3 font-black text-white disabled:opacity-50"
        >
          {busy
            ? "PLEASE WAIT…"
            : sent
              ? "VERIFY + OPEN ACCOUNT"
              : "EMAIL ME A SIGN-IN CODE"}
        </button>
        {sent && (
          <button
            type="button"
            disabled={busy}
            onClick={() => {
              setSent(false);
              setCode("");
              setError("");
            }}
            className="min-h-11 text-sm font-bold underline"
          >
            Change email or request another code
          </button>
        )}
      </form>
      <p className="mt-5 text-xs leading-6 text-slate-500">
        Only verify an email you control. Your Passport documents and inbox stay
        private. Sign-in does not publish your Passport.
      </p>
    </section>
  );
}
