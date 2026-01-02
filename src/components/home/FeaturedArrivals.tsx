import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import ProductCard from "@/components/product/ProductCard";
import { getNewArrivals } from "@/lib/queries/products";

export default async function NewArrivals() {
  const products = await getNewArrivals(6);

  if (products.length === 0) return null;

  return (
    <section className="border-t border-black/5">
      <Section>
        <div className="max-w-3xl mb-12">
          <Text as="h2">New Arrivals</Text>
          <Text className="mt-4 text-lg">
            Freshly woven pieces from our latest handloom batches —
            available in limited quantities.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={{
              id: product.slug,
                name: product.name,
                fabric: product.fabric as "Tussar" | "Ghicha" | "Mulberry",
                weight: product.weight as "Light" | "Medium" | "Heavy",
                style: product.style as "Traditional" | "Contemporary" | "Elegant",
                tier: product.tier as "Everyday" | "Occasion" | "Heirloom",
                tones: product.tones,
                occasions: product.occasions,
                isNew: product.isNew,
              }}
            />
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/collections/new-arrivals"
            className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
          >
            View all new arrivals
          </Link>
        </div>
      </Section>
    </section>
  );
}
