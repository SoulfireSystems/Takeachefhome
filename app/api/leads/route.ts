import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ---------------------------
// ✅ CORS HEADERS
// ---------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ---------------------------
// ✅ OPTIONS (CORS PREFLIGHT)
// ---------------------------
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}

// ---------------------------
// ✅ POST — CREATE NEW LEAD
// ---------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

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

    // ---------------------------
    // ✅ VALIDATION
    // ---------------------------
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // ---------------------------
    // ✅ SUPABASE CLIENT
    // ---------------------------
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // ---------------------------
    // ✅ INSERT INTO DATABASE
    // ---------------------------
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          tier: body.tier,
          client_name: body.client_name,
          client_email: body.client_email,
          client_phone: body.client_phone || null,
          event_type: body.event_type,
          guest_count: body.guest_count,
          event_date: body.event_date,
          location: body.location,
          budget_min: body.budget_min,
          budget_max: body.budget_max,
          description: body.description || null,
          timeframe: body.timeframe || null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: corsHeaders }
      );
    }

    // ---------------------------
    // ✅ SUCCESS
    // ---------------------------
    return NextResponse.json(
      { success: true, lead: data },
      { status: 201, headers: corsHeaders }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Server error", details: err.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

