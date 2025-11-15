import { NextResponse } from "next/server";

// POST /api/leads
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { title, description, budget, location, contact } = body;

    // Basic validation
    if (!title || !description || !contact) {
      return NextResponse.json(
        { ok: false, message: "Title, description and contact are required." },
        { status: 400 }
      );
    }

    // 👉 Later we’ll save to Prisma/Supabase here.
    // For now, just log it so we know it works.
    console.log("New lead submitted:", {
      title,
      description,
      budget,
      location,
      contact,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Lead received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/leads POST:", error);
    return NextResponse.json(
      { ok: false, message: "Server error." },
      { status: 500 }
    );
  }
}

// (Optional) GET /api/leads – simple placeholder
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Leads API is live. DB integration coming next.",
  });
}
