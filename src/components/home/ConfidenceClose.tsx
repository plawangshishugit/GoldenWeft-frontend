import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

const signals = [
  {
    title: "Chosen by Families",
    description:
      "Trusted for weddings, rituals, and moments that carry deep personal meaning.",
  },
  {
    title: "Preferred by Designers",
    description:
      "Selected for its texture, depth, and character in bespoke creations.",
  },
  {
    title: "Collected Worldwide",
    description:
      "Appreciated by clients across India and international markets for its authenticity.",
  },
  {
    title: "Crafted with Integrity",
    description:
      "Every piece reflects ethical handloom practices and respect for artisans.",
  },
];

export default function ConfidenceClose() {
  return (
    <section className="border-t border-black/5">
      <Section>
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Text as="h2">Why people choose GoldenWeft</Text>
          <Text className="mt-4 text-lg max-w-xl">
            Our silks are chosen not for trends, but for meaning, craftsmanship,
            and the quiet confidence they bring.
          </Text>
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {signals.map((signal) => (
            <div key={signal.title}>
              <Text as="h3">{signal.title}</Text>
              <Text className="mt-3 text-sm opacity-80">
                {signal.description}
              </Text>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
