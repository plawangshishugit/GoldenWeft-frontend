"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function BusinessContactPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  /* 🔐 ENV CONTACTS (unchanged) */
  const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL!;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
  const telegram = process.env.NEXT_PUBLIC_TELEGRAM_USERNAME!;
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_URL!;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/business-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setSuccess(true);
      setForm({ name: "", company: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section>
      <Text as="h1">Business Contact</Text>

      <Text className="mt-4 text-lg max-w-2xl opacity-80">
        For partnerships, exports, or bulk orders, reach out to our business team.
      </Text>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-xl space-y-4"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full border p-3 rounded"
        />

        <input
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company / Organization"
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="w-full border p-3 rounded"
        />

        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your requirement"
          rows={4}
          required
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-3 bg-black text-white rounded disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Inquiry"}
        </button>

        {success && (
          <Text className="text-sm text-green-600">
            Inquiry submitted successfully. Our team will contact you shortly.
          </Text>
        )}

        {error && (
          <Text className="text-sm text-red-600">{error}</Text>
        )}
      </form>

      {/* ALTERNATE CONTACT OPTIONS */}
      <div className="mt-12">
        <Text as="h2">Or reach us directly</Text>

        <ul className="mt-4 space-y-2 text-sm">
          <li>📧 <a href={`mailto:${email}`}>Email</a></li>

          <li>
            💬{" "}
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </li>

          <li>
            📲{" "}
            <a
              href={`https://t.me/${telegram}`}
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
          </li>

          <li>
            📸{" "}
            <a href={instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </li>

          <li>
            💼{" "}
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
