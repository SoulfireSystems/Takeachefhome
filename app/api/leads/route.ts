import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/leads
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      budgetRange,
      city,
      state,
      eventType,
      guestCount,
      contact,
      notes,
    } = body;

    // basic validation
    if (!title || !contact) {
      return NextResponse.json(
        { ok: false, message: "Title and contact are required." },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        title,
        description: description || null,
        budgetRange: budgetRange || null,
        city: city || null,
        state: state || null,
        eventType: eventType || null,
        guestCount: guestCount ? Number(guestCount) : null,
        contact,
        notes: notes || null,
      },
    });

    return NextResponse.json({
      ok: true,
      message: "Lead saved successfully.",
      id: lead.id,
    });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { ok: false, message: "Server error creating lead." },
      { status: 500 },
    );
  }
}
