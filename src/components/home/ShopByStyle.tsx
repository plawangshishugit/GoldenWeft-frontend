import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const styles = [
  {
    title: "Traditional Indian",
    description:
      "Timeless weaves rooted in ritual, heritage, and classic craftsmanship.",
    href: "/styles/traditional",
  },
  {
    title: "Modern Elegance",
    description:
      "Refined silks designed for contemporary tastes and understated luxury.",
    href: "/styles/modern",
  },
  {
    title: "Gen Z Edit",
    description:
      "Light, expressive silks for bold styling and modern celebrations.",
    href: "/styles/gen-z",
  },
];

export default function ShopByStyle() {
  return (
    <section className="border-t border-black/5">
      <Section>
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Text as="h2">Shop by Style</Text>
          <Text className="mt-4 text-lg max-w-xl">
            Explore silk collections curated by style — from timeless
            traditions to contemporary expressions.
          </Text>
        </div>

        {/* Style Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {styles.map((style) => (
            <Link
              key={style.title}
              href={style.href}
              className="group block border border-black/10 rounded-soft p-8 hover:border-black/30 transition-all duration-300"
            >
              <Text as="h3" className="mb-4">
                {style.title}
              </Text>

              <Text className="text-base">
                {style.description}
              </Text>

              <div className="mt-6 text-sm underline underline-offset-4 opacity-70 group-hover:opacity-100 transition">
                Explore Style
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </section>
  );
}
