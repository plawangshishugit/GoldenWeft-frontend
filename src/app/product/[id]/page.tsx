import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import AddToWishlistButton from "@/components/product/AddToWishlistButton";
import AddToCartActions from "@/components/cart/AddToCartActions";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return notFound();

  return (
    <Section>
      <div className="max-w-2xl">
        <Text as="h1">{product.name}</Text>

        <Text className="mt-3 text-lg opacity-80">
          {product.fabric} silk · {product.weight} drape
        </Text>

        {/* Wishlist */}
        <div className="mt-4">
          <AddToWishlistButton product={product} />
        </div>

        {/* ✅ Cart Actions (Add + Buy Now) */}
        <div className="mt-6">
          <AddToCartActions product={product} />
        </div>

        {/* Why this silk */}
        <div className="mt-8 border border-black/10 rounded-soft p-6">
          <Text as="h3">Why this silk works</Text>
          <ul className="mt-3 list-disc list-inside text-sm opacity-80">
            <li>Suitable for {product.occasions.join(", ")}</li>
            <li>Style: {product.style}</li>
            <li>Complements {product.tones.join(" & ")} undertones</li>
            <li>Investment level: {product.tier}</li>
          </ul>
        </div>

        {/* Craft */}
        <div className="mt-10">
          <Text as="h3">Craft & Fabric</Text>
          <Text className="mt-3 text-sm opacity-80">
            This silk is handwoven in Bhagalpur using traditional looms.
            Natural texture variations are a mark of authenticity.
          </Text>
        </div>

        <div className="mt-12">
          <Link
            href="/collections"
            className="text-sm underline underline-offset-4"
          >
            Back to collections
          </Link>
        </div>
      </div>
    </Section>
  );
}
