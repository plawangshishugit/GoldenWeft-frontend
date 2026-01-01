import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function StepIntro({ onNext }: { onNext: () => void }) {
  return (
    <Section>
      <div className="max-w-xl">
        <Text as="h1">Find Your Silk</Text>
        <Text className="mt-6 text-lg">
          This short guide helps us recommend silks that suit your occasion,
          comfort, and personal style.
        </Text>

        <Text className="mt-2 text-sm opacity-70">
          You can skip or change any step.
        </Text>

        <div className="mt-10">
          <Button onClick={onNext}>Begin</Button>
        </div>
      </div>
    </Section>
  );
}
