import { NextRequest, NextResponse } from "next/server";
import {
  accountUser,
  claimProfiles,
  conversationFor,
  limit,
} from "@/lib/account-server";
import { sameOrigin, uuid } from "@/lib/account-policy";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const user = await accountUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  try {
    await claimProfiles(user.id);
    const id = req.nextUrl.searchParams.get("id");
    const db = getSupabaseAdmin();
    if (id) {
      if (!uuid.test(id))
        return NextResponse.json(
          { error: "Conversation unavailable." },
          { status: 404 },
        );
      const c = await conversationFor(user.id, id);
      if (!c)
        return NextResponse.json(
          { error: "Conversation unavailable." },
          { status: 404 },
        );
      const { data, error } = await db
        .from("account_messages")
        .select("id,body,sender_id,created_at")
        .eq("conversation_id", id)
        .order("created_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return NextResponse.json(
        {
          conversation: c,
          messages: (data || []).reverse().map((m) => ({
            ...m,
            mine: m.sender_id === user.id,
            sender_id: undefined,
          })),
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }
    const { data: providers, error: pe } = await db
      .from("provider_profiles")
      .select("id,card_name,display_name")
      .eq("account_id", user.id);
    if (pe) throw pe;
    const ids = (providers || []).map((p) => p.id);
    let q = db.from("account_conversations").select("*");
    q = ids.length
      ? q.or(`customer_id.eq.${user.id},provider_id.in.(${ids.join(",")})`)
      : q.eq("customer_id", user.id);
    const { data, error } = await q
      .order("updated_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return NextResponse.json(
      {
        conversations: (data || []).map((c) => ({
          ...c,
          is_provider: ids.includes(c.provider_id),
          unread:
            new Date(c.updated_at) >
            new Date(
              ids.includes(c.provider_id)
                ? c.provider_read_at
                : c.customer_read_at,
            ),
        })),
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Unable to load your inbox. Please try again." },
      { status: 503 },
    );
  }
}

export async function POST(req: NextRequest) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const user = await accountUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  try {
    const b = await req.json();
    const db = getSupabaseAdmin();
    if (!(await limit(`message:${user.id}`, 30, 60)))
      return NextResponse.json(
        { error: "Please slow down and try again shortly." },
        { status: 429 },
      );
    if (b.action && b.action !== "send") {
      if (!uuid.test(b.id || ""))
        return NextResponse.json(
          { error: "Conversation unavailable." },
          { status: 404 },
        );
      const c = await conversationFor(user.id, b.id);
      if (!c)
        return NextResponse.json(
          { error: "Conversation unavailable." },
          { status: 404 },
        );
      let error;
      if (b.action === "read") {
        // Client echoes the latest displayed timestamp; do not mark unseen concurrent messages as read.
        const until =
          typeof b.until === "string" &&
          Number.isFinite(Date.parse(b.until)) &&
          Date.parse(b.until) <= Date.now()
            ? b.until
            : c.created_at;
        ({ error } = await db
          .from("account_conversations")
          .update({
            [c.is_provider ? "provider_read_at" : "customer_read_at"]: until,
          })
          .eq("id", c.id));
      } else if (b.action === "block") {
        ({ error } = await db
          .from("account_conversations")
          .update({
            [c.is_provider ? "provider_blocked" : "customer_blocked"]:
              b.blocked === true,
          })
          .eq("id", c.id));
      } else if (b.action === "report") {
        const reason =
          typeof b.reason === "string" ? b.reason.trim().slice(0, 1000) : "";
        if (reason.length < 3)
          return NextResponse.json(
            { error: "Describe the issue." },
            { status: 400 },
          );
        ({ error } = await db
          .from("account_message_reports")
          .insert({ conversation_id: c.id, reporter_id: user.id, reason }));
      } else
        return NextResponse.json({ error: "Invalid action." }, { status: 400 });
      if (error) throw error;
      return NextResponse.json({ ok: true });
    }
    const message = typeof b.message === "string" ? b.message.trim() : "";
    const subject = typeof b.subject === "string" ? b.subject.trim() : "";
    if (
      !message ||
      message.length > 4000 ||
      (b.id
        ? !uuid.test(b.id)
        : !uuid.test(b.provider_id || "") ||
          subject.length < 3 ||
          subject.length > 160)
    )
      return NextResponse.json(
        { error: "Add a subject and message within the displayed limits." },
        { status: 400 },
      );
    const { data, error } = await db.rpc("account_send_message", {
      p_user: user.id,
      p_body: message,
      p_conversation: b.id || null,
      p_provider: b.provider_id || null,
      p_subject: subject || null,
    });
    if (error)
      return NextResponse.json(
        {
          error:
            "Message could not be sent. The conversation may be blocked or unavailable.",
        },
        { status: 403 },
      );
    return NextResponse.json({ ok: true, id: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Message could not be saved. Your text has not been cleared." },
      { status: 500 },
    );
  }
}
