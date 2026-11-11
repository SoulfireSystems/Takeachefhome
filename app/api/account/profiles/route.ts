import { NextRequest, NextResponse } from "next/server";
import { accountUser, claimProfiles, myProfiles } from "@/lib/account-server";
import { sameOrigin, uuid } from "@/lib/account-policy";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function GET() {
  const user = await accountUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  try {
    await claimProfiles(user.id);
    return NextResponse.json(await myProfiles(user.id), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to load profiles." },
      { status: 503 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!sameOrigin(req))
    return NextResponse.json({ error: "Invalid origin." }, { status: 403 });
  const user = await accountUser();
  if (!user)
    return NextResponse.json({ error: "Please sign in." }, { status: 401 });
  try {
    const b = await req.json();
    if (!uuid.test(b.id || "") || !["talent", "provider"].includes(b.kind))
      return NextResponse.json({ error: "Invalid profile." }, { status: 400 });
    const text = (v: unknown, n: number) =>
      typeof v === "string" ? v.trim().slice(0, n) : "";
    const patch: Record<string, unknown> = {};
    for (const [key, n] of Object.entries({ bio: 1200, city: 100, state: 2 }))
      if (key in b) patch[key] = text(b[key], n);
    if ("state" in patch && !/^[A-Z]{2}$/.test(String(patch.state)))
      return NextResponse.json(
        { error: "Use a two-letter state code." },
        { status: 400 },
      );
    if ("city" in patch && !patch.city)
      return NextResponse.json({ error: "City is required." }, { status: 400 });
    if (b.kind === "talent") {
      if ("available_now" in b) patch.available_now = b.available_now === true;
      if ("travel_radius" in b) patch.travel_radius = text(b.travel_radius, 40);
    } else {
      if ("owner_paused" in b) {
        const { data: existing } = await getSupabaseAdmin()
          .from("provider_profiles")
          .select("status")
          .eq("id", b.id)
          .eq("account_id", user.id)
          .maybeSingle();
        if (!existing || existing.status !== "active")
          return NextResponse.json(
            { error: "This listing is not available for visibility changes." },
            { status: 403 },
          );
        patch.owner_paused = b.owner_paused === true;
      }
    }
    if (!Object.keys(patch).length)
      return NextResponse.json(
        { error: "No changes supplied." },
        { status: 400 },
      );
    const { data, error } = await getSupabaseAdmin()
      .from(b.kind === "talent" ? "talent_profiles" : "provider_profiles")
      .update(patch)
      .eq("id", b.id)
      .eq("account_id", user.id)
      .select("id")
      .maybeSingle();
    if (error) throw error;
    if (!data)
      return NextResponse.json(
        { error: "Profile unavailable." },
        { status: 404 },
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Your changes could not be saved. Please try again." },
      { status: 500 },
    );
  }
}
