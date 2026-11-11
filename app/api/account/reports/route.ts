import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";
import { sameOrigin, uuid } from "@/lib/account-policy";
function staff(req: NextRequest) {
  const supplied =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  const expected = process.env.TALENT_ADMIN_KEY || "";
  return Boolean(
    expected &&
      supplied.length === expected.length &&
      timingSafeEqual(Buffer.from(supplied), Buffer.from(expected)),
  );
}
export async function GET(req: NextRequest) {
  if (!staff(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  const { data, error } = await getSupabaseAdmin()
    .from("account_message_reports")
    .select("id,conversation_id,reason,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error)
    return NextResponse.json(
      { error: "Reports could not be loaded." },
      { status: 503 },
    );
  return NextResponse.json(
    { reports: data },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function PATCH(req: NextRequest) {
  if (!staff(req))
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const b = await req.json();
  if (!uuid.test(b.id || "") || !["pending", "reviewed"].includes(b.status))
    return NextResponse.json({ error: "Invalid update." }, { status: 400 });
  const { error } = await getSupabaseAdmin()
    .from("account_message_reports")
    .update({ status: b.status })
    .eq("id", b.id);
  return NextResponse.json(
    error ? { error: "Unable to update report." } : { ok: true },
    { status: error ? 500 : 200 },
  );
}
