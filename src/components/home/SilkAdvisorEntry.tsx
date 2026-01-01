import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export default function SilkAdvisorEntry() {
  return (
    <section className="border-t border-black/5">
      <Section>
        <div className="max-w-3xl">
          {/* Section Title */}
          <Text as="h2">
            Find the silk that truly suits you
          </Text>

          {/* Description */}
          <Text className="mt-4 text-lg max-w-xl">
            Not sure which silk works best for your occasion, comfort, or style?
            Our Silk Advisor gently guides you to the right weave — thoughtfully
            and personally.
          </Text>

          {/* CTA */}
          <div className="mt-8">
            <Link href="/find-your-silk">
              <Button>
                Begin Your Silk Journey
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </section>
  );
}
