"use client";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
type Thread = {
  id: string;
  subject: string;
  lane: string;
  unread?: boolean;
  is_provider: boolean;
  provider_name?: string;
  customer_blocked?: boolean;
  provider_blocked?: boolean;
  updated_at: string;
};
type Message = { id: string; body: string; mine: boolean; created_at: string };
export default function Inbox({
  provider,
  initialId,
}: {
  provider: string;
  initialId: string;
}) {
  const [threads, setThreads] = useState<Thread[]>([]),
    [id, setId] = useState(initialId),
    [current, setCurrent] = useState<Thread | null>(null),
    [messages, setMessages] = useState<Message[]>([]),
    [message, setMessage] = useState(""),
    [subject, setSubject] = useState(""),
    [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [loading, setLoading] = useState(true),
    [reason, setReason] = useState(""),
    [reporting, setReporting] = useState(false),
    [filter, setFilter] = useState("all"),
    [refreshTick, setRefreshTick] = useState(0);
  const api = async (url: string, body?: unknown) => {
    const r = await fetch(
      url,
      body
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        : { cache: "no-store" },
    );
    const d = await r.json();
    if (!r.ok) throw new Error(d.error || "Unable to load your inbox.");
    return d;
  };
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await api("/api/account/inbox");
      setThreads(d.conversations);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setCurrent(null);
      setMessages([]);
      return;
    }
    setLoading(true);
    api("/api/account/inbox?id=" + encodeURIComponent(id))
      .then(async (d) => {
        if (cancelled) return;
        setCurrent(d.conversation);
        setMessages(d.messages);
        setError("");
        await api("/api/account/inbox", {
          action: "read",
          id,
          until: d.conversation.updated_at,
        });
        setThreads((t) =>
          t.map((c) => (c.id === id ? { ...c, unread: false } : c)),
        );
      })
      .catch((e) => {
        if (!cancelled) {
          setCurrent(null);
          setMessages([]);
          setError(e.message);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, refreshTick]);
  async function send(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const d = await api("/api/account/inbox", {
        action: "send",
        id: id || undefined,
        provider_id: provider,
        subject,
        message,
      });
      setMessage("");
      if (id) {
        const v = await api("/api/account/inbox?id=" + id);
        setCurrent(v.conversation);
        setMessages(v.messages);
      } else {
        setId(d.id);
        window.history.replaceState(null, "", "/inbox?id=" + d.id);
      }
      await load();
      setNotice("Message saved in this conversation.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Message was not sent.");
    } finally {
      setBusy(false);
    }
  }
  async function action(body: Record<string, unknown>) {
    setBusy(true);
    setError("");
    try {
      await api("/api/account/inbox", { ...body, id });
      if (body.action === "report") {
        setNotice("Report saved for review.");
        setReporting(false);
        setReason("");
      } else if (current) {
        setCurrent({
          ...current,
          [current.is_provider ? "provider_blocked" : "customer_blocked"]:
            body.blocked,
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }
  const ownBlocked =
    current &&
    (current.is_provider ? current.provider_blocked : current.customer_blocked);
  const blocked =
    current && (current.customer_blocked || current.provider_blocked);
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-bold text-[#135DFF]">
            TAKEACHEFHOME / PRIVATE MESSAGES
          </p>
          <h1 className="mt-3 text-4xl font-black">Your inbox.</h1>
        </div>
        <button
          onClick={() => {
            load();
            setRefreshTick((t) => t + 1);
          }}
          className="min-h-12 border-2 border-[#101D31] px-5 font-bold"
        >
          Refresh messages
        </button>
      </div>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600">
        Keep inquiries, questions and service details together. Check here for
        replies; email or push notifications are not sent for new messages yet.
      </p>
      {error && (
        <div
          role="alert"
          className="mt-5 border-2 border-red-300 bg-white p-4 text-red-800"
        >
          {error}{" "}
          <Link href="/sign-in?next=/inbox" className="underline">
            Sign in again
          </Link>
        </div>
      )}
      {notice && (
        <p role="status" className="mt-5 font-bold text-green-800">
          {notice}
        </p>
      )}
      <div className="mt-7 grid gap-6 lg:grid-cols-[300px_1fr]">
        <aside className="border-2 border-[#101D31] bg-white p-4">
          <label className="text-xs font-black uppercase">
            Conversations
            <select
              className="mt-2 min-h-12 w-full border-2 border-slate-300 p-2 text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All conversations</option>
              {Array.from(new Set(threads.map((t) => t.lane))).map((l) => (
                <option key={l} value={l}>
                  {l === "food-service"
                    ? "Customer inquiries"
                    : l === "jobs"
                      ? "Jobs & shifts"
                      : "Prep orders"}
                </option>
              ))}
            </select>
          </label>
          {loading && !threads.length ? (
            <p role="status" className="py-7">
              Loading your inbox…
            </p>
          ) : threads.length === 0 ? (
            <div className="py-7">
              <h2 className="font-black">No conversations yet.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Inquiries sent through a provider listing will appear here.
              </p>
              <Link
                href="/providers"
                className="mt-4 inline-block font-bold text-[#135DFF]"
              >
                Browse providers →
              </Link>
            </div>
          ) : (
            <ul className="mt-4 space-y-2">
              {threads
                .filter((t) => filter === "all" || filter === t.lane)
                .map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => {
                        if (
                          message &&
                          !window.confirm("Discard your unsent message?")
                        )
                          return;
                        setMessage("");
                        setNotice("");
                        setId(t.id);
                        window.history.replaceState(
                          null,
                          "",
                          "/inbox?id=" + t.id,
                        );
                      }}
                      className={`min-h-16 w-full border-2 p-3 text-left ${id === t.id ? "border-[#135DFF] bg-blue-50" : "border-slate-200"}`}
                    >
                      <span className="block font-bold">{t.subject}</span>
                      <span className="mt-2 block text-xs text-slate-600">
                        {t.is_provider ? "Received inquiry" : "Your inquiry"}
                        {t.unread ? " · UNREAD" : ""}
                      </span>
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </aside>
        <section className="min-w-0 border-2 border-[#101D31] bg-white p-5">
          {current || (provider && !id) ? (
            <>
              <h2 className="break-words text-2xl font-black">
                {current?.subject || "Send a private inquiry"}
              </h2>
              {current?.provider_name && (
                <p className="mt-2 text-sm">
                  Provider: {current.provider_name}
                </p>
              )}
              {!id && (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Describe the service, city, dates and guest count. This
                  inquiry is free and does not reserve a date.
                </p>
              )}
              <ol
                aria-label="Messages"
                className="my-6 max-h-[55vh] space-y-4 overflow-y-auto"
              >
                {messages.map((m) => (
                  <li
                    key={m.id}
                    className={`border-l-4 p-4 ${m.mine ? "border-[#135DFF] bg-blue-50" : "border-slate-300 bg-slate-50"}`}
                  >
                    <p className="text-xs font-black">
                      {m.mine
                        ? "YOU"
                        : current?.is_provider
                          ? "CUSTOMER"
                          : "PROVIDER"}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-7">
                      {m.body}
                    </p>
                    <time
                      dateTime={m.created_at}
                      className="mt-3 block text-xs text-slate-500"
                    >
                      {new Date(m.created_at).toLocaleString()}
                    </time>
                  </li>
                ))}
              </ol>
              {blocked ? (
                <p className="border-2 border-amber-300 bg-amber-50 p-4 font-bold">
                  This conversation is blocked. New messages cannot be sent.
                </p>
              ) : (
                <form onSubmit={send}>
                  {!id && (
                    <label className="mb-5 block font-bold">
                      Subject
                      <input
                        required
                        minLength={3}
                        maxLength={160}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Dinner for 12 · Raleigh · December 12"
                        className="mt-2 min-h-12 w-full border-2 border-slate-300 p-3"
                      />
                    </label>
                  )}
                  <label className="block font-bold">
                    {id ? "Your reply" : "Your inquiry"}
                    <textarea
                      required
                      maxLength={4000}
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full border-2 border-slate-300 p-3"
                    />
                  </label>
                  <p className="mt-2 text-xs text-slate-500">
                    {message.length}/4,000 · Keep passwords and payment card
                    details out of messages.
                  </p>
                  <button
                    disabled={busy}
                    className="mt-4 min-h-12 bg-[#135DFF] px-6 font-black text-white disabled:opacity-50"
                  >
                    {busy ? "SENDING…" : "SEND MESSAGE"}
                  </button>
                </form>
              )}
              {current && (
                <div className="mt-7 border-t border-slate-200 pt-5">
                  <div className="flex flex-wrap gap-5">
                    <button
                      disabled={busy}
                      onClick={() =>
                        action({ action: "block", blocked: !ownBlocked })
                      }
                      className="min-h-11 text-sm font-bold underline"
                    >
                      {ownBlocked
                        ? "Unblock conversation"
                        : "Block conversation"}
                    </button>
                    <button
                      onClick={() => setReporting(!reporting)}
                      className="min-h-11 text-sm font-bold underline"
                    >
                      Report a problem
                    </button>
                  </div>
                  {reporting && (
                    <form
                      className="mt-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        action({ action: "report", reason });
                      }}
                    >
                      <label className="font-bold">
                        What happened?
                        <textarea
                          required
                          minLength={3}
                          maxLength={1000}
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          rows={3}
                          className="mt-2 block w-full border-2 border-slate-300 p-3"
                        />
                      </label>
                      <button
                        disabled={busy}
                        className="mt-3 min-h-12 border-2 border-[#101D31] px-4 font-bold"
                      >
                        Submit report
                      </button>
                    </form>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="py-12">
              <h2 className="text-2xl font-black">
                Your conversations belong here.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Choose a conversation to read and reply. You can send a new
                inquiry from a provider’s public profile.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
