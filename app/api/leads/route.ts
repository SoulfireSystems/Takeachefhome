import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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
// POST — CREATE LEAD
// -------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Simple validation
    if (!body.client_name || !body.client_email || !body.event_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    // Insert into "leads" table
    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          tier: body.tier ?? null,
          client_name: body.client_name,
          client_email: body.client_email,
          client_phone: body.client_phone ?? null,
          event_type: body.event_type,
          guest_count: body.guest_count ?? null,
          event_date: body.event_date ?? null,
          location: body.location ?? null,
          budget_min: body.budget_min ?? null,
          budget_max: body.budget_max ?? null,
          description: body.description ?? null,
          timeframe: body.timeframe ?? null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, lead: data },
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

