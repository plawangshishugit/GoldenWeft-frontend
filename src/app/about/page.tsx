import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function AboutPage() {
  return (
    <Section>
      <Text as="h1">About GoldenWeft</Text>
      <Text className="mt-6 text-lg max-w-2xl">
        GoldenWeft represents the heritage of Bhagalpuri silk — crafted with
        patience, tradition, and respect for artisans.
      </Text>
    </Section>
  );
}
