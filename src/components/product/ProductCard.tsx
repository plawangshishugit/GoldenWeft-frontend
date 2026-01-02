import Link from "next/link";
import { Text } from "@/components/ui/Text";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block border border-black/10 rounded-soft p-6 hover:border-black/30 transition"
    >
      <Text as="h3">{product.name}</Text>

      <Text className="mt-2 text-sm opacity-80">
        {product.fabric} · {product.weight} drape
      </Text>

      <Text className="mt-1 text-sm opacity-60">
        Suitable for {(product.occasions ?? []).join(", ")}
      </Text>

      {/* ✅ PRICE (even if you later hide it, keep it here) */}
      {typeof product.price === "number" && (
        <Text className="mt-1 text-sm opacity-60">
          {product.occasions?.length
            ? `Suitable for ${product.occasions.join(", ")}`
            : "Suitable for curated occasions"}
        </Text>

      )}

      <div className="mt-4 text-sm underline underline-offset-4 opacity-70">
        View details
      </div>
    </Link>
  );
}
