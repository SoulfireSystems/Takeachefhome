// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const LEAD_NOTIFICATION_EMAIL =
  process.env.LEAD_NOTIFICATION_EMAIL || "honeypottev@gmail.com";

// Optional: map service type to a nicer label
function formatServiceType(raw: string | null): string {
  if (!raw) return "Unknown";
  switch (raw) {
    case "Private Chef":
      return "Private Chef";
    case "Catering":
      return "Catering";
    case "Kitchen Rental":
      return "Kitchen Rental";
    case "Chef / Staff":
      return "Chef / Staff";
    default:
      return raw;
  }
}

export async function POST(req: Request) {
  try {
    // 🔹 1. Read form data from the request
    const formData = await req.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const serviceRaw = String(formData.get("serviceType") || formData.get("service") || formData.get("need") || "").trim();
    const details = String(formData.get("details") || formData.get("message") || formData.get("eventDetails") || "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const eventType = formatServiceType(serviceRaw || "Private Chef");

    // 🔹 2. Insert into Supabase leads table
    const { data, error } = await supabase
      .from("leads")
      .insert({
        tier: 2, // You told me Tier 2 for this pipe
        client_name: name,
        client_email: email,
        client_phone: phone || null,
        event_type: eventType,
        description: details || null,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save lead", details: error },
        { status: 500 }
      );
    }

    // 🔹 3. Send notification email via Resend
    if (resend) {
      try {
        const subject = `New ${eventType} lead from ${name}`;
        const html = `
          <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.5;">
            <h2 style="margin-bottom: 0.5rem;">🍽 New TakeaChefHome lead</h2>
            <p style="margin-top: 0;">A new lead just came through the marketplace.</p>

            <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Client Details</h3>
            <ul style="padding-left: 1.25rem;">
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone || "—"}</li>
            </ul>

            <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem;">Request</h3>
            <ul style="padding-left: 1.25rem;">
              <li><strong>Service:</strong> ${eventType}</li>
              <li><strong>Details:</strong> ${details || "—"}</li>
            </ul>

            <p style="margin-top: 1.5rem;">
              This lead is already stored in Supabase in the <code>leads</code> table.
            </p>
          </div>
        `;

        await resend.emails.send({
          from: "TakeaChefHome Leads <onboarding@resend.dev>",
          to: [LEAD_NOTIFICATION_EMAIL],
          subject,
          html,
        });
      } catch (emailError) {
        console.error("Resend email error:", emailError);
        // Don't block the response if email fails
      }
    } else {
      console.warn("RESEND_API_KEY not set — skipping email send.");
    }

    // 🔹 4. Return success to the frontend
    return NextResponse.json(
      {
        success: true,
        message: "Lead received. We’ll follow up soon.",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Lead handler error:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
