import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // must be false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendInquiryEmail(data: {
  name: string;
  contact: string;
  message?: string;
  wishlist: any[];
}) {
  const wishlistText = data.wishlist
    .map((p) => `• ${p.name} (${p.fabric}, ${p.weight})`)
    .join("\n");

  await transporter.sendMail({
    from: `"GoldenWeft Inquiry" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    subject: "New Silk Inquiry Received",
    text: `
New Inquiry Received

Name: ${data.name}
Contact: ${data.contact}

Message:
${data.message || "—"}

Wishlist:
${wishlistText || "No items"}

— GoldenWeft
    `,
  });
}
