import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

function text(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function emailLooksValid(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function uuidLooksValid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const shiftId = text(formData.get("shiftId"));
    const fullName = text(formData.get("fullName"));
    const email = text(formData.get("email")).toLowerCase();
    const phone = text(formData.get("phone"));
    const primaryRole = text(formData.get("primaryRole"));
    const availabilityNote = text(formData.get("availabilityNote"));
    const yearsExperience = Number(text(formData.get("yearsExperience")) || "0");
    const foodSafetyCert = formData.get("foodSafetyCert") === "on";
    const termsAccepted = formData.get("termsAccepted") === "on";

    const invalid =
      !uuidLooksValid(shiftId) ||
      !fullName ||
      !emailLooksValid(email) ||
      !phone ||
      !primaryRole ||
      !Number.isFinite(yearsExperience) ||
      yearsExperience < 0 ||
      yearsExperience > 60 ||
      !termsAccepted;

    if (invalid) {
      return NextResponse.redirect(new URL(`/prep-your-shift/apply?shift=${encodeURIComponent(shiftId)}&error=invalid`, req.url), 303);
    }

    const supabase = getSupabaseAdmin();
    const { data: shift, error: shiftError } = await supabase
      .from("prep_shifts")
      .select("id, status, shift_date")
      .eq("id", shiftId)
      .eq("status", "open")
      .maybeSingle();

    if (shiftError) throw shiftError;
    if (!shift) {
      return NextResponse.redirect(new URL("/prep-your-shift?error=closed", req.url), 303);
    }

    const { error } = await supabase.from("prep_shift_applications").insert({
      shift_id: shiftId,
      full_name: fullName,
      email,
      phone,
      primary_role: primaryRole,
      years_experience: Math.round(yearsExperience),
      food_safety_cert: foodSafetyCert,
      availability_note: availabilityNote || null,
      status: "submitted",
      worker_terms_accepted: true,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.redirect(new URL("/prep-your-shift/application-received?duplicate=1", req.url), 303);
      }
      throw error;
    }

    return NextResponse.redirect(new URL("/prep-your-shift/application-received", req.url), 303);
  } catch (error) {
    console.error("PREP SHIFT APPLICATION ERROR", error);
    return NextResponse.redirect(new URL("/prep-your-shift?error=apply", req.url), 303);
  }
}
