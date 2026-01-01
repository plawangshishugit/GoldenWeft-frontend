import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import ProductCard from "@/components/product/ProductCard";

export default async function CollectionsPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Section>
      <div className="max-w-3xl mb-12">
        <Text as="h1">Silk Collections</Text>
        <Text className="mt-4 text-lg">
          Handwoven silks curated across fabrics, occasions, and styles.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={{
              id: product.slug,          // keep ProductCard compatible
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
  );
}
