import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { SEASONS } from "@/lib/seasons";

export default function SeasonsPage() {
  return (
    <Section>
      <div className="max-w-3xl mb-12">
        <Text as="h1">Shop by Occasion</Text>
        <Text className="mt-4 text-lg">
          Discover Bhagalpuri silks curated for India’s festivals,
          weddings, and everyday moments.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(SEASONS).map(([key, config]) => (
          <Link
            key={key}
            href={`/seasons/${key}`}
            className="border border-black/10 rounded-soft p-8 hover:border-black transition"
          >
            <Text as="h3">{config.label}</Text>
            <p className="mt-3 text-sm opacity-70">
              {config.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
