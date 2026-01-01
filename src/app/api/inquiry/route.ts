import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, contact, message, wishlist } = body;

    // For now: log inquiry (later → DB / email / WhatsApp)
    console.log("📩 New Inquiry Received");
    console.log({
      name,
      contact,
      message,
      wishlist,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
