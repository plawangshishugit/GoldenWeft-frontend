"use client";

import { useState } from "react";
import { Product } from "@/lib/products";
import { addToWishlist } from "@/lib/wishlist";

export default function AddToWishlistButton({
  product,
}: {
  product: Product;
}) {
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    // 1️⃣ Update local wishlist
    addToWishlist(product);
    setAdded(true);

    // 2️⃣ 🔥 Track conversion (SILENT)
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "wishlist",
          productId: product.id,
          advisorSessionId: localStorage.getItem("advisorSessionId"),
        }),
      });
    } catch (err) {
      // ❗ Never break UX because of tracking
      console.error("Wishlist tracking failed", err);
    }
  }

  return (
    <button
      onClick={handleAdd}
      className="px-4 py-2 border border-black/20 rounded-soft text-sm hover:border-black/40 transition"
    >
      {added ? "Saved ✓" : "Save to Wishlist"}
    </button>
  );
}
