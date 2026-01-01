import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-5rem)] flex items-center">
      <Section>
        <div className="max-w-3xl">
          {/* Brand Heading */}
          <Text as="h1">
            GoldenWeft
          </Text>

          {/* Subheading */}
          <Text className="mt-6 text-lg max-w-xl">
            Handwoven Bhagalpuri silks, crafted for generations and occasions
            that matter.
          </Text>

          {/* CTA Group */}
          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/find-your-silk"
              className="
                px-6 py-3
                border border-black
                rounded-soft
                text-sm
                hover:bg-black hover:text-white
                transition
              "
            >
              Find Your Silk
            </Link>

            <Link
              href="/collections"
              className="
                px-6 py-3
                border border-black/20
                rounded-soft
                text-sm
                hover:border-black
                transition
              "
            >
              Explore Collections
            </Link>
          </div>
        </div>
      </Section>
    </section>
  );
}
