"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Product } from "@/lib/products";
import { Text } from "@/components/ui/Text";
import AddToWishlistButton from "@/components/product/AddToWishlistButton";
import { addToCart } from "@/lib/cart";
import { useRouter } from "next/navigation";

export default function AdvisorProductCard({
  product,
  reasons,
  confidence,
  highlight = false,
}: {
  product: Product;
  reasons: string[];
  confidence: number;
  highlight?: boolean;
}) {
  const router = useRouter();

  // ✅ Read once (safe)
  const advisorSessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    advisorSessionIdRef.current =
      localStorage.getItem("advisorSessionId");
  }, []);

  function track(type: "advisor_click" | "inquiry") {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true, // ✅ IMPORTANT
      body: JSON.stringify({
        type,
        productId: product.id,
        advisorSessionId: advisorSessionIdRef.current,
      }),
    }).catch(() => {});
  }

  return (
    <div
      className={`border rounded-soft p-6 transition ${
        highlight
          ? "border-black bg-black/[0.02]"
          : "border-black/10"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <Text as="h3">{product.name}</Text>

        <span className="text-xs px-3 py-1 border rounded-full">
          {confidence}% match
        </span>
      </div>

      {/* Meta */}
      <Text className="mt-1 text-sm opacity-70">
        {product.fabric} · {product.weight} drape · {product.style}
      </Text>

      {/* Reasons */}
      {reasons.length > 0 && (
        <Text className="mt-4 text-sm">
          <strong>Why this works:</strong> {reasons[0]}
        </Text>
      )}

      {reasons.length > 1 && (
        <ul className="mt-3 list-disc list-inside text-sm opacity-80">
          {reasons.slice(1).map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-4">
        {/* View details */}
        <Link
          href={`/product/${product.id}`}
          className="text-sm underline underline-offset-4"
          onClick={() => track("advisor_click")}
        >
          View details
        </Link>

        <AddToWishlistButton product={product} />

        {/* Inquiry */}
        <button
          onClick={() => {
            track("inquiry");

            const message = encodeURIComponent(
              `Hello ${process.env.NEXT_PUBLIC_BRAND_NAME},

I am interested in:
${product.name}

Please guide me further.`
            );

            window.open(
              `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`,
              "_blank"
            );
          }}
          className="text-sm px-4 py-2 border border-black/20 rounded-soft hover:border-black transition"
        >
          Talk to a Silk Advisor
        </button>

        {/* Cart */}
        <button
          onClick={() => {
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price ?? 0,
            });
            alert("Added to cart");
          }}
          className="text-sm px-4 py-2 border border-black/20 rounded-soft hover:border-black transition"
        >
          Add to Cart
        </button>

        {/* Buy now */}
        <button
          onClick={() => {
            addToCart({
              productId: product.id,
              name: product.name,
              price: product.price ?? 0,
            });
            router.push("/checkout");
          }}
          className="text-sm px-4 py-2 bg-black text-white rounded-soft"
        >
          Buy It Now
        </button>
      </div>
    </div>
  );
}
