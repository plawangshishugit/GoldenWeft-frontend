"use client";

import { usePathname } from "next/navigation";

export default function FloatingWhatsAppCTA() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER!;
  const brand = process.env.NEXT_PUBLIC_BRAND_NAME!;

  return (
    <a
      href={`https://wa.me/${phone}?text=Hello%20${brand}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-white border border-black/20 rounded-full shadow-sm hover:shadow-md transition text-sm flex items-center gap-2"
    >
      <span className="text-lg">💬</span>
      <span className="hidden md:inline">Chat with a Silk Advisor</span>
    </a>
  );
}