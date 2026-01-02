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

    /* ===============================
       1️⃣ Fetch products from DB
    =============================== */
    const products = await prisma.product.findMany({
      where: {
        slug: { in: cart.map((i: any) => i.productId) },
        isActive: true,
      },
    });

    if (products.length !== cart.length) {
      return NextResponse.json(
        { error: "Some products are invalid" },
        { status: 400 }
      );
    }

    /* ===============================
       2️⃣ Calculate total SAFELY
    =============================== */
    let total = 0;

    const orderItems = cart.map((item: any) => {
      const product = products.find(
        (p) => p.slug === item.productId
      );

      if (!product || product.price == null) {
        throw new Error(`Invalid price for ${item.productId}`);
      }

      total += product.price * item.quantity;

      return {
        productId: product.slug,
        name: product.name,
        price: product.price, // ✅ DB price
        quantity: item.quantity,
      };
    });

    /* ===============================
       3️⃣ Store Order
    =============================== */
    const order = await prisma.order.create({
      data: {
        reference,
        name,
        contact,
        notes: notes || "",
        total,
        items: {
          create: orderItems,
        },
      },
    });

    /* ===============================
       4️⃣ Email Admin
    =============================== */
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsList = orderItems
      .map(
        (item) =>
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
      total,
    });

  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
