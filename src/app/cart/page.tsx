"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import {
  getCart,
  removeFromCart,
  clearCart,
  CartItem,
  updateCartQuantity,
} from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const update = () => setCart(getCart());

    update();
    window.addEventListener("gw-cart-update", update);

    return () => {
      window.removeEventListener("gw-cart-update", update);
    };
  }, []);

  function updateQuantity(productId: string, delta: number) {
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;

    updateCartQuantity(productId, item.quantity + delta);
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <Section>
        <Text as="h1">Your Cart</Text>
        <Text className="mt-6">Your cart is empty.</Text>
        <Link href="/collections" className="underline mt-4 inline-block">
          Continue shopping
        </Link>
      </Section>
    );
  }

  return (
    <Section>
      <Text as="h1">Your Cart</Text>

      <div className="mt-8 space-y-6">
        {cart.map((item) => (
          <div
            key={item.productId}
            className="border border-black/10 rounded-soft p-4"
          >
            <Text className="font-medium">{item.name}</Text>

            <div className="mt-3 flex items-center gap-4 text-sm">
              <button
                onClick={() => updateQuantity(item.productId, -1)}
                className="px-2 border rounded"
              >
                −
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.productId, +1)}
                className="px-2 border rounded"
              >
                +
              </button>

              <span className="ml-auto">
                ₹{item.price * item.quantity}
              </span>
            </div>

            <button
              onClick={() => removeFromCart(item.productId)}
              className="mt-3 text-xs underline opacity-70"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t pt-6">
        <Text className="font-medium">Order Total: ₹{total}</Text>

        <div className="mt-6 flex gap-4">
          <Link
            href="/checkout"
            className="px-6 py-3 bg-black text-white rounded-soft"
          >
            Proceed to Checkout
          </Link>

          <button
            onClick={() => clearCart()}
            className="px-6 py-3 border rounded-soft"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </Section>
  );
}
