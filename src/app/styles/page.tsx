import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { STYLES } from "@/lib/styles";

export default function StylesPage() {
  return (
    <Section>
      <div className="max-w-3xl mb-12">
        <Text as="h1">Shop by Style</Text>
        <Text className="mt-4 text-lg">
          Explore Bhagalpuri silks curated by aesthetic and lifestyle.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Object.entries(STYLES).map(([key, config]) => (
        <Link
          key={key}
          href={`/styles/${key}`}
          className="border border-black/10 rounded-soft p-8 hover:border-black transition"
        >
          <Text as="h3">{config.label}</Text>
          <p className="mt-3 text-sm opacity-70">
            Explore {config.label.toLowerCase()} silks
          </p>
        </Link>
      ))}

      </div>
    </Section>
  );
}
