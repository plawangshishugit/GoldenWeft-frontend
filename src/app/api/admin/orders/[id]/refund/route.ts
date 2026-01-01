import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1️⃣ Fetch order
    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.status !== "PAID") {
      return NextResponse.json(
        { error: "Only PAID orders can be refunded" },
        { status: 400 }
      );
    }

    // 2️⃣ Razorpay refund
    // NOTE: We refund full amount
    await razorpay.payments.refund(order.reference, {
      amount: order.total * 100, // ₹ → paise
    });

    // 3️⃣ Update order status
    await prisma.order.update({
      where: { id },
      data: {
        status: "REFUNDED",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Refund error:", err);
    return NextResponse.json(
      { error: "Refund failed" },
      { status: 500 }
    );
  }
}
