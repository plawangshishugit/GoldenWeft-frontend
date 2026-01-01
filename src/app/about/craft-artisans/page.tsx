import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function CraftArtisansPage() {
  return (
    <Section>
      <Text as="h1">Craft & Artisans</Text>
      <Text className="mt-6 text-lg max-w-2xl">
        Every GoldenWeft silk is handwoven by skilled artisans from Bhagalpur,
        preserving generational knowledge and craftsmanship.
      </Text>
    </Section>
  );
}
