import "server-only";
import { isParticipant } from "./account-policy";
import { cookies } from "next/headers";
import { createHash } from "node:crypto";
import { getSupabaseAdmin } from "./supabase-server";

export async function accountUser() {
  const jar = await cookies();
  const token = jar.get("tch-access")?.value;
  if (!token) return null;
  const { data, error } = await getSupabaseAdmin().auth.getUser(token);
  if (error || !data.user?.email_confirmed_at) return null;
  const { data: identity, error: identityError } = await getSupabaseAdmin()
    .from("account_identities")
    .select("account_id")
    .eq("identity_id", data.user.id)
    .maybeSingle();
  if (identityError) return null;
  return { ...data.user, id: identity?.account_id || data.user.id };
}

export async function claimProfiles(userId: string) {
  const { error } = await getSupabaseAdmin().rpc("account_claim_profiles", {
    p_user: userId,
  });
  if (error)
    throw new Error("Unable to connect your profiles. Please try again.");
}

export async function limit(key: string, attempts = 10, seconds = 900) {
  const hashed = createHash("sha256").update(key).digest("hex");
  const { data, error } = await getSupabaseAdmin().rpc("account_rate_limit", {
    p_key: hashed,
    p_limit: attempts,
    p_seconds: seconds,
  });
  if (error) throw new Error("Account service is temporarily unavailable.");
  return data === true;
}

export const talentFields =
  "id,talent_id,first_name,last_name,professional_name,primary_role,secondary_roles,talent_categories,city,state,zip,travel_radius,overnight_travel,bio,skills,opportunity_types,availability,available_now,earliest_start,application_status,profile_completion,years_experience";
export const providerFields =
  "id,display_name,card_name,card_number,professional_title,professional_type,services,city,state,bio,specialties,cuisine_style,starting_price,years_experience,status,owner_paused";

export async function myProfiles(userId: string) {
  const db = getSupabaseAdmin();
  const [talents, providers] = await Promise.all([
    db
      .from("talent_profiles")
      .select(talentFields)
      .eq("account_id", userId)
      .order("created_at"),
    db
      .from("provider_profiles")
      .select(providerFields)
      .eq("account_id", userId)
      .order("created_at"),
  ]);
  if (talents.error || providers.error)
    throw new Error("Unable to load your profiles.");
  return { talents: talents.data || [], providers: providers.data || [] };
}

export async function conversationFor(userId: string, id: string) {
  const db = getSupabaseAdmin();
  const { data: c, error } = await db
    .from("account_conversations")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !c) return null;
  const { data: p } = await db
    .from("provider_profiles")
    .select("id,account_id,card_name,display_name")
    .eq("id", c.provider_id)
    .maybeSingle();
  if (!isParticipant(userId, c.customer_id, p?.account_id || null)) return null;
  return {
    ...c,
    provider_name: p?.card_name || p?.display_name || "Provider",
    is_provider: p?.account_id === userId,
  };
}
