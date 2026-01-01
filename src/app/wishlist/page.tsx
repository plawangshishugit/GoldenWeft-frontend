"use client";

import { useEffect, useState } from "react";
import { getWishlist, removeFromWishlist } from "@/lib/wishlist";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { Product } from "@/lib/products";

export default function WishlistPage() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    setItems(getWishlist());
  }, []);

  const remove = (id: string) => {
    removeFromWishlist(id);
    setItems(getWishlist());
  };

  return (
    <Section>
      <div className="max-w-2xl">
        <Text as="h1">Your Wishlist</Text>

        {items.length === 0 ? (
          <Text className="mt-6 opacity-70">
            You haven’t saved any silks yet.
          </Text>
        ) : (
          <div className="mt-10 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="border border-black/10 rounded-soft p-6"
              >
                <Text as="h3">{item.name}</Text>

                <Text className="mt-2 text-sm opacity-80">
                  {item.fabric} · {item.weight} drape
                </Text>

                <div className="mt-4 flex gap-6 text-sm">
                  <Link
                    href={`/product/${item.id}`}
                    className="underline underline-offset-4"
                  >
                    View details
                  </Link>

                  <button
                    onClick={() => remove(item.id)}
                    className="underline underline-offset-4 opacity-60"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-12">
            <Link
              href="/inquiry"
              className="underline underline-offset-4 text-sm"
            >
              Discuss these with an advisor
            </Link>
          </div>
        )}
      </div>
    </Section>
  );
}
