// app/api/leads/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // For now we just log it – no database.
    console.log("New lead received:", body);

    return NextResponse.json(
      {
        ok: true,
        message: "Lead captured (demo mode). We'll follow up by email.",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in POST /api/leads:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "Could not submit your lead. Please try again.",
      },
      { status: 500 }
    );
  }
}

