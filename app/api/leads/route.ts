// app/api/leads/route.ts
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase env vars missing. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

// Health check – lets you hit /api/leads in the browser and NOT get 405
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Leads endpoint is live. Use POST to create a lead.",
  });
}

// Create lead
export async function POST(req: Request) {
  try {
    // Parse JSON body from the form
    const body = await req.json();

    const {
      name,
      email,
      phone,
      need,     // event type coming from the select field
      details,  // free-text description
    } = body || {};

    // Basic validation (required fields)
    if (!name || !email || !need) {
      return NextResponse.json(
        {
          error: "Missing required fields",
          details: "name, email, and need are required.",
        },
        { status: 400 }
      );
    }

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        {
          error: "Supabase configuration missing",
          details:
            "Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your environment.",
        },
        { status: 500 }
      );
    }

    // Map form fields ↔ Supabase columns
    const payload = [
      {
        tier: 2, // ✅ your default tier (Standard)
        client_name: name,
        client_email: email,
        client_phone: phone || null,

        event_type: need,
        description: details || null,

        // Optional columns – leave null for now or expand later
        guest_count: null,
        event_date: null,
        location: null,
        budget_min: null,
        budget_max: null,
        timeframe: null,
        expires_at: null,

        status: "active",     // matches your default
        is_verified: false,   // table default, but being explicit is fine
        renewal_count: 0,     // table default
      },
    ];

    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Supabase insert error:", text);

      return NextResponse.json(
        {
          error: "Failed to create lead",
          details: text,
        },
        { status: 500 }
      );
    }

    const data = await res.json();

    return NextResponse.json(
      {
        success: true,
        message: "Lead created successfully",
        data,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Unexpected error in /api/leads:", err);

    return NextResponse.json(
      {
        error: "Unexpected server error",
        details: err?.message ?? "Unknown error",
      },
      { status: 500 }
    );
  }
}

