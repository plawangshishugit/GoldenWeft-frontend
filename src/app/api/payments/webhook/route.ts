import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

/**
 * Razorpay Webhook
 * Event: payment.captured
 */
export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // 🔐 Verify webhook signature
    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET!
      )
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    // ✅ Only handle successful payments
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const orderReference =
        payment.notes?.orderReference;

      if (!orderReference) {
        return NextResponse.json(
          { error: "Missing order reference" },
          { status: 400 }
        );
      }

      // ✅ Mark order as PAID
      await prisma.order.update({
        where: { reference: orderReference },
        data: {
          status: "PAID",
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 500 }
    );
  }
}
