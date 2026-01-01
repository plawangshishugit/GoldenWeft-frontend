import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { STYLES, StyleKey } from "@/lib/styles";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import ProductCard from "@/components/product/ProductCard";

export default async function StyleDetailPage({
  params,
}: {
  params: Promise<{ style: string }>;
}) {
  const { style } = await params;
  const styleKey = style as StyleKey;

  const styleConfig = STYLES[styleKey];
  if (!styleConfig) {
    return notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      style: styleConfig.dbValue,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Section>
      <div className="max-w-3xl mb-12">
        <Text as="h1">{styleConfig.label}</Text>
        <Text className="mt-4 text-lg opacity-80">
          {styleConfig.description}
        </Text>
      </div>

      {products.length === 0 ? (
        <Text>No products available in this style yet.</Text>
      ) : (
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
      )}
    </Section>
  );
}
