// app/api/leads/route.ts

import { NextResponse } from "next/server";

// --------------------------------------
// CORS HEADERS
// --------------------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// CORS preflight (for browser / fetch)
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// --------------------------------------
// POST – CREATE LEAD (via Supabase REST API)
// --------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🔐 Environment variables from Vercel
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Supabase URL or key is not configured" },
        { status: 500, headers: corsHeaders }
      );
    }

    // 🚀 Call Supabase REST API directly
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Prefer: "return=representation",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        {
          error: "Failed to insert lead into Supabase",
          status: response.status,
          details: errorText,
        },
        { status: 500, headers: corsHeaders }
      );
    }

    const data = await response.json();
    return NextResponse.json(
      { success: true, data },
      { status: 200, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Lead POST error:", error);
    return NextResponse.json(
      { error: "Unexpected server error", details: error?.message },
      { status: 500, headers: corsHeaders }
    );
  }
}
