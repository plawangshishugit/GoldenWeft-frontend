import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function LegacyPreview() {
  return (
    <section className="border-t border-black/5">
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left: Story */}
          <div className="max-w-xl">
            <Text as="h2">
              Woven by hand. Guided by generations.
            </Text>

            <Text className="mt-6 text-lg">
              Every GoldenWeft silk begins its journey on a handloom in
              Bhagalpur — shaped by time, skill, and the quiet dedication of
              artisans who have carried this craft across generations.
            </Text>

            <Text className="mt-4">
              We do not rush our weaves, and we do not mass-produce tradition.
              Each piece reflects patience, heritage, and respect for the
              material itself.
            </Text>

            <div className="mt-8">
              <Link
                href="/legacy"
                className="text-sm underline underline-offset-4 opacity-80 hover:opacity-100 transition"
              >
                Discover our legacy
              </Link>
            </div>
          </div>

          {/* Right: Craft Signals */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <Text as="h3">Handloom Craft</Text>
              <Text className="mt-2 text-sm opacity-80">
                Each weave is crafted on traditional looms, preserving
                techniques passed down through generations.
              </Text>
            </div>

            <div>
              <Text as="h3">Artisan Made</Text>
              <Text className="mt-2 text-sm opacity-80">
                Skilled hands guide every thread — no automated shortcuts, no
                industrial replication.
              </Text>
            </div>

            <div>
              <Text as="h3">Time & Patience</Text>
              <Text className="mt-2 text-sm opacity-80">
                A single piece can take days to complete, ensuring depth,
                durability, and character.
              </Text>
            </div>

            <div>
              <Text as="h3">Rooted in Bhagalpur</Text>
              <Text className="mt-2 text-sm opacity-80">
                Our silks are born in a region globally known for its weaving
                heritage and natural textures.
              </Text>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
