import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// -------------------------
// CORS HEADERS
// -------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// -------------------------
// OPTIONS (CORS PREFLIGHT)
// -------------------------
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// -------------------------
// POST — CREATE LEAD (via Supabase REST API)
// -------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic validation
    const required = [
      "tier",
      "client_name",
      "client_email",
      "event_type",
      "guest_count",
      "event_date",
      "location",
      "budget_min",
      "budget_max",
    ];

    for (const field of required) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase env vars are missing" },
        { status: 500, headers: corsHeaders }
      );
    }

    // Supabase REST endpoint for "leads" table
    const url = `${supabaseUrl}/rest/v1/leads?select=*`;

    const payload = [
      {
        tier: body.tier,
        client_name: body.client_name,
        client_email: body.client_email,
        client_phone: body.client_phone ?? null,
        event_type: body.event_type,
        guest_count: body.guest_count,
        event_date: body.event_date,
        location: body.location,
        budget_min: body.budget_min,
        budget_max: body.budget_max,
        description: body.description ?? null,
        timeframe: body.timeframe ?? null,
      },
    ];

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase REST error:", text);
      return NextResponse.json(
        { error: "Supabase insert failed", details: text },
        { status: 500, headers: corsHeaders }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      { success: true, lead: Array.isArray(data) ? data[0] : data },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Server error", details: err?.message ?? String(err) },
      { status: 500, headers: corsHeaders }
    );
  }
}
