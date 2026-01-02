import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SEASONS, Season } from "@/lib/seasons";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import ProductCard from "@/components/product/ProductCard";

export default async function SeasonDetailPage({
  params,
}: {
  params: { season: Season};
}) {
  const { season } = await params;
  const seasonKey = season as Season;
  const config = SEASONS[seasonKey];

  if (!config) {
    return notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      occasions: {
        hasSome: [...config.match],
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Section>
      <div className="max-w-3xl mb-12">
        <Text as="h1">{config.label}</Text>
        <Text className="mt-4 text-lg opacity-80">
          {config.description}
        </Text>
      </div>

      {products.length === 0 ? (
        <Text>No products available for this occasion yet.</Text>
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
