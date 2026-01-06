import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import ProductCard from "@/components/product/ProductCard";

export default async function NewArrivalsPage() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      isNew: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Section>
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <Text as="h1">New Arrivals</Text>
        <Text className="mt-4 text-lg opacity-80">
          Discover our latest silk additions.
        </Text>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <Text>No new arrivals at the moment.</Text>
      ) : (
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
      )}
    </Section>
  );
}
