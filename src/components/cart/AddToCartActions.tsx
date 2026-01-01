"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addToCart, getCart, unlockCart } from "@/lib/cart";
import { Text } from "@/components/ui/Text";
import { Product } from "@/lib/products";

export default function AddToCartActions({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const [added, setAdded] = useState(false);

  /* ✅ VERY IMPORTANT: unlock cart when user comes here */
  useEffect(() => {
    unlockCart();
  }, []);

  /* ---------- Check if already in cart ---------- */
  useEffect(() => {
    const cart = getCart();
    const exists = cart.some(
      (item) => item.productId === product.id
    );
    setAdded(exists);
  }, [product.id]);

  /* ---------- Add to cart ---------- */
  function handleAddToCart() {
    if (added) return;

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price ?? 0,
    });

    setAdded(true);
  }

  /* ---------- Buy now ---------- */
  function handleBuyNow() {
    const cart = getCart();
    const exists = cart.some(
      (item) => item.productId === product.id
    );

    if (!exists) {
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price ?? 0,
      });
    }

    // allow storage write before route change
    setTimeout(() => {
      router.push("/cart");
    }, 0);
  }

  return (
    <div className="border border-black/10 rounded-soft p-5 space-y-4">
      <Text as="h3">Purchase Options</Text>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleAddToCart}
          disabled={added}
          className={`px-5 py-2 rounded-soft border transition
            ${
              added
                ? "bg-black text-white opacity-60 cursor-not-allowed"
                : "border-black hover:bg-black hover:text-white"
            }`}
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
