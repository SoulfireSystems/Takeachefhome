// app/api/leads/route.ts
// Temporary lead handler while Supabase is paused.
// Accepts form submissions and returns a friendly response
// without trying to save to any database.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Get form data
  const formData = await req.formData();
  const payload: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    payload[key] = value;
  }

  // Log to server logs so you at least know it's working
  console.log("Lead received (temporary handler):", payload);

  // Redirect back to the homepage with a query flag
  const url = new URL(req.url);
  url.pathname = "/";
  url.searchParams.set("lead", "received");

  return NextResponse.redirect(url.toString(), 303);
}

