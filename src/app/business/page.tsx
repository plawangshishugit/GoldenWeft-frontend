import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

export default function BusinessPage() {
  return (
    <Section>
      <Text as="h1">Business</Text>
      <Text className="mt-6 text-lg max-w-2xl">
        GoldenWeft partners with boutiques, designers, and global buyers for
        premium silk sourcing.
      </Text>
    </Section>
  );
}
