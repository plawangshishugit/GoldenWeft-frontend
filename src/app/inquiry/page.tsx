"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { getWishlist } from "@/lib/wishlist";
import { buildWhatsAppMessage } from "@/lib/whatsapp";

export default function InquiryPage() {
  const [lastPayload, setLastPayload] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      contact: formData.get("contact"),
      message: formData.get("message"),
      wishlist: getWishlist(),
    };
    setLastPayload(payload);

    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSubmitted(true);
    }
  }

const wishlist = getWishlist();

if (!submitted && wishlist.length === 0) {
  return (
    <Section>
      <div className="max-w-xl">
        <Text as="h1">Your Wishlist is Empty</Text>
        <Text className="mt-6">
          Please save a silk to your wishlist before starting an inquiry.
        </Text>
      </div>
    </Section>
  );
}


if (submitted) {
  const message = buildWhatsAppMessage({
    name: lastPayload.name,
    contact: lastPayload.contact,
    message: lastPayload.message,
    wishlist: getWishlist(),
  });
const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;

  return (
    <Section>
      <div className="max-w-xl">
        <Text as="h1">Thank you</Text>

        <Text className="mt-6 text-lg">
          Your inquiry has been noted.  
          For quicker assistance, you may connect with us directly on WhatsApp.
        </Text>

        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-6 py-3 border border-black rounded-soft"
        >
          Continue on WhatsApp
        </a>
      </div>
    </Section>
  );
}


  return (
    <Section>
      <div className="max-w-xl">
        <Text as="h1">Speak with a Silk Advisor</Text>

        <Text className="mt-6 text-lg">
          Share your requirements and we’ll help you with availability,
          customization, and next steps.
        </Text>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <input
            name="name"
            required
            placeholder="Your name"
            className="w-full border border-black/20 p-3 rounded-soft"
          />

          <input
            name="contact"
            required
            placeholder="Email or phone"
            className="w-full border border-black/20 p-3 rounded-soft"
          />

          <textarea
            name="message"
            placeholder="Tell us about your occasion or preferences"
            className="w-full border border-black/20 p-3 rounded-soft h-32"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 border border-black rounded-soft disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send inquiry"}
          </button>
        </form>
      </div>
    </Section>
  );
}
