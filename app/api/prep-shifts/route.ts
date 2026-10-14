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
      .from("prep_shifts")
      .select(
        "id, city, state, role_type, shift_date, start_time, end_time, crew_needed, pay_rate, pay_type, duties, urgency, tier, dress_code, created_at",
      )
      .eq("status", "open")
      .gte("shift_date", today)
      .order("shift_date", { ascending: true })
      .order("start_time", { ascending: true })
      .limit(50);

    if (error) throw error;

    return NextResponse.json({ shifts: data ?? [] });
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

    const required = [employerName, email, phone, city, state, shiftDate, startTime, endTime, roleType, duties];
    const invalid =
      required.some((value) => !value) ||
      !emailLooksValid(email) ||
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
    const { error } = await supabase.from("prep_shifts").insert({
      employer_name: employerName,
      business_name: businessName || null,
      contact_email: email,
      contact_phone: phone,
      city,
      state,
      shift_date: shiftDate,
      start_time: startTime,
      end_time: endTime,
      crew_needed: crewNeeded,
      role_type: roleType,
      pay_rate: payRate,
      pay_type: "hourly",
      duties,
      dress_code: dressCode || null,
      notes: notes || null,
      tier,
      urgency,
      status: "pending_review",
      poster_terms_accepted: true,
    });

    if (error) throw error;

    return NextResponse.redirect(new URL("/prep-your-shift/shift-received", req.url), 303);
  } catch (error) {
    console.error("PREP SHIFT POST ERROR", error);
    return NextResponse.redirect(new URL("/prep-your-shift?error=submit", req.url), 303);
  }
}
