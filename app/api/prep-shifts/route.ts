import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const ALLOWED_TIERS = new Set(["quick", "standard", "priority"]);
const ALLOWED_URGENCY = new Set(["standard", "urgent", "today", "tonight"]);

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function emailLooksValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const today = new Date().toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from("talent_opportunities")
      .select(
        "id, city, state, role, work_date, start_time, end_time, workers_needed, hourly_rate, pay_type, description, urgency, posting_tier, uniform, created_at",
      )
      .eq("marketplace_lane", "prep_your_shift")
      .eq("opportunity_type", "shift")
      .eq("status", "open")
      .gte("work_date", today)
      .order("work_date", { ascending: true })
      .order("start_time", { ascending: true })
      .limit(50);

    if (error) throw error;

    const shifts = (data ?? []).map((row) => ({
      id: row.id,
      city: row.city,
      state: row.state,
      role_type: row.role,
      shift_date: row.work_date,
      start_time: row.start_time,
      end_time: row.end_time,
      crew_needed: row.workers_needed,
      pay_rate: row.hourly_rate,
      pay_type: row.pay_type,
      duties: row.description,
      urgency: row.urgency,
      tier: row.posting_tier,
      dress_code: row.uniform,
      created_at: row.created_at,
    }));

    return NextResponse.json({ shifts });
  } catch (error) {
    console.error("PREP SHIFT GET ERROR", error);
    return NextResponse.json({ shifts: [], error: "Board temporarily unavailable." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const employerName = text(formData.get("employerName"));
    const businessName = text(formData.get("businessName"));
    const email = text(formData.get("email")).toLowerCase();
    const phone = text(formData.get("phone"));
    const city = text(formData.get("city"));
    const state = text(formData.get("state")).toUpperCase();
    const shiftDate = text(formData.get("shiftDate"));
    const startTime = text(formData.get("startTime"));
    const endTime = text(formData.get("endTime"));
    const roleType = text(formData.get("roleType"));
    const duties = text(formData.get("duties"));
    const dressCode = text(formData.get("dressCode"));
    const notes = text(formData.get("notes"));
    const tier = text(formData.get("tier")).toLowerCase() || "quick";
    const urgency = text(formData.get("urgency")).toLowerCase() || "standard";
    const crewNeeded = Number(text(formData.get("crewNeeded")) || "1");
    const payRate = Number(text(formData.get("payRate")));
    const termsAccepted = formData.get("termsAccepted") === "on";
    const today = new Date().toISOString().slice(0, 10);

    const required = [employerName, email, phone, city, state, shiftDate, startTime, endTime, roleType, duties];
    const invalid =
      required.some((value) => !value) ||
      !emailLooksValid(email) ||
      state.length !== 2 ||
      shiftDate < today ||
      !Number.isInteger(crewNeeded) ||
      crewNeeded < 1 ||
      crewNeeded > 100 ||
      !Number.isFinite(payRate) ||
      payRate <= 0 ||
      !ALLOWED_TIERS.has(tier) ||
      !ALLOWED_URGENCY.has(urgency) ||
      !termsAccepted;

    if (invalid) {
      return NextResponse.redirect(new URL("/prep-your-shift?error=invalid", req.url), 303);
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("talent_opportunities").insert({
      opportunity_type: "shift",
      marketplace_lane: "prep_your_shift",
      role: roleType,
      company_name: businessName || employerName,
      city,
      state,
      work_date: shiftDate,
      start_time: startTime,
      end_time: endTime,
      pay_type: "hourly",
      pay_min: Math.round(payRate),
      pay_max: Math.round(payRate),
      hourly_rate: payRate,
      description: duties,
      contact_name: employerName,
      contact_email: email,
      contact_phone: phone,
      status: "pending_review",
      employment_type: "temporary",
      workers_needed: crewNeeded,
      venue_area: `${city}, ${state}`,
      uniform: dressCode || null,
      requirements: notes || null,
      urgency,
      posting_tier: tier,
      poster_terms_accepted: true,
    });

    if (error) throw error;

    return NextResponse.redirect(new URL("/prep-your-shift/shift-received", req.url), 303);
  } catch (error) {
    console.error("PREP SHIFT POST ERROR", error);
    return NextResponse.redirect(new URL("/prep-your-shift?error=submit", req.url), 303);
  }
}
