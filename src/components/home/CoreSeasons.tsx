import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const seasons = [
  {
    title: "Wedding Season",
    description: "Rich silks crafted for ceremonies that mark a lifetime.",
    href: "/seasons/wedding",
  },
  {
    title: "Festive Edit",
    description: "Elegant weaves for celebrations and sacred gatherings.",
    href: "/seasons/festive",
  },
  {
    title: "Durga Puja",
    description: "Traditional reds, whites, and textures rooted in ritual.",
    href: "/seasons/durga-puja",
  },
  {
    title: "New Arrivals",
    description: "Freshly woven pieces from our latest handloom batches.",
    href: "/collections/new-arrivals",
  },
];

export default function CoreSeasons() {
  return (
    <section className="border-t border-black/5">
      <Section>
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Text as="h2">Seasonal Highlights</Text>
          <Text className="mt-4 text-lg max-w-xl">
            Discover silks thoughtfully curated for the moments and
            celebrations that matter most.
          </Text>
        </div>

        {/* Season Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {seasons.map((season) => (
            <Link
              key={season.title}
              href={season.href}
              className="group block border border-black/10 rounded-soft p-8 hover:border-black/30 transition-all duration-300"
            >
              <Text as="h3" className="mb-3">
                {season.title}
              </Text>
              <Text className="text-base max-w-sm">
                {season.description}
              </Text>

              <div className="mt-6 text-sm underline underline-offset-4 opacity-70 group-hover:opacity-100 transition">
                Explore
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </section>
  );
}
