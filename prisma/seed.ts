import { prisma } from "../src/lib/prisma";
import { PRODUCTS } from "../src/lib/products";

async function main() {
  console.log("🌱 Seeding products...");

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.id }, // using id as slug
      update: {},
      create: {
        slug: product.id,
        name: product.name,
        description: product.description ?? "",
        fabric: product.fabric,
        weight: product.weight,
        style: product.style,
        tier: product.tier,
        tones: product.tones,
        occasions: product.occasion,
        isNew: product.isNew ?? false,
        isActive: true,
      },
    });
  }

  console.log("✅ Products seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
