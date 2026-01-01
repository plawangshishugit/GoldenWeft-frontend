"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartCount } from "@/lib/cart";

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setCartCount(getCartCount());
    };

    // Initial load
    updateCount();

    // ✅ Listen to YOUR custom cart event
    window.addEventListener("gw-cart-update", updateCount);

    return () => {
      window.removeEventListener("gw-cart-update", updateCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-ivory)] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-serif tracking-wide">
          GoldenWeft
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/collections">Collections</Link>
          <Link href="/seasons">Seasons</Link>
          <Link href="/styles">Styles</Link>

          <Link
            href="/find-your-silk"
            className="px-4 py-2 border rounded-soft"
          >
            Find Your Silk ✨
          </Link>

          {/* 🛒 Cart */}
          <Link href="/cart" className="relative flex items-center gap-1">
            <span>🛒</span>
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          <Link href="/legacy">Legacy</Link>
          <Link href="/exports">Exports</Link>
        </nav>
      </div>
    </header>
  );
}
