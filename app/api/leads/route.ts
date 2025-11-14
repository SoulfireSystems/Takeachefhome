// app/api/leads/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      clientName,
      email,
      phone,
      eventType,
      eventDate,
      city,
      state,
      guestCount,
      budgetMin,
      budgetMax,
      serviceType,
      notes,
    } = body;

    if (!clientName || !email || !eventType || !eventDate || !city || !guestCount || !serviceType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        clientName,
        email,
        phone,
        eventType,
        eventDate: new Date(eventDate),
        city,
        state,
        guestCount: Number(guestCount),
        budgetMin: budgetMin ? Number(budgetMin) : null,
        budgetMax: budgetMax ? Number(budgetMax) : null,
        serviceType,
        notes,
      },
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (err) {
    console.error("Create lead error", err);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 },
    );
  }
}
