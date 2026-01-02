import { prisma } from "../src/lib/prisma";
import { PRODUCTS } from "../src/lib/products";

async function main() {
  console.log("🌱 Seeding products...");

  for (const product of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: product.id },

      update: {
        // 🔥 IMPORTANT: update existing rows
        price: product.price ?? 0,
        name: product.name,
        fabric: product.fabric,
        weight: product.weight,
        style: product.style,
        tier: product.tier,
        tones: product.tones,
        occasions: product.occasions,
        isNew: product.isNew ?? false,
        isActive: true,
      },

      create: {
        slug: product.id,
        name: product.name,
        description: product.description ?? "",
        fabric: product.fabric,
        weight: product.weight,
        style: product.style,
        tier: product.tier,
        tones: product.tones,
        occasions: product.occasions,
        price: product.price ?? 0,
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
