"use client";

import { useEffect } from "react";

export default function BootstrapProducts() {
  useEffect(() => {
    const cached = localStorage.getItem("gw_products");
    if (cached) return; // ✅ already loaded

    fetch("/api/products")
      .then((res) => res.json())
      .then((products) => {
        localStorage.setItem(
          "gw_products",
          JSON.stringify(products)
        );
        console.log("✅ Products cached for Find Your Silk");
      })
      .catch((err) => {
        console.error("❌ Failed to bootstrap products", err);
      });
  }, []);

  return null; // 👈 no UI
}
