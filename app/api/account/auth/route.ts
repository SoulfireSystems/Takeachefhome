import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { accountUser, claimProfiles, limit } from "@/lib/account-server";
import { sameOrigin } from "@/lib/account-policy";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req))
    return NextResponse.json(
      { error: "Please use this website to sign in." },
      { status: 403 },
    );
  try {
    const body = await req.json();
    if (body.action === "signout") {
      const response = NextResponse.json({ ok: true });
      response.cookies.set("tch-access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      });
      return response;
    }
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const verifying = body.action === "verify";
    if (
      !(await limit(
        `auth:${verifying ? "verify" : "send"}:${email}`,
        verifying ? 10 : 4,
        verifying ? 900 : 3600,
      )) ||
      !(await limit(
        `auth:${verifying ? "verify" : "send"}:ip:${ip}`,
        verifying ? 30 : 15,
        3600,
      ))
    ) {
      return NextResponse.json(
        { error: "Too many attempts. Please wait before trying again." },
        { status: 429 },
      );
    }
    const linkingAccount = body.link === true ? await accountUser() : null;
    if (body.link === true && !linkingAccount)
      return NextResponse.json(
        {
          error:
            "Sign in to your existing account before connecting another email.",
        },
        { status: 401 },
      );
    const db = getSupabaseAdmin();
    if (verifying) {
      if (typeof body.code !== "string" || !/^\d{6,10}$/.test(body.code.trim()))
        return NextResponse.json(
          { error: "Enter the code from your email." },
          { status: 400 },
        );
      const { data, error } = await db.auth.verifyOtp({
        email,
        token: body.code.trim(),
        type: "email",
      });
      if (error || !data.session || !data.user?.email_confirmed_at)
        return NextResponse.json(
          { error: "That code is invalid or expired. Request a fresh code." },
          { status: 401 },
        );
      const admin = getSupabaseAdmin();
      const { data: identity } = await admin
        .from("account_identities")
        .select("account_id")
        .eq("identity_id", data.user.id)
        .maybeSingle();
      const canonicalId =
        linkingAccount?.id || identity?.account_id || data.user.id;
      const { error: bindError } = await admin.rpc("account_bind_identity", {
        p_identity: data.user.id,
        p_account: canonicalId,
      });
      if (bindError)
        return NextResponse.json(
          {
            error:
              "This email is already connected to another account. Sign in separately or contact support to reconcile it.",
          },
          { status: 409 },
        );
      await claimProfiles(canonicalId);
      const response = NextResponse.json({ ok: true });
      if (!linkingAccount)
        response.cookies.set("tch-access", data.session.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: Math.min(data.session.expires_in, 3600),
        });
      response.headers.set("Cache-Control", "no-store");
      return response;
    }
    if (body.action !== "code")
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    if (!process.env.RESEND_API_KEY || !process.env.TALENT_FROM_EMAIL)
      throw new Error("Email not configured");
    const { data, error } = await db.auth.admin.generateLink({
      type: "magiclink",
      email,
    });
    if (error || !data.properties?.email_otp)
      throw new Error("Could not prepare sign-in");
    const sent = await new Resend(process.env.RESEND_API_KEY).emails.send({
      from: process.env.TALENT_FROM_EMAIL,
      to: email,
      subject: "Your TakeAChefHome sign-in code",
      text: `Your TakeAChefHome sign-in code is ${data.properties.email_otp}.\n\nEnter this code on the sign-in screen to access your Passport and private inbox. Never share this code. If you did not request it, ignore this email.`,
    });
    if (sent.error) throw new Error("Could not send sign-in");
    return NextResponse.json({
      ok: true,
      message: "Check your email for your sign-in code.",
    });
  } catch {
    return NextResponse.json(
      {
        error:
          "Sign-in is temporarily unavailable. Your profile is still saved. Please try again later.",
      },
      { status: 503 },
    );
  }
}

export async function GET() {
  const user = await accountUser();
  return NextResponse.json(
    { signedIn: Boolean(user) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
