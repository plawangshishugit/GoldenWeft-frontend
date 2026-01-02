"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart } from "@/lib/cart";
import { Text } from "@/components/ui/Text";
import { Product } from "@/lib/products";


export default function AddToCartActions({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price ?? 0, // safe fallback
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  function handleBuyNow() {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price ?? 0,
    });

    router.push("/cart");
  }

  return (
    <div className="border border-black/10 rounded-soft p-5 space-y-4">
      <Text as="h3">Purchase Options</Text>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleAddToCart}
          className="px-5 py-2 border border-black rounded-soft hover:bg-black hover:text-white transition"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>

        <button
          onClick={handleBuyNow}
          className="px-5 py-2 bg-black text-white rounded-soft hover:opacity-90 transition"
        >
          Buy Now
        </button>
      </div>

      <Text className="text-xs opacity-60">
        You can review items before placing the order.
      </Text>
    </div>
  );
}
