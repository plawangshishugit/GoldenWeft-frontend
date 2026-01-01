import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { reference, name, contact, notes, cart } = body;

    if (!reference || !name || !contact || !cart?.length) {
      return NextResponse.json(
        { error: "Invalid order payload" },
        { status: 400 }
      );
    }

    /* ---------- Calculate total (SERVER-SIDE) ---------- */
    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    /* ---------- Store Order (CORRECT PRISMA WAY) ---------- */
    const order = await prisma.order.create({
      data: {
        reference,
        name,
        contact,
        notes: notes || "",
        total,
        items: {
          create: cart.map((item: any) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    });

    /* ---------- Email Admin ---------- */
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsList = cart
      .map(
        (item: any) =>
          `• ${item.name} × ${item.quantity}`
      )
      .join("\n");

    await transporter.sendMail({
      from: `"GoldenWeft Orders" <${process.env.EMAIL_USER}>`,
      to: process.env.BUSINESS_INQUIRY_RECEIVER_EMAIL,
      subject: `🧵 New Order Received – ${reference}`,
      text: `
New order received on GoldenWeft

Order Reference:
${reference}

Customer:
${name}
${contact}

Items:
${itemsList}

Total:
₹${total}

Notes:
${notes || "—"}

Login to admin dashboard to take action.
      `,
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      reference,
    });

  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
