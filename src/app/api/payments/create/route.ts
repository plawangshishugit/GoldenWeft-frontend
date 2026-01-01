import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // 1️⃣ Calculate total (₹ → paise)
    const amount =
      cart.reduce(
        (sum: number, item: any) =>
          sum + item.price * item.quantity,
        0
      ) * 100;

    if (amount < 100) {
      return NextResponse.json(
        { error: "Amount too small" },
        { status: 400 }
      );
    }

    // 2️⃣ Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `gw_${Date.now()}`,
    });

    // 3️⃣ Send required data to frontend
    return NextResponse.json({
      key: process.env.RAZORPAY_KEY_ID,
      orderId: razorpayOrder.id, // ✅ THIS FIXES YOUR ERROR
      amount: razorpayOrder.amount,
      currency: "INR",
    });
  } catch (err) {
    console.error("Razorpay create order error:", err);
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
