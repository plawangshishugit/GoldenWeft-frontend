import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/queries/products";

export default async function FeaturedSilks() {
  const products = await getFeaturedProducts(6);

  if (products.length === 0) return null;

  return (
    <section className="border-t border-black/5">
      <Section>
        <div className="max-w-3xl mb-12">
          <Text as="h2">Featured Silks</Text>
          <Text className="mt-4 text-lg">
            Timeless Bhagalpuri weaves chosen for craftsmanship,
            elegance, and enduring value.
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={{
                id: product.slug,
                name: product.name,
                fabric: product.fabric,
                weight: product.weight,
                style: product.style,
                tier: product.tier,
                tones: product.tones,
                occasion: product.occasions,
                isNew: product.isNew,
              }}
            />
          ))}
        </div>
      </Section>
    </section>
  );
}
